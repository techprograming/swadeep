// Site-wide constants for Swadeep Shikshan Vikas Sanstha
// Directly copied and verified from the official swadeep.org website

export const SITE_CONFIG = {
  name: "Swadeep Shikshan Vikas Sanstha",
  
  subtitle: "Non-profit organization in Ahmedabad, Gujarat",
  tagline: "Empowering Communities Through Improved Education and Social Service",
  
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
  phoneRaw: "+919428309408",
  contactPerson: "Kalyan Dangar (09428309408)",
  operatingAddress:
    "SWADEEP, 21, Abhinandan Park Society, Prernatirth Derasar Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015",
  address:
    "SWADEEP, 21, Abhinandan Park Society, Prernatirth Derasar Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015",
  oldSiteAddress:
    "21, Abhinandan Park Society, Opp. Vastrapur Rly. Stn., Butbhavani Rly. Crossing, Vejalpur – Ahmedabad -380051",
  pan: "AAKTS6375E",
  fcraNumber: "041980081",
  trustRegistrationNo: "E/1739/Bhavnagar",
  award: "CSR Conclave 2019",
  workingHours: "Monday to Saturday: 10:00 AM – 6:00 PM IST (Sunday Closed)",
  social: {
    facebook: "https://www.facebook.com/SwadeepShikshanVikasSanstha/",
    youtube: "https://www.youtube.com/@swadeepindia2543",
    instagram: "https://www.instagram.com/swadeep_india/",
  },
} as const;

export const OFFICE_LOCATIONS = {
  operating: {
    label: "Operating Headquarters & Communication Office",
    
    tag: "Operating Office",
    organization: "Swadeep Shikshan Vikas Sanstha",
    addressLine1: "21, Abhinandan Park Society",
    addressLine2: "Prernatirth Derasar Road, Prahlad Nagar",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380015",
    fullAddress:
      "SWADEEP, 21, Abhinandan Park Society, Prernatirth Derasar Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015",
    contactPerson: "Kalyan Dangar",
    phone: "+91-942-830-9408",
    phoneRaw: "+919428309408",
    email: "swadeepindiango@gmail.com",
    workingHours: "Monday – Saturday: 10:00 AM – 6:00 PM IST",
    mapQuery:
      "SWADEEP,+21,+Abhinandan+Park+Society,+Prernatirth+Derasar+Rd,+Prahlad+Nagar,+Ahmedabad,+Gujarat+380015",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=SWADEEP,%2021,%20Abhinandan%20Park%20Society,%20Prernatirth%20Derasar%20Rd,%20Prahlad%20Nagar,%20Ahmedabad,%20Gujarat%20380015&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  registered: {
    label: "Registered Office (Trust Deed & Legal Records)",
    
    tag: "Registered Office",
    organization: "Swadeep Shikshan Vikas Sanstha",
    addressLine1: "184/A Anand Hall Station Road",
    addressLine2: "Sihor",
    city: "Sihor, District Bhavnagar",
    state: "Gujarat",
    pincode: "364240",
    fullAddress:
      "Bhavnagar, Gujarat, Gujarat",
    contactPerson: "Kalyan Dangar",
    phone: "+91-942-830-9408",
    phoneRaw: "+919428309408",
    email: "swadeepindiango@gmail.com",
    workingHours: "By appointment / Official correspondence",
    note: "Official registered office as per Trust Deed and Banking Records with Bank of India, Sihor Branch",
  },
} as const;

export const VERIFIED_IMPACT_METRICS = {
  reportingPeriod: "2005 – Present",
  source: "Swadeep Official Field Records & Annual Reports",
  lastVerified: "October 2026",
  childrenBenefited: "60,000+",
  villagesCovered: "200+",
  icdsCentres: "277",
  primarySchools: "100",
  secondarySchools: "30",
  dentalHealth: "13,000",
  healthAndSafety: "14,000",
  generalHealthCamps: "2,000",
  fishermenSupported: "500",
  coastalVillages: "10",
  solarStreetLights: "1,050",
  infrastructureVillages: "40",
  disasterMasksDistributed: "1,00,000",
  disasterHouseholdsHelped: "1,000",
  summaryStats: [
    { label: "Children Benefited",  value: "60,000+", subtext: "Across 200 Villages",  },
    { label: "ICDS Centres Supported",  value: "277", subtext: "Pre-primary Education",  },
    { label: "Schools Reached",  value: "130", subtext: "100 Primary + 30 Secondary",  },
    { label: "Health Beneficiaries",  value: "27,000+", subtext: "Dental & General Health",  },
    { label: "Fishermen & Livelihood",  value: "500+", subtext: "10 Coastal Villages",  },
    { label: "Solar Street Lights",  value: "1,050", subtext: "40 Rural Villages",  },
  ],
} as const;

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  dropdown?: readonly NavDropdownItem[];
}

