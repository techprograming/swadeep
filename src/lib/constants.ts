// Site-wide constants for Swadeep Shikshan Vikas Sanstha
// Directly copied and verified from the official swadeep.org website

export const SITE_CONFIG = {
  name: "Swadeep Shikshan Vikas Sanstha",
  nameGujarati: "સ્વદીપ શિક્ષણ વિકાસ સંસ્થા",
  subtitle: "Non-profit organization in Ahmedabad, Gujarat",
  tagline: "Empowering Communities Through Improved Education and Social Service",
  taglineGujarati: "સમુદાયોનું સશક્તિકરણ — શિક્ષણ અને સામાજિક સેવા દ્વારા",
  description:
    "Swadeep Shikshan Vikas Sanstha is working with astounding dedication for under privileged people in the areas like Education, Health, Safety, Livelihood, Rural Infrastructure and capacity building of communities.",
  whoAreWe1:
    "With a strong urge, smart strategies and clear aim to stand along with the communities who needs a push to find a better direction, Swadeep (Swadeep Shikshan Vikas Sanstha) was founded in 2005. We mainly focus on the sustainable and integrated development of the vulnerable, with a special corner in the heart for children and women as also reflected in our work. We believe that ‘Improved Education’ through ‘Social Service’ mode will enable disadvantaged groups to become self-reliant and emerge out of the clutches of poverty. Our organization lays emphasis on transparency, accountability, community mobilization, participation and ownership.",
  whoAreWe2:
    "Team Swadeep is working with astounding dedication for under privileged people in the areas like Education, Health, Safety, Livelihood, Rural Infrastructure and capacity building of communities. We also conducts the awareness programs for Education, Health and Safety, Parenting, behaviour based training, youth Empowerment, Environment, Water and Sanitation management practices and many more. Our efforts have developed lasting association with government, non-government and corporate organizations; also with the communities and groups with whom we have worked.",
  mission:
    "Improved education true social service delivery to enable disadvantaged communities to become self-reliant and emerge out of the clutches of poverty.",
  vision:
    "To work towards the empowerment of vulnerable communities in under serviced area with a special focus on children and women.",
  foundedYear: 2005,
  url: "https://www.swadeep.org",
  email: "swadeepindiango@gmail.com",
  donationEmail: "donation@swadeep.org",
  phone: "+91-942-830-9408",
  contactPerson: "Kalyan Dangar (09428309408)",
  address:
    "SWADEEP, 21, Abhinandan Park Society, Prernatirth Derasar Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015",
  oldSiteAddress:
    "21, Abhinandan Park Society, Opp. Vastrapur Rly. Stn., Butbhavani Rly. Crossing, Vejalpur – Ahmedabad -380051",
  pan: "AAKTS6375E",
  fcraNumber: "041980081",
  award: "CSR Conclave 2019",
  social: {
    facebook: "https://www.facebook.com/SwadeepShikshanVikasSanstha/",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://www.youtube.com/@swadeepindia2543",
  },
} as const;

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  dropdown: readonly NavDropdownItem[];
}

