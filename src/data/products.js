export const CATEGORIES = [
  { id: 'all', name: 'All Drops', icon: 'Sparkles', count: 44 },
  { id: 'computing', name: 'Laptops & Phones', icon: 'Laptop', count: 4 },
  { id: 'audio', name: 'Acoustics & Audio', icon: 'Headphones', count: 4 },
  { id: 'wearables', name: 'Cyber Wearables', icon: 'Watch', count: 4 },
  { id: 'gaming', name: 'Gaming & VR', icon: 'Gamepad2', count: 4 },
  { id: 'footwear', name: 'Sneakers & Kicks', icon: 'Footprints', count: 4 },
  { id: 'streetwear', name: 'Tech Streetwear', icon: 'Shirt', count: 4 },
  { id: 'living', name: 'Aesthetic Living', icon: 'Lamp', count: 4 },
  { id: 'beauty', name: 'Fragrance & Skincare', icon: 'Droplets', count: 3 },
  { id: 'kitchen', name: 'Coffee & Kitchen Tech', icon: 'Coffee', count: 3 },
  { id: 'fitness', name: 'Fitness & Wellness', icon: 'Dumbbell', count: 3 },
  { id: 'camera', name: 'Cameras & Drones', icon: 'Camera', count: 3 },
  { id: 'gear', name: 'Tactical EDC & Bags', icon: 'Briefcase', count: 4 }
];