export const NAV_LINKS: readonly NavLinkItem[] = [
  {
    label: "Home",
    
    href: "/",
  },
  {
    label: "About Us",
    
    href: "/about",
    dropdown: [
      { label: "Overview",  href: "/about", description: "History, vision, and core principles",  },
      { label: "Our Journey",  href: "/about#our-journey", description: "Grassroots journey from 2005 to present",  },
      { label: "Mission & Vision",  href: "/about#vision-mission", description: "Guiding purpose & empowerment goals",  },
      { label: "Trustees & Leadership",  href: "/about#our-trustees", description: "Governing board & leadership",  },
      { label: "Partners",  href: "/about#partners", description: "Institutional & funding collaborators",  },
    ],
  },
  {
    label: "What We Do",
    
    href: "/programs",
    dropdown: [
      { label: "Overview",  href: "/programs", description: "Overview of all grassroots initiatives",  },
      { label: "Education",  href: "/programs/education", description: "Pre-primary to secondary education & LRC",  },
      { label: "Health",  href: "/programs/health", description: "Project Arogya, dental hygiene & camps",  },
      { label: "Livelihood",  href: "/programs/livelihood", description: "Marine fisheries, SHGs & Sagar Shala",  },
      { label: "Rural Infrastructure",  href: "/programs/infrastructure", description: "Schools, Anganwadi BaLA & solar lights",  },
      { label: "Disaster Management",  href: "/programs/disaster", description: "Relief work, COVID-19 & Tauktae cyclone",  },
    ],
  },
  {
    label: "Resources",
    
    href: "/resources",
    dropdown: [
      { label: "Gallery",  href: "/gallery", description: "All field photographs & project glimpses",  },
      { label: "Videos",  href: "/videos", description: "Official channel video documentation",  },
      { label: "Reports",  href: "/resources", description: "Annual, Audit & FCRA Reports",  },
      { label: "Publications",  href: "/publications", description: "Learning manuals, storybooks & guidelines",  },
      { label: "Brochure",  href: "/brochure/swadeep-brochure.pdf", description: "Official Organization Overview Brochure",  },
    ],
  },
  {
    label: "Get Involved",
    
    href: "/get-involved",
    dropdown: [
      { label: "Donation",  href: "/donation", description: "Tax-exempt support under Section 80G & FCRA",  },
      { label: "Become A Volunteer",  href: "/become-a-volunteer", description: "Join grassroots initiatives in Gujarat",  },
      { label: "Partner with us",  href: "/partner-with-us", description: "Collaborate for impactful grassroots work",  },
      { label: "Career",  href: "/career", description: "Come, be a part of team Swadeep",  },
    ],
  },
  {
    label: "Contact",
    
    href: "/contact",
  },
] as const;

export const FOCUS_AREAS = [
  {
    id: "education",
    title: "Education",
    
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
      { label: "Villages",  count: "200" },
      { label: "ICDS",  count: "277" },
      { label: "Secondary Schools",  count: "30" },
      { label: "Children",  count: "60,000" },
      { label: "Primary Schools",  count: "100" },
    ],
  },
  health: {
    title: "Health",
    
    items: [
      { label: "Villages",  count: "100" },
      { label: "Dental Health",  count: "13,000" },
      { label: "Health & Safety",  count: "14,000" },
      { label: "General Health Camps",  count: "2,000" },
      { label: "Individuals",  count: "6,600" },
    ],
  },
  livelihood: {
    title: "Livelihood",
    
    items: [
      { label: "Villages",  count: "10" },
      { label: "Fishermen",  count: "500" },
      { label: "Women",  count: "100" },
      { label: "Youth",  count: "200" },
      { label: "Children",  count: "130" },
    ],
  },
  infrastructure: {
    title: "Rural Infrastructure Development",
    
    items: [
      { label: "Villages",  count: "40" },
      { label: "School Ground Development",  count: "30" },
      { label: "Solar Lights",  count: "1,050" },
      { label: "ICDS Beautification",  count: "100" },
      { label: "Children",  count: "7,000" },
    ],
  },
  disaster: {
    title: "Disaster Management",
    
    items: [
      { label: "Villages",  count: "27" },
      { label: "Households (Tauktae)",  count: "1,000" },
      { label: "Mask Distribution",  count: "1,00,000" },
      { label: "Ration Kits",  count: "1,000" },
      { label: "Households (Livelihood Support)",  count: "20" },
    ],
  },
} as const;

