
import os
import requests
import re
from urllib.parse import urlparse
import time
from bs4 import BeautifulSoup

# List of Behance Project URLs provided by the user
PROJECT_URLS = [
    "https://www.behance.net/gallery/189215887/NEWBREED-Luggage",
    "https://www.behance.net/gallery/187335283/Voyagers-of-Nera-Website",
    "https://www.behance.net/gallery/186633405/One-Piece-X-Cloud9",
    "https://www.behance.net/gallery/183512947/SESSION-Skate-Sim",
    "https://www.behance.net/gallery/176241963/McCown-Evans-Law",
    "https://www.behance.net/gallery/176766823/Overwatch-League-2019-2023",
    "https://www.behance.net/gallery/162750755/Oxygen-Esports",
    "https://www.behance.net/gallery/173251195/Call-of-Duty-League-2023-Championship-Weekend",
    "https://www.behance.net/gallery/167169443/CDL-Photo-Manipulation",
    "https://www.behance.net/gallery/162092775/RIOT-LEC-Website",
    "https://www.behance.net/gallery/162945755/Boston-Breach-2023",
    "https://www.behance.net/gallery/132316687/Stay-Plugged-In-Branding",
    "https://www.behance.net/gallery/159055627/Coca-Cola-Advertisement-Design",
    "https://www.behance.net/gallery/159687413/Overwatch-League-Grand-Finals-2022",
    "https://www.behance.net/gallery/131377741/Flyquest-Web-Design-Development",
    "https://www.behance.net/gallery/148098403/A-KON-Rebrand",
    "https://www.behance.net/gallery/131606503/Team-Fugitive",
    "https://www.behance.net/gallery/144191187/Boston-Breach",
    "https://www.behance.net/gallery/124334787/Metal-Umbrella-Brand-Identity-Marketing-Strategy",
    "https://www.behance.net/gallery/126553707/LEGO-Games-Brand-Identity-Logo-Design",
    "https://www.behance.net/gallery/124452495/CDL-Social-Media-Graphic-Design",
    "https://www.behance.net/gallery/115497303/Immortal-Gates-of-Pyre-Brand-Development-Identity",
    "https://www.behance.net/gallery/113184055/Metaview-Brand-Identity",
    "https://www.behance.net/gallery/85622943/Nerd-Street-Gamers-Brand-Identity-Logo-Design",
    "https://www.behance.net/gallery/113710863/The-Story-Mob-Web-Design-Development",
    "https://www.behance.net/gallery/91813149/EllEVENS-Brand-Identity-Development"
]

BASE_DIR = "behance"

def get_slug_from_url(url):
    """Extracts the project slug from the Behance URL."""
    path = urlparse(url).path
    # Path is usually /gallery/ID/Slug
    parts = path.strip('/').split('/')
    if len(parts) >= 3:
        return parts[2]
    return "unknown_project"

def download_image(url, folder):
    """Downloads an image to the specified folder."""
    try:
        # Get filename from URL
        filename = os.path.basename(urlparse(url).path)
        # Clean filename query params if any
        if '?' in filename:
            filename = filename.split('?')[0]
        
        filepath = os.path.join(folder, filename)
        
        if os.path.exists(filepath):
            print(f"  Skipping existing: {filename}")
            return

        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"  Downloaded: {filename}")
        else:
            print(f"  Failed to download {url}: Status {response.status_code}")
    except Exception as e:
        print(f"  Error downloading {url}: {e}")

def scrape_behance_project(url):
    """
    Scrapes a Behance project page for images.
    Note: Behance pages often load content dynamically. 
    However, the initial HTML often contains the image data in JSON or structured HTML.
    We will try to parse the 'img' tags from the source directly first.
    """
    slug = get_slug_from_url(url)
    project_dir = os.path.join(BASE_DIR, slug)
    
    if not os.path.exists(project_dir):
        os.makedirs(project_dir)
        print(f"\nCreated directory: {project_dir}")
    else:
        print(f"\nProcessing: {slug}")

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.behance.net/',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive'
    }

    try:
        # Create a session to handle cookies
        session = requests.Session()
        session.headers.update(headers)
        
        # Initial request to get cookies
        response = session.get(url, timeout=15)
        if response.status_code != 200:
            print(f"Failed to load page: {url}")
            return

        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Behance images are usually in 'img' tags within project modules.
        # We look for src or data-src attributes.
        # High-res images often have 'original' or 'disp' in the URL or are in 'srcset'.
        
        image_urls = set()
        
        # Strategy 1: Find all <img> tags in the project-modules container
        # The content usually sits in a div with id="project-modules"
        modules = soup.find(id='project-modules')
        
        if modules:
            imgs = modules.find_all('img')
        else:
            # Fallback: find all images and filter
            imgs = soup.find_all('img')

        for img in imgs:
            src = img.get('src')
            # Check for higher res versions in data attributes often used by lazy loaders
            data_src = img.get('data-src')
            srcset = img.get('srcset')
            
            best_url = data_src if data_src else src
            
            # If we have a srcset, try to get the largest one
            if srcset:
                # content format: url width, url width...
                # simple split by comma
                candidates = srcset.split(',')
                if candidates:
                    # just take the last one which is usually largest
                    last_candidate = candidates[-1].strip().split(' ')[0]
                    best_url = last_candidate

            if best_url and 'behance.net/project_modules' in best_url:
                image_urls.add(best_url)
            elif best_url and 'mir-s3-cdn-cf' in best_url: # Common CDN for behance
                image_urls.add(best_url)

        print(f"  Found {len(image_urls)} images.")
        
        for i, img_url in enumerate(image_urls):
            download_image(img_url, project_dir)
            # Be nice to the server
            time.sleep(0.1)

    except Exception as e:
        print(f"Error scraping {url}: {e}")

def main():
    if not os.path.exists(BASE_DIR):
        os.makedirs(BASE_DIR)
        print(f"Created base directory: {BASE_DIR}")

    print(f"Starting download for {len(PROJECT_URLS)} projects...")
    
    for url in PROJECT_URLS:
        scrape_behance_project(url)
        # Random delay between projects
        time.sleep(1)

    print("\nAll projects processed.")

if __name__ == "__main__":
    main()
