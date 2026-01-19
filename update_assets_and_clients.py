import json
import os

PROJECTS_JSON_PATH = "web/app/data/projects.json"
CLIENTS_JSON_PATH = "web/app/data/clients.json"
ABOUT_PAGE_PATH = "web/app/about/page.tsx"

def update_projects_json():
    with open(PROJECTS_JSON_PATH, 'r') as f:
        projects = json.load(f)

    for p in projects:
        # UI - Producing
        if p['id'] == 'immortal-gates-of-pyre-ui-producing':
            # Use a better image
            p['image'] = "/images/portfolio/immortal-gates-of-pyre-ui-producing/immortal-gates-of-pyre-ui-producing-CharacterSelect.jpg"
            p['heroImage'] = "/images/portfolio/immortal-gates-of-pyre-ui-producing/immortal-gates-of-pyre-ui-producing-CharacterSelect.jpg"

        # Lorebook Videos - Borrow from Kickstarter
        if p['id'] == 'immortal-gates-of-pyre-lorebook-videos':
            p['image'] = "/images/portfolio/immortal-gates-of-pyre-kickstarter/immortal-gates-of-pyre-kickstarter-GameCover-Art-PWELOVE.jpg"
            p['heroImage'] = "/images/portfolio/immortal-gates-of-pyre-kickstarter/immortal-gates-of-pyre-kickstarter-GameCover-Art-PWELOVE.jpg"

        # Video Producing - Borrow from Kickstarter
        if p['id'] == 'immortal-gates-of-pyre-video-producing':
            p['image'] = "/images/portfolio/immortal-gates-of-pyre-kickstarter/immortal-gates-of-pyre-kickstarter-1_PreviewLive.jpg"
            p['heroImage'] = "/images/portfolio/immortal-gates-of-pyre-kickstarter/immortal-gates-of-pyre-kickstarter-1_PreviewLive.jpg"

        # The Story Mob
        if p['id'] == 'the-story-mob':
             p['image'] = "/images/portfolio/the-story-mob/the-story-mob-Desktop2.png" 
             p['heroImage'] = "/images/portfolio/the-story-mob/the-story-mob-Desktop2.png"

        # AKON
        if p['id'] == 'a-kon':
             p['image'] = "/images/portfolio/a-kon/a-kon-Aimi-Header.png"
             p['heroImage'] = "/images/portfolio/a-kon/a-kon-Aimi-Header.png"
             
        # LEGO
        if p['id'] == 'lego_27':
            p['title'] = "LEGO"
            # Choose different image
            p['image'] = "/images/portfolio/lego_27/406806126553707.615376f58f116.png"
            p['heroImage'] = "/images/portfolio/lego_27/406806126553707.615376f58f116.png"

        # Liquid
        if p['id'] == 'liquid':
             # Use placeholder or if liquid folder exists (it doesn't seem to)
             # Keeping default for now as I can't invent an image
             pass

        # Optic Gaming
        if p['id'] == 'optic-gaming':
             p['image'] = "/images/portfolio/optic-gaming.png"
             p['heroImage'] = "/images/portfolio/optic-gaming.png"

        # PVP Live
        if p['id'] == 'pvp-live':
             p['image'] = "/images/portfolio/pvp-live.jpg"
             p['heroImage'] = "/images/portfolio/pvp-live.jpg"

        # Paramount (Team Fugitive)
        if p['id'] == 'paramount-players':
             # Populate images from folder
             folder = "web/public/images/portfolio/team-fugitive"
             if os.path.exists(folder):
                 files = [f for f in os.listdir(folder) if f.endswith(('.png', '.jpg', '.gif'))]
                 p['images'] = [f"/images/portfolio/team-fugitive/{f}" for f in files]
                 if files:
                    p['image'] = p['images'][0]
                    p['heroImage'] = p['images'][0]

    with open(PROJECTS_JSON_PATH, 'w') as f:
        json.dump(projects, f, indent=2)

def update_clients_json():
    with open(CLIENTS_JSON_PATH, 'r') as f:
        clients = json.load(f)

    new_clients_list = [
        "Shopify", "Misfits", "NRG", "Dignitas", "Golden Guardians", 
        "100 Thieves", "TSM", "CLG", "Splyce", "Echo Fox", 
        "Dallas Fuel", "Complexity", "Envy Gaming", "Evil Geniuses", 
        "T-Mobile", "Fujitsu"
    ]
    
    # Existing names set
    existing = {c['name'] for c in clients}
    
    for name in new_clients_list:
        if name not in existing:
            clients.append({
                "name": name,
                "description": "Providing strategic guidance and brand development.",
                "tags": ["Strategy", "Branding"],
                "logo": "/images/portfolio/default.jpg" # Placeholder
            })
            
    with open(CLIENTS_JSON_PATH, 'w') as f:
        json.dump(clients, f, indent=4)

if __name__ == "__main__":
    update_projects_json()
    update_clients_json()
