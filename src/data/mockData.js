export const DEPARTMENTS = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Carpentry",
  "Appliance Repair",
  "Painting"
]

export const AREAS = [
  "Adajan Patiya, Surat",
  "Piplod, Surat", 
  "Varachha, Surat",
  "Katargam, Surat",
  "Athwalines, Surat",
  "Gopipura, Surat",
  "Umara, Navsari",
  "Navsari City, Navsari",
  "Gandevi, Navsari",
  "Chikhli, Navsari",
  "Valsad City, Valsad",
  "Daman Ganga, Valsad",
  "Vapi Road, Valsad",
  "Tithal, Valsad",
  "Umargam, Valsad"
]

// Mock Provider for Customer to Search and Book
export const MOCK_PROVIDERS = [
  // Plumbing Providers (6)
  {
    id: "p-101",
    name: "Rajesh Sharma",
    category: "Plumbing",
    avatar: "RS",
    rating: 4.8,
    reviews: 52,
    hourlyRate: 200,
    area: "Adajan Patiya, Surat",
    pincode: "395009",
    about: "Certified master plumber with 10 years experience in Surat. Specialist in leakage detection and high-pressure system installation.",
    isOnline: true,
    services: [
      { id: "s1", name: "Full Bathroom Leakage Fix", price: "₹1,200" },
      { id: "s2", name: "Kitchen Sink Repair", price: "₹500" },
      { id: "s3", name: "Emergency Pipe Burst Fix", price: "₹1,500" }
    ],
    recentReviews: [
      { id: "r1", user: "Amit K.", rating: 5, text: "Excellent work! Fixed the sink in 20 minutes." },
      { id: "r2", user: "Sonia G.", rating: 4, text: "Very professional and clean work." }
    ]
  },
  {
    id: "p-102",
    name: "Mahesh Patel",
    category: "Plumbing",
    avatar: "MP",
    rating: 4.6,
    reviews: 38,
    hourlyRate: 180,
    area: "Varachha, Surat",
    pincode: "395006",
    about: "Expert in residential and commercial plumbing solutions. Available 24/7 for emergencies.",
    isOnline: true,
    services: [
      { id: "s4", name: "Water Tank Installation", price: "₹800" },
      { id: "s5", name: "Drain Cleaning", price: "₹400" },
      { id: "s6", name: "Toilet Installation", price: "₹600" }
    ],
    recentReviews: [
      { id: "r3", user: "Rahul M.", rating: 5, text: "Quick response and quality work." }
    ]
  },
  {
    id: "p-103",
    name: "Dinesh Mehta",
    category: "Plumbing",
    avatar: "DM",
    rating: 4.9,
    reviews: 67,
    hourlyRate: 220,
    area: "Valsad City, Valsad",
    pincode: "396001",
    about: "15 years of experience in plumbing services. Specialized in modern bathroom fittings.",
    isOnline: false,
    services: [
      { id: "s7", name: "Geysers Installation", price: "₹900" },
      { id: "s8", name: "Pipe Fitting", price: "₹700" },
      { id: "s9", name: "Bathroom Renovation", price: "₹2,500" }
    ],
    recentReviews: [
      { id: "r4", user: "Priya S.", rating: 5, text: "Professional work and reasonable prices." }
    ]
  },
  {
    id: "p-104",
    name: "Kiran Desai",
    category: "Plumbing",
    avatar: "KD",
    rating: 4.5,
    reviews: 29,
    hourlyRate: 170,
    area: "Navsari City, Navsari",
    pincode: "396445",
    about: "Reliable plumbing services for homes and offices in Navsari region.",
    isOnline: true,
    services: [
      { id: "s10", name: "Motor Repair", price: "₹600" },
      { id: "s11", name: "Valve Replacement", price: "₹450" }
    ],
    recentReviews: []
  },
  {
    id: "p-105",
    name: "Amit Shah",
    category: "Plumbing",
    avatar: "AS",
    rating: 4.7,
    reviews: 41,
    hourlyRate: 190,
    area: "Katargam, Surat",
    pincode: "395004",
    about: "Specialized in industrial plumbing and pipeline maintenance.",
    isOnline: true,
    services: [
      { id: "s12", name: "Industrial Pipe Work", price: "₹1,800" },
      { id: "s13", name: "Sump Pump Installation", price: "₹1,200" }
    ],
    recentReviews: [
      { id: "r5", user: "Vikram T.", rating: 4, text: "Good service for commercial spaces." }
    ]
  },
  {
    id: "p-106",
    name: "Sanjay Kumar",
    category: "Plumbing",
    avatar: "SK",
    rating: 4.4,
    reviews: 22,
    hourlyRate: 160,
    area: "Chikhli, Navsari",
    pincode: "396401",
    about: "Affordable plumbing solutions for residential properties.",
    isOnline: false,
    services: [
      { id: "s14", name: "Tap Repair", price: "₹300" },
      { id: "s15", name: "Wash Basin Installation", price: "₹500" }
    ],
    recentReviews: []
  },

  // Electrical Providers (6)
  {
    id: "p-107",
    name: "Ramesh Electrical",
    category: "Electrical",
    avatar: "RE",
    rating: 4.9,
    reviews: 73,
    hourlyRate: 250,
    area: "Piplod, Surat",
    pincode: "395010",
    about: "Certified electrical contractor with 12 years experience. Expert in home wiring and industrial electrical work.",
    isOnline: true,
    services: [
      { id: "e1", name: "Home Wiring", price: "₹2,000" },
      { id: "e2", name: "AC Installation", price: "₹800" },
      { id: "e3", name: "Generator Installation", price: "₹3,000" }
    ],
    recentReviews: [
      { id: "r6", user: "Neha P.", rating: 5, text: "Excellent electrical work, very professional." }
    ]
  },
  {
    id: "p-108",
    name: "Vijay Thakkar",
    category: "Electrical",
    avatar: "VT",
    rating: 4.6,
    reviews: 45,
    hourlyRate: 220,
    area: "Athwalines, Surat",
    pincode: "395001",
    about: "Specialized in electrical panel installation and maintenance.",
    isOnline: true,
    services: [
      { id: "e4", name: "Panel Installation", price: "₹1,500" },
      { id: "e5", name: "CCTV Installation", price: "₹1,200" },
      { id: "e6", name: "Lighting Setup", price: "₹800" }
    ],
    recentReviews: [
      { id: "r7", user: "Karan S.", rating: 4, text: "Good work and reasonable pricing." }
    ]
  },
  {
    id: "p-109",
    name: "Suresh Yadav",
    category: "Electrical",
    avatar: "SY",
    rating: 4.7,
    reviews: 56,
    hourlyRate: 240,
    area: "Vapi Road, Valsad",
    pincode: "396001",
    about: "Expert in industrial electrical solutions and automation systems.",
    isOnline: false,
    services: [
      { id: "e7", name: "Motor Rewinding", price: "₹1,800" },
      { id: "e8", name: "Transformer Repair", price: "₹2,500" }
    ],
    recentReviews: [
      { id: "r8", user: "Deepak M.", rating: 5, text: "Very knowledgeable and efficient." }
    ]
  },
  {
    id: "p-110",
    name: "Anil Gupta",
    category: "Electrical",
    avatar: "AG",
    rating: 4.5,
    reviews: 31,
    hourlyRate: 200,
    area: "Umara, Navsari",
    pincode: "396425",
    about: "Residential electrical services and appliance repair.",
    isOnline: true,
    services: [
      { id: "e9", name: "Fan Installation", price: "₹400" },
      { id: "e10", name: "Switch Board Installation", price: "₹600" }
    ],
    recentReviews: []
  },
  {
    id: "p-111",
    name: "Mukesh Singh",
    category: "Electrical",
    avatar: "MS",
    rating: 4.8,
    reviews: 48,
    hourlyRate: 230,
    area: "Gopipura, Surat",
    pincode: "395002",
    about: "Specialized in commercial electrical installations and maintenance.",
    isOnline: true,
    services: [
      { id: "e11", name: "Commercial Wiring", price: "₹3,500" },
      { id: "e12", name: "UPS Installation", price: "₹2,000" }
    ],
    recentReviews: [
      { id: "r9", user: "Rajesh K.", rating: 5, text: "Professional service for our office." }
    ]
  },
  {
    id: "p-112",
    name: "Pankaj Joshi",
    category: "Electrical",
    avatar: "PJ",
    rating: 4.4,
    reviews: 26,
    hourlyRate: 180,
    area: "Tithal, Valsad",
    pincode: "396135",
    about: "Affordable electrical solutions for homes and small businesses.",
    isOnline: false,
    services: [
      { id: "e13", name: "Socket Installation", price: "₹300" },
      { id: "e14", name: "Meter Box Installation", price: "₹500" }
    ],
    recentReviews: []
  },

  // Cleaning Providers (6)
  {
    id: "p-113",
    name: "Anita's Cleaning Services",
    category: "Cleaning",
    avatar: "AC",
    rating: 4.9,
    reviews: 89,
    hourlyRate: 150,
    area: "Adajan Patiya, Surat",
    pincode: "395009",
    about: "Professional cleaning services for homes and offices. Eco-friendly products used.",
    isOnline: true,
    services: [
      { id: "c1", name: "Deep Home Cleaning", price: "₹2,500" },
      { id: "c2", name: "Office Cleaning", price: "₹3,000" },
      { id: "c3", name: "Carpet Cleaning", price: "₹800" }
    ],
    recentReviews: [
      { id: "r10", user: "Pooja M.", rating: 5, text: "Amazing cleaning service! Very thorough." }
    ]
  },
  {
    id: "p-114",
    name: "Sparkle Clean",
    category: "Cleaning",
    avatar: "SC",
    rating: 4.7,
    reviews: 62,
    hourlyRate: 140,
    area: "Varachha, Surat",
    pincode: "395006",
    about: "Specialized in post-construction cleaning and deep cleaning services.",
    isOnline: true,
    services: [
      { id: "c4", name: "Post Construction Clean", price: "₹4,000" },
      { id: "c5", name: "Kitchen Deep Clean", price: "₹1,200" },
      { id: "c6", name: "Bathroom Deep Clean", price: "₹800" }
    ],
    recentReviews: [
      { id: "r11", user: "Amit S.", rating: 4, text: "Good service and reasonable rates." }
    ]
  },
  {
    id: "p-115",
    name: "Fresh Clean Team",
    category: "Cleaning",
    avatar: "FC",
    rating: 4.8,
    reviews: 54,
    hourlyRate: 160,
    area: "Navsari City, Navsari",
    pincode: "396445",
    about: "Professional cleaning team with modern equipment and eco-friendly solutions.",
    isOnline: false,
    services: [
      { id: "c7", name: "Sofa Cleaning", price: "₹600" },
      { id: "c8", name: "Window Cleaning", price: "₹400" },
      { id: "c9", name: "Floor Polishing", price: "₹1,000" }
    ],
    recentReviews: [
      { id: "r12", user: "Sneha R.", rating: 5, text: "Very professional and efficient team." }
    ]
  },
  {
    id: "p-116",
    name: "Clean & Shine",
    category: "Cleaning",
    avatar: "CS",
    rating: 4.5,
    reviews: 37,
    hourlyRate: 130,
    area: "Daman Ganga, Valsad",
    pincode: "396001",
    about: "Affordable cleaning solutions for residential properties.",
    isOnline: true,
    services: [
      { id: "c10", name: "Regular Home Cleaning", price: "₹800" },
      { id: "c11", name: "Garage Cleaning", price: "₹600" }
    ],
    recentReviews: []
  },
  {
    id: "p-117",
    name: "Urban Clean",
    category: "Cleaning",
    avatar: "UC",
    rating: 4.6,
    reviews: 43,
    hourlyRate: 145,
    area: "Katargam, Surat",
    pincode: "395004",
    about: "Specialized in commercial and industrial cleaning services.",
    isOnline: true,
    services: [
      { id: "c12", name: "Industrial Cleaning", price: "₹5,000" },
      { id: "c13", name: "Shop Cleaning", price: "₹1,500" }
    ],
    recentReviews: [
      { id: "r13", user: "Mahesh K.", rating: 4, text: "Good service for our shop." }
    ]
  },
  {
    id: "p-118",
    name: "Quick Clean",
    category: "Cleaning",
    avatar: "QC",
    rating: 4.4,
    reviews: 28,
    hourlyRate: 120,
    area: "Gandevi, Navsari",
    pincode: "396430",
    about: "Quick and efficient cleaning services at affordable prices.",
    isOnline: false,
    services: [
      { id: "c14", name: "Room Cleaning", price: "₹400" },
      { id: "c15", name: "Balcony Cleaning", price: "₹300" }
    ],
    recentReviews: []
  },

  // Carpentry Providers (6)
  {
    id: "p-119",
    name: "Ramesh Carpenter",
    category: "Carpentry",
    avatar: "RC",
    rating: 4.8,
    reviews: 71,
    hourlyRate: 200,
    area: "Piplod, Surat",
    pincode: "395010",
    about: "Expert carpenter with 15 years experience in custom furniture and woodwork.",
    isOnline: true,
    services: [
      { id: "cr1", name: "Custom Furniture", price: "₹5,000" },
      { id: "cr2", name: "Door Installation", price: "₹1,200" },
      { id: "cr3", name: "Window Repair", price: "₹800" }
    ],
    recentReviews: [
      { id: "r14", user: "Vikram S.", rating: 5, text: "Excellent craftsmanship!" }
    ]
  },
  {
    id: "p-120",
    name: "Wood Craft",
    category: "Carpentry",
    avatar: "WC",
    rating: 4.7,
    reviews: 58,
    hourlyRate: 220,
    area: "Athwalines, Surat",
    pincode: "395001",
    about: "Specialized in modular kitchen and wardrobe installation.",
    isOnline: true,
    services: [
      { id: "cr4", name: "Modular Kitchen", price: "₹15,000" },
      { id: "cr5", name: "Wardrobe Installation", price: "₹8,000" },
      { id: "cr6", name: "TV Unit", price: "₹3,000" }
    ],
    recentReviews: [
      { id: "r15", user: "Nisha P.", rating: 4, text: "Good quality work and timely delivery." }
    ]
  },
  {
    id: "p-121",
    name: "Prem Woodworks",
    category: "Carpentry",
    avatar: "PW",
    rating: 4.9,
    reviews: 64,
    hourlyRate: 240,
    area: "Valsad City, Valsad",
    pincode: "396001",
    about: "Premium carpentry services for residential and commercial projects.",
    isOnline: false,
    services: [
      { id: "cr7", name: "Wood Flooring", price: "₹200/sqft" },
      { id: "cr8", name: "False Ceiling", price: "₹150/sqft" },
      { id: "cr9", name: "Partition Work", price: "₹120/sqft" }
    ],
    recentReviews: [
      { id: "r16", user: "Anil M.", rating: 5, text: "Excellent workmanship and professional service." }
    ]
  },
  {
    id: "p-122",
    name: "Chintan Carpentry",
    category: "Carpentry",
    avatar: "CC",
    rating: 4.5,
    reviews: 33,
    hourlyRate: 180,
    area: "Umara, Navsari",
    pincode: "396425",
    about: "Affordable carpentry solutions for home furniture needs.",
    isOnline: true,
    services: [
      { id: "cr10", name: "Chair Repair", price: "₹400" },
      { id: "cr11", name: "Table Making", price: "₹2,000" }
    ],
    recentReviews: []
  },
  {
    id: "p-123",
    name: "Artisan Wood",
    category: "Carpentry",
    avatar: "AW",
    rating: 4.6,
    reviews: 41,
    hourlyRate: 210,
    area: "Gopipura, Surat",
    pincode: "395002",
    about: "Custom woodwork and furniture restoration services.",
    isOnline: true,
    services: [
      { id: "cr12", name: "Furniture Restoration", price: "₹1,500" },
      { id: "cr13", name: "Shelving Installation", price: "₹800" }
    ],
    recentReviews: [
      { id: "r17", user: "Rahul K.", rating: 4, text: "Good restoration work." }
    ]
  },
  {
    id: "p-124",
    name: "Quick Fix Carpenter",
    category: "Carpentry",
    avatar: "QF",
    rating: 4.4,
    reviews: 25,
    hourlyRate: 160,
    area: "Chikhli, Navsari",
    pincode: "396401",
    about: "Quick carpentry repairs and installations.",
    isOnline: false,
    services: [
      { id: "cr14", name: "Lock Installation", price: "₹300" },
      { id: "cr15", name: "Hanging Work", price: "₹200" }
    ],
    recentReviews: []
  },

  // Appliance Repair Providers (6)
  {
    id: "p-125",
    name: "Tech Repair Pro",
    category: "Appliance Repair",
    avatar: "TR",
    rating: 4.8,
    reviews: 82,
    hourlyRate: 180,
    area: "Adajan Patiya, Surat",
    pincode: "395009",
    about: "Expert appliance repair service for all major brands. Certified technicians.",
    isOnline: true,
    services: [
      { id: "a1", name: "AC Repair", price: "₹800" },
      { id: "a2", name: "Refrigerator Repair", price: "₹600" },
      { id: "a3", name: "Washing Machine Repair", price: "₹700" }
    ],
    recentReviews: [
      { id: "r18", user: "Suresh M.", rating: 5, text: "Quick and reliable service." }
    ]
  },
  {
    id: "p-126",
    name: "Home Appliances Care",
    category: "Appliance Repair",
    avatar: "HA",
    rating: 4.7,
    reviews: 69,
    hourlyRate: 170,
    area: "Varachha, Surat",
    pincode: "395006",
    about: "Specialized in home appliance repair and maintenance services.",
    isOnline: true,
    services: [
      { id: "a4", name: "Microwave Repair", price: "₹500" },
      { id: "a5", name: "TV Repair", price: "₹600" },
      { id: "a6", name: "Water Purifier Service", price: "₹400" }
    ],
    recentReviews: [
      { id: "r19", user: "Priya S.", rating: 4, text: "Good service at reasonable price." }
    ]
  },
  {
    id: "p-127",
    name: "Quick Fix Appliances",
    category: "Appliance Repair",
    avatar: "QF",
    rating: 4.6,
    reviews: 54,
    hourlyRate: 160,
    area: "Navsari City, Navsari",
    pincode: "396445",
    about: "Fast and reliable appliance repair services.",
    isOnline: false,
    services: [
      { id: "a7", name: "Mixer Grinder Repair", price: "₹300" },
      { id: "a8", name: "Geyser Repair", price: "₹500" }
    ],
    recentReviews: [
      { id: "r20", user: "Deepak T.", rating: 5, text: "Efficient service." }
    ]
  },
  {
    id: "p-128",
    name: "Expert Tech Solutions",
    category: "Appliance Repair",
    avatar: "ET",
    rating: 4.9,
    reviews: 76,
    hourlyRate: 200,
    area: "Vapi Road, Valsad",
    pincode: "396001",
    about: "Professional appliance repair with genuine spare parts.",
    isOnline: true,
    services: [
      { id: "a9", name: "Laptop Repair", price: "₹800" },
      { id: "a10", name: "Mobile Phone Repair", price: "₹500" }
    ],
    recentReviews: [
      { id: "r21", user: "Neha K.", rating: 5, text: "Excellent service and genuine parts." }
    ]
  },
  {
    id: "p-129",
    name: "Appliance Doctor",
    category: "Appliance Repair",
    avatar: "AD",
    rating: 4.5,
    reviews: 38,
    hourlyRate: 150,
    area: "Katargam, Surat",
    pincode: "395004",
    about: "Affordable appliance repair solutions.",
    isOnline: true,
    services: [
      { id: "a11", name: "Cooking Range Repair", price: "₹700" },
      { id: "a12", name: "Dishwasher Repair", price: "₹800" }
    ],
    recentReviews: []
  },
  {
    id: "p-130",
    name: "Home Tech Care",
    category: "Appliance Repair",
    avatar: "HT",
    rating: 4.4,
    reviews: 29,
    hourlyRate: 140,
    area: "Tithal, Valsad",
    pincode: "396135",
    about: "Reliable home appliance repair service.",
    isOnline: false,
    services: [
      { id: "a13", name: "Chimney Service", price: "₹600" },
      { id: "a14", name: "OTG Repair", price: "₹400" }
    ],
    recentReviews: []
  },

  // Painting Providers (6)
  {
    id: "p-131",
    name: "Color Splash",
    category: "Painting",
    avatar: "CS",
    rating: 4.9,
    reviews: 94,
    hourlyRate: 180,
    area: "Piplod, Surat",
    pincode: "395010",
    about: "Professional painting services with premium quality paints and skilled painters.",
    isOnline: true,
    services: [
      { id: "p1", name: "Interior Painting", price: "₹25/sqft" },
      { id: "p2", name: "Exterior Painting", price: "₹20/sqft" },
      { id: "p3", name: "Texture Painting", price: "₹40/sqft" }
    ],
    recentReviews: [
      { id: "r22", user: "Amit P.", rating: 5, text: "Excellent finish and professional work." }
    ]
  },
  {
    id: "p-132",
    name: "Royal Painters",
    category: "Painting",
    avatar: "RP",
    rating: 4.7,
    reviews: 73,
    hourlyRate: 170,
    area: "Athwalines, Surat",
    pincode: "395001",
    about: "Specialized in decorative painting and wall designs.",
    isOnline: true,
    services: [
      { id: "p4", name: "Wall Design", price: "₹60/sqft" },
      { id: "p5", name: "Stencil Work", price: "₹35/sqft" },
      { id: "p6", name: "Metallic Paint", price: "₹45/sqft" }
    ],
    recentReviews: [
      { id: "r23", user: "Sonia M.", rating: 4, text: "Creative designs and good work." }
    ]
  },
  {
    id: "p-133",
    name: "Perfect Finish",
    category: "Painting",
    avatar: "PF",
    rating: 4.8,
    reviews: 81,
    hourlyRate: 190,
    area: "Valsad City, Valsad",
    pincode: "396001",
    about: "Premium painting services with modern techniques and quality materials.",
    isOnline: false,
    services: [
      { id: "p7", name: "Waterproofing", price: "₹30/sqft" },
      { id: "p8", name: "Enamel Painting", price: "₹35/sqft" },
      { id: "p9", name: "Distemper Paint", price: "₹15/sqft" }
    ],
    recentReviews: [
      { id: "r24", user: "Rahul K.", rating: 5, text: "Perfect finish and timely completion." }
    ]
  },
  {
    id: "p-134",
    name: "Quick Paint",
    category: "Painting",
    avatar: "QP",
    rating: 4.5,
    reviews: 42,
    hourlyRate: 150,
    area: "Umara, Navsari",
    pincode: "396425",
    about: "Affordable painting solutions for homes and offices.",
    isOnline: true,
    services: [
      { id: "p10", name: "Single Room Paint", price: "₹8,000" },
      { id: "p11", name: "Touch-up Paint", price: "₹3,000" }
    ],
    recentReviews: []
  },
  {
    id: "p-135",
    name: "Artistic Walls",
    category: "Painting",
    avatar: "AW",
    rating: 4.6,
    reviews: 56,
    hourlyRate: 200,
    area: "Gopipura, Surat",
    pincode: "395002",
    about: "Specialized in artistic wall painting and murals.",
    isOnline: true,
    services: [
      { id: "p12", name: "Wall Murals", price: "₹100/sqft" },
      { id: "p13", name: "Kids Room Painting", price: "₹50/sqft" }
    ],
    recentReviews: [
      { id: "r25", user: "Priya R.", rating: 4, text: "Beautiful artwork for kids room." }
    ]
  },
  {
    id: "p-136",
    name: "Budget Painters",
    category: "Painting",
    avatar: "BP",
    rating: 4.4,
    reviews: 31,
    hourlyRate: 140,
    area: "Chikhli, Navsari",
    pincode: "396401",
    about: "Economical painting solutions without compromising quality.",
    isOnline: false,
    services: [
      { id: "p14", name: "Whitewash", price: "₹8/sqft" },
      { id: "p15", name: "Lime Wash", price: "₹10/sqft" }
    ],
    recentReviews: []
  }
] 

