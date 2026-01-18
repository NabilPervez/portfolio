import os
import shutil
import xml.etree.ElementTree as ET
import re
from pathlib import Path

# Paths
XML_FILE = 'raw_assets/nabilpervez.WordPress.2026-01-18.xml'
DOWNLOADED_IMAGES_DIR = 'raw_assets/images/downloaded_images'
SORTED_IMAGES_DIR = 'raw_assets/images/sorted'

# Namespaces (may vary slightly, but standard for WP export)
NAMESPACES = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'dc': 'http://purl.org/dc/elements/1.1/'
}

# Helper to register namespaces for parsing
for prefix, uri in NAMESPACES.items():
    ET.register_namespace(prefix, uri)

def parse_xml_and_organize():
    print(f"Parsing {XML_FILE}...")
    
    try:
        tree = ET.parse(XML_FILE)
        root = tree.getroot()
    except Exception as e:
        print(f"Error parsing XML: {e}")
        return

    channel = root.find('channel')
    if channel is None:
        print("Could not find <channel> in XML")
        return

    # 1. Identify Portfolio Posts
    # Map post_id -> post_name (slug)
    portfolio_posts = {}
    
    # 2. Identify Attachments
    # Map post_parent_id -> list of filenames
    attachments_by_parent = {}

    print("Scanning items...")
    for item in channel.findall('item'):
        # Get post_id
        post_id_elem = item.find('wp:post_id', NAMESPACES)
        post_id = post_id_elem.text if post_id_elem is not None else None
        
        # Get post_type
        post_type_elem = item.find('wp:post_type', NAMESPACES)
        post_type = post_type_elem.text if post_type_elem is not None else None
        
        # Get post_name (slug)
        post_name_elem = item.find('wp:post_name', NAMESPACES)
        post_name = post_name_elem.text if post_name_elem is not None else None

        if post_type == 'portfolio' and post_id and post_name:
            portfolio_posts[post_id] = post_name
            # print(f"Found Portfolio: {post_name} (ID: {post_id})")

        elif post_type == 'attachment' and post_id:
            # Get parent
            post_parent_elem = item.find('wp:post_parent', NAMESPACES)
            post_parent = post_parent_elem.text if post_parent_elem is not None else None
            
            # Get filename from attachment_url
            # Usually http://.../uploads/2021/07/filename.jpg
            attachment_url_elem = item.find('wp:attachment_url', NAMESPACES)
            attachment_url = attachment_url_elem.text if attachment_url_elem is not None else ""
            
            if attachment_url:
                filename = os.path.basename(attachment_url)
                if post_parent != "0": # 0 means unattached
                    if post_parent not in attachments_by_parent:
                        attachments_by_parent[post_parent] = []
                    attachments_by_parent[post_parent].append(filename)

    # 3. Organize Images
    if not os.path.exists(SORTED_IMAGES_DIR):
        os.makedirs(SORTED_IMAGES_DIR)

    # Get list of actual downloaded files for matching
    downloaded_files = os.listdir(DOWNLOADED_IMAGES_DIR)
    # Create a lower-case map for case-insensitive matching
    downloaded_files_lower = {f.lower(): f for f in downloaded_files}

    print(f"Found {len(portfolio_posts)} portfolio projects.")
    
    for pid, slug in portfolio_posts.items():
        project_images = attachments_by_parent.get(pid, [])
        
        if not project_images:
            # print(f"No directly attached images for {slug} (ID: {pid})")
            continue

        # Create project folder
        project_dir = os.path.join(SORTED_IMAGES_DIR, slug)
        if not os.path.exists(project_dir):
            os.makedirs(project_dir)

        print(f"Processing {slug}...")
        for img_name in project_images:
            # Handle encoded URL chars if any (basic)
            img_name_clean = img_name.replace('%20', ' ') # simple decode
            
            # Match against downloaded files
            match_name = None
            if img_name_clean in downloaded_files:
                match_name = img_name_clean
            elif img_name_clean.lower() in downloaded_files_lower:
                match_name = downloaded_files_lower[img_name_clean.lower()]
            
            if match_name:
                src_path = os.path.join(DOWNLOADED_IMAGES_DIR, match_name)
                
                # New filename: projectname-filename
                new_filename = f"{slug}-{match_name}"
                dest_path = os.path.join(project_dir, new_filename)
                
                try:
                    shutil.copy2(src_path, dest_path)
                    # print(f"  Copied: {match_name} -> {new_filename}")
                except Exception as e:
                    print(f"  Error copying {match_name}: {e}")
            else:
                # pass
                print(f"  Warning: Image not found in downloads: {img_name_clean}")

    print("Organization complete.")

if __name__ == "__main__":
    parse_xml_and_organize()
