import os
import re
import json
import shutil
from pathlib import Path

# Paths
SOURCE_DIR = "raw_assets/text/refined_portfolio"
SORTED_IMAGES_DIR = "raw_assets/images/sorted"
WEB_IMAGE_DIR = "web/public/images/portfolio"
OUTPUT_FILE = "web/app/data/projects.json"

# Manual Mappings (Text Slug -> Image Folder Slug)
SLUG_MAPPINGS = {
    "lego-27": "lego",
    "fancurve": "outlaws",
    "immortal-gates-of-pyre-logo-faction-icons": "immortal-gates-of-pyre-logo-icons",
    "immortal-gates-of-pyre-logo-icons": "immortal-gates-of-pyre-logo-icons", # ensure consistency
    "immortal-gates-of-pyre-ui-producing": "immortal-gates-of-pyre-ui-producing",
}

def clean_slug(text):
    return text.lower().replace(" ", "-").replace("---", "-").replace("--", "-")

def parse_project_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract title (filename based)
    filename = os.path.basename(filepath)
    title = filename.replace('.txt', '').strip()
    slug = clean_slug(title)

    # Basic parsing logic (headers are "THE SCOPE", etc.)
    sections = {}
    current_header = None
    accumulated_text = []

    for line in content.splitlines():
        line = line.strip()
        if not line:
            continue
        
        # Check for headers
        upper_line = line.upper()
        if upper_line in ["THE SCOPE", "THE CHALLENGE", "THE SOLUTION", "THE OUTCOME"]:
            if current_header:
                # If finishing Scope section, format bullets
                if current_header == "scope":
                    # Assume scope lines are individual items
                    # Convert to HTML list if multiple lines
                    if len(accumulated_text) > 0:
                         formatted_list = "<ul>" + "".join([f"<li>{item}</li>" for item in accumulated_text]) + "</ul>"
                         sections[current_header] = formatted_list
                    else:
                         sections[current_header] = ""
                else:
                    sections[current_header] = "\n".join(accumulated_text).strip()
            
            current_header = upper_line.lower().replace("the ", "") # scope, challenge...
            accumulated_text = []
        else:
            accumulated_text.append(line)
    
    # Save last section
    if current_header:
         if current_header == "scope":
            if len(accumulated_text) > 0:
                 formatted_list = "<ul>" + "".join([f"<li>{item}</li>" for item in accumulated_text]) + "</ul>"
                 sections[current_header] = formatted_list
            else:
                 sections[current_header] = ""
         else:
            sections[current_header] = "\n".join(accumulated_text).strip()

    # Default tags/category based on file content or title guessing
    tags = ["Strategy", "Design", "Development"] # Placeholder logic
    if "UI" in title or "UX" in title:
        tags = ["UI/UX", "Design"]
    elif "Website" in title:
        tags = ["Web Development", "Design"]

    return {
        "id": slug,
        "title": title,
        "slug": slug,
        "tags": tags,
        "content": sections,
        "images": [] # To be filled
    }

def process_images_for_project(project_slug, dest_dir):
    """
    Copies images from raw_assets/images/sorted/{slug} to web/public/images/portfolio/{slug}
    Returns list of web paths.
    """
    source_folder = os.path.join(SORTED_IMAGES_DIR, project_slug)
    target_folder = os.path.join(dest_dir, project_slug)
    
    image_paths = []

    if os.path.exists(source_folder):
        if not os.path.exists(target_folder):
            os.makedirs(target_folder)
        
        # Get all files
        files = [f for f in os.listdir(source_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp'))]
        
        # Sort files to ensure consistency, maybe prioritize certain names if needed
        files.sort()

        for f in files:
            src_file = os.path.join(source_folder, f)
            dst_file = os.path.join(target_folder, f)
            shutil.copy2(src_file, dst_file)
            
            # Add to list (web path)
            image_paths.append(f"/images/portfolio/{project_slug}/{f}")
            
    return image_paths

def main():
    projects = []
    
    # Ensure web image dir exists and clean it? 
    # Maybe don't full clean to avoid deleting default.jpg if it's there
    if not os.path.exists(WEB_IMAGE_DIR):
        os.makedirs(WEB_IMAGE_DIR)

    # Process each text file
    for filename in os.listdir(SOURCE_DIR):
        if filename.endswith(".txt"):
            filepath = os.path.join(SOURCE_DIR, filename)
            project = parse_project_file(filepath)
            
            # Map images
            # Check for manual mapping first
            folder_slug = SLUG_MAPPINGS.get(project['slug'], project['slug'])
            
            # Additional fuzzy check: if folder doesn't exist, try to find a folder that fully contains the slug tokens
            if not os.path.exists(os.path.join(SORTED_IMAGES_DIR, folder_slug)):
                 # Try simple fuzzy match
                 for existing_dir in os.listdir(SORTED_IMAGES_DIR):
                     if project['slug'] in existing_dir or existing_dir in project['slug']:
                         # Don't override if significantly different length unless confident?
                         # Let's stick to safe mapppings or exact match for now to avoid false positives
                         pass
            
            images = process_images_for_project(folder_slug, WEB_IMAGE_DIR)
            
            project['images'] = images
            
            # Set hero/thumb image
            if images:
                project['image'] = images[0] # Default to first
                project['heroImage'] = images[0]
                # Try to find a better one if available? e.g. "hero" in name
                for img in images:
                    if "hero" in img.lower() or "desktop" in img.lower():
                        project['heroImage'] = img
                        break
            else:
                project['image'] = "/images/portfolio/default.jpg"
                project['heroImage'] = "/images/portfolio/default.jpg"

            projects.append(project)

    # Save to JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)
    
    print(f"Processed {len(projects)} projects. Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
