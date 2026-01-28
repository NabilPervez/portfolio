import os
import requests
import subprocess
from bs4 import BeautifulSoup
import re
import time

URLS = [
    "https://www.behance.net/gallery/148098559/Fancurve",
    "https://www.behance.net/gallery/145873245/ALLOY-Brand-Identity-Development"
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.behance.net/',
    'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
}

BASE_DIR = 'behance-dl'

def download_images(url):
    print(f"Processing: {url}")
    try:
        # Extract folder name
        parts = url.rstrip('/').split('/')
        # Typically .../gallery/ID/Name
        slug = parts[-1]
        
        save_dir = os.path.join(BASE_DIR, slug)
        os.makedirs(save_dir, exist_ok=True)
        
        # response = requests.get(url, headers=HEADERS)
        # if response.status_code != 200:
        #     print(f"  Failed to fetch: {response.status_code}")
        #     return
        
        # Use curl to bypass TLS fingerprinting issues
        print(f"  Fetching with curl...")
        try:
            result = subprocess.run(
                ['curl', '-s', '-L', '-A', HEADERS['User-Agent'], url], 
                capture_output=True, 
                text=True, 
                check=True
            )
            html_content = result.stdout
        except subprocess.CalledProcessError as e:
            print(f"  Curl failed: {e}")
            return

        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Behance main content images often have specific classes or are just large images in the main container.
        # Regex extraction for JSON-embedded images
        # Behance embeds data in JSON weirdly sometimes
        regex = r'(https://mir-s3-cdn-cf\.behance\.net/project_modules/[a-zA-Z0-9_/-]+\.(?:jpg|jpeg|png|webp|gif))'
        found_urls = re.findall(regex, html_content)
        
        images = []
        for url in found_urls:
            # We want high res if possible.
            # Disp/max_1200/fs
            # If we get a valid image URL, take it.
            # Decode unicode escapes if any (though curl output shouldn't have them usually)
            url = url.replace('\\/', '/')
            images.append(url)

        # Also try standard soup for good measure, though regex likely caught them
        for img in soup.find_all('img'):
            # Check src, data-src, srcset
            candidates = []
            if img.get('src'): candidates.append(img.get('src'))
            if img.get('data-src'): candidates.append(img.get('data-src'))
            if img.get('srcset'):
                # srcset="url 1x, url 2x" -> split and take urls
                for s in img.get('srcset').split(','):
                    url = s.strip().split(' ')[0]
                    candidates.append(url)
            
            for url in candidates:
                if url and 'behance.net' in url and ('project_modules' in url):
                     images.append(url)

        # Remove duplicates
        images = list(set(images))
        
        if len(images) == 0:
             print("  No images found. Snippet of HTML:")
             print(html_content[:1000])
        
        print(f"  Found {len(images)} potential images.")
        
        count = 0
        for src in images:
            try:
                # Simple filename extraction
                filename = src.split('/')[-1].split('?')[0]
                if not filename:
                    continue
                
                output_path = os.path.join(save_dir, filename)
                
                if os.path.exists(output_path):
                    # print(f"    Skipping {filename}")
                    continue
                
                # Download
                r = requests.get(src, headers=HEADERS, timeout=10)
                if r.status_code == 200:
                    with open(output_path, 'wb') as f:
                        f.write(r.content)
                    count += 1
                    # print(f"    Downloaded {filename}")
                
                # Start gentle with the server
                # time.sleep(0.1) 
            except Exception as e:
                print(f"    Error downloading {src}: {e}")
                
        print(f"  Saved {count} images to {slug}")

    except Exception as e:
        print(f"  Error processing {url}: {e}")

def main():
    if not os.path.exists(BASE_DIR):
        os.makedirs(BASE_DIR)
        
    for url in URLS:
        download_images(url)

if __name__ == '__main__':
    main()
