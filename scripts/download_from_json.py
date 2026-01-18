
import json
import os
import requests
from urllib.parse import urlparse
import time

INPUT_JSON = "behance_images_part1.json"
BASE_DIR = "behance"

def download_image(url, folder):
    """Downloads an image to the specified folder."""
    try:
        filename = os.path.basename(urlparse(url).path)
        if '?' in filename:
            filename = filename.split('?')[0]
        
        filepath = os.path.join(folder, filename)
        
        if os.path.exists(filepath):
            print(f"Skipping existing: {filepath}")
            return

        # Simple download, these CDN links usually don't need complex headers
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded: {filepath}")
        else:
            print(f"Failed to download {url}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

def get_slug_from_url(url):
    """Extracts the project slug from the Behance URL."""
    path = urlparse(url).path
    parts = path.strip('/').split('/')
    if len(parts) >= 3:
        return parts[2]
    return "unknown_project"

def main():
    if not os.path.exists(INPUT_JSON):
        print(f"File {INPUT_JSON} not found.")
        return

    with open(INPUT_JSON, 'r') as f:
        data = json.load(f)

    if not os.path.exists(BASE_DIR):
        os.makedirs(BASE_DIR)

    for project_url, image_urls in data.items():
        slug = get_slug_from_url(project_url)
        project_dir = os.path.join(BASE_DIR, slug)
        
        if not os.path.exists(project_dir):
            os.makedirs(project_dir)
            print(f"Created directory: {project_dir}")
        
        print(f"\nDownloading {len(image_urls)} images for project: {slug}")
        for img_url in image_urls:
            download_image(img_url, project_dir)
            # small delay to be polite
            time.sleep(0.05)

if __name__ == "__main__":
    main()