export const IMPACT_STATS = [
  { value: 60000, suffix: "+", label: "Children",  },
  { value: 200, suffix: "+", label: "Villages",  },
  { value: 277, suffix: "+", label: "ICDS Centres",  },
  { value: 1050, suffix: "+", label: "Solar Lights",  },
] as const;

export const PARTNERS = [
  {
    "id": "part-1",
    "name": "Coastal Gujarat Power Limited (Tata Power)",
    
    "shortName": "CGPL (Tata Power)",
    "category": "Corporate CSR Partner",
    "role": "Integrated Fishermen Development Program 'Sagarbandhu'",
    
    "description": "CGPL's partnership with SWADEEP is based on Specific Community Development Principles aligned with Social Sustainability Strategic intents to serve coastal fishing communities across Mundra and Jafrabad through co-creation, livelihood enhancement, and solar-powered coastal infrastructure.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/Coastal-Gujarat-Power-Litd.-CGPL.jpg",
    "localFile": "coastal-gujarat-power-cgpl.jpg",
    "logo": "/images/partners/coastal-gujarat-power-cgpl.jpg"
  },
  {
    "id": "part-2",
    "name": "American India Foundation (AIF)",
    
    "shortName": "AIF",
    "category": "International Philanthropic Foundation",
    "role": "Education, Learning Resource Centers & Adolescent Girls Empowerment",
    
    "description": "Working in close collaboration with Swadeep to deploy smart community solutions, digital education tools, learning resource centers, and educational kits for underprivileged rural children in Bhavnagar district.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/American-India-Foundation-AIF.jpg",
    "localFile": "american-india-foundation-aif.jpg",
    "logo": "/images/partners/american-india-foundation-aif.jpg"
  },
  {
    "id": "part-3",
    "name": "APM Terminals - Gujarat Pipavav Port Ltd.",
    
    "shortName": "APM Terminals Pipavav",
    "category": "Corporate CSR Partner",
    "role": "Youth Career Guidance, Skill Development & Coastal Community Support",
    
    "description": "Collaborating with Swadeep to conduct youth employment counseling, vocational skills training, community infrastructure development, and education enhancement near Pipavav port area.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/APM-Terminals-Gujarat-Pipavav-Port-Ltd..jpg",
    "localFile": "apm-terminals-pipavav.jpg",
    "logo": "/images/partners/apm-terminals-pipavav.jpg"
  },
  {
    "id": "part-4",
    "name": "GHCL Foundation",
    
    "shortName": "GHCL Foundation",
    "category": "Corporate CSR Foundation",
    "role": "Coastal Community Livelihoods, Women Empowerment & Healthcare",
    
    "description": "Partnering for sustainable coastal community development, self-help groups (SHG) capacity building, rural hygiene programs, and preventive healthcare services in coastal Saurashtra.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/GHCL-Foundation.jpg",
    "localFile": "ghcl-foundation.jpg",
    "logo": "/images/partners/ghcl-foundation.jpg"
  },
  {
    "id": "part-5",
    "name": "Balmer Lawrie & Co. Ltd.",
    
    "shortName": "Balmer Lawrie",
    "category": "Public Sector Undertaking (Govt. of India)",
    "role": "Rural Education Infrastructure, Drinking Water & Sanitation",
    
    "description": "Supporting community drinking water installations, school sanitization, educational equipment, and basic rural infrastructure in aspirational and underserved blocks.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/Balmer-Lawrie-Co-Ltd.jpg",
    "localFile": "balmer-lawrie.jpg",
    "logo": "/images/partners/balmer-lawrie.jpg"
  },
  {
    "id": "part-6",
    "name": "Oil and Natural Gas Corporation (ONGC)",
    
    "shortName": "ONGC",
    "category": "Maharatna PSU (Govt. of India)",
    "role": "Disaster Response, Community Health & Rural Community Assets",
    
    "description": "Mobilizing critical CSR funding for health screening camps, disaster preparedness, medical equipment, and community welfare interventions in coastal and rural Gujarat.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/ONGC.jpg",
    "localFile": "ongc.jpg",
    "logo": "/images/partners/ongc.jpg"
  },
  {
    "id": "part-7",
    "name": "Pipavav Railway Corporation Ltd. (PRCL)",
    
    "shortName": "Pipavav Railway (PRCL)",
    "category": "Infrastructure Joint Venture",
    "role": "Rural School Education & Safe Drinking Water Projects",
    
    "description": "Supporting government primary schools along the rail corridor with smart classroom learning kits, clean water filter systems, and sanitation facilities.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/Pipavav-Railway-Corporation-LTD.jpg",
    "localFile": "pipavav-railway-prcl.jpg",
    "logo": "/images/partners/pipavav-railway-prcl.jpg"
  },
  {
    "id": "part-8",
    "name": "Tata Chemicals Society for Rural Development (TCSRD)",
    
    "shortName": "TCSRD",
    "category": "Corporate CSR Trust",
    "role": "Community Capacity Building, Natural Resource Management & Women SHGs",
    
    "description": "Partnering for biodiversity conservation, community skills, women micro-enterprises, and natural resource management in coastal Okhamandal and adjoining regions.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/TCSRD.jpg",
    "localFile": "tcsrd-tata-chemicals.jpg",
    "logo": "/images/partners/tcsrd-tata-chemicals.jpg"
  },
  {
    "id": "part-9",
    "name": "U.T. Administration of Dadra and Nagar Haveli and Daman and Diu",
    
    "shortName": "U.T. Administration (DNH & DD)",
    "category": "Government Administration",
    "role": "Tribal Education Quality, School Learning Kits & Teacher Training",
    
    "description": "Government of India partner for tangible deliverables in tribal education, Anganwadi strengthening, and community empowerment across Dadra & Nagar Haveli.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/UTAdministration-of-Dadara-and-Nagar-Haveli-and-Daman-and-Diu.jpg",
    "localFile": "ut-admin-dadra-nagar-haveli.jpg",
    "logo": "/images/partners/ut-admin-dadra-nagar-haveli.jpg"
  },
  {
    "id": "part-10",
    "name": "Walwhan Renewable Energy Limited (WREL - Tata Power)",
    
    "shortName": "WREL (Tata Power)",
    "category": "Renewable Energy CSR Partner",
    "role": "Clean Energy Awareness, Rural Solar Lights & School Electrification",
    
    "description": "Supporting solar installations for rural schools, solar street lighting in remote villages, and environmental education workshops.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2021/12/WREL-TATA-Power.jpg",
    "localFile": "wrel-tata-power.jpg",
    "logo": "/images/partners/wrel-tata-power.jpg"
  },
  {
    "id": "part-11",
    "name": "Integrated Child Development Services (ICDS)",
    
    "shortName": "ICDS (Govt. of Gujarat)",
    "category": "State Government Department",
    "role": "277+ Anganwadi Transformation, Toddler Nutrition & BaLA Learning Models",
    
    "description": "Official collaboration with Women & Child Development Department across 277 ICDS centers in Bhavnagar district for early childhood education, preschool learning kits, and toddler nutritional monitoring.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2022/04/ICDS-Logo.png",
    "localFile": "icds-gujarat.png",
    "logo": "/images/partners/icds-gujarat.png"
  },
  {
    "id": "part-12",
    "name": "Samagra Shiksha / Sarva Shiksha Abhiyan (SSA)",
    
    "shortName": "Samagra Shiksha (SSA)",
    "category": "Education Department (Govt. of Gujarat)",
    "role": "Government Primary School Pedagogical Interventions & Drop-out Prevention",
    
    "description": "State education department partner implementing remedial coaching, foundational literacy and numeracy (FLN), and child-friendly learning environments across 100+ rural schools.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2022/04/ssa.png",
    "localFile": "samagra-shiksha-ssa.png",
    "logo": "/images/partners/samagra-shiksha-ssa.png"
  },
  {
    "id": "part-13",
    "name": "Tata Motors",
    
    "shortName": "Tata Motors",
    "category": "Automotive Industry CSR Leader",
    "role": "Automotive Technical Skills, Rural Youth Livelihoods & Safety",
    
    "description": "Partnering with Swadeep to impart vocational automotive repair skills, youth driver training, and livelihood readiness to rural youth in Saurashtra.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2022/08/tata-motors.jpg",
    "localFile": "tata-motors.jpg",
    "logo": "/images/partners/tata-motors.jpg"
  },
  {
    "id": "part-14",
    "name": "Tata Power Community Development Trust (TPCDT)",
    
    "shortName": "TPCDT",
    "category": "Corporate Philanthropic Trust",
    "role": "Holistic Rural Community Transformation & Model Village Development",
    
    "description": "Anchor partner driving integrated socio-economic development, health infrastructure, livelihood security, and community leadership across coastal project villages.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2022/08/TPCDT.jpg",
    "localFile": "tpcdt-tata-power.jpg",
    "logo": "/images/partners/tpcdt-tata-power.jpg"
  },
  {
    "id": "part-15",
    "name": "Astral Foundation",
    
    "shortName": "Astral Foundation",
    "category": "Corporate CSR Foundation",
    "role": "Safe Drinking Water, School Sanitation & Pipe Infrastructure",
    
    "description": "Pioneering access to safe drinking water, modern school sanitation complexes, and pipeline infrastructure in rural schools and community Anganwadis.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2024/05/Logo-Astral-Foundation.jpg",
    "localFile": "astral-foundation.jpg",
    "logo": "/images/partners/astral-foundation.jpg"
  },
  {
    "id": "part-16",
    "name": "Murugappa Group",
    
    "shortName": "Murugappa Group",
    "category": "Diversified Industrial Conglomerate",
    "role": "Agritech Livelihoods, Farm Community Support & Child Education",
    
    "description": "Collaborating on agricultural livelihood improvements, farm community soil & nutrition awareness, and primary school learning support initiatives.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2026/01/murugappa.png",
    "localFile": "murugappa-group.png",
    "logo": "/images/partners/murugappa-group.png"
  },
  {
    "id": "part-17",
    "name": "Coromandel International Limited",
    
    "shortName": "Coromandel",
    "category": "Agricultural Solutions & CSR Partner",
    "role": "Sustainable Agriculture, Farmer Training & Rural Healthcare Camps",
    
    "description": "Partnering for eco-friendly farming practices, village health camps, soil health awareness, and educational equipment support for rural children in agricultural belts.",
    
    "url": "https://www.swadeep.org/wp-content/uploads/2026/01/coromandal-768x427-1.webp",
    "localFile": "coromandel-international.webp",
    "logo": "/images/partners/coromandel-international.webp"
  }
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Coastal Gujarat Power Limited (Tata Power) – CGPL’s partnership with SWADEEP is based on Specific Community Development Principle which is further aligned with the Social Sustainability Strategic intents to serve the community in a systematic manner through co-creation, effective planning, bridging the gap, Unique innovations, and Participatory learning in an Inclusive approach for getting the desired results in the field. Together, we aspire to bring the desired transformation through effective partnership and continued collaboration. It is always a matter of privilege to have been associated with SWADEEP and its efforts in the field. Our association with SWADEEP has only grown stronger over the years and has become an integral part of CGPL’s Integrated Fishermen Development Program titled 'Sagarbandhu'.",
    name: "Pradeep Kumar Ghosal",
    role: "Head – Environment, CR & Sustainability, Coastal Gujarat Power Ltd. (TATA Power)",
    category: "Funding Partners",
    image: "/images/reviews/pradeep-kumar-ghosal.png",
  },
  {
    quote:
      "Working with an NGO like Swadeep which has a vast & logical understanding of communities and smart solutions for the problems of the region they serve is great. American India Foundation always appreciates the pure and honest efforts made towards lifting up the livelihoods of people and surely Swadeep is one of those who deserve one.",
    name: "American India Foundation (AIF)",
    role: "Funding & Implementation Partner",
    category: "Funding Partners",
    image: "/images/reviews/aif-logo.png",
  },
  {
    quote:
      "We have worked with the Swadeep on the projects of Education and Community Development for a long time and have been able to see a clear impact on the community through tangible deliverables. We would love to applaud for team Swadeep for their incredible efforts in the betterment of the U/T Dadra and Nagar Haveli.",
    name: "U.T. Administration of Dadra and Nagar Haveli and Daman and Diu",
    role: "Government of India",
    category: "Government Partner",
    image: "/images/reviews/dnh-logo.png",
  },
] as const;

