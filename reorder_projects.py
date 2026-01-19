
import json

# Define the explicit order
explicit_order_ids = [
    "redbull",
    "metal-umbrella",
    "boston-breach",
    "freshcut",
    "world-series-of-warzone",
    "ellevens",
    "immortal-gates-of-pyre-web-development",
    "evolution-championship-series",
    "aoe-creative",
    "blast-radius",
    "nerd-street-gamers-brand"
]

def reorder_projects():
    with open('web/app/data/projects.json', 'r') as f:
        projects = json.load(f)

    # Dictionary to hold projects by ID for easy access
    project_map = {p['id']: p for p in projects}

    # FIX: fancurve -> Houston Outlaws
    if 'fancurve' in project_map:
        fancurve = project_map['fancurve']
        fancurve['title'] = "Houston Outlaws"
        fancurve['slug'] = "houston-outlaws"
        # We keep the ID 'fancurve' for the map lookup, or update it?
        # Let's keep distinct maps.
        
    # FIX: Remove the empty 'houston-outlaws' if it exists and differs from fancurve
    if 'houston-outlaws' in project_map:
        # Check if this is the empty one
        ho = project_map['houston-outlaws']
        if not ho.get('images') or len(ho['images']) == 0:
            # Delete it
            del project_map['houston-outlaws']

    ordered_projects = []
    
    # 1. Add Explicit Order
    for pid in explicit_order_ids:
        if pid in project_map:
            ordered_projects.append(project_map[pid])
            del project_map[pid]
    
    # 2. Add Other Immortal
    # Find remaining projects that have 'immortal' in id or slug
    immortal_projects = []
    for pid, p in list(project_map.items()):
        if 'immortal' in p['id'].lower() or 'immortal' in p['slug'].lower():
            immortal_projects.append(p)
            del project_map[pid]
            
    # Sort Immortal: Images first? User said "Then other Immortal... then anything else that has images"
    # This implies Immortal serves as its own group. within that group I should probably prioritize images too?
    # User didn't specify priority *within* Immortal group, just "Then other Immortal".
    # I'll just add them. Maybe sort by those with images first just to be safe.
    immortal_with_imgs = [p for p in immortal_projects if p.get('images') and len(p['images']) > 0]
    immortal_no_imgs = [p for p in immortal_projects if not p.get('images') or len(p['images']) == 0]
    ordered_projects.extend(immortal_with_imgs)
    ordered_projects.extend(immortal_no_imgs)

    # 3. Remaining with Images
    remaining_with_imgs = []
    for pid, p in list(project_map.items()):
        if p.get('images') and len(p['images']) > 0:
            remaining_with_imgs.append(p)
            del project_map[pid]
    ordered_projects.extend(remaining_with_imgs)

    # 4. Remaining without Images
    remaining_no_imgs = list(project_map.values())
    ordered_projects.extend(remaining_no_imgs)

    # Write back
    with open('web/app/data/projects.json', 'w') as f:
        json.dump(ordered_projects, f, indent=2)

if __name__ == "__main__":
    reorder_projects()
