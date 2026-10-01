import os
import math
from PIL import Image, ImageDraw, ImageFont

FONT_TITLE = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 36, index=0)
FONT_HEADING = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 26, index=0)
FONT_SUB = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 18, index=0)
FONT_BODY = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 15, index=0)
FONT_MONO = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 14, index=0)
FONT_SMALL = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 13, index=0)

W, H = 1200, 675
OUT_DIR = "src/assets/images/projects"
os.makedirs(OUT_DIR, exist_ok=True)

def draw_window_frame(draw, title, domain="https://app.preview"):
    # Window Header
    draw.rounded_rectangle([0, 0, W, H], radius=16, fill=(15, 17, 26))
    draw.rectangle([0, 0, W, 48], fill=(22, 25, 38))
    draw.line([0, 48, W, 48], fill=(38, 42, 60), width=1)
    
    # macOS window dots
    draw.ellipse([20, 18, 32, 30], fill=(239, 68, 68))
    draw.ellipse([40, 18, 52, 30], fill=(234, 179, 8))
    draw.ellipse([60, 18, 72, 30], fill=(34, 197, 94))
    
    # URL bar
    draw.rounded_rectangle([250, 10, W - 250, 38], radius=8, fill=(13, 15, 23), outline=(45, 50, 75))
    draw.text((270, 15), domain, font=FONT_MONO, fill=(140, 150, 180))
    draw.text((W - 350, 15), title, font=FONT_SMALL, fill=(100, 115, 145))