export const BANKING_DETAILS = {
  taxBenefitText:
    "Swadeep Shikshan Vikas Sanstha is a registered non-profit organization. Donations made to the organization are eligible for tax exemption under Section 80G of the Income Tax Act.",
  taxExemptionSection: "Section 80G",
  pan: "AAKTS6375E",
  fcraNumber: "041980081",
  trustRegistrationNo: "E/1739/Bhavnagar",
  receiptSteps: [
    {
      step: "01",
      title: "Direct Bank Transfer",
      
      description:
        "Transfer your donation directly using the domestic (NEFT / RTGS / IMPS) or foreign FCRA bank account details given below.",
      
    },
    {
      step: "02",
      title: "Share UTR & Donor Details",
      
      description:
        "Email your transfer confirmation / UTR reference number along with your Full Legal Name, PAN number, Postal Address, and Phone Number to donation@swadeep.org.",
      
    },
    {
      step: "03",
      title: "Receive 80G Tax Exemption Certificate",
      
      description:
        "Our accounts team will verify the remittance and issue an official stamped 80G donation receipt and certificate via email within 5 to 7 working days.",
      
    },
  ],
  domestic: {
    accountName: "SWADEEP SHIKSHAN VIKAS SANSTHA",
    bankName: "Bank of India",
    address: "Bhavnagar, Gujarat",
    branch: "SIHOR (Branch Code: 003208)",
    accountNumber: "320810110005282",
    ifsc: "BKID0003208",
    micr: "364013051",
    accountType: "Current / Savings Account",
    currency: "INR (Indian Rupees)",
  },
  fcra: {
    registrationNumber: "041980081",
    bankName: "State Bank of India",
    branch: "SBI New Delhi Main Branch, (00691)",
    accountNumber: "40102583793",
    accountType: "FCRA Designated Savings Account",
    ifsc: "SBIN0000691",
    swift: "SBININBB104",
    address:
      "SBI New Delhi Main Branch, FCRA. Foreign Exchange Division, 11, Parliament Street, New Delhi- 110001.",
    currency: "Foreign Currencies (USD, GBP, EUR, etc.)",
  },
  chequeDetails:
    "You may also send a cheque or demand draft in favour of 'Swadeep Shikshan Vikas Sanstha' payable at Ahmedabad to: SWADEEP, 21, Abhinandan Park Society, Prernatirth Derasar Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015. Contact: Kalyan Dangar (09428309408).",
  feedbackEmail: "donation@swadeep.org",
  donorHelpline: "+91-942-830-9408",
  contactPerson: "Kalyan Dangar",
} as const;