// Mock Booking for Customer Dashboard (One completed to show rating, one upcoming)
export const MOCK_BOOKINGS = [
  {
    id: "b-201",
    providerId: "p-101",
    providerName: "Rajesh Sharma",
    service: "Kitchen Sink Repair",
    date: "2024-03-24",
    time: "10:30 AM",
    status: "Completed",
    customerAddress: "45-B Green Park, Valsad"
  },
  {
    id: "b-202",
    providerId: "p-113",
    providerName: "Anita's Cleaning Services",
    service: "Deep Home Cleaning",
    date: "2024-03-26",
    time: "09:00 AM",
    status: "Upcoming",
    customerAddress: "Shreeji Complex, Adajan Patiya, Surat"
  },
  {
    id: "b-203",
    providerId: "p-107",
    providerName: "Ramesh Electrical",
    service: "AC Installation",
    date: "2024-03-27",
    time: "02:00 PM",
    status: "Upcoming",
    customerAddress: "Madhav Park, Navsari City, Navsari"
  },
  {
    id: "b-204",
    providerId: "p-119",
    providerName: "Ramesh Carpenter",
    service: "Custom Furniture",
    date: "2024-03-25",
    time: "11:00 AM",
    status: "Completed",
    customerAddress: "Sai Apartment, Varachha, Surat"
  }
]