def create_healthhub():
    img = Image.new("RGBA", (W, H), (10, 14, 26, 255))
    draw = ImageDraw.Draw(img)
    draw_window_frame(draw, "HealthHub Hospital & Emergency System", "https://healthhub.emergency.system")
    
    # Sidebar
    draw.rectangle([0, 48, 220, H], fill=(13, 17, 30))
    draw.line([220, 48, 220, H], fill=(30, 36, 60), width=1)
    
    # Logo
    draw.rounded_rectangle([24, 70, 60, 106], radius=8, fill=(59, 130, 246))
    draw.rectangle([39, 78, 45, 98], fill=(255, 255, 255))
    draw.rectangle([30, 85, 54, 91], fill=(255, 255, 255))
    draw.text((70, 76), "HealthHub", font=FONT_HEADING, fill=(255, 255, 255))
    draw.text((70, 104), "Emergency V2.4", font=FONT_SMALL, fill=(148, 163, 184))
    
    # Nav items
    navs = ["Live Dispatch", "Hospital Discovery", "Ambulance Radar", "OPD Queue Manager", "Blood Bank Reserve", "Sanctum Auth"]
    for i, item in enumerate(navs):
        y = 150 + i * 46
        bg_col = (37, 99, 235, 60) if i == 0 else (0, 0, 0, 0)
        draw.rounded_rectangle([16, y, 204, y + 36], radius=6, fill=bg_col)
        text_col = (255, 255, 255) if i == 0 else (148, 163, 184)
        draw.text((36, y + 8), item, font=FONT_BODY, fill=text_col)
    
    # Top stats row
    stats = [
        ("AVAILABLE ICU BEDS", "42 / 60", "+8% from yesterday", (16, 185, 129)),
        ("ACTIVE AMBULANCES", "14 ON DUTY", "GPS Reverb Live", (59, 130, 246)),
        ("BLOOD BANK UNITS", "1,280 Units", "O- Critical Reserve", (239, 68, 68)),
        ("OPD ACTIVE QUEUE", "18 In Transit", "Avg wait 12 mins", (168, 85, 247)),
    ]
    card_w = (W - 250 - 3 * 20) // 4
    for i, (title, val, sub, col) in enumerate(stats):
        x = 240 + i * (card_w + 20)
        draw.rounded_rectangle([x, 70, x + card_w, 170], radius=12, fill=(18, 24, 42), outline=(35, 45, 75))
        draw.text((x + 16, 85), title, font=FONT_SMALL, fill=(148, 163, 184))
        draw.text((x + 16, 110), val, font=FONT_HEADING, fill=(255, 255, 255))
        draw.text((x + 16, 142), sub, font=FONT_SMALL, fill=col)
    
    # Main Map & Dispatch area
    map_x = 240
    map_y = 195
    map_w = 580
    map_h = 440
    draw.rounded_rectangle([map_x, map_y, map_x + map_w, map_y + map_h], radius=14, fill=(15, 22, 38), outline=(38, 52, 85))
    draw.text((map_x + 20, map_y + 18), "Live Mapbox Emergency Radar (Nepal Grid)", font=FONT_SUB, fill=(255, 255, 255))
    draw.text((map_x + map_w - 110, map_y + 20), "● REALTIME", font=FONT_MONO, fill=(34, 197, 94))
    
    # Map mock grid
    for gx in range(map_x + 20, map_x + map_w - 20, 50):
        draw.line([gx, map_y + 50, gx, map_y + map_h - 20], fill=(24, 34, 58), width=1)
    for gy in range(map_y + 50, map_y + map_h - 20, 50):
        draw.line([map_x + 20, gy, map_x + map_w - 20, gy], fill=(24, 34, 58), width=1)
        
    # Ambulance & Hospital nodes on map
    nodes = [(map_x + 140, map_y + 160, "Grand Hospital", (59, 130, 246)),
             (map_x + 360, map_y + 120, "Bir Hospital", (16, 185, 129)),
             (map_x + 280, map_y + 300, "Teaching Hospital", (168, 85, 247)),
             (map_x + 440, map_y + 260, "Civil Hospital", (239, 68, 68))]
    for nx, ny, label, ncol in nodes:
        draw.ellipse([nx - 14, ny - 14, nx + 14, ny + 14], fill=(ncol[0], ncol[1], ncol[2], 80), outline=ncol, width=2)
        draw.ellipse([nx - 5, ny - 5, nx + 5, ny + 5], fill=(255, 255, 255))
        draw.text((nx + 18, ny - 8), label, font=FONT_SMALL, fill=(240, 245, 255))
        
    # Right column: Live Queue feed
    feed_x = map_x + map_w + 20
    feed_w = W - feed_x - 30
    draw.rounded_rectangle([feed_x, map_y, feed_x + feed_w, map_y + map_h], radius=14, fill=(18, 24, 42), outline=(38, 52, 85))
    draw.text((feed_x + 20, map_y + 18), "Live Patient Admittance", font=FONT_SUB, fill=(255, 255, 255))
    
    patients = [
        ("Ambulance #04 (Trauma)", "En Route - 4 mins", "CRITICAL", (239, 68, 68)),
        ("OPD Priority Queue #102", "Room 4 - Dr. Sharma", "CALLED", (34, 197, 94)),
        ("Blood Request O+", "Red Cross Cross-match", "PREPARING", (234, 179, 8)),
        ("Bed Allotment ICU-07", "Confirmed via Sanctum", "READY", (59, 130, 246)),
        ("Ambulance #12 (Cardiac)", "Arrival Bir Hospital", "ARRIVED", (16, 185, 129)),
    ]
    for i, (name, detail, tag, tcol) in enumerate(patients):
        py = map_y + 60 + i * 72
        draw.rounded_rectangle([feed_x + 16, py, feed_x + feed_w - 16, py + 62], radius=8, fill=(14, 19, 34), outline=(30, 40, 70))
        draw.text((feed_x + 28, py + 12), name, font=FONT_BODY, fill=(255, 255, 255))
        draw.text((feed_x + 28, py + 34), detail, font=FONT_SMALL, fill=(148, 163, 184))
        draw.rounded_rectangle([feed_x + feed_w - 110, py + 18, feed_x + feed_w - 28, py + 42], radius=6, fill=tcol)
        draw.text((feed_x + feed_w - 100, py + 23), tag, font=FONT_SMALL, fill=(255, 255, 255))

    img.save(os.path.join(OUT_DIR, "healthhub.png"))

