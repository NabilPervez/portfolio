import json
import os

PROJECTS_JSON_PATH = "web/app/data/projects.json"
CLIENTS_JSON_PATH = "web/app/data/clients.json"
ABOUT_PAGE_PATH = "web/app/about/page.tsx"

def update_assets_and_clients():
    # Update projects.json with new image paths
    with open(PROJECTS_JSON_PATH, 'r') as f:
        projects = json.load(f)

    for p in projects:
        if p['id'] == 'paramount-players':
            p['image'] = "/images/portfolio/team-fugitive/893312131606503.629fae6b138b7.png"
            p['heroImage'] = "/images/portfolio/team-fugitive/893312131606503.629fae6b138b7.png"
        
        if p['id'] == 'the-story-mob':
            p['image'] = "/images/portfolio/the-story-mob/762e63113710863.602d4ef45efd2.png"
            p['heroImage'] = "/images/portfolio/the-story-mob/762e63113710863.602d4ef45efd2.png"
            
        if p['id'] == 'optic-gaming':
            p['image'] = "/images/portfolio/optic-gaming/optic-header.png"
            p['heroImage'] = "/images/portfolio/optic-gaming/optic-header.png"
            
        if p['id'] == 'stay-plugged-in':
            p['image'] = "/images/portfolio/stay-plugged-in/9e8063132316687.63e1338204a53.gif"
            p['heroImage'] = "/images/portfolio/stay-plugged-in/9e8063132316687.63e1338204a53.gif"

    with open(PROJECTS_JSON_PATH, 'w') as f:
        json.dump(projects, f, indent=2)

    # Sync clients.json again just to be safe with the new images
    # We can reuse the logic or just do it right here for the specific ones
    with open(CLIENTS_JSON_PATH, 'r') as f:
        clients = json.load(f)
        
    for c in clients:
        if c['name'] == "Paramount Pictures": 
            c['logo'] = "/images/portfolio/team-fugitive/893312131606503.629fae6b138b7.png"
        if c['name'] == "The Story Mob":
            c['logo'] = "/images/portfolio/the-story-mob/762e63113710863.602d4ef45efd2.png"
        if c['name'] == "OpTic Gaming":
            c['logo'] = "/images/portfolio/optic-gaming/optic-header.png"
        if c['name'] == "Stay Plugged In":
            c['logo'] = "/images/portfolio/stay-plugged-in/9e8063132316687.63e1338204a53.gif"
            
    with open(CLIENTS_JSON_PATH, 'w') as f:
        json.dump(clients, f, indent=4)

if __name__ == "__main__":
    update_assets_and_clients()
