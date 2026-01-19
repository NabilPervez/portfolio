import os
import shutil
import json

BEHANCE_DL_DIR = "behance-dl"
RAW_ASSETS_DIR = "raw assets/sorted"
PUBLIC_DIR = "web/public"
PROJECTS_JSON_PATH = "web/app/data/projects.json"

# Map Behance folder names to Project IDs (which usually match folder names in public/images/portfolio)
FOLDER_MAPPING = {
    "Boston-Breach": "boston-breach",
    "Boston-Breach-2023": "boston-breach",
    "A-KON-Rebrand": "a-kon",
    "Metal-Umbrella-Brand-Identity-Marketing-Strategy": "metal-umbrella",
    "Metaview-Brand-Identity": "metaview",
    "Nerd-Street-Gamers-Brand-Identity-Logo-Design": "nerd-street-gamers-brand",
    "The-Story-Mob-Web-Design-Development": "the-story-mob",
    "Stay-Plugged-In-Branding": "stay-plugged-in",
    "EllEVENS-Brand-Identity-Development": "ellevens",
    "LEGO-Games-Brand-Identity-Logo-Design": "lego_27", # Derived from projects.json id
    "Immortal-Gates-of-Pyre-Brand-Development-Identity": "immortal-gates-of-pyre-logo-faction-icons" # Best guess based on content
}

def main():
    # 1. Distribute to raw assets
    if not os.path.exists(RAW_ASSETS_DIR):
        os.makedirs(RAW_ASSETS_DIR)
    
    print(f"Copying files from {BEHANCE_DL_DIR} to {RAW_ASSETS_DIR}...")
    # Copy contents of behance-dl to raw assets/sorted
    for item in os.listdir(BEHANCE_DL_DIR):
        s = os.path.join(BEHANCE_DL_DIR, item)
        d = os.path.join(RAW_ASSETS_DIR, item)
        if os.path.isdir(s):
            if os.path.exists(d):
                shutil.rmtree(d)
            shutil.copytree(s, d)
    
    # 2. Distribute to project folders
    print("Copying files to project folders...")
    for behance_folder, project_id in FOLDER_MAPPING.items():
        src_path = os.path.join(BEHANCE_DL_DIR, behance_folder)
        if not os.path.exists(src_path):
            continue
            
        dest_path = os.path.join(PUBLIC_DIR, "images/portfolio", project_id)
        if not os.path.exists(dest_path):
            os.makedirs(dest_path)
            
        for filename in os.listdir(src_path):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
                shutil.copy2(os.path.join(src_path, filename), os.path.join(dest_path, filename))
                print(f"  Copied {filename} to {project_id}")

    # 3. Update projects.json
    print("Updating projects.json...")
    with open(PROJECTS_JSON_PATH, 'r') as f:
        projects = json.load(f)
        
    new_projects = []
    for p in projects:
        # Remove [Behance] pages except matches for Boston Breach (we'll fix it below)
        if "[Behance]" in p.get('title', '') and p.get('id') != 'boston-breach':
            continue
            
        # Update Boston Breach
        if p.get('id') == 'boston-breach':
            p['title'] = p['title'].replace('[Behance] ', '').replace(' [Behance]', '')
            if 'behanceId' in p:
                del p['behanceId']
                
        # Update images list for ALL projects that we might have touched
        # We re-scan the folder to get the current list of images
        pid = p.get('id')
        
        # Mapping some odd IDs to folders if they differ. 
        # Usually folder matches ID, but let's check basic folders.
        # Based on file listing: 'lego_27' -> 'lego-27'? No, file list showed 'lego-27.jpg' but folder?
        # Let's check the folder name used in existing images logic
        
        # Heuristic: check if existing images have a path, look at the directory details
        current_images = p.get('images', [])
        folder_path = None
        
        if current_images:
            # Extract folder from first image
            # /images/portfolio/ID/file.jpg
            parts = current_images[0].split('/')
            if len(parts) > 3:
                folder_path = os.path.join(PUBLIC_DIR, "images/portfolio", parts[3])
        
        # If no images yet, try to guess folder from ID or mapping
        if not folder_path:
            # Check if a folder with ID exists
            candidate = os.path.join(PUBLIC_DIR, "images/portfolio", pid)
            if os.path.exists(candidate):
                folder_path = candidate
        
        if folder_path and os.path.exists(folder_path):
            # scan directory
            valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.gif')
            
            # Get all files
            files = [f for f in os.listdir(folder_path) if f.lower().endswith(valid_extensions)]
            files.sort()
            
            # Reconstruct image paths
            image_paths = []
            rel_path_base = f"/images/portfolio/{os.path.basename(folder_path)}"
            
            for f in files:
                image_paths.append(f"{rel_path_base}/{f}")
            
            p['images'] = image_paths
            # Ensure heroImage is valid
            if p.get('heroImage') not in image_paths and image_paths:
                p['heroImage'] = image_paths[0]
            if p.get('image') not in image_paths and image_paths:
                p['image'] = image_paths[0]

        new_projects.append(p)

    with open(PROJECTS_JSON_PATH, 'w') as f:
        json.dump(new_projects, f, indent=2)
    
    print("Done!")

if __name__ == "__main__":
    main()
