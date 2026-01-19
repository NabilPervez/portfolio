import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

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

BASE_DIR = 'behance-dl'

def setup_driver():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    # Use a real user agent
    options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    # Try to install driver or use default
    try:
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
    except Exception as e:
        print(f"Error setting up driver with manager: {e}")
        print("Trying default webdriver.Chrome()...")
        driver = webdriver.Chrome(options=options)
        
    return driver

def main():
    if not os.path.exists(BASE_DIR):
        print(f"Creating directory: {BASE_DIR}")
        os.makedirs(BASE_DIR)

    print("Setting up Selenium WebDriver...")
    driver = setup_driver()
    
    try:
        for i, url in enumerate(URLS):
            print(f"[{i+1}/{len(URLS)}] Processing {url}...")
            # Create folder
            slug = url.rstrip('/').split('/')[-1]
            slug = "".join([c for c in slug if c.isalnum() or c in ('-','_')]).strip()
            
            save_dir = os.path.join(BASE_DIR, slug)
            os.makedirs(save_dir, exist_ok=True)
            
            try:
                driver.get(url)
                # Wait for content to load
                time.sleep(3) 
                
                # Scroll to bottom to trigger lazy loading
                print("  Scrolling to load images...")
                last_height = driver.execute_script("return document.body.scrollHeight")
                
                # A more aggressive scroll might be needed for Behance
                # Scroll in chunks
                for scroll_pos in range(0, last_height, 1000):
                    driver.execute_script(f"window.scrollTo(0, {scroll_pos});")
                    time.sleep(0.2)
                
                # Final scroll to bottom
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)
                
                # Get images
                # Based on inspector: img with class containing 'ImageElement-image'
                images = driver.find_elements(By.CSS_SELECTOR, 'img[class*="ImageElement-image"]')
                print(f"  Found {len(images)} potential image elements.")
                
                count = 0
                downloaded_urls = set()
                
                for img in images:
                    src = img.get_attribute('src')
                    srcset = img.get_attribute('srcset')
                    
                    # Fallback to source if src is a tiny placeholder (behance sometimes does this)
                    # or try to get the largest from srcset
                    
                    final_url = src
                    if srcset:
                        # Format: url width, url width, ...
                        # We want the last one usually
                        try:
                            candidates = srcset.split(',')
                            best_candidate = candidates[-1].strip().split(' ')[0]
                            if best_candidate and best_candidate.startswith('http'):
                                final_url = best_candidate
                        except:
                            pass
                    
                    if not final_url or not final_url.startswith('http'):
                        continue
                        
                    if final_url in downloaded_urls:
                        continue
                        
                    downloaded_urls.add(final_url)
                    
                    # Extract filename
                    filename = final_url.split('/')[-1].split('?')[0]
                    # Ensure extension
                    if not any(filename.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']):
                        filename += '.jpg'
                        
                    filepath = os.path.join(save_dir, filename)
                    
                    if os.path.exists(filepath):
                        # print(f"    Skipping {filename}")
                        continue
                        
                    try:
                        # Download using requests, but specific headers might be needed?
                        # Usually CDN links are public.
                        r = requests.get(final_url, timeout=15)
                        if r.status_code == 200:
                            with open(filepath, 'wb') as f:
                                f.write(r.content)
                            count += 1
                            # print(f"    Downloaded {filename}")
                    except Exception as e:
                        print(f"    Failed to download {final_url}: {e}")
                
                print(f"  Saved {count} images to {slug}")
                
            except Exception as e:
                print(f"  Error processing {url}: {e}")
                
    finally:
        print("Closing driver...")
        driver.quit()

if __name__ == "__main__":
    main()
