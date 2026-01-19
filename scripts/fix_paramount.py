import json
import os

PROJECTS_FILE = "web/app/data/projects.json"

def main():
    try:
        with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
            projects = json.load(f)
    except FileNotFoundError:
        print(f"Error: {PROJECTS_FILE} not found.")
        return
    
    # Found images in team-fugitive folder. It seems Paramount Players == Fugitive Team logic.
    # The XML content confirmed "Fugitive" is the team.
    
    # We will map "paramount-players" (or "Paramount Pictures") to "team-fugitive" folder.
    
    fugitive_dir = "web/public/images/portfolio/team-fugitive"
    valid_exts = ('.jpg', '.jpeg', '.png', '.gif', '.webp')
    
    fugitive_images = []
    if os.path.exists(fugitive_dir):
        files = sorted([f for f in os.listdir(fugitive_dir) if f.lower().endswith(valid_exts)])
        fugitive_images = [f"/images/portfolio/team-fugitive/{f}" for f in files]
        
    for p in projects:
        # Check by slug or title
        if p.get('slug') == "paramount-players" or p.get('title') == "Paramount Pictures":
             if fugitive_images:
                 p['images'] = fugitive_images
                 # Create a good default
                 # Prefer a non-gif as main image if possible, or usually the first one?
                 # File names are hashes, hard to tell content.
                 # Let's pick a png over gif if possible for hero, or just first one.
                 
                 main_img = fugitive_images[0]
                 # Try to find a png/jpg not gif for hero/poster if possible
                 for img in fugitive_images:
                     if not img.endswith('.gif'):
                         main_img = img
                         break
                 
                 p['image'] = main_img
                 p['heroImage'] = main_img
                 
                 print(f"Fixed Paramount Pictures images using 'team-fugitive' folder. Found {len(fugitive_images)} images.")
             else:
                 print("Warning: Paramount Pictures found but no images in 'team-fugitive' folder.")

    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)

if __name__ == "__main__":
    main()