// Mock Inbox for Provider Dashboard
export const PROVIDER_INBOX = [
  {
    id: "req-301",
    customerName: "Rahul Verma",
    service: "Emergency Pipe Burst Fix",
    date: "2024-03-25",
    time: "11:00 AM",
    status: "Pending",
    customerAddress: "H-12, Sector 15, Athwalines, Surat"
  },
  {
    id: "req-302",
    customerName: "Sonia Gupta",
    service: "Kitchen Tap Replacement",
    date: "2024-03-25",
    time: "02:00 PM",
    status: "Accepted",
    customerAddress: "Flat 4, Gopipura, Surat"
  },
  {
    id: "req-303",
    customerName: "Amit Patel",
    service: "Deep Home Cleaning",
    date: "2024-03-26",
    time: "10:00 AM",
    status: "Pending",
    customerAddress: "Bungalow No. 15, Valsad City, Valsad"
  },
  {
    id: "req-304",
    customerName: "Priya Shah",
    service: "AC Repair",
    date: "2024-03-26",
    time: "03:00 PM",
    status: "Pending",
    customerAddress: "Shop No. 8, Umara, Navsari"
  },
  {
    id: "req-305",
    customerName: "Mahesh Kumar",
    service: "Interior Painting",
    date: "2024-03-27",
    time: "09:00 AM",
    status: "Accepted",
    customerAddress: "Society Building, Piplod, Surat"
  }
]

export const JOB_STATUS_MOCK = "Accepted"
