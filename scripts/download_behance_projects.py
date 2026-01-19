import os
import requests
import subprocess
from bs4 import BeautifulSoup
import re
import time

URLS = [
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
        # A common pattern for high-res images in Behance is urls containing 'project_modules'
        images = []
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src and 'project_modules' in src:
                # We can try to force high-res. 
                # Common segements: /disp/, /max_1200/, /fs/
                # Often /disp/ is the display version. /fs/ (full size) or /max_1200/ is better if available.
                # However, blindly replacing might break link. Let's just take the src as is first.
                images.append(src)
        
        # Remove duplicates
        images = list(set(images))
        
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
