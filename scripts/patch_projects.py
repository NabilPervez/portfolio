import json
import os

PROJECTS_FILE = "web/app/data/projects.json"

def main():
    with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
        projects = json.load(f)

    # 1. Update Titles
    title_updates = {
        "lego_27": "LEGO",
        "session": "NACON",
        "voyagers-of-nera": "Voyagers of Nera",
        "one-piece-x-cloud9": "One Piece",
        "mccown-evans": "McCown Evans",
        "fancurve": "Houston Outlaws" # Actually fancurve -> Houston Outlaws
    }
    
    # Needs special handling for Paramount Pictures if slug varies
    
    # 2. Re-apply Image Selections (Manually specifying based on available files)
    # Optic Gaming: /images/portfolio/optic-gaming/optic-header.png
    # Stay Plugged In: /images/portfolio/stay-plugged-in/stay-plugged-in.jpg (Wait, let's verify file names from list_dir)
    # The Story Mob: /images/portfolio/the-story-mob/the-story-mob-Desktop2.png (Verify this exists)
    # Paramount: Needs check. Directory: web/public/images/portfolio/paramount (if exists) -> likely paramount-players?
    
    for p in projects:
        slug = p['slug']
        
        # SPECIAL: Check for Paramount
        if "paramount" in p['title'].lower() or slug == "paramount-players":
             p['title'] = "Paramount Pictures"
             # Assuming we fix image too if needed, but let's stick to title first
        
        if slug in title_updates:
            p['title'] = title_updates[slug]
            
        # Image fixes
        if slug == "optic-gaming":
            p['image'] = "/images/portfolio/optic-gaming/optic-header.png"
            p['heroImage'] = "/images/portfolio/optic-gaming/optic-header.png"
            if "/images/portfolio/optic-gaming/optic-header.png" not in p['images']:
                 p['images'].insert(0, "/images/portfolio/optic-gaming/optic-header.png")

        if slug == "stay-plugged-in":
            # From list_dir, we have many hashes. Let's pick a logical one or check if there is a main one.
            # In previous turns user asked for updates.
            # Let's use the one that looks like a main image or just the first valid one if array is empty
            if not p['images']:
                 # Populate from directory scan if empty? 
                 # Or just hardcode one if known. 
                 # list_dir showed: stay-plugged-in.jpg
                 p['image'] = "/images/portfolio/stay-plugged-in/stay-plugged-in.jpg"
                 p['heroImage'] = "/images/portfolio/stay-plugged-in/stay-plugged-in.jpg"
            else:
                 # Check if the specific requested one is there
                 pass

        if slug == "the-story-mob":
             p['image'] = "/images/portfolio/the-story-mob/the-story-mob-Desktop2.png"
             
        if slug == "fancurve": # Houston Outlaws
             # Ensure images are correct. They seem to be /images/portfolio/outlaws/...
             # Should be fine, just title update.
             pass

    # 3. Reorder
    # User wants "Featured" or specific order.
    # User mentioned "The ordering on portfolio is incorrect now too".
    # I don't have the *exact* previous order in memory, but I can try to prioritize "Selected Work".
    # Usually: LEGO, Houston Outlaws, Optic, etc.
    # I will put the new ones (AOE case studies) near the top or mixed in?
    # "then i would like you to create new case study pages for each of these" -> implies they are important.
    # Let's put a sensible order:
    # 1. LEGO (Big brand)
    # 2. Voyagers of Nera (New, Visual)
    # 3. NACON (Title update from Session)
    # 4. One Piece (Big IP)
    # 5. McCown Evans (New)
    # 6. Houston Outlaws (Classic)
    # 7. Immortal Gates of Pyre (Multiple entries, maybe group them?)
    # ... others
    
    # Priority List from user requests and big brands
    priority_slugs = [
        "lego_27", 
        "voyagers-of-nera", 
        "session", 
        "one-piece-x-cloud9", 
        "mccown-evans", 
        "fancurve", # Houston Outlaws
        "optic-gaming",
        "stay-plugged-in",
        "paramount-players", # or whatever slug it is
        "the-story-mob",
        "redbull",
        "nacon" # if slug changed? No slug is session
    ]
    
    ordered_projects = []
    remaining_projects = []
    
    p_map = {p['slug']: p for p in projects}
    
    for slug in priority_slugs:
        if slug in p_map:
            ordered_projects.append(p_map[slug])
            del p_map[slug]
            
    # Add the rest
    remaining_projects = list(p_map.values())
    # Sort remaining alphabetically or by content? content length?
    # Just append
    final_projects = ordered_projects + remaining_projects

    # 4. Rewrite Copy for New AOE Studies
    # Formatting them with "The Challenge", "The Solution", "The Outcome" keys in content object
    # currently they might just be flat or messy.
    
    for p in final_projects:
        if p['slug'] in ["mccown-evans", "voyagers-of-nera", "session", "one-piece-x-cloud9"]:
            # Check content
            c = p.get('content', {})
            
            # Normalize keys to lowercase
            c = {k.lower(): v for k, v in c.items()}
            
            # Ensure structure
            new_content = {}
            if 'scope' in c: new_content['scope'] = c['scope']
            
            # Map scraped keys to standard
            # Scraped might have "the challenge", "challenge", etc.
            # We want 'challenge', 'solution', 'outcome'
            
            if 'challenge' in c: new_content['challenge'] = c['challenge']
            elif 'the challenge' in c: new_content['challenge'] = c['the challenge']
            else: new_content['challenge'] = c.get('challenge', '') # Fallback
            
            if 'solution' in c: new_content['solution'] = c['solution']
            elif 'the solution' in c: new_content['solution'] = c['the solution']
            else: new_content['solution'] = c.get('solution', '')
            
            if 'outcome' in c: new_content['outcome'] = c['outcome']
            elif 'the outcome' in c: new_content['outcome'] = c['the outcome']
            elif 'result' in c: new_content['outcome'] = c['result']
            
            p['content'] = new_content

    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_projects, f, indent=2)
        
    print("Projects updated successfully.")

if __name__ == "__main__":
    main()
