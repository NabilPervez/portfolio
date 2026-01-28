import os
import requests

FANCURVE_URLS = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a98b0b148098559.633de8a434d5d.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/483601148098559.62cf238aa6c68.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/ed5391148098559.633dcf24d9015.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/71b570148098559.62cf241f19315.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3a3179148098559.62cf241f16c76.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/548e93148098559.62cf2db690ac2.gif",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/94ba46148098559.62cf241f1aae8.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2ee648148098559.62cf241f17b06.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/85c476148098559.62cf241f18ad8.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a23fb3148098559.62cf241f173c8.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1d27b2148098559.633c6618f0a00.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b7ff50148098559.633c4deb02e14.jpg"
]

ALLOY_URLS = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bd9572145873245.62b2abf55f5ad.gif",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0c5d09145873245.62ceddb218cbb.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c04e90145873245.62b2ae888893a.gif",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/924b1e145873245.62a6aa34cfe3d.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/496a51145873245.62a6aa34cef9a.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/38f94e145873245.62a6aa34cf74a.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/8b2ea6145873245.62a6aa34ce7a4.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a8c826145873245.62a6aa34ce23f.jpg"
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def download_images(urls, folder_name):
    # Target: web/public/images/portfolio/{folder_name}
    target_dir = os.path.join("web", "public", "images", "portfolio", folder_name)
    os.makedirs(target_dir, exist_ok=True)
    
    count = 0
    for i, url in enumerate(urls):
        try:
            # Keep original filename
            filename = url.split('/')[-1]
            filepath = os.path.join(target_dir, filename)
            
            if os.path.exists(filepath):
                print(f"Skipping {filename} (exists)")
                count += 1
                continue
                
            print(f"Downloading {url}...")
            r = requests.get(url, headers=HEADERS, timeout=20)
            if r.status_code == 200:
                with open(filepath, 'wb') as f:
                    f.write(r.content)
                count += 1
            else:
                print(f"Failed {r.status_code}")
        except Exception as e:
            print(f"Error: {e}")
            
    print(f"Downloaded {count}/{len(urls)} to {target_dir}")

def main():
    print("Downloading Fancurve...")
    download_images(FANCURVE_URLS, "fancurve")
    
    print("Downloading ALLOY...")
    download_images(ALLOY_URLS, "alloy")

if __name__ == "__main__":
    main()