export const PRODUCTS = [
  // ==================== 1. COMPUTING & PHONES ====================
  {
    id: 'lumina-blade-oled-laptop',
    name: 'Blade Pro 16" Liquid Titanium Laptop',
    tagline: '4K OLED 240Hz, Intel Core Ultra 9, RTX 4090 with Vapor Chamber',
    category: 'computing',
    price: 2499.00,
    originalPrice: 2899.00,
    rating: 4.9,
    reviewCount: 420,
    badge: 'FLAGSHIP BEAST',
    badgeType: 'brand',
    inStock: 5,
    featured: true,
    viewingCount: 94,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Space Black Anodized', hex: '#18181b', bg: '#09090b' },
      { name: 'Liquid Mercury Silver', hex: '#e4e4e7', bg: '#d4d4d8' }
    ],
    sizes: ['32GB RAM / 1TB SSD', '64GB RAM / 2TB SSD', '96GB Studio Beast'],
    description: 'The pinnacle of portable computation. CNC-milled unibody chassis containing revolutionary dual-phase vapor chambers, per-key RGB optical mechanical switches, and a color-calibrated 100% DCI-P3 OLED panel.',
    specs: {
      'Processor': 'Intel Core Ultra 9 185H (16-Core)',
      'Graphics': 'NVIDIA GeForce RTX 4090 16GB VRAM',
      'Display': '16.0" 4K OLED (3840x2400) 240Hz 0.2ms',
      'Battery': '99.9Wh (TSA Max Legal Carry-on)',
      'Weight': '1.98 kg ultra-thin magnesium alloy'
    },
    reviews: [
      { id: 'c1', author: 'Viktor Kane', rating: 5, date: '2 days ago', title: 'Renders 8K timeline smoothly', comment: 'Zero thermal throttling even on 3-hour Blender renders. The OLED black levels ruin all other monitors for you.' }
    ]
  },
  {
    id: 'cyber-matrix-phone-ultra',
    name: 'Matrix Fold 7 Cybernetic Smartphone',
    tagline: 'Dual Flexible AMOLED, Snapdragon 8 Gen 3 with Holographic Backplate',
    category: 'computing',
    price: 1399.00,
    originalPrice: 1599.00,
    rating: 4.8,
    reviewCount: 285,
    badge: 'NEW GEN',
    badgeType: 'new',
    inStock: 8,
    featured: true,
    viewingCount: 68,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cyber Mirror Chrome', hex: '#cbd5e1', bg: '#94a3b8' },
      { name: 'Dark Matter Black', hex: '#0f172a', bg: '#020617' },
      { name: 'Cyber Violet Neon', hex: '#8b5cf6', bg: '#7c3aed' }
    ],
    sizes: ['256GB / 12GB', '512GB / 16GB', '1TB Ultra Edition'],
    description: 'Transform from a 6.4" compact handheld into an 8.1" expansive mini-tablet with zero-crease titanium tear-drop hinges. Ceramic camera island with 200MP periscope zoom.',
    specs: {
      'Main Screen': '8.1" Dynamic AMOLED 2X 1-120Hz LTPO',
      'Camera': '200MP Main + 50MP Periscope 10x Optical',
      'Chipset': 'Qualcomm Snapdragon 8 Gen 3 for Galaxy',
      'Charging': '100W HyperCharge (0 to 100% in 22 mins)'
    },
    reviews: [
      { id: 'c2', author: 'Kira Sterling', rating: 5, date: '4 days ago', title: 'The hinge is mechanical art', comment: 'Completely flat fold, absolutely zero noticeable crease. Gaming on the big display is mindblowing.' }
    ]
  },
  {
    id: 'ultra-slate-creative-tablet',
    name: 'Aether Canvas Pro 13" Creative Tablet',
    tagline: 'Paper-Feel Matte Nano-Texture with 8192-Pressure Magnetic Stylus',
    category: 'computing',
    price: 899.00,
    originalPrice: 1049.00,
    rating: 4.9,
    reviewCount: 198,
    badge: 'CREATOR PICK',
    badgeType: 'brand',
    inStock: 9,
    featured: false,
    viewingCount: 38,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Graphite Grey', hex: '#374151', bg: '#1f2937' },
      { name: 'Moon White', hex: '#f8fafc', bg: '#e2e8f0' }
    ],
    sizes: ['256GB WiFi', '512GB 5G Cellular'],
    description: 'Designed exclusively for digital illustrators, 3D sculptors, and creative directors. Anti-glare etched glass provides real paper friction resistance without screen wear.',
    specs: {
      'Stylus': 'Zero-Lag 1.8ms Haptic Feedback Pen',
      'Display': '13.2" 3.2K Tandem OLED 1000 nits',
      'Color Gamut': '100% Adobe RGB, Delta E < 1'
    },
    reviews: [
      { id: 'c3', author: 'Chloe M.', rating: 5, date: '1 week ago', title: 'Replaced my Wacom Cintiq', comment: 'The tactile pen vibration feels exactly like graphite on heavy paper.' }
    ]
  },
  {
    id: 'cyber-ergonomic-mag-mouse',
    name: 'Apex Zero Carbon Ergonomic Wireless Mouse',
    tagline: 'Ultralight 38g Magnesium Honeycomb with 42,000 DPI Optical Sensor',
    category: 'computing',
    price: 149.00,
    originalPrice: 180.00,
    rating: 4.8,
    reviewCount: 312,
    badge: 'HOT',
    badgeType: 'hot',
    inStock: 14,
    featured: false,
    viewingCount: 45,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Stealth Carbon', hex: '#18181b', bg: '#09090b' },
      { name: 'Pure White Frost', hex: '#f1f5f9', bg: '#e2e8f0' }
    ],
    sizes: ['Medium Right-Hand', 'Large Ergonomic'],
    description: 'Cast from aerospace magnesium alloy weighing an ethereal 38 grams. 8,000Hz polling rate for instant 0.125ms click reaction speeds.',
    specs: {
      'Weight': '38 grams skeleton frame',
      'Sensor': 'PixArt PAW3950 42,000 DPI',
      'Switches': 'Optical 100M Click Lifespan',
      'Battery': '110 hours continuous gaming'
    },
    reviews: [
      { id: 'c4', author: 'Felix Dan', rating: 5, date: '5 days ago', title: 'Feels like holding air', comment: 'Wrist pain completely disappeared. The optical switches have zero debounce latency.' }
    ]
  },

  // ==================== 2. ACOUSTICS & AUDIO ====================
  {
    id: 'lumina-sonic-pro',
    name: 'LUMINA Sonic Pro ANC Headphones',
    tagline: 'Lossless Spatial Audio with Adaptive Noise Void',
    category: 'audio',
    price: 349.99,
    originalPrice: 429.99,
    rating: 4.9,
    reviewCount: 318,
    badge: 'BESTSELLER',
    badgeType: 'brand',
    inStock: 7,
    featured: true,
    viewingCount: 42,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#18181b', bg: '#000000' },
      { name: 'Cyber Titanium', hex: '#71717a', bg: '#52525b' },
      { name: 'Neon Cyber Blue', hex: '#0284c7', bg: '#0369a1' }
    ],
    sizes: ['Standard Over-Ear'],
    description: 'Engineered with 45mm beryllium drivers, active titanium noise cancellation, and 48-hour ultra-low latency playback. The ultimate acoustic immersion for audiophiles and digital creators.',
    specs: {
      'Driver Size': '45mm Custom Beryllium',
      'Battery Life': '48h ANC Active / 60h Normal',
      'Connectivity': 'Bluetooth 5.4 & 2.4GHz Ultra-Fast Dongle',
      'Weight': '265 grams'
    },
    reviews: [
      { id: 'r1', author: 'Elena Rostova', rating: 5, date: '2 days ago', title: 'The soundstage is unreal', comment: 'Sound isolation completely deletes coffee shop noise. The physical dial feels high-end machined aluminum.' }
    ]
  },
  {
    id: 'void-echo-earbuds',
    name: 'Void Echo True Wireless Earbuds',
    tagline: 'Transparent Case with Pure Graphene Diaphragm',
    category: 'audio',
    price: 179.00,
    originalPrice: 220.00,
    rating: 4.7,
    reviewCount: 189,
    badge: 'NEW',
    badgeType: 'new',
    inStock: 12,
    featured: false,
    viewingCount: 28,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ghost Frost (Clear)', hex: '#f1f5f9', bg: '#cbd5e1' },
      { name: 'Smoked Void', hex: '#1e293b', bg: '#0f172a' }
    ],
    sizes: ['One Size (3 Tip Pairs)'],
    description: 'Futuristic see-through acoustic architecture. Delivers punchy sub-bass, crystal treble, bone-conduction ENC mic clarity, and IPX7 sweatproofing.',
    specs: {
      'Water Resistance': 'IPX7 certified',
      'Playtime': '9h earbuds + 28h wireless case',
      'Microphones': '6 AI-enhanced ENC mics'
    },
    reviews: [
      { id: 'r4', author: 'Liam S.', rating: 4, date: '5 days ago', title: 'Clean design and punchy bass', comment: 'The transparent case is such a flex. Love the wireless charging speed.' }
    ]
  },
  {
    id: 'retro-bass-tube-speaker',
    name: 'Retro-Tube Cyberpunk Bluetooth Speaker',
    tagline: 'Warm Vacuum-Tube Preamplification with 100W Subwoofer',
    category: 'audio',
    price: 279.00,
    originalPrice: 329.00,
    rating: 4.9,
    reviewCount: 231,
    badge: 'SALE -15%',
    badgeType: 'sale',
    inStock: 6,
    featured: true,
    viewingCount: 45,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Industrial Brass & Walnut', hex: '#d97706', bg: '#b45309' },
      { name: 'Dark Gunmetal', hex: '#374151', bg: '#1f2937' }
    ],
    sizes: ['Standard Desktop'],
    description: 'Blends warm analog valve tube harmonics with DSP digital power. Real glowing vacuum tubes light up to your audio beat with thunderous dual bass radiators.',
    specs: {
      'Power Output': '100W Peak / 60W RMS',
      'Vacuum Tubes': 'Matched Dual 6J1 Pentode Valves',
      'Battery': '20 hours high-volume playback'
    },
    reviews: [
      { id: 'r9', author: 'Arthur Pendelton', rating: 5, date: '2 weeks ago', title: 'Analog warmth that fills the room', comment: 'The glowing vacuum tubes create the coziest nighttime vibe imaginable.' }
    ]
  },
  {
    id: 'studio-analog-headphone-amp',
    name: 'LUMINA Valve Hi-Fi Headphone Amplifier',
    tagline: 'Class-A Tube Architecture with ESS Sabre 32-Bit DAC',
    category: 'audio',
    price: 499.00,
    originalPrice: 599.00,
    rating: 5.0,
    reviewCount: 84,
    badge: 'FLAGSHIP',
    badgeType: 'brand',
    inStock: 4,
    featured: true,
    viewingCount: 39,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian & Amber Gold', hex: '#18181b', bg: '#000000' }
    ],
    sizes: ['Desktop Audio Flagship'],
    description: 'Handcrafted vacuum tube circuitry for rich musicality. Drives high-impedance headphones up to 600 Ohms with zero noise floor and breathtaking dynamics.',
    specs: {
      'DAC Chipset': 'Dual ESS Sabre ES9038Q2M',
      'Sample Rates': 'Up to 32-bit/768kHz PCM & Native DSD512',
      'Outputs': '4.4mm Balanced Pentaconn, XLR, 6.35mm'
    },
    reviews: [
      { id: 'r17', author: 'Soren Lind', rating: 5, date: '3 days ago', title: 'Pure emotional audio bliss', comment: 'Brought my planar magnetic headphones to life with warm liquid mids.' }
    ]
  },

  // ==================== 3. CYBER WEARABLES ====================
  {
    id: 'chronopulse-matrix-watch',
    name: 'ChronoPulse Cybernetic Smartwatch',
    tagline: 'Titanium Grade 5 Chassis with Micro-OLED Holographic Dial',
    category: 'wearables',
    price: 389.00,
    originalPrice: 479.00,
    rating: 4.8,
    reviewCount: 204,
    badge: 'HOT DROP',
    badgeType: 'hot',
    inStock: 4,
    featured: true,
    viewingCount: 61,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Carbon', hex: '#27272a', bg: '#18181b' },
      { name: 'Brushed Silver', hex: '#e4e4e7', bg: '#d4d4d8' },
      { name: 'Plasma Orange', hex: '#f97316', bg: '#ea580c' }
    ],
    sizes: ['42mm Compact', '46mm Pro'],
    description: 'A masterpiece of aerospace titanium and sapphire crystal. Features biometric ECG tracking, dual-band GPS, water resistance up to 100M, and 14 days of power.',
    specs: {
      'Display': '1.43" AMOLED 1000 nits',
      'Chassis': 'Grade 5 Aerospace Titanium',
      'Sensors': 'SpO2, ECG, Heart Rate, Stress, Barometer',
      'Water Rating': '10 ATM (100 meters)'
    },
    reviews: [
      { id: 'r3', author: 'Kai Tanaka', rating: 5, date: '3 days ago', title: 'Pure cyberpunk perfection', comment: 'The UI animations are buttery 120fps. Everyone asks me what watch this is.' }
    ]
  },
  {
    id: 'titanium-haptic-ring',
    name: 'LUMINA O-Ring Health & Haptic Tracker',
    tagline: 'Aerospace Grade Titanium with Medical Sleep & Recovery Sensors',
    category: 'wearables',
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.9,
    reviewCount: 174,
    badge: 'TRENDING',
    badgeType: 'hot',
    inStock: 8,
    featured: false,
    viewingCount: 56,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Brushed Titanium Silver', hex: '#e4e4e7', bg: '#a1a1aa' },
      { name: 'Stealth Matte Black', hex: '#18181b', bg: '#09090b' },
      { name: 'Rose Gold PVD', hex: '#fb7185', bg: '#f43f5e' }
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    description: 'The world’s lightest titanium biometric smart ring. Measures heart rate variability, circadian sleep stages, skin temperature, and subtle notification vibrations.',
    specs: {
      'Thickness': '2.5mm ultra-slim profile',
      'Battery': '7 days on single charge',
      'Waterproof': '100m waterproof titanium unibody'
    },
    reviews: [
      { id: 'r14', author: 'Julian Ray', rating: 5, date: '6 days ago', title: 'Forget I am even wearing it', comment: 'Battery lasts a full week and sleep tracking is astonishingly accurate.' }
    ]
  },
  {
    id: 'ar-vision-smart-shades',
    name: 'Aether AR Vision Audio Sunglasses',
    tagline: 'Polarized Zeiss Lenses with Open-Ear Directional Micro-Speakers',
    category: 'wearables',
    price: 219.00,
    originalPrice: 269.00,
    rating: 4.7,
    reviewCount: 88,
    badge: 'INNOVATION',
    badgeType: 'brand',
    inStock: 5,
    featured: true,
    viewingCount: 29,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Gloss Onyx Black', hex: '#09090b', bg: '#000000' },
      { name: 'Tortoise Cyber', hex: '#78350f', bg: '#451a03' }
    ],
    sizes: ['Medium Fit', 'Wide Fit'],
    description: 'Listen to music, podcasts, and take hands-free phone calls without putting anything in your ears. Premium Carl Zeiss polarized lenses block 100% UVA/UVB.',
    specs: {
      'Lenses': 'Carl Zeiss Vision UV400 Polarized',
      'Battery': '8 hours continuous music playback',
      'Audio': 'Patented acoustic dipole directional chambers'
    },
    reviews: [
      { id: 'r13', author: 'Chloe Brooks', rating: 5, date: '5 days ago', title: 'Game changer for cycling and walks', comment: 'Sound is crisp, nobody nearby can hear it, and I stay aware of traffic.' }
    ]
  },
  {
    id: 'lunar-chronograph-heritage',
    name: 'Lunar Orbital Skeleton Mechanical Watch',
    tagline: 'Automatic Self-Winding Movement with Sapphire Exhibition Caseback',
    category: 'wearables',
    price: 549.00,
    originalPrice: 650.00,
    rating: 5.0,
    reviewCount: 77,
    badge: 'LUXURY',
    badgeType: 'brand',
    inStock: 3,
    featured: false,
    viewingCount: 41,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Gunmetal', hex: '#27272a', bg: '#18181b' },
      { name: 'Pure Rose Gold Plate', hex: '#fb7185', bg: '#e11d48' }
    ],
    sizes: ['41mm Classic'],
    description: 'A tribute to classical horology integrated into dark futuristic aesthetics. 28,800 bph Swiss automatic caliber with 42-hour power reserve and 25 jewels.',
    specs: {
      'Movement': 'Automatic Caliber 82S0 Skeleton',
      'Jewels': '25 Ruby Bearings',
      'Crystal': 'Double-Domed AR Sapphire'
    },
    reviews: [
      { id: 'w1', author: 'Darius Vance', rating: 5, date: '1 week ago', title: 'True mechanical soul', comment: 'The exposed balance wheel ticking is hypnotic. Pure craftsmanship.' }
    ]
  },

  // ==================== 4. GAMING & VR ====================
  {
    id: 'cyber-vr-spatial-headset',
    name: 'Vortex Quantum Spatial VR Headset',
    tagline: 'Dual Micro-OLED 4K Displays with Eye Tracking & Wireless Wi-Fi 7',
    category: 'gaming',
    price: 999.00,
    originalPrice: 1199.00,
    rating: 4.9,
    reviewCount: 165,
    badge: 'TOP GEAR',
    badgeType: 'brand',
    inStock: 5,
    featured: true,
    viewingCount: 82,
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Lunar Cyber White', hex: '#f8fafc', bg: '#e2e8f0' },
      { name: 'Void Stealth Black', hex: '#18181b', bg: '#09090b' }
    ],
    sizes: ['Solo Band', 'Dual Strap Pro Comfort'],
    description: 'True spatial computing in zero gravity comfort. 4K per eye resolution with real-time foveated rendering, pancake optics, and spatial binaural speakers.',
    specs: {
      'Resolution': '3840 x 3552 per eye Micro-OLED',
      'Refresh Rate': '120Hz Low-Persistence',
      'Weight': 'Just 340 grams ergonomic balance',
      'Tracking': '6-DoF Inside-Out + 4 IR Eye Sensors'
    },
    reviews: [
      { id: 'g1', author: 'Zack R.', rating: 5, date: '3 days ago', title: 'The clarity will blow your mind', comment: 'Zero screen door effect. Reading code and watching 3D IMAX movies is flawless.' }
    ]
  },
  {
    id: 'cyber-deck-oled-handheld',
    name: 'Aether Deck OLED Cyber Handheld Console',
    tagline: '7.4" 90Hz HDR OLED with Custom AMD Zen 4 APU & Hall-Effect Joysticks',
    category: 'gaming',
    price: 649.00,
    originalPrice: 729.00,
    rating: 4.9,
    reviewCount: 388,
    badge: 'VIRAL',
    badgeType: 'hot',
    inStock: 6,
    featured: true,
    viewingCount: 92,
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Translucent Smoke', hex: '#334155', bg: '#1e293b' },
      { name: 'Cyberpunk Yellow', hex: '#eab308', bg: '#ca8a04' }
    ],
    sizes: ['512GB NVMe SSD', '1TB Anti-Glare Etched'],
    description: 'Play AAA desktop PC titles anywhere with infinite battery life and magnetic anti-drift Hall Effect sticks. Custom Linux OS with instant sleep/wake state resume.',
    specs: {
      'APU': 'AMD Zen 4 4nm 8-Core / 16-Thread',
      'Display': '7.4" 1280x800 HDR OLED 90Hz',
      'Controls': 'Zero-Drift Hall Effect Gimbals'
    },
    reviews: [
      { id: 'g2', author: 'Mason Reed', rating: 5, date: 'Yesterday', title: 'Plays Cyberpunk at 60fps', comment: 'The colors on the OLED display make games look completely new. Battery is impressive.' }
    ]
  },
  {
    id: 'transparent-haptic-controller',
    name: 'Ghost Hall-Effect Wireless Pro Controller',
    tagline: 'Transparent Shell with Dual Magnetic Triggers & Gyro Aim',
    category: 'gaming',
    price: 89.00,
    originalPrice: 110.00,
    rating: 4.8,
    reviewCount: 224,
    badge: 'POPULAR',
    badgeType: 'brand',
    inStock: 16,
    featured: false,
    viewingCount: 33,
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Crystal Ghost', hex: '#f1f5f9', bg: '#cbd5e1' },
      { name: 'Smoked Violet', hex: '#8b5cf6', bg: '#6d28d9' }
    ],
    sizes: ['Universal PC/Switch/iOS/Android'],
    description: 'Fully transparent mechanical controller featuring magnetic Hall Effect sensors that never drift. 1,000Hz polling rate and dual ergonomic back paddles.',
    specs: {
      'Polling Rate': '1000Hz Ultra-Low Latency',
      'Triggers': 'Hall Magnetic Adjustable Stops',
      'Battery': '40 hours continuous rumble'
    },
    reviews: [
      { id: 'g3', author: 'Kenny Wu', rating: 5, date: '1 week ago', title: 'Best PC controller hands down', comment: 'Buttons have crisp tactile microswitch clicks like a gaming mouse.' }
    ]
  },
  {
    id: 'retro-arcade-cyber-mini',
    name: 'NeoGeo Cyber Miniature Arcade Cabinet',
    tagline: 'Authentic Sanwa Joystick with 4.5" IPS & 200 Built-In Classics',
    category: 'gaming',
    price: 139.00,
    originalPrice: 169.00,
    rating: 4.7,
    reviewCount: 94,
    badge: 'RETRO',
    badgeType: 'new',
    inStock: 11,
    featured: false,
    viewingCount: 27,
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Classic Arcade Red', hex: '#dc2626', bg: '#991b1b' },
      { name: 'Neon Cyber Blue', hex: '#0284c7', bg: '#0369a1' }
    ],
    sizes: ['Desktop Mini Scale'],
    description: 'Desktop arcade art piece with illuminated marquee, stereo speaker grille, and HDMI output to hook straight into your 4K TV.',
    specs: {
      'Display': '4.5" Full Viewing Angle IPS',
      'Power': 'USB-C or internal rechargeable battery'
    },
    reviews: [
      { id: 'g4', author: 'Leo M.', rating: 5, date: '4 days ago', title: 'Pure 90s nostalgia', comment: 'The mini clicky joystick is genuine arcade quality. Perfect desk toy.' }
    ]
  },

  // ==================== 5. SNEAKERS & FOOTWEAR ====================
  {
    id: 'cyber-flux-runner-sneakers',
    name: 'Apex Flux Cybernetic Runner Kicks',
    tagline: 'Carbon Fiber Propulsion Plate with 3D-Printed Honeycomb Soles',
    category: 'footwear',
    price: 220.00,
    originalPrice: 280.00,
    rating: 4.9,
    reviewCount: 342,
    badge: 'STREET ICON',
    badgeType: 'brand',
    inStock: 7,
    featured: true,
    viewingCount: 76,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cyber Crimson Red', hex: '#ef4444', bg: '#b91c1c' },
      { name: 'Stealth Black Carbon', hex: '#18181b', bg: '#000000' },
      { name: 'Neon Voltage Volt', hex: '#84cc16', bg: '#65a30d' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    description: 'Fused with full-length curved carbon fiber propulsion plates and additive-manufactured elastomeric lattice midsoles. Energy return rate exceeding 88%.',
    specs: {
      'Upper': 'Bio-Engineered Monofilament Ripstop',
      'Midsole': '3D LightCraft Carbon Infused Lattice',
      'Outsole': 'Continental Wet-Grip Rubber'
    },
    reviews: [
      { id: 'f1', author: 'Trevor Chase', rating: 5, date: '3 days ago', title: 'Feels like running on trampolines', comment: 'Turns heads everywhere. The carbon bounce pushes you forward with every stride.' }
    ]
  },
  {
    id: 'retro-court-cyber-high-top',
    name: 'Vanguard Cyber High-Top Leather Sneaker',
    tagline: 'Full Grain Italian Nappa with Magnetic Lacing Quick-Lock',
    category: 'footwear',
    price: 245.00,
    originalPrice: 310.00,
    rating: 4.8,
    reviewCount: 178,
    badge: 'NEW DROP',
    badgeType: 'new',
    inStock: 5,
    featured: false,
    viewingCount: 44,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Monochrome Onyx', hex: '#0f172a', bg: '#020617' },
      { name: 'Retro Bone White', hex: '#e2e8f0', bg: '#cbd5e1' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    description: 'Classic basketball court DNA injected with modern techwear engineering. Magnetic self-securing Fidlock ankle strap and water-repellent leather.',
    specs: {
      'Leather': 'Full-Grain Tuscan Calfskin 1.4mm',
      'Locking': 'Fidlock German Magnetic Closure',
      'Insole': 'Ortholite High-Density Memory Foam'
    },
    reviews: [
      { id: 'f2', author: 'Gianni B.', rating: 5, date: '1 week ago', title: 'Top tier craftsmanship', comment: 'Butter soft leather. The magnetic ankle lock clicks in with a satisfying snap.' }
    ]
  },
  {
    id: 'minimalist-cloud-slipon',
    name: 'AeroKnit Zero-Gravity Slip-On Runners',
    tagline: 'Seamless 3D Knitted Sock Upper with Ultra-Soft Nitrogen Foam',
    category: 'footwear',
    price: 135.00,
    originalPrice: 165.00,
    rating: 4.9,
    reviewCount: 260,
    badge: 'BEST VALUE',
    badgeType: 'brand',
    inStock: 12,
    featured: false,
    viewingCount: 31,
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cloud Pearl White', hex: '#f8fafc', bg: '#e2e8f0' },
      { name: 'Slate Anthracite', hex: '#334155', bg: '#1e293b' }
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    description: 'Slip on in 1 second with no laces. Machine-washable merino wool and recycled knit upper that breathes like a second skin.',
    specs: {
      'Weight': 'Only 185 grams per shoe',
      'Sole': 'Supercritical Nitrogen Gas-Infused EVA',
      'Care': '100% Machine Washable'
    },
    reviews: [
      { id: 'f3', author: 'Sarah Lin', rating: 5, date: '4 days ago', title: 'Walking on clouds all day', comment: 'Wore them for 20,000 steps at Tokyo airport, feet felt totally fresh.' }
    ]
  },
  {
    id: 'cyberpunk-tactical-combat-boot',
    name: 'ExoShield Cyber Combat Waterproof Boot',
    tagline: 'Vibram Megagrip Arctic Soles with Kevlar-Reinforced Toe Cap',
    category: 'footwear',
    price: 289.00,
    originalPrice: 340.00,
    rating: 4.8,
    reviewCount: 112,
    badge: 'RUGGED',
    badgeType: 'sale',
    inStock: 4,
    featured: false,
    viewingCount: 26,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Tactical Black', hex: '#18181b', bg: '#09090b' },
      { name: 'Desert Dune', hex: '#d97706', bg: '#b45309' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    description: 'Battle-ready footwear engineered for dystopian terrain and harsh winter downpours. Quick-release side zipper for instant exit.',
    specs: {
      'Protection': 'Kevlar Ballistic Fiber Shields',
      'Outsole': 'Vibram Megagrip All-Terrain Tread',
      'Waterproof': '100% GORE-TEX Breathable Bootie'
    },
    reviews: [
      { id: 'f4', author: 'Mark Henderson', rating: 5, date: '2 weeks ago', title: 'Indestructible boots', comment: 'Took them into snowy mountains and muddy trails. Dry, warm, and badass look.' }
    ]
  },

  // ==================== 6. TECH STREETWEAR ====================
  {
    id: 'thermal-apex-parka',
    name: 'Thermal Apex Techwear Parka',
    tagline: 'Waterproof 3-Layer GORE Membrane with Fidlock Magnetic Straps',
    category: 'streetwear',
    price: 289.00,
    originalPrice: 360.00,
    rating: 4.8,
    reviewCount: 92,
    badge: 'NEW DROP',
    badgeType: 'new',
    inStock: 8,
    featured: false,
    viewingCount: 19,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Deep Cyber Black', hex: '#0f172a', bg: '#020617' },
      { name: 'Lunar Grey', hex: '#94a3b8', bg: '#64748b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Engineered for extreme urban climates. Breathable waterproof membrane, 12 weatherproof utility pockets, integrated storm hood, and internal sling carry system.',
    specs: {
      'Material': '3L 20,000mm Waterproof Nylon',
      'Hardware': 'YKK Aquaguard Zips & Fidlock V-Buckles',
      'Thermal Rating': 'Comfortable from -15°C to +15°C'
    },
    reviews: [
      { id: 'r7', author: 'Felix Croft', rating: 5, date: '1 week ago', title: 'High fashion meets dystopian utility', comment: 'Wore it in a torrential downpour, completely dry. Fits perfectly true to size.' }
    ]
  },
  {
    id: 'holographic-apex-hoodie',
    name: 'Holographic Reflex Oversized Hoodie',
    tagline: 'Heavyweight 480GSM French Terry with Reflective Cyber Graphic',
    category: 'streetwear',
    price: 135.00,
    originalPrice: 165.00,
    rating: 4.7,
    reviewCount: 140,
    badge: 'POPULAR',
    badgeType: 'brand',
    inStock: 14,
    featured: false,
    viewingCount: 31,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111827', bg: '#030712' },
      { name: 'Vintage Acid Washed', hex: '#4b5563', bg: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Luxurious 480GSM custom-milled organic cotton. Cut in an oversized boxy streetwear silhouette with discreet thumbhole cuffs and hidden stash pocket.',
    specs: {
      'Fabric': '100% 480GSM Combed French Terry Cotton',
      'Print': '3M Glass-Bead Refraction Print (illuminates with flash)'
    },
    reviews: [
      { id: 'r8', author: 'Samantha K.', rating: 5, date: '3 days ago', title: 'Best quality hoodie I own', comment: 'Super thick and warm. The flash reflective graphic looks unbelievable on videos.' }
    ]
  },
  {
    id: 'tech-cargo-joggers',
    name: 'Modular Techwear Cargo Joggers',
    tagline: '4-Way Stretch Ripstop Fabric with Detachable Utility Pockets',
    category: 'streetwear',
    price: 149.00,
    originalPrice: 180.00,
    rating: 4.7,
    reviewCount: 162,
    badge: 'POPULAR',
    badgeType: 'brand',
    inStock: 15,
    featured: false,
    viewingCount: 23,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cyber Obsidian', hex: '#0f172a', bg: '#020617' },
      { name: 'Industrial Olive', hex: '#4d7c0f', bg: '#365314' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Built for unrestricted agility. DWR stain and water repellent coating, articulated knee darts, and magnetic Fidlock quick-release belt.',
    specs: {
      'Material': 'Cordura Ripstop 4-way stretch blend',
      'Pockets': '8 strategic tactical compartments'
    },
    reviews: [
      { id: 'r15', author: 'Dante Wu', rating: 5, date: '1 week ago', title: 'Unmatched comfort and look', comment: 'The magnetic belt system is slick and pants stretch with every movement.' }
    ]
  },
  {
    id: 'cyber-oversized-graphic-tee',
    name: 'Zero-Vector Cyberpunk Oversized Tee',
    tagline: '280GSM Heavyweight Jersey with Cybernetic Wireframe Screenprint',
    category: 'streetwear',
    price: 65.00,
    originalPrice: 80.00,
    rating: 4.8,
    reviewCount: 88,
    badge: 'NEW',
    badgeType: 'new',
    inStock: 20,
    featured: false,
    viewingCount: 30,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#09090b', bg: '#000000' },
      { name: 'Optical White', hex: '#ffffff', bg: '#f1f5f9' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Boxy drop-shoulder tee made from ring-spun 280GSM organic cotton. Breathable screenprint resistant to fading after 100+ washes.',
    specs: {
      'Weight': '280GSM Heavyweight Ring-Spun Cotton',
      'Collar': 'Reinforced 1.25" Thick Ribbed Collar'
    },
    reviews: [
      { id: 's4', author: 'Julian P.', rating: 5, date: '4 days ago', title: 'Perfect streetwear drape', comment: 'Drapes cleanly without wrinkling. The print quality is crisp and detailed.' }
    ]
  },

  // ==================== 7. AESTHETIC LIVING & DESK ====================
  {
    id: 'levitating-orb-lamp',
    name: 'LUMINA Orbital Zero-Gravity Lamp',
    tagline: 'Electromagnetic Magnetic Levitation with Touch Color Shifting',
    category: 'living',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: 420,
    badge: 'VIRAL HIT',
    badgeType: 'hot',
    inStock: 5,
    featured: true,
    viewingCount: 78,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian Base', hex: '#18181b', bg: '#000000' },
      { name: 'Walnut Wood Core', hex: '#78350f', bg: '#451a03' }
    ],
    sizes: ['Medium 18cm Orb', 'Large 24cm Orb'],
    description: 'Suspended in mid-air by powerful neodymium electromagnets. Rotates silently 360 degrees while emitting warm ambient and RGB gradient lighting with Qi wireless base.',
    specs: {
      'Levitation Height': '15mm - 20mm air gap',
      'Light Modes': '16 Million RGB Colors + Warm/Cool White',
      'Base Function': 'Built-in 15W Qi Fast Wireless Charger'
    },
    reviews: [
      { id: 'r5', author: 'Aria Montgomery', rating: 5, date: 'Yesterday', title: 'Mesmerizing centerpiece', comment: 'Everyone who visits stops in front of my desk and stares. Beautiful craftsmanship.' }
    ]
  },
  {
    id: 'mech-zero-cyber-keyboard',
    name: 'DeskZero Matrix Mechanical Keyboard',
    tagline: 'Gasket-Mounted CNC Aluminum with Hot-Swap Linear Jade Switches',
    category: 'living',
    price: 249.00,
    originalPrice: 299.00,
    rating: 4.9,
    reviewCount: 156,
    badge: 'LIMITED RUN',
    badgeType: 'sale',
    inStock: 3,
    featured: true,
    viewingCount: 35,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cyberpunk Violet', hex: '#8b5cf6', bg: '#6d28d9' },
      { name: 'Monochrome Slate', hex: '#334155', bg: '#1e293b' },
      { name: 'Sakura Neon', hex: '#ec4899', bg: '#be185d' }
    ],
    sizes: ['75% Compact Layout', 'TKL 80%'],
    description: 'Precision-machined from solid 6063 aerospace aluminum with flex-cut polycarbonate plates, PORON sound dampening, and pre-lubed mechanical switches.',
    specs: {
      'Weight': '1.85 kg CNC Aluminum',
      'Switches': 'Custom Factory-Lubed Jade Linear',
      'Connectivity': 'Tri-mode (USB-C, 2.4GHz RF, BT 5.2)'
    },
    reviews: [
      { id: 'r6', author: 'David Zhou', rating: 5, date: '4 days ago', title: 'The deepest creamy thock sound', comment: 'Typing on this is purely therapeutic. Gasket bounce is sublime.' }
    ]
  },
  {
    id: 'cyber-prism-ambient-light',
    name: 'LUMINA Hyper-Prism Hologram Cube',
    tagline: 'Endless Infinity Mirror with Geometric LED Hyper-Tunnel',
    category: 'living',
    price: 159.00,
    originalPrice: 199.00,
    rating: 4.8,
    reviewCount: 167,
    badge: 'VIBEY',
    badgeType: 'brand',
    inStock: 11,
    featured: false,
    viewingCount: 52,
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Mirror Chrome Frame', hex: '#94a3b8', bg: '#64748b' },
      { name: 'Matte Obsidian Frame', hex: '#1e293b', bg: '#0f172a' }
    ],
    sizes: ['15cm Cube', '22cm Pro Cube'],
    description: 'Dodecahedron infinity hypercube that projects a mesmerizing, endless dimensional wormhole onto walls. Reacts in real-time to music rhythm.',
    specs: {
      'Glass': 'Two-way semi-reflective tempered optical glass',
      'Effects': '99+ dynamic algorithmic lighting modes'
    },
    reviews: [
      { id: 'r10', author: 'Nadia Chen', rating: 5, date: '4 days ago', title: 'Looks like an alien artifact', comment: 'Transforms my whole room into a blade runner scene. Amazing build quality.' }
    ]
  },
  {
    id: 'ergonomic-executive-lounge-chair',
    name: 'ExoSpine Carbon Ergonomic Lounge Chair',
    tagline: 'Self-Balancing Dynamic Lumbar with Breathable Tech Mesh',
    category: 'living',
    price: 699.00,
    originalPrice: 850.00,
    rating: 4.9,
    reviewCount: 118,
    badge: 'ULTRA COMFORT',
    badgeType: 'brand',
    inStock: 4,
    featured: false,
    viewingCount: 47,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Mesh', hex: '#334155', bg: '#1e293b' },
      { name: 'Ghost Silver', hex: '#cbd5e1', bg: '#94a3b8' }
    ],
    sizes: ['Standard Ergonomic', 'Tall Executive (+Headrest)'],
    description: 'Engineered for 12+ hour intense creative sessions. 4D multidirectional armrests, auto-calibrating weight tilt mechanism, and breathable elastomer mesh.',
    specs: {
      'Lumbar': 'Dual-Spine Dynamic Floating Support',
      'Base': 'Heavy-Duty Die-Cast Aluminum Polished Alloy',
      'Warranty': '10-Year Full Structural Guarantee'
    },
    reviews: [
      { id: 'l4', author: 'Chris Nolan', rating: 5, date: '1 week ago', title: 'Saved my lower back completely', comment: 'Replaced my Herman Miller Aeron. The spine tracking is light years ahead.' }
    ]
  },

  // ==================== 8. FRAGRANCE & SKINCARE ====================
  {
    id: 'dark-obsidian-parfum',
    name: 'Obsidian Void Extrait de Parfum 100ml',
    tagline: 'Smoky Oud, Black Amber, Saffron & Molecular Metallic Notes',
    category: 'beauty',
    price: 185.00,
    originalPrice: 230.00,
    rating: 4.9,
    reviewCount: 210,
    badge: 'SIGNATURE SCENT',
    badgeType: 'brand',
    inStock: 9,
    featured: true,
    viewingCount: 63,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Heavy Smoked Glass Flacon', hex: '#18181b', bg: '#000000' }
    ],
    sizes: ['50ml Travel', '100ml Flacon'],
    description: 'An enigmatic, magnetic olfactory experience. Formulated at a concentrated 32% oil concentration for intense 16-hour sillage and unforgettable nighttime presence.',
    specs: {
      'Top Notes': 'Saffron, Crushed Cardamom, Bergamot',
      'Heart Notes': 'Smoky Birch Tar, Leather, Iris Concrete',
      'Base Notes': 'Indonesian Oud, Black Amber, Iso E Super'
    },
    reviews: [
      { id: 'b1', author: 'Valerie K.', rating: 5, date: '3 days ago', title: 'Got 5 compliments on night one', comment: 'Dark, alluring, mysterious. It smells like luxury, leather, and dark rain.' }
    ]
  },
  {
    id: 'ultrasonic-cryo-face-sculptor',
    name: 'CryoPulse Ultrasonic Facial Sculptor',
    tagline: 'Thermal Hot/Cold LED Therapy with Microcurrent Muscle Toning',
    category: 'beauty',
    price: 159.00,
    originalPrice: 199.00,
    rating: 4.8,
    reviewCount: 145,
    badge: 'BEAUTY TECH',
    badgeType: 'new',
    inStock: 12,
    featured: false,
    viewingCount: 38,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Satin Titanium Rose', hex: '#fb7185', bg: '#f43f5e' },
      { name: 'Pearl Minimalist', hex: '#f8fafc', bg: '#e2e8f0' }
    ],
    sizes: ['Handheld Ergonomic Wand'],
    description: 'Medical-grade cryotherapy down to 6°C instantly de-puffs and tightens skin, while 42°C warm microcurrent stimulates deep collagen regeneration.',
    specs: {
      'Modes': 'Cryo, Heat, EMS Microcurrent, Red/Blue LED',
      'Vibration': '10,000 Sonic Micro-Pulses/min'
    },
    reviews: [
      { id: 'b2', author: 'Emma Watson-Lee', rating: 5, date: '5 days ago', title: 'Instant jawline definition', comment: 'Takes away morning puffiness in literally 3 minutes. Feels like a spa treatment.' }
    ]
  },
  {
    id: 'botanical-cellular-serum',
    name: 'Cellular Matrix Restorative Botanical Elixir',
    tagline: 'Plant Stem Cells, Copper Peptides & Pure Fermented Squalane',
    category: 'beauty',
    price: 95.00,
    originalPrice: 120.00,
    rating: 4.9,
    reviewCount: 188,
    badge: 'CLEAN',
    badgeType: 'brand',
    inStock: 15,
    featured: false,
    viewingCount: 29,
    images: [
      'https://images.unsplash.com/photo-1608248597359-5f257121652f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Amber Dropper Bottle', hex: '#d97706', bg: '#92400e' }
    ],
    sizes: ['30ml Glass Dropper', '60ml Duo Value'],
    description: 'Clinically proven bio-fermented active serum that repairs the moisture barrier and reduces fine lines with 1% multi-peptide complexes.',
    specs: {
      'Ingredients': '100% Vegan, Cruelty-Free, Paraben-Free',
      'Texture': 'Weightless velvety dry oil absorption'
    },
    reviews: [
      { id: 'b3', author: 'Natalie B.', rating: 5, date: '1 week ago', title: 'Liquid gold for your skin', comment: 'My skin looks radiant and glass-like after two weeks. A little goes a long way.' }
    ]
  },

  // ==================== 9. COFFEE & KITCHEN TECH ====================
  {
    id: 'titanium-precision-espresso-machine',
    name: 'Precision Barista Dual-Boiler Espresso Machine',
    tagline: 'PID Temperature Control with Real-Time Flow Profiling Lever',
    category: 'kitchen',
    price: 1199.00,
    originalPrice: 1450.00,
    rating: 5.0,
    reviewCount: 167,
    badge: 'MASTERPIECE',
    badgeType: 'brand',
    inStock: 3,
    featured: true,
    viewingCount: 71,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Brushed Stainless & Walnut', hex: '#78350f', bg: '#451a03' },
      { name: 'Matte Stealth Cast Black', hex: '#18181b', bg: '#09090b' }
    ],
    sizes: ['Dual Boiler Commercial Grade'],
    description: 'Brings true specialty coffee shop extraction to your home. Dual stainless steel boilers allow brewing espresso and steaming silky microfoam milk simultaneously.',
    specs: {
      'Boiler': 'Dual Stainless Steel (0.8L Brew / 1.5L Steam)',
      'Pump': 'Commercial Rotary Vane Pump 9-Bar',
      'Control': 'Digital PID ±0.5°C Precision Control'
    },
    reviews: [
      { id: 'k1', author: 'Marco Rossi', rating: 5, date: '4 days ago', title: 'Better espresso than any local café', comment: 'Steam power is commercial strength. Pulls thick syrupy shots with incredible crema.' }
    ]
  },
  {
    id: 'smart-thermal-ceramic-mug',
    name: 'AeroThermal App-Controlled Smart Heated Mug',
    tagline: 'Keep Coffee at Exact 135°F All Day with Qi Wireless Coaster',
    category: 'kitchen',
    price: 129.00,
    originalPrice: 159.00,
    rating: 4.8,
    reviewCount: 304,
    badge: 'POPULAR',
    badgeType: 'hot',
    inStock: 14,
    featured: false,
    viewingCount: 55,
    images: [
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Charcoal Black', hex: '#27272a', bg: '#18181b' },
      { name: 'Sandstone Grey', hex: '#d4d4d8', bg: '#a1a1aa' }
    ],
    sizes: ['14 oz (414ml)'],
    description: 'Never drink lukewarm coffee or tea again. Micro-processors monitor your liquid temperature and maintain your exact desired heat for 2 hours standalone or all day on the included coaster.',
    specs: {
      'Battery Life': '2 hours off coaster / All day on coaster',
      'App Control': 'Adjust temperature from 120°F to 145°F',
      'Waterproof': 'IPX7 fully submersible hand wash'
    },
    reviews: [
      { id: 'k2', author: 'Danielle Cooper', rating: 5, date: '2 days ago', title: 'Essential desk item', comment: 'Every sip from first to last is the exact perfect temperature.' }
    ]
  },
  {
    id: 'dutch-cold-brew-tower',
    name: 'Alchemy Glass Kyoto Cold Drip Extraction Tower',
    tagline: 'Borosilicate Glass Spiral Tube with Precision Needle Valve',
    category: 'kitchen',
    price: 189.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviewCount: 82,
    badge: 'ARTISAN',
    badgeType: 'brand',
    inStock: 6,
    featured: false,
    viewingCount: 22,
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Clear Glass with Dark Walnut Stand', hex: '#78350f', bg: '#451a03' }
    ],
    sizes: ['800ml (6-8 Cups)'],
    description: 'Slow-drip cold brew extraction tower that extracts sweet, chocolatey, low-acid coffee drop by drop over 6 to 8 hours.',
    specs: {
      'Material': 'Laboratory Grade Borosilicate Glass',
      'Extraction Time': '6-8 hours slow Dutch drip'
    },
    reviews: [
      { id: 'k3', author: 'Timothy Frost', rating: 5, date: '1 week ago', title: 'Stunning science laboratory vibe', comment: 'The cold brew it makes has zero bitterness. Everyone who visits is stunned by it.' }
    ]
  },

  // ==================== 10. FITNESS & WELLNESS ====================
  {
    id: 'deep-tissue-cryo-massage-gun',
    name: 'ProPulse Thermal Deep-Tissue Massage Gun',
    tagline: '16mm Amplitude Brushless Motor with Instant Hot/Cold Metal Head',
    category: 'fitness',
    price: 219.00,
    originalPrice: 279.00,
    rating: 4.9,
    reviewCount: 310,
    badge: 'RECOVERY',
    badgeType: 'brand',
    inStock: 9,
    featured: false,
    viewingCount: 46,
    images: [
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Space Grey', hex: '#374151', bg: '#1f2937' },
      { name: 'Cyber Obsidian', hex: '#18181b', bg: '#09090b' }
    ],
    sizes: ['Pro Gun + 6 Heads Carrying Case'],
    description: 'Delivers 60 lbs of stall force at whisper-quiet 42dB. Active Peltier element heats up to 45°C or chills to 10°C in seconds for sports injury recovery.',
    specs: {
      'Amplitude': '16mm Deep Muscle Penetration',
      'Speed Levels': '1,400 to 3,200 PPM',
      'Battery': '6 hours continuous therapy'
    },
    reviews: [
      { id: 'fit1', author: 'Coach Ryan', rating: 5, date: '3 days ago', title: 'Best recovery tool for athletes', comment: 'The heated attachment melts tight hamstrings in 2 minutes. Extremely powerful motor.' }
    ]
  },
  {
    id: 'smart-glow-hydration-bottle',
    name: 'HydroGlow Smart UV-C Self-Cleaning Bottle',
    tagline: 'UV-C LED Sterilizes Water in 60s with Bluetooth Hydration Ring',
    category: 'fitness',
    price: 89.00,
    originalPrice: 110.00,
    rating: 4.8,
    reviewCount: 195,
    badge: 'INNOVATION',
    badgeType: 'new',
    inStock: 16,
    featured: false,
    viewingCount: 39,
    images: [
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Glacier Cyan', hex: '#06b6d4', bg: '#0891b2' },
      { name: 'Obsidian Black', hex: '#18181b', bg: '#000000' }
    ],
    sizes: ['24 oz (710ml)', '32 oz (950ml)'],
    description: 'Built-in medical UV-C light neutralizes 99.99% of bacteria and viruses in your water bottle at the touch of a button. Ambient glow ring reminds you to drink hourly.',
    specs: {
      'Sterilization': '280nm UV-C LED purification cycle',
      'Insulation': '24h Cold / 14h Hot Double Wall'
    },
    reviews: [
      { id: 'fit2', author: 'Jessica Alba-Smith', rating: 5, date: '5 days ago', title: 'No more smelly water bottles', comment: 'Stays ice cold at the gym and the self-cleaning light works wonders.' }
    ]
  },
  {
    id: 'aero-gravel-bike-helmet',
    name: 'AeroFlow Carbon MIPS Cycling Helmet',
    tagline: 'Wind-Tunnel Sculpted with Magnetic Eye Visor & Integrated Crash Sensor',
    category: 'fitness',
    price: 249.00,
    originalPrice: 299.00,
    rating: 4.9,
    reviewCount: 78,
    badge: 'SAFETY PRO',
    badgeType: 'brand',
    inStock: 5,
    featured: false,
    viewingCount: 21,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Carbon Weave', hex: '#27272a', bg: '#18181b' },
      { name: 'Hyper White Hi-Vis', hex: '#ffffff', bg: '#e2e8f0' }
    ],
    sizes: ['Medium (55-59cm)', 'Large (59-63cm)'],
    description: 'Ultralight carbon-reinforced road and gravel helmet with MIPS rotational impact protection and smart rear accelerometer brake light.',
    specs: {
      'Weight': '210 grams ultralight',
      'Safety': 'MIPS Spherical Impact Technology',
      'Lighting': 'Auto-sensing wireless LED rear brake light'
    },
    reviews: [
      { id: 'fit3', author: 'Oliver Grant', rating: 5, date: '1 week ago', title: 'Incredible ventilation', comment: 'Barely feel it on your head and the magnetic visor snaps into place effortlessly.' }
    ]
  },

  // ==================== 11. CAMERAS & DRONES ====================
  {
    id: 'cyber-drone-4k-pro',
    name: 'SkyMatrix Pro 4K Folding Drone',
    tagline: '1-Inch CMOS Sensor, Omnidirectional LiDAR Obstacle Avoidance & 42m Flight',
    category: 'camera',
    price: 899.00,
    originalPrice: 1099.00,
    rating: 4.9,
    reviewCount: 230,
    badge: 'BEST IN CLASS',
    badgeType: 'brand',
    inStock: 6,
    featured: true,
    viewingCount: 88,
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Industrial Slate Grey', hex: '#4b5563', bg: '#374151' }
    ],
    sizes: ['Standard Fly More Combo (3 Batteries)'],
    description: 'Capture cinematic Hollywood shots with 4K 120fps HDR video, 10-bit D-Log M color profile, and 15km video transmission range with AI ActiveTrack.',
    specs: {
      'Camera': '1-Inch 20MP CMOS Sensor 4K/120fps',
      'Flight Time': '42 Minutes per battery pack',
      'Range': '15km O3+ Video Transmission',
      'Weight': '249g Ultralight (No FAA registration needed)'
    },
    reviews: [
      { id: 'cam1', author: 'Erik V.', rating: 5, date: '2 days ago', title: 'Flies in 30mph wind without shaking', comment: 'The gimbal stabilization is rock solid. Low light shots look breathtaking.' }
    ]
  },
  {
    id: 'vintage-rangefinder-mirrorless',
    name: 'ChronoFrame Retro 40MP Rangefinder Camera',
    tagline: 'Tactile Brass Dials with Full-Frame BSI Sensor & Film Simulation',
    category: 'camera',
    price: 1899.00,
    originalPrice: 2199.00,
    rating: 5.0,
    reviewCount: 94,
    badge: 'COLLECTOR',
    badgeType: 'brand',
    inStock: 2,
    featured: true,
    viewingCount: 57,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Classic Silver Chrome', hex: '#d4d4d8', bg: '#a1a1aa' },
      { name: 'Stealth Matte Black Brass', hex: '#18181b', bg: '#09090b' }
    ],
    sizes: ['Body Only', 'Body + 35mm f/1.4 Lens Kit'],
    description: 'Analog mechanical feel with modern digital imaging mastery. CNC machined solid brass top and base plates with silent mechanical leaf shutter.',
    specs: {
      'Sensor': '40.2MP Full-Frame Back-Illuminated CMOS',
      'Viewfinder': 'Hybrid Optical / 3.69M-Dot OLED EVF',
      'Shutter': 'Tactile Analog Mechanical Dials'
    },
    reviews: [
      { id: 'cam2', author: 'Henri C.', rating: 5, date: '1 week ago', title: 'The pure joy of photography', comment: 'No plastic anywhere. Feels like a Leica M with modern autofocus speeds.' }
    ]
  },
  {
    id: 'cinematic-3axis-gimbal-stabilizer',
    name: 'HyperAxis Pro 3-Axis Carbon Gimbal',
    tagline: 'Titanium Motor Arms with LiDAR Auto-Focus & 4.5kg Payload',
    category: 'camera',
    price: 499.00,
    originalPrice: 580.00,
    rating: 4.8,
    reviewCount: 110,
    badge: 'PRO TOOLS',
    badgeType: 'new',
    inStock: 7,
    featured: false,
    viewingCount: 25,
    images: [
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Carbon Fiber Weave', hex: '#18181b', bg: '#000000' }
    ],
    sizes: ['Pro Filmmaker Combo'],
    description: 'Stabilize Cinema cameras effortlessly. Automated axis locks unlock automatically upon powering up, and LiDAR range finder pulls focus on manual cinema lenses.',
    specs: {
      'Payload': '4.5 kg Tested Payload',
      'LiDAR': '43,200 Ranging Points up to 14m',
      'Battery': '12 hours fast-charging grip'
    },
    reviews: [
      { id: 'cam3', author: 'Jordan Peele-Fan', rating: 5, date: '4 days ago', title: 'Silky smooth dolly movements', comment: 'The auto axis unlock saves so much time on documentary shoots.' }
    ]
  },

  // ==================== 12. TACTICAL GEAR & EDC ====================
  {
    id: 'modular-magnetic-sling',
    name: 'Modular Magnetic Tactical Sling Bag',
    tagline: 'Waterproof X-Pac Cordura with Quick-Release German Fidlock Buckles',
    category: 'gear',
    price: 119.00,
    originalPrice: 145.00,
    rating: 4.9,
    reviewCount: 115,
    badge: 'EDC FAVORITE',
    badgeType: 'new',
    inStock: 9,
    featured: false,
    viewingCount: 22,
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black VX21', hex: '#18181b', bg: '#09090b' },
      { name: 'Coyote Sand', hex: '#d97706', bg: '#b45309' }
    ],
    sizes: ['4L Everyday', '7L Tech Traveler'],
    description: 'Engineered for daily urban commute. Fits an iPad 11", headphones, power banks, and wallet with anti-theft RFID protection and expandable magnetic gusset.',
    specs: {
      'Fabric': 'Dimension-Polyant X-Pac VX21 Sailcloth',
      'Zippers': 'Weather-sealed YKK AquaGuard',
      'Buckle': 'Self-locating magnetic German Fidlock V-Buckle'
    },
    reviews: [
      { id: 'r11', author: 'Jason Lee', rating: 5, date: '1 week ago', title: 'The Fidlock buckle is addictive', comment: 'Clicks shut automatically. Incredible water resistance and ergonomics.' }
    ]
  },
  {
    id: 'carbon-fiber-edc-wallet',
    name: 'Carbon Fiber MagSafe Minimalist Wallet',
    tagline: '3K Real Carbon Fiber Plate with Push-Card Pop Mechanism',
    category: 'gear',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.8,
    reviewCount: 310,
    badge: 'BEST VALUE',
    badgeType: 'brand',
    inStock: 18,
    featured: false,
    viewingCount: 37,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte 3K Carbon', hex: '#27272a', bg: '#18181b' },
      { name: 'Forged Cyber Carbon', hex: '#3f3f46', bg: '#27272a' },
      { name: 'Titanium Gold Accent', hex: '#eab308', bg: '#ca8a04' }
    ],
    sizes: ['Slim (1-12 Cards)'],
    description: 'Holds up to 12 cards and bills with instant one-click fanning lever. Military-grade RFID blocking with strong MagSafe alignment for iPhone.',
    specs: {
      'Weight': 'Just 52 grams',
      'Capacity': '12 cards + 10 folded bills',
      'Protection': 'Military grade RFID 13.56 MHz shielding'
    },
    reviews: [
      { id: 'r12', author: 'Tom Richards', rating: 5, date: '3 days ago', title: 'Replaced my fat leather wallet', comment: 'The card fan trigger never jams. Magnet holds firm on my phone case.' }
    ]
  },
  {
    id: 'titanium-edc-key-tool',
    name: 'Viper Titanium EDC Multi-Tool Carabiner',
    tagline: 'Skeletonized Grade 5 Titanium with Prybar, Hex & Bottle Opener',
    category: 'gear',
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.9,
    reviewCount: 97,
    badge: 'ESSENTIAL',
    badgeType: 'new',
    inStock: 22,
    featured: false,
    viewingCount: 15,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stonewashed Titanium', hex: '#71717a', bg: '#52525b' },
      { name: 'Anodized Spectrum', hex: '#a855f7', bg: '#7e22ce' }
    ],
    sizes: ['One Size (75mm)'],
    description: 'CNC water-jet cut from aerospace titanium. Zero corrosion, lightweight carabiner gate, integrated bit driver, pry edge, and box opener.',
    specs: {
      'Weight': 'Only 28 grams',
      'Functions': '7-in-1 multi-tool',
      'Material': 'Grade 5 Ti-6Al-4V Titanium'
    },
    reviews: [
      { id: 'r16', author: 'Markus T.', rating: 5, date: '2 weeks ago', title: 'Solid everyday carry piece', comment: 'Indestructible feel and opens packages like a breeze.' }
    ]
  },
  {
    id: 'waterproof-modular-backpack',
    name: 'Cipher 30L Waterproof Tech Travel Backpack',
    tagline: 'Cordura 1000D with Clamshell 180° Opening & TSA Laptop Pocket',
    category: 'gear',
    price: 239.00,
    originalPrice: 295.00,
    rating: 4.9,
    reviewCount: 164,
    badge: 'TRAVEL BEST',
    badgeType: 'brand',
    inStock: 8,
    featured: false,
    viewingCount: 36,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black 1000D', hex: '#18181b', bg: '#000000' },
      { name: 'Industrial Sage Green', hex: '#4d7c0f', bg: '#365314' }
    ],
    sizes: ['30L Carry-On Spec'],
    description: 'Engineered for seamless world travel. Opens 180 degrees like a suitcase with dedicated padded 16" laptop protection and luggage pass-through sleeve.',
    specs: {
      'Capacity': '30 Liters expandable to 35L',
      'Material': '1000D Ballistic Cordura Nylon',
      'Laptop Pocket': 'Suspended False-Bottom 16" Sleeve'
    },
    reviews: [
      { id: 'g5', author: 'Nathan Drake', rating: 5, date: '5 days ago', title: 'One bag for everything', comment: 'Fits a week of clothes, laptop, drone, and chargers with ease. Extremely comfortable straps.' }
    ]
  }
];

export const DISCOUNT_CODES = {
  VIBE20: { discount: 0.20, label: '20% OFF Everything' },
  DROP10: { discount: 0.10, label: '10% OFF Sitewide' },
  FREESHIP: { discount: 'free_shipping', label: '100% Free Express Shipping' },
  CYBER50: { discount: 50, fixed: true, label: '$50 OFF Orders over $200' }
};

export const RECENT_ACTIVITY_MOCKS = [
  { name: 'Alex from Berlin', item: 'Blade Pro 16" Laptop', time: '1m ago' },
  { name: 'Sora from Tokyo', item: 'ChronoPulse Cybernetic Watch', time: '3m ago' },
  { name: 'Mateo from Milan', item: 'Apex Flux Cybernetic Runners', time: '5m ago' },
  { name: 'Jessica from New York', item: 'Obsidian Void Parfum', time: '8m ago' },
  { name: 'Leo from London', item: 'SkyMatrix Pro 4K Drone', time: '11m ago' },
  { name: 'Chloe from Paris', item: 'Precision Barista Espresso Machine', time: '14m ago' },
  { name: 'Dante from Seoul', item: 'Matrix Fold 7 Smartphone', time: '17m ago' }
];
