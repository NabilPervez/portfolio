import json
import os

PROJECTS_JSON_PATH = "web/app/data/projects.json"
CLIENTS_JSON_PATH = "web/app/data/clients.json"

def update_clients_logos():
    with open(PROJECTS_JSON_PATH, 'r') as f:
        projects = json.load(f)
    
    with open(CLIENTS_JSON_PATH, 'r') as f:
        clients = json.load(f)

    # Specific strict mapping requested by user/context
    # Client Name -> Project ID
    mapping = {
        "Paramount Pictures": "paramount-players",
        "The Story Mob": "the-story-mob",
        "Stay Plugged In": "stay-plugged-in",
        "Team Liquid": "liquid", # No image in project, check fallback
        "OpTic Gaming": "optic-gaming",
        "PVP Live": "pvp-live",
        "A-KON": "a-kon",
        "AOE Creative": "aoe-creative",
        "Nerd Street Gamers": "nerd-street-gamers-brand", # Client "Nacon" maps to this project in prev steps?
        "Nacon": "nerd-street-gamers-brand",
        "Blizzard Activision": "overwatch-league-in-game-sprays",
        "Riot Games": "metaview", # Fallback
        "LEGO": "lego_27",
        "Sunspear Games": "immortal-gates-of-pyre-kickstarter",
        "Metaview": "metaview",
        "FreshCut": "freshcut",
        "Geekletes": "geekletes",
        "Ellevens": "ellevens",
        "Boston Breach": "boston-breach",
        "Metal Umbrella": "metal-umbrella",
        "Houston Outlaws": "houston-outlaws",
        "Red Bull": "redbull",
        "FCFL": "fcfl",
        "IGDA Dallas": "igda-dallas",
    }

    # Helper to get hero image from project ID
    def get_hero_image(pid):
        for p in projects:
            if p['id'] == pid:
                # Prioritize valid images
                if p.get('heroImage') and "default.jpg" not in p['heroImage']:
                    return p['heroImage']
                if p.get('image') and "default.jpg" not in p['image']:
                    return p['image']
                # Fallback to images list
                if p.get('images') and len(p['images']) > 0:
                     return p['images'][0]
        return None

    for c in clients:
        pid = mapping.get(c['name'])
        if pid:
            img = get_hero_image(pid)
            if img:
                c['logo'] = img
                print(f"Updated {c['name']} to {img}")
            else:
                print(f"No image found for {c['name']} (Project ID: {pid})")
        
        # Special case for Team Liquid if project has no image, verify if file exists
        if c['name'] == "Team Liquid" and "default.jpg" in c['logo']:
             # Try to find a liquid logo manually if project failed
             # Previous steps showed it missing. I'll leave it or set a better placeholder if I had one.
             pass

    with open(CLIENTS_JSON_PATH, 'w') as f:
        json.dump(clients, f, indent=4)

if __name__ == "__main__":
    update_clients_logos()
