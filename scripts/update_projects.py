
import json
import os

file_path = '/Users/nabilpervez/Documents/nabilpervez/web/app/data/projects.json'

with open(file_path, 'r') as f:
    projects = json.load(f)

# Extract Fancurve and Alloy
fancurve = next((p for p in projects if p['id'] == 'fancurve'), None)
alloy = next((p for p in projects if p['id'] == 'alloy'), None)

if not fancurve or not alloy:
    print("Could not find Fancurve or Alloy projects")
    exit(1)

# Update Alloy Content
alloy['content']['scope'] = '<ul><li><strong>Brand Overview:</strong> Name: Alloy. Tagline: "All of you."</li><li><strong>Concept:</strong> A unified digital identity platform designed to aggregate and showcase a user\'s multifaceted online presence in a single, cohesive interface.</li><li><strong>Deliverables:</strong> Brand Identity, UI/UX Design, Interaction Design, Motion Principles.</li></ul>'
alloy['content']['challenge'] = 'Context: We live in an era of fragmentation. Our digital identities are scattered across dozens of platforms—Instagram for photos, Twitter for thoughts, LinkedIn for career, Spotify for taste.\n\nThe Problem: There is no single place that captures the full spectrum of a person. Current "link-in-bio" tools are utilitarian and static, lacking the emotional resonance and dynamic nature of a true social profile. Users struggle to present "all of them" without sending followers to five different tabs.'
alloy['content']['solution'] = 'Unified Stream: Alloy connects to your existing platforms and aggregates your content into a beautiful, single-scroll feed. It pulls your latest tweets, photos, and song loops into one timeline.\n\nDynamic Identity: Instead of a static list of links, Alloy creates a living, breathing profile that updates in real-time as you post elsewhere. It is the "alloy" of your digital self—a mixture of elements creating a stronger whole.\n\nDesign System: The logo is constructed using geometric precision, symbolizing the merging of different paths or streams into a central loop. The palette is high-contrast and digital-native, designed to make content pop while maintaining a premium feel.'
alloy['content']['outcome'] = 'Interface Design: The interface uses a "Glassmorphism" inspired aesthetic with deep dark modes and subtle transparencies. Content cards float on top of the black background, giving the feed a sense of depth.\n\nInteraction: Motion principles are fluid, snappy, and continuous. As the user scrolls, the header elements smoothly collapse, and content cards enter the viewport with a subtle upward fade, creating a smooth, cascading effect.'

# Update Fancurve Content
fancurve['content']['scope'] = '<ul><li><strong>Overview:</strong> Fancurve is a digital platform focused on photo-realistic 3D jerseys and digital wearable collectibles. The platform allows users to collect, wear, and trade branded digital sports gear.</li><li><strong>Key Features:</strong> 3D Rendering Engine, Marketplace, Metaverse Utility.</li></ul>'
fancurve['content']['challenge'] = 'Headline: "Photo-realistic 3D Jerseys"\n\nIntroducing a new level of fidelity for digital fashion. Our custom 3D rendering engine builds every stitch to create the most premium digital wearables. Bringing traditional sports fans into the Web3 ecosystem requires removing friction and demonstrating tangible value beyond speculation.'
fancurve['content']['solution'] = 'We designed the "Drop" shop interface and "Locker" profile to facilitate collecting and trading. The interface utilizes a dark mode aesthetic (black/dark grey backgrounds) to make the vibrant colors of the 3D jerseys pop. The typography is clean and modern, prioritizing readability.\n\nOnboarding: We created a seamless flow to explain the concept of digital wearables, their utility in the Metaverse, and the ability to buy, sell, and trade in the marketplace.'
fancurve['content']['outcome'] = 'Technical & Trust Signals: Each item is verified on the Blockchain and minted as a unique NFT, ensuring authenticity and ownership. The user journey flows from high-impact visual discovery to personal ownership, underpinned by clear calls to action and value statements regarding digital ownership and metaverse utility.'

# Remove from current positions
projects = [p for p in projects if p['id'] not in ['fancurve', 'alloy']]

# Find index of last "immortal-gates-of-pyre" project
last_immortal_index = -1
for i, p in enumerate(projects):
    if 'immortal-gates-of-pyre' in p['slug']:
        last_immortal_index = i

# Insert after the last Immortal project (or at end if none found, though we saw them)
insert_index = last_immortal_index + 1
projects.insert(insert_index, fancurve)
projects.insert(insert_index + 1, alloy)

# Write back
with open(file_path, 'w') as f:
    json.dump(projects, f, indent=2)

print("Successfully updated and reordered projects.")
