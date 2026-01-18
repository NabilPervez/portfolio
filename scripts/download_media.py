import os
import xml.etree.ElementTree as ET
import urllib.request
import urllib.parse
import ssl

# Configuration
XML_FILE = 'nabilpervez.WordPress.2026-01-18.xml'
OUTPUT_DIR = 'downloaded_images'
EXTENSIONS = ('.jpg', '.png', '.pdf')

# Bypass SSL verification issues usually found in older python installs or cert issues
ssl._create_default_https_context = ssl._create_unverified_context

def main():
    if not os.path.exists(XML_FILE):
        print(f"Error: File {XML_FILE} not found.")
        return

    print(f"Parsing {XML_FILE}...")
    try:
        tree = ET.parse(XML_FILE)
        root = tree.getroot()
    except ET.ParseError as e:
        print(f"Error parsing XML: {e}")
        return

    # Create output directory
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"Created directory: {OUTPUT_DIR}")

    urls_to_download = set()

    # Define namespaces usually present in WP export. 
    # Attempting to find tags generically or by explicit namespace if needed.
    # WP export usually has xmlns:wp="http://wordpress.org/export/1.2/" or similar.
    # We will search for any tag ending in 'attachment_url' to be robust.
    
    for elem in root.iter():
        if elem.tag.endswith('attachment_url'):
            url = elem.text
            if url:
                url = url.strip()
                # Check extension
                # Parse url path to get extension cleanly handles query params if any
                path = urllib.parse.urlparse(url).path
                if path.lower().endswith(EXTENSIONS):
                    urls_to_download.add(url)

    print(f"Found {len(urls_to_download)} unique files to download.")

    for i, url in enumerate(urls_to_download):
        try:
            filename = os.path.basename(urllib.parse.urlparse(url).path)
            # Handle empty filenames or duplicates if needed, but basic should be fine
            if not filename:
                filename = f"file_{i}"
            
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            # Handle duplicate filenames from different folders
            if os.path.exists(filepath):
                name, ext = os.path.splitext(filename)
                filepath = os.path.join(OUTPUT_DIR, f"{name}_{i}{ext}")

            print(f"Downloading [{i+1}/{len(urls_to_download)}]: {url}")
            
            # User agent sometimes helps if servers block bots
            req = urllib.request.Request(
                url, 
                data=None, 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
                }
            )
            
            with urllib.request.urlopen(req, timeout=30) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
                
        except Exception as e:
            print(f"FAILED: {url} - Reason: {e}")

    print("\nDownload process complete.")

if __name__ == "__main__":
    main()
