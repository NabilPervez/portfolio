import os
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin

# URLs to scrape
URLS = [
    "https://aoecreative.com/work/mccown-evans/",
    "https://aoecreative.com/work/voyagers-of-nera/",
    "https://aoecreative.com/work/session/",
    "https://aoecreative.com/work/one-piece-x-cloud9/"
]

# Output directories matching parse_portfolio.py expectations
TEXT_OUTPUT_DIR = "raw_assets/text/refined_portfolio"
IMAGE_OUTPUT_DIR = "raw_assets/images/sorted"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def clean_text(text):
    return text.strip()

def save_image(url, folder):
    if not os.path.exists(folder):
        os.makedirs(folder)
    
    filename = url.split('/')[-1].split('?')[0]
    filepath = os.path.join(folder, filename)
    
    if os.path.exists(filepath):
        print(f"    Image exists: {filename}")
        return filename

    print(f"    Downloading {url}...")
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        if r.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(r.content)
            return filename
    except Exception as e:
        print(f"    Failed to download {url}: {e}")
    return None

def scrape_url(url):
    print(f"Scraping {url}...")
    try:
        r = requests.get(url, headers=HEADERS)
        if r.status_code != 200:
            print(f"Failed to load page: {r.status_code}")
            return

        soup = BeautifulSoup(r.content, 'html.parser')
        
        # 1. Extract Title
        # Title usually in h1 or derived from URL
        slug = url.strip('/').split('/')[-1]
        title = slug.replace('-', ' ').title()
        
        # Try to find real h1 if possible
        h1 = soup.find('h1')
        if h1:
            title = clean_text(h1.get_text())

        print(f"  Title: {title}")
        print(f"  Slug: {slug}")

        # 2. Extract Sections
        # We look for h2, h3 headers and the content following them
        sections = {}
        
        # Fallback content extraction if structure is generic
        # Look for headers like "Challenge", "Solution", "Scope", "Outcome"
        for header in soup.find_all(['h2', 'h3', 'h4', 'h5', 'h6']):
            header_text = clean_text(header.get_text())
            if not header_text:
                continue
            
            # Simple content extraction: get validation next siblings until next header
            content = []
            curr = header.next_sibling
            while curr:
                if curr.name in ['h2', 'h3', 'h4', 'h5', 'h6', 'div']: 
                    # Divs might be containers for next sections, but also might be wrappers.
                    # This is tricky. Let's start with just p tags and ul tags if they are direct siblings.
                    # Or maybe checking class names.
                     if curr.name in ['h2', 'h3', 'h4', 'h5', 'h6']:
                         break
                     # If it's a div with a class that looks like a new section, break?
                     # For now, let's just grab p and ul
                
                if curr.name == 'p':
                    content.append(clean_text(curr.get_text()))
                elif curr.name == 'ul':
                    # Extract list items
                    items = [clean_text(li.get_text()) for li in curr.find_all('li')]
                    content.append("\n".join([f"- {item}" for item in items]))
                elif isinstance(curr, str):
                    t = clean_text(curr)
                    if t: content.append(t)
                
                curr = curr.next_sibling
            
            if content:
                sections[header_text] = "\n".join(content)

        # 3. Extract Images
        # Looking for .p-work-project-gallery-img as seen in grep
        image_urls = []
        for img in soup.select('img.p-work-project-gallery-img'):
            src = img.get('src')
            if src:
                full_url = urljoin("https://aoecreative.com", src)
                image_urls.append(full_url)
        
        # Also check for hero image or other images
        # Maybe looking for all images in main container
        
        print(f"  Found {len(sections)} sections and {len(image_urls)} images.")
        
        # 4. Save Text
        text_filename = os.path.join(TEXT_OUTPUT_DIR, f"{slug}.txt")
        if not os.path.exists(TEXT_OUTPUT_DIR):
            os.makedirs(TEXT_OUTPUT_DIR)
            
        with open(text_filename, 'w') as f:
            # Write in format for parse_portfolio.py
            # THE [SECTION]
            # content
            
            # If we didn't find specific sections, maybe dump main body?
            # Let's map found sections to desired ones if possible
            
            # Common mappings:
            # "The Challenge" -> THE CHALLENGE
            # "Solution" -> THE SOLUTION
            # "The Outcome" -> THE OUTCOME
            
            # If sections are empty, we might need to be more aggressive extracting p tags from the page
            if not sections:
                 # Try finding all Ps in a main content area
                 # .project-description or similar?
                 # Based on grep: <div class="col-12 col-md-6 order-2 order-md-1"> <p>...</p> <h3>Solution</h3> <p>...</p>
                 pass

            for header, content in sections.items():
                upper_header = header.upper()
                # Normalized headers mainly
                if "CHALLENGE" in upper_header:
                    f.write("THE CHALLENGE\n")
                elif "SOLUTION" in upper_header:
                    f.write("THE SOLUTION\n")
                elif "OUTCOME" in upper_header or "RESULT" in upper_header:
                    f.write("THE OUTCOME\n")
                elif "SCOPE" in upper_header or "ROLE" in upper_header:
                    f.write("THE SCOPE\n")
                else:
                    f.write(f"{upper_header}\n")
                
                f.write(content + "\n\n")

        # 5. Save Images
        img_folder = os.path.join(IMAGE_OUTPUT_DIR, slug)
        for i, img_url in enumerate(image_urls):
            save_image(img_url, img_folder)

    except Exception as e:
        print(f"Error processing {url}: {e}")

if __name__ == "__main__":
    for url in URLS:
        scrape_url(url)
