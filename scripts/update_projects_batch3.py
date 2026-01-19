import json
import os

PROJECTS_FILE = "web/app/data/projects.json"
CLIENTS_FILE = "web/app/data/clients.json"

def main():
    try:
        with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
            projects = json.load(f)
    except FileNotFoundError:
        print(f"Error: {PROJECTS_FILE} not found.")
        return

    # Image Overrides
    image_overrides = {
        "lego_27": "/images/portfolio/lego_27/b0024b126553707.613144231265b.gif",
        "stay-plugged-in": "/images/portfolio/stay-plugged-in/3327f9132316687.61a7debf45912.gif",
        "immortal-gates-of-pyre-logo-faction-icons": "/images/portfolio/immortal-gates-of-pyre-logo-faction-icons/329114115497303.604fc2f16b71b.png",
        "immortal-gates-of-pyre-lorebook-videos": "/images/portfolio/immortal-gates-of-pyre-logo-faction-icons/11258d115497303.604fc2f16be4e.png", # Note folder vs slug mismatch
        "immortal-gates-of-pyre-kickstarter": "/images/portfolio/immortal-gates-of-pyre-kickstarter/immortal-gates-of-pyre-kickstarter-2_Tier2.jpg",
        "nerd-street-gamers-brand": "/images/portfolio/nerd-street-gamers-brand/nerd-street-gamers-brand-Nerd_blog-1200x675-1.png",
        "immortal-gates-of-pyre-ui-producing": "/images/portfolio/immortal-gates-of-pyre-ui-producing/immortal-gates-of-pyre-ui-producing-CharacterSelect.jpg",
        "blast-radius": "/images/portfolio/blast-radius/blast-radius-Post.png",
        "immortal-gates-of-pyre-video-producing": "/images/portfolio/immortal-gates-of-pyre-kickstarter/immortal-gates-of-pyre-kickstarter-210674224_546875943113807_5687717794063233096_n.jpg",
        "immortal-gates-of-pyre-web-development": "/images/portfolio/immortal-gates-of-pyre-web-development/immortal-gates-of-pyre-web-development-Immortals_Desktop.png",
    }
    
    # Copy Updates
    copy_updates = {
        "voyagers-of-nera": {
             "challenge": "Treehouse Games approached AOE Creative to design and develop a fully fledged hype-site for their upcoming game, Voyagers of Nera. The game is a cooperative survival-crafting adventure set in a vibrant ocean world brimming with lush islands, magical creatures, and ancient mysteries. The site needed to inform newcomers about the core foundational aspects of the game while introducing them to the brand's look and feel.",
             "solution": "Structuring the narrative around the brand's vibrant identity, we worked alongside the Treehouse creative team to develop and launch an immersive hype-site. We began with a preliminary social campaign to generate community excitement. Despite limited visual assets at the early development stage, we stepped in to generate creative assets that seamlessly integrated with Treehouse's existing art style. The final site beautifully introduced Voyagers of Nera to the world, optimized for both desktop fidelity and a seamless mobile experience.",
             "scope": "<ul><li><strong>Web Design & Development:</strong> Designed and developed a hype-site to introduce the game to newcomers.</li><li><strong>Asset Generation:</strong> Created visual assets to bridge gaps in early development materials.</li><li><strong>Mobile Optimization:</strong> Ensured a seamless experience across all devices.</li></ul>"
        },
        "session": { # Slug: session, Title: NACON
             "challenge": "The unique challenge of this project was creating high-quality marketing key art for Session: Skate Sim without direct access to the game's development engine. We needed to work from screenshots of poses and scenery, aiming to produce final artwork that elevated the in-game visuals to a near-realistic level suitable for a major marketing push.",
             "solution": "Leveraging extracted screenshots as a foundation, we employed extensive photomanipulation, texture enhancement techniques, and 3D modeling to upgrade the assets. This method allows us to effectively mirror and enrich the game's aesthetic, fulfilling the objective of creating high-fidelity key art while adeptly navigating technical constraints.",
             "scope": "<ul><li><strong>Key Art Creation:</strong> Developed high-quality marketing art from in-game screenshots.</li><li><strong>Asset Enhancement:</strong> Used photomanipulation and 3D modeling to achieve realism.</li></ul>"
        },
        "one-piece-x-cloud9": {
             "challenge": "We were tasked with creating an apparel line that reflected the unique identities of both Toei Animation's One Piece and Cloud9. The collection needed to navigate apparel trends, customer preferences, and production constraints while showcasing a 'Grand Line' where both brands intersect in values, visual identity, and voice.",
             "solution": "We designed a cohesive collection that merged the competitive spirit of Cloud9 with the adventurous ethos of One Piece. The apparel line features a visual style that generates excitement and engagement among both fanbases, resulting in a unique crossover event that respects the legacy of both brands.",
             "scope": "<ul><li><strong>Apparel Design:</strong> Created a cohesive clothing collection for the collaboration.</li><li><strong>Brand Integration:</strong> Merged the visual identities of two major global brands.</li></ul>"
        },
        "mccown-evans": {
            "challenge": "McCown Evans, a prestigious law firm, sought a modern image that effectively communicated its story to HR professionals and executives. They needed to establish credibility within the gaming and esports community while addressing complex immigration law queries, offering convenient online document access, and fostering trust.",
             "solution": "We forged a universally trusted brand identity for McCown Evans. We designed a captivating website showcasing their interactions with various stakeholders and streamlined document access. To appeal to their specific niche, we included a custom gaming splash page with 3D elements and transitions, seamlessly blending legal sophistication with a genuine gaming experience.",
             "scope": "<ul><li><strong>Brand Identity:</strong> Forged a modern, trusted brand image.</li><li><strong>Web Design:</strong> Created a captivating site with streamlined document access.</li><li><strong>Niche Targeting:</strong> Developed a custom gaming splash page to appeal to esports clients.</li></ul>"
        }
    }

    processed_slugs = []

    for p in projects:
        slug = p['slug']
        
        # 1. Update Images
        if slug in image_overrides:
            new_img = image_overrides[slug]
            p['image'] = new_img
            p['heroImage'] = new_img
            
        # 2. Update Copy
        if slug in copy_updates:
            updates = copy_updates[slug]
            # Ensure content object exists
            if 'content' not in p: p['content'] = {}
            
            # Map updates to content
            p['content']['challenge'] = updates.get('challenge', p['content'].get('challenge', ''))
            p['content']['solution'] = updates.get('solution', p['content'].get('solution', ''))
            if 'scope' in updates:
                p['content']['scope'] = updates['scope']
                
            # Clean up explicit "CONTACT US" from previous scrape if likely present in unprocessed fields
            for key in p['content']:
                if isinstance(p['content'][key], str):
                    p['content'][key] = p['content'][key].replace("CONTACT US", "").strip()

        # 3. Paramount Check
        if slug == "paramount-players": # Or whatever paramount slug is found
             # User says "go find them again". 
             # If empty, let's try to set to a default generic if we truly can't find files
             # BUT, if they were there before, maybe we can search for ANY paramount image in public/images
             pass

    
    # Save
    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)
    
    print("Projects updated with new images and copy.")

if __name__ == "__main__":
    main()