export interface TrusteeMember {
  name: string;
  role: string;
  category: "Chairman" | "CEO" | "Trustee";
  description: string;
  highlight?: boolean;
  image?: string;
}

export const TRUSTEES: readonly TrusteeMember[] = [
  {
    name: "Patubhai Ahir",
    
    role: "Chairman",
    
    category: "Chairman",
    description:
      "Chairman of Swadeep Shikshan Vikas Sanstha, guiding organization governance and community welfare.",
    highlight: true,
  },
  {
    name: "Kalyanbhai V. Dangar",
    
    role: "Chief Executive Officer",
    
    category: "CEO",
    description:
      "Chief Executive Officer and driving force behind Swadeep since 2005, leading strategic partnerships and field execution.",
    highlight: true,
  },
  {
    name: "Divaliben Solnki",
    
    role: "Trustee",
    
    category: "Trustee",
    description:
      "Trustee supporting community initiatives and women empowerment.",
  },
  {
    name: "Pathik V Patel",
    
    role: "Trustee",
    
    category: "Trustee",
    description:
      "Trustee contributing to institutional governance and organizational development.",
  },
  {
    name: "Jasvantbhai M. Chauhan",
    
    role: "Trustee",
    
    category: "Trustee",
    description:
      "Trustee advising on educational programs and rural school community linkages.",
  },
  {
    name: "Shailesh Khamal",
    
    role: "Trustee",
    
    category: "Trustee",
    description:
      "Trustee assisting with community mobilization and youth training initiatives.",
  },
  {
    name: "Vinodbhai Solanki",
    
    role: "Trustee",
    
    category: "Trustee",
    description:
      "Trustee overseeing field interventions, livelihood programs, and grassroots disaster response.",
  },
] as const;

