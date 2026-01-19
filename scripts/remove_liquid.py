import json

PROJECTS_FILE = "web/app/data/projects.json"

def main():
    try:
        with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
            projects = json.load(f)
    except FileNotFoundError:
        print(f"Error: {PROJECTS_FILE} not found.")
        return

    # Filter out Team Liquid
    # User asked to rename "Liquid" to "Team Liquid" in previous turn, so checking both.
    initial_count = len(projects)
    filtered_projects = [
        p for p in projects 
        if p.get('title') != "Team Liquid" and p.get('slug') != "liquid"
    ]
    final_count = len(filtered_projects)

    if initial_count == final_count:
        print("Warning: Team Liquid project not found.")
    else:
        print(f"Removed Team Liquid. Project count: {initial_count} -> {final_count}")

    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(filtered_projects, f, indent=2)

if __name__ == "__main__":
    main()