export const NAV_LINKS: readonly NavLinkItem[] = [
  {
    label: "Home",
    href: "/",
    dropdown: [
      { label: "Overview", href: "/", description: "Homepage overview & latest initiatives" },
      { label: "Who Are We?", href: "/#who-are-we-heading", description: "Our founding story and mission" },
      { label: "What We Do?", href: "/#focus-areas", description: "Thematic development areas" },
      { label: "Our Achievements", href: "/#impact-stats-heading", description: "Key measurable impact milestones" },
      { label: "Our Partners", href: "/#partners", description: "Funding partners & collaborators" },
      { label: "Our Trustees", href: "/#our-trustees", description: "Board of trustees & leadership" },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Who Are We?", href: "/about", description: "History, vision, and core principles" },
      { label: "Our Vision & Mission", href: "/about#vision-mission", description: "Guiding purpose & empowerment goals" },
      { label: "Our Trustees", href: "/about#our-trustees", description: "Governing board & leadership" },
      { label: "Our Achievements", href: "/about#achievements", description: "Thematic achievements & statistics" },
      { label: "What They Say About Us", href: "/about#testimonials", description: "Partner & staff testimonials" },
    ],
  },
  {
    label: "What We Do",
    href: "/programs",
    dropdown: [
      { label: "Education", href: "/programs#education", description: "Pre-primary, LRC, digital & high school" },
      { label: "Health", href: "/programs#health", description: "Project Arogya, dental hygiene & camps" },
      { label: "Livelihood", href: "/programs#livelihood", description: "Marine fisheries, SHGs & Sagar Shala" },
      { label: "Rural Infrastructure", href: "/programs#infrastructure", description: "Schools, Anganwadi BaLA & solar lights" },
      { label: "Disaster Management", href: "/programs#disaster", description: "Relief work, COVID-19 & Tauktae cyclone" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    dropdown: [
      { label: "Photo Gallery", href: "/gallery", description: "All field photographs & project glimpses" },
      { label: "Education Photos", href: "/gallery?category=Education", description: "LRC coaching & classroom activities" },
      { label: "Health Drives", href: "/gallery?category=Health", description: "Medical & dental hygiene camps" },
      { label: "Livelihood & Fisheries", href: "/gallery?category=Livelihood", description: "Fishermen support & SHG empowerment" },
      { label: "Infrastructure Projects", href: "/gallery?category=Infrastructure", description: "BaLA Anganwadis & school facilities" },
    ],
  },
  {
    label: "Videos",
    href: "/videos",
    dropdown: [
      { label: "Official Video Gallery", href: "/videos", description: "All videos from @swadeepindia2543" },
      { label: "Anganwadi & ICDS Training", href: "/videos?category=Anganwadi", description: "Worker training & action songs" },
      { label: "Foundational Literacy", href: "/videos?category=Education", description: "Writing & reading skills sessions" },
      { label: "Health & Nutrition", href: "/videos?category=Health", description: "Dietary awareness & interactive learning" },
      { label: "Culture & Value Education", href: "/videos?category=Culture", description: "Moral storytelling & youth discussions" },
    ],
  },
  {
    label: "Donation",
    href: "/donate",
    dropdown: [
      { label: "Donate to the Cause", href: "/donate", description: "Tax exemption under Section 80G" },
      { label: "Domestic Bank Transfer", href: "/donate#bank-details", description: "Bank of India NEFT / RTGS / IMPS" },
      { label: "FCRA Foreign Remittance", href: "/donate#bank-details", description: "State Bank of India New Delhi Branch" },
      { label: "Cheque & Draft Info", href: "/donate#bank-details", description: "Mailing address for physical donations" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
    dropdown: [
      { label: "Send Us an Email", href: "/contact#contact-form", description: "Submit your message or inquiry" },
      { label: "Office Address", href: "/contact#location", description: "Ahmedabad, Gujarat headquarters" },
      { label: "Frequently Asked Questions", href: "/contact#faq", description: "Partnership & collaboration FAQs" },
      { label: "Direct Phone Call", href: "tel:+919428309408", description: "+91-942-830-9408" },
    ],
  },
] as const;

export const FOCUS_AREAS = [
  {
    id: "education",
    title: "Education",
    titleGu: "શિક્ષણ",
    description:
      "Education is one of the most powerful instruments for reducing poverty and inequality as it lays the foundation for sustained development. Starting the efforts from pre-primary education (Anganwadis), we have now reached to higher secondary schools with the vision to support children complete their schooling.",
    icon: "education",
    image: "/images/education.jpg",
    stats: "60,000 Children • 200 Villages",
    highlights: [
      "200 Villages Reached",
      "277 ICDS Centres Supported",
      "100 Primary Schools & 30 Secondary Schools",
      "60,000 Children Benefited",
    ],
  },
  {
    id: "health",
    title: "Health",
    titleGu: "આરોગ્ય",
    description:
      "Awareness- Prevention- Cure- more Prevention is our working method with the aim for better health of the people. Making efforts to make hygiene a routine in everyday life for vulnerable communities, alongside basic health check-ups, dental hygiene camps, and medical assistance.",
    icon: "health",
    image: "/images/health.jpg",
    stats: "100 Villages • 13,000 Dental Health",
    highlights: [
      "100 Villages Covered",
      "13,000 Dental Health Beneficiaries",
      "14,000 Health & Safety Participants",
      "2,000 General Health Camps",
    ],
  },
  {
    id: "livelihood",
    title: "Livelihood",
    titleGu: "આજીવિકા",
    description:
      "Fisheries livelihood development for coastal communities in Mundra (Kutch) and Jafrabad (Amreli). Providing fisheries information center at Tragadi port, fishing equipment, 3 women Self Help Groups (SHGs), government scheme linkages, and Sagar Shala for children.",
    icon: "livelihood",
    image: "/images/livelihood.jpg",
    stats: "10 Villages • 500 Fishermen",
    highlights: [
      "10 Coastal Villages",
      "500 Fishermen Supported",
      "100 Women & 3 SHGs Formed",
      "Sagar Shala with 120 Children",
    ],
  },
  {
    id: "infrastructure",
    title: "Rural Infrastructure Development",
    titleGu: "ગ્રામીણ માળખાકીય સુવિધા વિકાસ",
    description:
      "A good infrastructure not only provides comfort but visually makes a positive effect on individuals. School infrastructure across 29 schools of Rajula taluka, beautification of Anganwadis with educational wall art, and solar street light installations.",
    icon: "infrastructure",
    image: "/images/infrastructure.jpg",
    stats: "40 Villages • 1050 Solar Lights",
    highlights: [
      "40 Villages Transformed",
      "30 School Grounds Developed",
      "1050 Solar Street Lights Installed",
      "100 ICDS Beautifications Reaching 7000 Children",
    ],
  },
  {
    id: "disaster",
    title: "Disaster Management",
    titleGu: "આપત્તિ વ્યવસ્થાપન",
    description:
      "Serving humankind socially, physically, mentally, emotionally and economically during natural calamities. Proven field work in Kutch earthquake, Kashmir earthquake, Nagapattinam Tsunami, Surat flood, COVID-19 pandemic, and Cyclone Tauktae.",
    icon: "safety",
    image: "/images/safety.jpg",
    stats: "27 Villages • 1,00,000 Masks",
    highlights: [
      "27 Villages in Cyclone Tauktae",
      "1,000 Households Supported with Tauktae Relief",
      "1,00,000 Masks Distributed during COVID-19",
      "1,000 Emergency Ration Kits Provided",
    ],
  },
] as const;

export const ACHIEVEMENTS = {
  education: {
    title: "Education",
    items: [
      { label: "Villages", count: "200" },
      { label: "ICDS", count: "277" },
      { label: "Secondary Schools", count: "30" },
      { label: "Children", count: "60,000" },
      { label: "Primary Schools", count: "100" },
    ],
  },
  health: {
    title: "Health",
    items: [
      { label: "Villages", count: "100" },
      { label: "Dental Health", count: "13,000" },
      { label: "Health & Safety", count: "14,000" },
      { label: "General Health Camps", count: "2,000" },
      { label: "Individuals", count: "6,600" },
    ],
  },
  livelihood: {
    title: "Livelihood",
    items: [
      { label: "Villages", count: "10" },
      { label: "Fishermen", count: "500" },
      { label: "Women", count: "100" },
      { label: "Youth", count: "200" },
      { label: "Children", count: "130" },
    ],
  },
  infrastructure: {
    title: "Rural Infrastructure Development",
    items: [
      { label: "Villages", count: "40" },
      { label: "School Ground Development", count: "30" },
      { label: "Solar Light", count: "1,050" },
      { label: "ICDS Beautification", count: "100" },
      { label: "Children", count: "7,000" },
    ],
  },
  disaster: {
    title: "Disaster Management",
    items: [
      { label: "Villages", count: "27" },
      { label: "House hold (Tauktae)", count: "1,000" },
      { label: "Mask Distribution", count: "1,00,000" },
      { label: "Ration Kits", count: "1,000" },
      { label: "House hold (Livelihood support)", count: "20" },
    ],
  },
} as const;

export const IMPACT_STATS = [
  { value: 60000, suffix: "+", label: "Children", labelGu: "બાળકો" },
  { value: 200, suffix: "+", label: "Villages", labelGu: "ગામડાંઓ" },
  { value: 277, suffix: "+", label: "ICDS Centres", labelGu: "આંગણવાડી કેન્દ્રો" },
  { value: 1050, suffix: "+", label: "Solar Lights", labelGu: "સોલાર લાઇટ્સ" },
] as const;

export const PARTNERS = [
  {
    name: "Coastal Gujarat Power Limited (Tata Power)",
    logo: "/images/partner-cgpl.jpg",
    role: "Integrated Fishermen Development Program 'Sagarbandhu'",
  },
  {
    name: "American India Foundation (AIF)",
    logo: "/images/partner-aif.jpg",
    role: "Education and Learning Resource Centers",
  },
  {
    name: "U.T. Administration of Dadra and Nagar Haveli and Daman and Diu",
    logo: "/images/partner-icds.png",
    role: "Government of India - Education & Community Development",
  },
  {
    name: "APM Terminals Pipavav",
    logo: "/images/partner-apm.jpg",
    role: "Youth Career Guidance & Skill Development",
  },
  {
    name: "Tata Chemicals Society for Rural Development (TCSRD)",
    logo: "/images/partner-tcsrd.jpg",
    role: "Community Capacity Building Partner",
  },
  {
    name: "Tata Motors",
    logo: "/images/partner-tatamotors.jpg",
    role: "Rural Community Skilling",
  },
  {
    name: "Astral Foundation",
    logo: "/images/partner-astral.jpg",
    role: "Sanitation & Water Infrastructure",
  },
  {
    name: "ICDS - Integrated Child Development Services",
    logo: "/images/partner-icds.png",
    role: "Anganwadi Pre-Primary Education & Child Nutrition",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "CGPL’s partnership with SWADEEP is based on Specific Community Development Principle which is further aligned with the Social Sustainability Strategic intents to serve the community in a systematic manner through co-creation, effective planning, bridging the gap, Unique innovations, and Participatory learning in an Inclusive approach for getting the desired results in the field. Together, we aspire to bring the desired transformation through effective partnership and continued collaboration. It is always a matter of privilege to have been associated with SWADEEP and its efforts in the field. Our association with SWADEEP has only grown stronger over the years and has become an integral part of CGPL’s Integrated Fishermen Development Program titled 'Sagarbandhu'.",
    name: "Pradeep Kumar Ghosal",
    role: "Head - Environment, CR & Sustainability, Coastal Gujarat Power Ltd. (TATA Power)",
    category: "Funding Partners",
    image: "/images/pradeep.png",
  },
  {
    quote:
      "Working with an NGO like Swadeep which has a vast & logical understanding of communities and smart solutions for the problems of the region they serve is great. American India Foundation always appreciates the pure and honest efforts made towards lifting up the livelihoods of people and surely Swadeep is one of those who deserve one.",
    name: "American India Foundation (AIF)",
    role: "Funding & Implementation Partner",
    category: "Funding Partners",
    image: "/images/partner-aif.jpg",
  },
  {
    quote:
      "We have worked with the Swadeep on the projects of Education and Community Development for a long time and have been able to see a clear impact on the community through tangible deliverables. We would love to applaud for team Swadeep for their incredible efforts in the betterment of the U/T Dadra and Nagar Haveli.",
    name: "U.T. Administration of Dadra and Nagar Haveli and Daman and Diu",
    role: "Government of India",
    category: "Funding Partners",
    image: "/images/partner-icds.png",
  },
  {
    quote:
      "I’ve worked at Swadeep for almost 5 years and the experience has been full of joy and satisfaction. It hits you differently when you contribute something to the under privileged people, especially their gratitude towards you makes you more humble and after some time you realize that you have become a part of that community. This feeling made me learn more and more and is always facilitated by Swadeep. The staff training, workshops, exposure and many more helped me to shape myself as a better individual and professional.",
    name: "Dishaben",
    role: "Swadeep Staff, Ahmedabad – Gujarat",
    category: "Swadeep Staff",
    image: "/images/dishaben.jpg",
  },
  {
    quote:
      "My journey at Swadeep was full of learning as I came in touch with the projects from different areas like Education, Livelihood and Women Empowerment. The joy of working with team Swadeep is something I can cherish the whole life. The opportunities to network, independence of work and right to visualize the assigned project are the things I like the most about Swadeep.",
    name: "Vinod Bhai",
    role: "Swadeep Staff, Ahmedabad – Gujarat",
    category: "Swadeep Staff",
    image: "/images/vinodbhai.jpg",
  },
] as const;

export const BANKING_DETAILS = {
  taxBenefitText:
    "Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption.",
  chequeDetails:
    "You may either transfer donation directly to organization bank account or send cheque/draft in favour of Swadeep Shikshan Vikas Sanstha at 21, Abhinandan Park Society, Opp. Vastrapur Railway Station, Butbhavani Railway Crossing, Vejalpur – Ahmedabad -380051. Contact: Kalyan Dangar 09428309408.",
  pan: "AAKTS6375E",
  domestic: {
    accountName: "SWADEEP SHIKSHAN VIKAS SANSTHA",
    bankName: "Bank of India",
    address: "184/A Anand Hall station road- SIHOR, District Bhavnagar",
    branch: "SIHOR",
    accountNumber: "320810110005282",
    ifsc: "BKID0003208",
  },
  fcra: {
    registrationNumber: "041980081",
    bankName: "State Bank of India",
    branch: "SBI New Delhi Main Branch, (00691)",
    accountNumber: "40102583793",
    accountType: "FCRA Savings Account",
    ifsc: "SBIN0000691",
    swift: "SBININBB104",
    address:
      "SBI New Delhi Main Branch, FCRA. Foreign Exchange Division, 11, Parliament Street, New Delhi- 110001.",
  },
  feedbackEmail: "donation@swadeep.org",
} as const;

export interface TrusteeMember {
  name: string;
  nameGu: string;
  role: string;
  roleGu: string;
  category: "Chairman" | "CEO" | "Trustee";
  description: string;
  highlight?: boolean;
  image?: string;
}

export const TRUSTEES: readonly TrusteeMember[] = [
  {
    name: "Patubhai Ahir",
    nameGu: "પટુભાઈ આહીર",
    role: "Chairman",
    roleGu: "પ્રમુખ (ચેરમેન)",
    category: "Chairman",
    description:
      "Chairman of Swadeep Shikshan Vikas Sanstha, guiding organization governance and community welfare.",
    highlight: true,
  },
  {
    name: "Kalyanbhai V. Dangar",
    nameGu: "કલ્યાણભાઈ વી. ડાંગર",
    role: "Chief Executive Officer",
    roleGu: "મુખ્ય કાર્યકારી અધિકારી (CEO)",
    category: "CEO",
    description:
      "Chief Executive Officer and driving force behind Swadeep since 2005, leading strategic partnerships and field execution.",
    highlight: true,
  },
  {
    name: "Divaliben Solnki",
    nameGu: "દિવાળીબેન સોલંકી",
    role: "Trustee",
    roleGu: "ટ્રસ્ટી",
    category: "Trustee",
    description:
      "Trustee supporting community initiatives and women empowerment.",
  },
  {
    name: "Pathik V Patel",
    nameGu: "પથિક વી. પટેલ",
    role: "Trustee",
    roleGu: "ટ્રસ્ટી",
    category: "Trustee",
    description:
      "Trustee contributing to institutional governance and organizational development.",
  },
  {
    name: "Jasvantbhai M. Chauhan",
    nameGu: "જસવંતભાઈ એમ. ચૌહાણ",
    role: "Trustee",
    roleGu: "ટ્રસ્ટી",
    category: "Trustee",
    description:
      "Trustee advising on educational programs and rural school community linkages.",
  },
  {
    name: "Shailesh Khamal",
    nameGu: "શૈલેષ ખમાલ",
    role: "Trustee",
    roleGu: "ટ્રસ્ટી",
    category: "Trustee",
    description:
      "Trustee assisting with community mobilization and youth training initiatives.",
  },
  {
    name: "Vinodbhai Solanki",
    nameGu: "વિનોદભાઈ સોલંકી",
    role: "Trustee",
    roleGu: "ટ્રસ્ટી",
    category: "Trustee",
    description:
      "Trustee overseeing field interventions, livelihood programs, and grassroots disaster response.",
    image: "/images/vinodbhai.jpg",
  },
] as const;

export interface YouTubeVideoItem {
  id: string;
  title: string;
  titleGu: string;
  description: string;
  category: "Education & Foundational Literacy" | "Anganwadi & ICDS Training" | "Health & Nutrition" | "Child Development & Activities" | "Culture & Community";
  duration: string;
  timeAgo?: string;
  isFeatured?: boolean;
}

export const YOUTUBE_CHANNEL = {
  handle: "@swadeepindia2543",
  name: "Swadeep Shikshan Vikas Sanstha",
  url: "https://www.youtube.com/@swadeepindia2543",
  subscribeUrl: "https://www.youtube.com/@swadeepindia2543?sub_confirmation=1",
} as const;

export const YOUTUBE_VIDEOS: readonly YouTubeVideoItem[] = [
  {
    id: "RwLPnssozZk",
    title: "Anganwadi Worker Training & Joyful Children Action Songs",
    titleGu: "આંગણવાડી બહેનોની ટ્રેનિંગમાં અલગ અલગ મજેદાર બાળગીતો",
    description: "Hands-on capacity building workshop training ICDS Anganwadi workers in participatory pedagogy, musical rhymes, and child interaction.",
    category: "Anganwadi & ICDS Training",
    duration: "9:36",
    timeAgo: "1 week ago",
    isFeatured: true,
  },
  {
    id: "bGyVtZGVnqA",
    title: "Foundational Literacy & Writing Skills in Anganwadi",
    titleGu: "આંગણવાડીમાં લેખન શીખતા બાળકો - જીવનમાં લખવાની શરૂઆત આ રીતે થાય",
    description: "Early childhood development session focusing on fine motor skills, pencil grip, and foundational writing confidence.",
    category: "Education & Foundational Literacy",
    duration: "2:05",
    timeAgo: "3 weeks ago",
    isFeatured: true,
  },
  {
    id: "xrRMVGzzm-Y",
    title: "Interactive Vegetable & Nutrition Awareness for Children",
    titleGu: "અનોખી રીતે શાકભાજી અને પોષણની ઓળખ",
    description: "Engaging rural students through playful sensory exercises to identify fresh vegetables and understand balanced daily nutrition.",
    category: "Health & Nutrition",
    duration: "3:55",
    timeAgo: "1 month ago",
    isFeatured: true,
  },
  {
    id: "-FfJ9skQHBE",
    title: "ICDS Worker Capacity Building & Classroom Rhymes",
    titleGu: "આંગણવાડી તાલીમ દરમિયાન વર્કર બહેનોનું મનોરંજક બાળગીત",
    description: "Empowering frontline community workers with joyful musical techniques to enhance classroom retention in rural Anganwadis.",
    category: "Anganwadi & ICDS Training",
    duration: "2:55",
    timeAgo: "1 month ago",
    isFeatured: false,
  },
  {
    id: "1Mi1bRm9oBI",
    title: "Creative Paper Art & Craft Activity for School Children",
    titleGu: "કાગળમાંથી ગણેશજીનું ચિત્ર બનાવવાની સરળ રીત (ક્રાફ્ટ કાર્ય)",
    description: "Fostering creativity, cognitive agility, and artistic flair in village students using paper cutting and craft exercises.",
    category: "Education & Foundational Literacy",
    duration: "2:56",
    timeAgo: "1 month ago",
    isFeatured: false,
  },
  {
    id: "MrMnSK00440",
    title: "Experiential Grain & Nutrition Identification Using Flash Cards",
    titleGu: "ફ્લેશ કાર્ડ દ્વારા અનાજ અને પોષણની ઓળખ",
    description: "Building agricultural and nutritional literacy by helping children identify native grains, millets, and pulses.",
    category: "Health & Nutrition",
    duration: "4:24",
    timeAgo: "1 month ago",
    isFeatured: false,
  },
  {
    id: "F-lzs2vesaU",
    title: "Cognitive Color Sorting & Motor Skill Competition",
    titleGu: "આંગણવાડી ના બાળકો સાથે બોલ અલગ પાડવાની સ્પર્ધા",
    description: "Exciting group game developing color recognition, speed, and motor coordination among pre-school learners.",
    category: "Child Development & Activities",
    duration: "2:26",
    timeAgo: "3 weeks ago",
    isFeatured: false,
  },
  {
    id: "7Dkp95eFwVk",
    title: "Team Coordination & Agility Balloon Challenge",
    titleGu: "ફુગ્ગાની મદદથી કપ ભેગા કરવાની સ્પર્ધા - મોજીલું શિક્ષણ",
    description: "Playful team activities inspiring collaboration, patience, and joyful sportsmanship in rural schools.",
    category: "Child Development & Activities",
    duration: "0:46",
    timeAgo: "2 months ago",
    isFeatured: false,
  },
  {
    id: "lEqG7ZXw_Dc",
    title: "Joyful English Alphabet Learning Through Movement",
    titleGu: "આંગણવાડીમાં બાળકો દ્વારા ABCD ની રજૂઆત",
    description: "Foundational English alphabet phonetics and letter recognition introduced through rhythm and dance.",
    category: "Education & Foundational Literacy",
    duration: "1:02",
    timeAgo: "2 months ago",
    isFeatured: false,
  },
  {
    id: "OWKiwpk_s9Y",
    title: "Folk Storytelling & Moral Value Education in Gujarati",
    titleGu: "દીકરીને ઘરે જાવા દે... મજેદાર સંસ્કાર વાર્તા",
    description: "Traditional moral stories reinforcing empathy, family respect, and community harmony among young listeners.",
    category: "Culture & Community",
    duration: "8:00",
    timeAgo: "3 weeks ago",
    isFeatured: false,
  },
  {
    id: "XNWDtwLrmzo",
    title: "Life Lessons & Principles of Mahatma Gandhi",
    titleGu: "મહાત્મા ગાંધીના જીવન પ્રસંગ પર પ્રેરક વાત",
    description: "Inspiring youth dialogues on cleanliness, non-violence, truth, and community service rooted in Gandhian thoughts.",
    category: "Culture & Community",
    duration: "1:24",
    timeAgo: "2 weeks ago",
    isFeatured: false,
  },
  {
    id: "wqV7dwGuUKU",
    title: "Healthy Vegetable Song & Nutritional Wellness",
    titleGu: "આવી રે ભાઈ આવી શાકવાળી આવી - મસ્ત બાળગીત",
    description: "Encouraging wholesome nutrition and dietary awareness through traditional musical folklore.",
    category: "Health & Nutrition",
    duration: "2:05",
    timeAgo: "2 months ago",
    isFeatured: false,
  },
] as const;
