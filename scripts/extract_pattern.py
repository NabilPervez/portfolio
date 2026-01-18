import os
import numpy as np
from PIL import Image

def extract_patterns(image_path, left_width=150, right_padding=150):
    try:
        img = Image.open(image_path)
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    # Convert to RGB to ensure consistency
    img_rgb = img.convert('RGB')
    width, height = img.size
    print(f"Image Size: {width}x{height}")

    # 1. Crop Sidebars (use 0-based indexing)
    # Left Sidebar
    left_sidebar = img.crop((0, 0, left_width, height))
    left_sidebar.save("sidebar-full-left.png")
    print("Saved sidebar-full-left.png")

    # Right Sidebar
    # The right sidebar starts at width - right_padding
    right_sidebar = img.crop((width - right_padding, 0, width, height))
    right_sidebar.save("sidebar-full-right.png")
    print("Saved sidebar-full-right.png")

    # 2. Identify repeating segment (Period Detection)
    # We'll use the left sidebar for analysis as the pattern is likely the same or mirrored.
    # Convert to numpy array for calculation
    arr = np.array(left_sidebar.convert('L')) # Grayscale for analysis
    
    # We look for vertical periodicity.
    # Take a central vertical strip from the sidebar to avoid edge artifacts if any
    # Actually, using the whole width is fine.
    
    # Simple autocorrelation-like approach:
    # We compare the image with a shifted version of itself.
    # We look for a shift 'dy' where the difference is minimized.
    
    min_period = 20 # Assume pattern isn't tinier than 20px
    max_period = height // 2 # Period can't be larger than half the image
    
    best_period = -1
    min_diff = float('inf')
    
    # We verify potential periods.
    # To save time, we can check a central patch.
    # Let's verify 'dy' shifts.
    
    # Heuristic: the pattern looks geometric.
    # Let's compute the difference for shifts.
    
    scores = []
    
    # Optimize: check shifts in a reasonable range. 
    # If we assume the lattice is roughly 50-150px high.
    
    # We use a slice of the original array as reference
    # Reference slice: rows 0 to (height - max_period)
    # Compared slice: rows dy to (height - max_period + dy)
    
    # Actually simpler: take the first N rows, see where they repeat.
    # Template: rows 10 to 110 (100px height)
    template_h = 100
    if height < 200:
        print("Image too short for reliable auto-detection, using full height")
        best_period = height
    else:
        template = arr[0:template_h, :] # Top 100px
        
        # Search for this template starting from y = min_period
        # We start checking from y=20.
        
        for dy in range(min_period, max_period):
            if dy + template_h > height:
                break
            
            target = arr[dy : dy + template_h, :]
            
            # Mean Squared Error
            diff = np.mean((template - target) ** 2)
            scores.append((dy, diff))
            
        # Find the dy with the minimum difference
        scores.sort(key=lambda x: x[1])
        
        # We might get a "local minimum" that isn't the true period if the pattern has sub-symmetries.
        # But for extracting a seamless tile, the smallest dy with low error is usually the period.
        
        best_match = scores[0]
        best_period = best_match[0]
        best_score = best_match[1]
        
        print(f"Detected period: {best_period} pixels (Score: {best_score:.2f})")

    # 3. Create Seamless Tiles
    # Left Tile
    left_tile = left_sidebar.crop((0, 0, left_width, best_period))
    left_tile.save("sidebar-pattern-left.png")
    print(f"Saved sidebar-pattern-left.png (Height: {best_period}px)")

    # Right Tile
    # Assuming same period
    right_tile = right_sidebar.crop((0, 0, right_padding, best_period))
    right_tile.save("sidebar-pattern-right.png")
    print(f"Saved sidebar-pattern-right.png (Height: {best_period}px)")

    # 4. Create Transparent Versions (Optional Polish)
    def make_transparent(pil_img, bg_color=None, tolerance=30):
        img = pil_img.convert("RGBA")
        datas = img.getdata()
        
        if bg_color is None:
            # Pick top-left pixel as background color if not provided
            bg_color = datas[0][:3]
            
        newData = []
        for item in datas:
            # Euclidean distance for color matching
            dist = sum([(a - b) ** 2 for a, b in zip(item[:3], bg_color)]) ** 0.5
            if dist < tolerance:
                newData.append((255, 255, 255, 0)) # Transparent
            else:
                newData.append(item)
        
        img.putdata(newData)
        return img

    try:
        left_transparent = make_transparent(left_tile)
        left_transparent.save("sidebar-pattern-left-transparent.png")
        print("Saved sidebar-pattern-left-transparent.png")
        
        right_transparent = make_transparent(right_tile)
        right_transparent.save("sidebar-pattern-right-transparent.png")
        print("Saved sidebar-pattern-right-transparent.png")
    except Exception as e:
        print(f"Could not create transparent version: {e}")


if __name__ == "__main__":
    img_path = "/Users/nabilpervez/.gemini/antigravity/brain/00fa5e9f-f77d-4964-87e8-f84374575a4d/uploaded_image_1768702315744.png"
    extract_patterns(img_path)
