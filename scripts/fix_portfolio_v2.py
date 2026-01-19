import json
import os

PROJECTS_FILE = "web/app/data/projects.json"
WEB_IMAGE_DIR = "web/public/images/portfolio"

def main():
    try:
        with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
            projects = json.load(f)
    except FileNotFoundError:
        print(f"Error: {PROJECTS_FILE} not found.")
        return

    # Image Overrides requested by user
    image_overrides = {
        "session": "/images/portfolio/session/06_finals.png",
        "nacon": "/images/portfolio/session/06_finals.png", # In case slug changed but ID logic is fuzzy
        "one-piece-x-cloud9": "/images/portfolio/one-piece-x-cloud9/9_fruitboi.webp",
        "outlaws": "/images/portfolio/outlaws/outlaws-MVIMG_20180526_172827-scaled.jpg", # Assuming slug is 'outlaws' or 'fancurve'
        "fancurve": "/images/portfolio/outlaws/outlaws-MVIMG_20180526_172827-scaled.jpg",
        "the-story-mob": "/images/portfolio/the-story-mob/the-story-mob-Header.png",
        "a-kon": "/images/portfolio/a-kon/a-kon-AKON_Twitter.jpg",
        "evolution-championship-series": "/images/portfolio/evolution-championship-series/evolution-championship-series-hero.png"
    }

    # Helper to find images in a directory
    def get_images_from_dir(directory):
        full_dir = os.path.join("web/public", directory.lstrip('/'))
        if not os.path.exists(full_dir):
            return []
        
        valid_exts = ('.jpg', '.jpeg', '.png', '.gif', '.webp')
        return [
            os.path.join(directory, f) 
            for f in os.listdir(full_dir) 
            if f.lower().endswith(valid_exts)
        ]

    # Process Projects
    processed_slugs = []
    projects[:] = [p for p in projects if p.get('slug') not in processed_slugs] # Filtering duplicates later if needed
    
    # Identify the TWO Houston Outlaws.
    outlaws_projects = [p for p in projects if p['slug'] in ['fancurve', 'outlaws']]
    # Determine which one to keep. 
    # User said "this (fancurve) is actually houston outlaws".
    # And "i think there are two Houston Outlaws case studies?" -> implies we should merge or remove one.
    # Let's keep the one with better content. 
    # Fancurve content: "For the inaugural season... #BandTogether"
    # Outlaws content: "Originally the Houston Outlaws were... #BandTogether" (Likely similar).
    # If duplicates exist, we'll likely see distinct IDs.
    
    # Strategy: Merge into a single 'houston-outlaws' or 'outlaws' slug.
    # Prefer 'fancurve' entry if user pointed to it, but rename slug to 'houston-outlaws'.
    
    final_projects = []
    seen_titiles = set()
    
    for p in projects:
        slug = p['slug']
        
        # 1. Apply Image Overrides
        if slug in image_overrides:
            img = image_overrides[slug]
            p['image'] = img
            p['heroImage'] = img
            if 'images' not in p: p['images'] = []
            if img not in p['images']: p['images'].insert(0, img)
            
        # 2. LEGO Fix
        if slug == "lego_27":
            # Repopulate images
            folder = "/images/portfolio/lego_27"
            images = get_images_from_dir(folder)
            if images:
                p['images'] = sorted(images)
                if not p['image'] or "default" in p['image']:
                    p['image'] = images[0]
                    p['heroImage'] = images[0]
                    
        # 3. Stay Plugged In Fix
        if slug == "stay-plugged-in":
            folder = "/images/portfolio/stay-plugged-in"
            images = get_images_from_dir(folder)
            if images:
                p['images'] = sorted(images)
                if not p['image'] or "default" in p['image']:
                    p['image'] = images[0]
                    p['heroImage'] = images[0]

        # 4. PVP Live Fix
        if slug == "pvp-live": # If it exists
             p['image'] = "/images/portfolio/pvp-live.jpg" # Root level image seen in list
             p['heroImage'] = "/images/portfolio/pvp-live.jpg"

        # 5. Sunspear Fixes (Lorebook, etc.)
        # Folders for these might not exist as directories in list_dir output showed .png files?
        # "immortal-gates-of-pyre-lorebook-videos.png" exists in root of portfolio images
        # "immortal-gates-of-pyre-ui-producing.png" exists
        # "immortal-gates-of-pyre-video-producing.png" exists
        
        if "immortal-gates-of-pyre" in slug:
             # Try to match single file image if directory is missing
             single_img_path = f"/images/portfolio/{slug}.png"
             if os.path.exists(f"web/public{single_img_path}"):
                 p['image'] = single_img_path
                 p['heroImage'] = single_img_path
                 
             # Or check directory again
             folder = f"/images/portfolio/{slug}"
             images = get_images_from_dir(folder)
             if images:
                 p['images'] = sorted(images)
                 if not p.get('image') or "default" in p.get('image', ''):
                     p['image'] = images[0]
                     p['heroImage'] = images[0]

        # 6. Team Liquid Move/Rename
        if slug == "liquid":
            p['title'] = "Team Liquid"
            
        # 7. Houston Outlaws Dedupe/Fix
        # If slug is fancurve, rename to 'houston-outlaws'
        if slug == "fancurve":
            p['slug'] = "houston-outlaws"
            p['title'] = "Houston Outlaws"
            p['image'] = image_overrides['fancurve']
            p['heroImage'] = image_overrides['fancurve']
            # Ensure images
            outlaws_imgs = get_images_from_dir("/images/portfolio/outlaws")
            if outlaws_imgs:
                p['images'] = sorted(outlaws_imgs)

        final_projects.append(p)

    # 8. Reordering - Move Team Liquid to bottom
    liquid_project = next((p for p in final_projects if p['slug'] == 'liquid' or p['title'] == 'Team Liquid'), None)
    if liquid_project:
        final_projects.remove(liquid_project)
        final_projects.append(liquid_project)
        
    # 9. Dedupe 'houston-outlaws' if double entry exists now
    unique_projects = []
    seen_slugs = set()
    for p in final_projects:
        if p['slug'] in seen_slugs and p['slug'] == 'houston-outlaws':
            continue # Skip duplicate
        seen_slugs.add(p['slug'])
        unique_projects.append(p)
    
    # Save
    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(unique_projects, f, indent=2)
    
    print("Projects fixed and saved.")

if __name__ == "__main__":
    main()