export interface YouTubeVideoItem {
  id: string;
  title: string;
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
    
    description: "Hands-on capacity building workshop training ICDS Anganwadi workers in participatory pedagogy, musical rhymes, and child interaction.",
    category: "Anganwadi & ICDS Training",
    duration: "9:36",
    timeAgo: "1 week ago",
    isFeatured: true,
  },
  {
    id: "bGyVtZGVnqA",
    title: "Foundational Literacy & Writing Skills in Anganwadi",
    
    description: "Early childhood development session focusing on fine motor skills, pencil grip, and foundational writing confidence.",
    category: "Education & Foundational Literacy",
    duration: "2:05",
    timeAgo: "3 weeks ago",
    isFeatured: true,
  },
  {
    id: "xrRMVGzzm-Y",
    title: "Interactive Vegetable & Nutrition Awareness for Children",
    
    description: "Engaging rural students through playful sensory exercises to identify fresh vegetables and understand balanced daily nutrition.",
    category: "Health & Nutrition",
    duration: "3:55",
    timeAgo: "1 month ago",
    isFeatured: true,
  },
  {
    id: "-FfJ9skQHBE",
    title: "ICDS Worker Capacity Building & Classroom Rhymes",
    
    description: "Empowering frontline community workers with joyful musical techniques to enhance classroom retention in rural Anganwadis.",
    category: "Anganwadi & ICDS Training",
    duration: "2:55",
    timeAgo: "1 month ago",
    isFeatured: false,
  },
  {
    id: "1Mi1bRm9oBI",
    title: "Creative Paper Art & Craft Activity for School Children",
    
    description: "Fostering creativity, cognitive agility, and artistic flair in village students using paper cutting and craft exercises.",
    category: "Education & Foundational Literacy",
    duration: "2:56",
    timeAgo: "1 month ago",
    isFeatured: false,
  },
  {
    id: "MrMnSK00440",
    title: "Experiential Grain & Nutrition Identification Using Flash Cards",
    
    description: "Building agricultural and nutritional literacy by helping children identify native grains, millets, and pulses.",
    category: "Health & Nutrition",
    duration: "4:24",
    timeAgo: "1 month ago",
    isFeatured: false,
  },
  {
    id: "F-lzs2vesaU",
    title: "Cognitive Color Sorting & Motor Skill Competition",
    
    description: "Exciting group game developing color recognition, speed, and motor coordination among pre-school learners.",
    category: "Child Development & Activities",
    duration: "2:26",
    timeAgo: "3 weeks ago",
    isFeatured: false,
  },
  {
    id: "7Dkp95eFwVk",
    title: "Team Coordination & Agility Balloon Challenge",
    
    description: "Playful team activities inspiring collaboration, patience, and joyful sportsmanship in rural schools.",
    category: "Child Development & Activities",
    duration: "0:46",
    timeAgo: "2 months ago",
    isFeatured: false,
  },
  {
    id: "lEqG7ZXw_Dc",
    title: "Joyful English Alphabet Learning Through Movement",
    
    description: "Foundational English alphabet phonetics and letter recognition introduced through rhythm and dance.",
    category: "Education & Foundational Literacy",
    duration: "1:02",
    timeAgo: "2 months ago",
    isFeatured: false,
  },
  {
    id: "OWKiwpk_s9Y",
    title: "Folk Storytelling & Moral Value Education in Gujarati",
    
    description: "Traditional moral stories reinforcing empathy, family respect, and community harmony among young listeners.",
    category: "Culture & Community",
    duration: "8:00",
    timeAgo: "3 weeks ago",
    isFeatured: false,
  },
  {
    id: "XNWDtwLrmzo",
    title: "Life Lessons & Principles of Mahatma Gandhi",
    
    description: "Inspiring youth dialogues on cleanliness, non-violence, truth, and community service rooted in Gandhian thoughts.",
    category: "Culture & Community",
    duration: "1:24",
    timeAgo: "2 weeks ago",
    isFeatured: false,
  },
  {
    id: "wqV7dwGuUKU",
    title: "Healthy Vegetable Song & Nutritional Wellness",
    
    description: "Encouraging wholesome nutrition and dietary awareness through traditional musical folklore.",
    category: "Health & Nutrition",
    duration: "2:05",
    timeAgo: "2 months ago",
    isFeatured: false,
  },
] as const;