def create_urbanstyle():
    img = Image.new("RGBA", (W, H), (14, 15, 20, 255))
    draw = ImageDraw.Draw(img)
    draw_window_frame(draw, "UrbanStyle - Contemporary Minimalist Apparel", "https://urban-style-tau.vercel.app")
    
    # Store Header
    draw.rectangle([0, 48, W, 110], fill=(18, 19, 27))
    draw.line([0, 110, W, 110], fill=(35, 38, 52), width=1)
    draw.text((40, 68), "URBANSTYLE", font=FONT_TITLE, fill=(255, 255, 255))
    
    # Nav links
    navs = ["COLLECTIONS", "MEN", "WOMEN", "OUTERWEAR", "ARCHIVE", "ADMIN PORTAL"]
    for i, item in enumerate(navs):
        draw.text((320 + i * 115, 75), item, font=FONT_SMALL, fill=(200, 210, 230))
    
    # Cart badge
    draw.rounded_rectangle([W - 160, 64, W - 40, 98], radius=8, fill=(244, 63, 94))
    draw.text((W - 138, 73), "BAG (3)", font=FONT_BODY, fill=(255, 255, 255))
    
    # Hero Promo Banner
    draw.rounded_rectangle([40, 130, W - 40, 270], radius=16, fill=(26, 29, 44), outline=(48, 54, 80))
    draw.text((70, 155), "AUTUMN / WINTER 2026", font=FONT_MONO, fill=(244, 63, 94))
    draw.text((70, 185), "Structured Tailoring & Minimal Outerwear", font=FONT_TITLE, fill=(255, 255, 255))
    draw.text((70, 230), "Engineered with water-resistant gabardine and Japanese ripstop textiles.", font=FONT_BODY, fill=(160, 175, 200))
    draw.rounded_rectangle([W - 240, 175, W - 80, 225], radius=10, fill=(255, 255, 255))
    draw.text((W - 215, 190), "EXPLORE DROP", font=FONT_BODY, fill=(15, 17, 26))
    
    # Product grid
    products = [
        ("Oversized Wool Trench", "$280.00", "Tailored Cut", (30, 35, 50)),
        ("Technical Utility Jacket", "$195.00", "Waterproof 20k", (35, 42, 58)),
        ("Relaxed Pleated Trousers", "$145.00", "Italian Cotton", (25, 30, 45)),
        ("Chunky Vibram Derby", "$230.00", "Full-grain calfskin", (32, 38, 52)),
    ]
    pw = (W - 80 - 3 * 24) // 4
    for i, (name, price, tag, col) in enumerate(products):
        px = 40 + i * (pw + 24)
        py = 295
        draw.rounded_rectangle([px, py, px + pw, py + 330], radius=12, fill=(20, 22, 32), outline=(42, 46, 68))
        # Product image card placeholder
        draw.rounded_rectangle([px + 12, py + 12, px + pw - 12, py + 220], radius=8, fill=col)
        # Tag badge
        draw.rounded_rectangle([px + 20, py + 20, px + 125, py + 42], radius=4, fill=(15, 17, 26, 200))
        draw.text((px + 26, py + 25), tag, font=FONT_SMALL, fill=(244, 63, 94))
        # Price and name
        draw.text((px + 16, py + 240), name, font=FONT_BODY, fill=(255, 255, 255))
        draw.text((px + 16, py + 268), price, font=FONT_HEADING, fill=(255, 255, 255))
        # Add to cart button
        draw.rounded_rectangle([px + 16, py + 295, px + pw - 16, py + 325], radius=6, fill=(35, 40, 60))
        draw.text((px + pw//2 - 35, py + 302), "+ QUICK ADD", font=FONT_SMALL, fill=(200, 220, 255))

    img.save(os.path.join(OUT_DIR, "urbanstyle.png"))

def create_complaint():
    img = Image.new("RGBA", (W, H), (12, 16, 24, 255))
    draw = ImageDraw.Draw(img)
    draw_window_frame(draw, "Django Complaint Management & Audit System", "https://github.com/abishek056/complaint-management-system")
    
    # Top navbar
    draw.rectangle([0, 48, W, 105], fill=(16, 22, 34))
    draw.line([0, 105, W, 105], fill=(32, 42, 65), width=1)
    draw.text((36, 65), "RESOLVE // DJANGO 6.0", font=FONT_HEADING, fill=(255, 255, 255))
    
    # Role switch badge
    draw.rounded_rectangle([W - 280, 62, W - 36, 95], radius=8, fill=(30, 41, 59), outline=(51, 65, 85))
    draw.text((W - 265, 70), "ROLE: ADMIN / AUDITOR", font=FONT_MONO, fill=(56, 189, 248))
    
    # Stats overview cards
    stats = [
        ("TOTAL INCIDENTS", "1,420", "Active across 12 depts", (148, 163, 184)),
        ("RESOLUTION RATE", "94.2%", "+3.8% response efficiency", (34, 197, 94)),
        ("AVG RESOLUTION TIME", "18h 40m", "Target: < 24h SLA", (56, 189, 248)),
        ("CRITICAL ESCALATIONS", "3 PENDING", "Immediate review required", (244, 63, 94)),
    ]
    sw = (W - 72 - 3 * 20) // 4
    for i, (title, val, desc, col) in enumerate(stats):
        sx = 36 + i * (sw + 20)
        draw.rounded_rectangle([sx, 125, sx + sw, 220], radius=10, fill=(18, 25, 38), outline=(35, 48, 75))
        draw.text((sx + 16, 140), title, font=FONT_SMALL, fill=(148, 163, 184))
        draw.text((sx + 16, 162), val, font=FONT_HEADING, fill=(255, 255, 255))
        draw.text((sx + 16, 194), desc, font=FONT_SMALL, fill=col)
        
    # Table header
    draw.rounded_rectangle([36, 245, W - 36, H - 30], radius=12, fill=(16, 22, 34), outline=(32, 44, 70))
    draw.rectangle([36, 245, W - 36, 290], fill=(22, 30, 48))
    draw.text((56, 260), "TICKET ID", font=FONT_MONO, fill=(148, 163, 184))
    draw.text((180, 260), "COMPLAINANT / DEPT", font=FONT_MONO, fill=(148, 163, 184))
    draw.text((450, 260), "SUBJECT & TIMELINE", font=FONT_MONO, fill=(148, 163, 184))
    draw.text((820, 260), "SEVERITY", font=FONT_MONO, fill=(148, 163, 184))
    draw.text((960, 260), "STATUS / ACTION", font=FONT_MONO, fill=(148, 163, 184))
    
    # Table rows
    rows = [
        ("TK-8942", "Finance & Payroll", "Unsynchronized database billing records", "HIGH", "IN PROGRESS", (244, 63, 94), (234, 179, 8)),
        ("TK-8941", "IT Infrastructure", "Core gateway timeout on API server 2", "CRITICAL", "INVESTIGATING", (239, 68, 68), (56, 189, 248)),
        ("TK-8939", "Staff Management", "Role authorization permissions missing", "MEDIUM", "RESOLVED", (234, 179, 8), (34, 197, 94)),
        ("TK-8936", "Academic Affairs", "Student grade validation duplicate keys", "LOW", "RESOLVED", (100, 116, 139), (34, 197, 94)),
        ("TK-8932", "Logistics & Fleet", "Automated email notifications delayed", "MEDIUM", "CLOSED", (234, 179, 8), (148, 163, 184)),
    ]
    for i, (tid, dept, subject, sev, status, scol, stcol) in enumerate(rows):
        ry = 300 + i * 64
        draw.line([36, ry, W - 36, ry], fill=(26, 36, 56), width=1)
        draw.text((56, ry + 18), tid, font=FONT_MONO, fill=(56, 189, 248))
        draw.text((180, ry + 18), dept, font=FONT_BODY, fill=(255, 255, 255))
        draw.text((450, ry + 18), subject, font=FONT_BODY, fill=(200, 215, 235))
        # Severity chip
        draw.rounded_rectangle([820, ry + 12, 910, ry + 36], radius=4, fill=(scol[0], scol[1], scol[2], 50), outline=scol)
        draw.text((830, ry + 16), sev, font=FONT_SMALL, fill=scol)
        # Status chip
        draw.rounded_rectangle([960, ry + 12, 1110, ry + 36], radius=4, fill=(stcol[0], stcol[1], stcol[2], 50), outline=stcol)
        draw.text((975, ry + 16), status, font=FONT_SMALL, fill=stcol)

    img.save(os.path.join(OUT_DIR, "complaint.png"))

def create_portfolio():
    img = Image.new("RGBA", (W, H), (8, 9, 15, 255))
    draw = ImageDraw.Draw(img)
    draw_window_frame(draw, "Abishek Adhikari - 3D Interactive Portfolio", "https://portfolio-abishek056s-projects.vercel.app")
    
    # 3D Cyber wireframe backdrop
    cx, cy = 820, 360
    r = 180
    for angle in range(0, 360, 20):
        rad = math.radians(angle)
        x2 = cx + int(r * math.cos(rad))
        y2 = cy + int(r * math.sin(rad))
        draw.line([cx, cy, x2, y2], fill=(99, 102, 241, 70), width=1)
    for rad_step in range(40, r + 1, 35):
        draw.ellipse([cx - rad_step, cy - rad_step, cx + rad_step, cy + rad_step], outline=(147, 51, 234, 100), width=1)
        
    # Floating 3D polygon nodes
    nodes = [(cx - 100, cy - 80), (cx + 120, cy - 100), (cx + 90, cy + 110), (cx - 120, cy + 90), (cx, cy)]
    for nx, ny in nodes:
        draw.ellipse([nx - 8, ny - 8, nx + 8, ny + 8], fill=(6, 182, 212), outline=(255, 255, 255), width=2)
    
    # Left Hero Text
    draw.rounded_rectangle([80, 110, 320, 142], radius=16, fill=(30, 27, 75), outline=(99, 102, 241))
    draw.text((96, 118), "● FULL-STACK & 3D INTERACTIVE", font=FONT_MONO, fill=(129, 140, 248))
    
    draw.text((80, 165), "Creative Developer", font=FONT_TITLE, fill=(255, 255, 255))
    draw.text((80, 215), "Engineering high-performance web systems\nwith Three.js, React 19, and scalable backends.", font=FONT_HEADING, fill=(165, 180, 252))
    
    # Tech pills
    pills = ["React 19", "Three.js", "Laravel 13", "TypeScript", "Tailwind CSS", "GLSL Shaders"]
    for i, p in enumerate(pills):
        col = i % 3
        row = i // 3
        px = 80 + col * 160
        py = 340 + row * 48
        draw.rounded_rectangle([px, py, px + 145, py + 36], radius=8, fill=(17, 24, 39), outline=(55, 65, 81))
        draw.text((px + 16, py + 8), p, font=FONT_BODY, fill=(229, 231, 235))
        
    # Project Showcase card in preview
    draw.rounded_rectangle([80, 470, 560, 610], radius=14, fill=(17, 24, 39, 230), outline=(99, 102, 241, 150))
    draw.text((105, 495), "FEATURED WORK // 3D CANVAS & SHADERS", font=FONT_MONO, fill=(6, 182, 212))
    draw.text((105, 525), "Smooth OrbitControls, Reactive Lighting & Micro-Interactions", font=FONT_SUB, fill=(255, 255, 255))
    draw.text((105, 565), "Live deployment on Vercel with 99+ Lighthouse performance.", font=FONT_SMALL, fill=(156, 163, 175))

    img.save(os.path.join(OUT_DIR, "portfolio.png"))

def create_dreamcafe():
    img = Image.new("RGBA", (W, H), (18, 14, 12, 255))
    draw = ImageDraw.Draw(img)
    draw_window_frame(draw, "Dream-Cafe - Modern Artisan Roastery & Coffee Bar", "https://dream-cafe-one.vercel.app")
    
    # Warm Coffee Header
    draw.rectangle([0, 48, W, 110], fill=(28, 20, 16))
    draw.line([0, 110, W, 110], fill=(54, 40, 32), width=1)
    draw.text((40, 68), "DREAM CAFE", font=FONT_TITLE, fill=(245, 158, 11))
    
    navs = ["OUR BEANS", "ESPRESSO BAR", "FOOD MENU", "ROASTERY STORY", "RESERVE A TABLE"]
    for i, item in enumerate(navs):
        draw.text((310 + i * 130, 75), item, font=FONT_SMALL, fill=(230, 210, 195))
        
    # Coffee Hero banner
    draw.rounded_rectangle([40, 130, W - 40, 310], radius=16, fill=(35, 25, 20), outline=(65, 48, 38))
    draw.text((70, 160), "SINGLE-ORIGIN ETHIOPIAN YIRGACHEFFE", font=FONT_MONO, fill=(245, 158, 11))
    draw.text((70, 190), "Artisan Brewed. Roasted Daily in Small Batches.", font=FONT_TITLE, fill=(255, 255, 255))
    draw.text((70, 240), "Experience floral jasmine notes with vibrant bergamot acidity and peach finish.", font=FONT_BODY, fill=(210, 185, 165))
    draw.rounded_rectangle([70, 270, 220, 310], radius=8, fill=(245, 158, 11))
    draw.text((95, 280), "ORDER ONLINE", font=FONT_BODY, fill=(18, 14, 12))
    
    # Popular coffee items
    items = [
        ("Velvet Flat White", "$4.75", "Double shot ristretto with silky microfoam", (48, 35, 28)),
        ("Cold Drip Reserve", "$5.50", "12-hour slow iced drip with citrus peel", (42, 30, 24)),
        ("Affogato Al Caffe", "$6.00", "Madagascan vanilla gelato with hot espresso", (52, 38, 30)),
        ("Pour-Over V60", "$5.25", "Handcrafted pour over with honey notes", (45, 32, 26)),
    ]
    iw = (W - 80 - 3 * 24) // 4
    for i, (name, price, desc, col) in enumerate(items):
        ix = 40 + i * (iw + 24)
        iy = 335
        draw.rounded_rectangle([ix, iy, ix + iw, iy + 290], radius=12, fill=(26, 18, 14), outline=(50, 36, 28))
        draw.rounded_rectangle([ix + 12, iy + 12, ix + iw - 12, iy + 170], radius=8, fill=col)
        # Coffee icon / cup
        draw.ellipse([ix + iw//2 - 30, iy + 65, ix + iw//2 + 30, iy + 125], fill=(245, 158, 11, 200))
        draw.text((ix + 16, iy + 190), name, font=FONT_BODY, fill=(255, 255, 255))
        draw.text((ix + 16, iy + 215), price, font=FONT_HEADING, fill=(245, 158, 11))
        draw.text((ix + 16, iy + 250), desc, font=FONT_SMALL, fill=(180, 160, 145))

    img.save(os.path.join(OUT_DIR, "dreamcafe.png"))

create_healthhub()
create_urbanstyle()
create_complaint()
create_portfolio()
create_dreamcafe()
print("All 5 project mockups successfully generated in", OUT_DIR)
