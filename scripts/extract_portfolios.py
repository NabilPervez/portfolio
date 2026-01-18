import os
import xml.etree.ElementTree as ET
import re

# CONFIGURATION
INPUT_FILE = 'nabilpervez.WordPress.2026-01-18.xml'
OUTPUT_FOLDER = 'portfolio_exports'

def clean_html(raw_html):
    """Removes HTML tags to leave just the text content."""
    if not raw_html: return ""
    # Remove HTML tags
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    
    # Remove Shortcodes (e.g. [vc_row], [/vc_column_text])
    # This regex matches [tag] or [/tag] or [tag attr="val"]
    clean_shortcodes = re.compile(r'\[/?[a-zA-Z0-9_-]+.*?\]')
    cleantext = re.sub(clean_shortcodes, '', cleantext)

    # Decode HTML entities if needed (basic ones)
    cleantext = cleantext.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&gt;', '>').replace('&lt;', '<')
    
    # Reduce multiple newlines/spaces to single ones for cleaner output, handling distinct paragraphs
    cleantext = re.sub(r'\n\s*\n', '\n\n', cleantext)
    
    return cleantext.strip()


def extract_portfolio():
    # 1. Create the output folder
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)
        print(f"Created folder: {OUTPUT_FOLDER}")

    if not os.path.exists(INPUT_FILE):
        print(f"Error: Input file '{INPUT_FILE}' not found.")
        return

    print(f"Parsing {INPUT_FILE}...")
    
    # 2. Parse the XML file
    # We use a namespace map because WordPress exports use lots of prefixes like wp: and content:
    namespaces = {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'wp': 'http://wordpress.org/export/1.2/',
        'excerpt': 'http://wordpress.org/export/1.2/excerpt/'
    }
    
    try:
        tree = ET.parse(INPUT_FILE)
        root = tree.getroot()
    except Exception as e:
        print(f"Failed to parse XML: {e}")
        return
    
    count = 0
    portfolio_types = ['portfolio', 'jetpack-portfolio'] # Handle both common types
    
    # 3. Find all items
    # The XML structure is usually rss -> channel -> item
    # We iterate all items and check post_type
    channel = root.find('channel')
    if channel is None:
        # Fallback if structure is different or root is channel
        search_root = root
    else:
        search_root = channel

    for item in search_root.findall('item'):
        
        # Check if it is a portfolio item. 
        # Note: ET using namespaces in find() requires the full url in curly braces usually,
        # or passing namespaces dict if supported.
        # To be safe across versions, we can look for the tag ending with post_type
        
        post_type = None
        for child in item:
            if child.tag.endswith('post_type'):
                post_type = child.text
                break
        
        if post_type not in portfolio_types:
            continue
            
        # Extract Data
        title = item.find('title').text
        if not title:
            title = "Untitled Portfolio"

        # Content can be in content:encoded OR in _nectar_portfolio_extra_content meta
        # Find tag ending in 'encoded' (usually {http://purl.org/rss/1.0/modules/content/}encoded)
        content_raw = ""
        for child in item:
            if child.tag.endswith('encoded'):
                if child.text and child.text.strip():
                    content_raw = child.text
                break
        
        # If content is empty, look for meta
        if not content_raw:
            for meta in item.findall('wp:postmeta', namespaces): # Try with namespace
                key = meta.find('wp:meta_key', namespaces).text
                if key == '_nectar_portfolio_extra_content':
                    val = meta.find('wp:meta_value', namespaces).text
                    if val:
                        content_raw = val
                    break
            
            # Fallback: manually finding meta if namespace find fails (ElementTree version compat)
            if not content_raw:
                 for child in item:
                    if child.tag.endswith('postmeta'):
                        key_node = None
                        val_node = None
                        for meta_child in child:
                            if meta_child.tag.endswith('meta_key'):
                                key_node = meta_child
                            elif meta_child.tag.endswith('meta_value'):
                                val_node = meta_child
                        
                        if key_node is not None and key_node.text == '_nectar_portfolio_extra_content':
                            if val_node is not None:
                                content_raw = val_node.text
                            break
        
        # Clean the data
        clean_content = clean_html(content_raw)
        
        # Create a filename (make it safe for windows/mac)
        # Allow alphanumeric, spaces, hyphens
        safe_title = "".join([c for c in title if c.isalnum() or c in (' ', '-', '_')]).strip()
        if not safe_title:
            safe_title = f"portfolio_item_{count}"
            
        filename = f"{OUTPUT_FOLDER}/{safe_title}.txt"
        
        # Handle duplicates
        if os.path.exists(filename):
            filename = f"{OUTPUT_FOLDER}/{safe_title}_{count}.txt"

        # 4. Save to file
        try:
            with open(filename, "w", encoding="utf-8") as f:
                f.write(f"TITLE: {title}\n")
                f.write(f"TYPE: {post_type}\n")
                f.write("="*20 + "\n\n")
                f.write(clean_content)
                
            print(f"Saved: {filename}")
            count += 1
        except Exception as e:
            print(f"Error saving {filename}: {e}")

    print(f"\nSuccess! Extracted {count} portfolio items.")

if __name__ == "__main__":
    extract_portfolio()
