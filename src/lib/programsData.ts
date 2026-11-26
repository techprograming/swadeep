// Comprehensive, verified program details for Swadeep's 5 focus areas
// Strictly adheres to authentic organizational records from swadeep.org and field documentation.

export interface ProgramDetail {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  statsBanner: { label: string; value: string }[];
  communityNeed: {
    title: string;
    description: string;
    points: { en: string }[];
  };
  approachAndActivities: {
    title: string;
    description: string;
    activities: { title: string; desc: string }[];
  };
  targetGroupsAndScope: {
    targetGroups: { en: string }[];
    locations: { en: string }[];
    reportingPeriod: string;
  };
  verifiedOutcomes: {
    metric: string;
    value: string;
    details: string;
  }[];
  relatedVideoIds: string[];
  relatedReportTitle: string;
}

export const PROGRAMS_DATA: Record<string, ProgramDetail> = {
  education: {
    slug: "education",
    title: "Education & Foundational Learning",
    
    eyebrow: "Early Childhood to High School",
    
    summary:
      "Education is one of the most powerful instruments for reducing poverty and inequality. Starting the efforts from pre-primary education (Anganwadis), Swadeep has extended through primary to higher secondary schools, ensuring children from vulnerable communities build strong foundational literacy and complete their schooling.",
    
    image: "/images/education.jpg",
    statsBanner: [
      { label: "Children Benefited", value: "60,000+",  },
      { label: "Villages Covered", value: "200+",  },
      { label: "ICDS Centres Supported", value: "277",  },
      { label: "Schools Reached", value: "130",  },
    ],
    communityNeed: {
      title: "The Grassroots Challenge",
      
      description:
        "In rural and tribal belts of Gujarat, children often face significant learning gaps in foundational reading, writing, and numeracy. Frontline Anganwadi workers lack continuous interactive pedagogy training, while first-generation learners require supplementary after-school coaching to prevent school dropouts.",
      
      points: [
        {
          en: "Early childhood development gaps in rural Anganwadi centres",
          
        },
        {
          en: "Drop-out risks among marginalized students transitioning to secondary school",
          
        },
        {
          en: "Need for experiential, child-friendly learning pedagogy and action songs",
          
        },
      ],
    },
    approachAndActivities: {
      title: "Our Holistic Educational Approach",
      
      description:
        "We implement an integrated model combining classroom infrastructure enhancement, teacher training, community parental mobilization, and Learning Resource Centres (LRC).",
      
      activities: [
        {
          title: "Learning Resource Centres (LRC)",
          
          desc: "Establishing community learning hubs with reading libraries, digital tools, and activity-based learning modules.",
          
        },
        {
          title: "Anganwadi Worker Capacity Building",
          
          desc: "Conducting hands-on pedagogical workshops on early child cognitive stimulation, action rhymes, and motor skill exercises.",
          
        },
        {
          title: "High School Retention & Career Guidance",
          
          desc: "Mentoring adolescent students with foundational subject coaching and career counseling in partnership with APM Terminals and AIF.",
          
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Pre-primary children (3-6 years) in ICDS Anganwadis",  },
        { en: "Primary and secondary school students",  },
        { en: "Anganwadi workers & community educators",  },
      ],
      locations: [
        { en: "Ahmedabad District",  },
        { en: "Bhavnagar & Sihor taluka",  },
        { en: "Amreli (Rajula & Jafrabad)",  },
        { en: "U.T. Dadra and Nagar Haveli",  },
      ],
      reportingPeriod: "2005 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Children Benefited",
        
        value: "60,000+",
        details: "Direct learning interventions across primary and secondary levels.",
        
      },
      {
        metric: "ICDS Centres Strengthened",
        
        value: "277",
        details: "Equipped with educational wall art (BaLA) and worker training.",
        
      },
      {
        metric: "Schools Covered",
        
        value: "130",
        details: "100 primary schools and 30 secondary schools supported.",
        
      },
    ],
    relatedVideoIds: ["RwLPnssozZk", "bGyVtZGVnqA", "lEqG7ZXw_Dc"],
    relatedReportTitle: "Swadeep Education Interventions & LRC Field Summary",
  },

  health: {
    slug: "health",
    title: "Healthcare, Dental Care & Safety",
    
    eyebrow: "Awareness • Prevention • Cure",
    
    summary:
      "Awareness – Prevention – Cure – more Prevention is Swadeep's operational philosophy. We bring essential healthcare, dental hygiene camps, malnutrition screening, and health and safety workshops to underprivileged rural and coastal communities.",
    
    image: "/images/health.jpg",
    statsBanner: [
      { label: "Dental Health Beneficiaries", value: "13,000",  },
      { label: "Health & Safety Participants", value: "14,000",  },
      { label: "General Health Camps", value: "2,000",  },
      { label: "Villages Reached", value: "100",  },
    ],
    communityNeed: {
      title: "Healthcare Realities in Underserved Areas",
      
      description:
        "Rural villages and coastal fishing hamlets often lack accessible dental care and preventive diagnostics. High fluoride levels in groundwater lead to widespread fluorosis and early tooth decay, while preventive hygiene practices require continuous community awareness.",
      
      points: [
        {
          en: "Severe prevalence of dental caries and dental fluorosis among rural school children",
          
        },
        {
          en: "Lack of basic diagnostic facilities in remote hamlets",
          
        },
        {
          en: "Need for systematic maternal and child nutritional counselling",
          
        },
      ],
    },
    approachAndActivities: {
      title: "Grassroots Healthcare Methodology",
      
      description:
        "We mobilize qualified medical professionals and dentists directly to community doorsteps and schools, paired with actionable hygiene toolkits.",
      
      activities: [
        {
          title: "Comprehensive Dental Hygiene Drives",
          
          desc: "Conducting professional dental checkups, cavity screenings, and distribution of toothbrushes and oral care kits across 100 villages.",
          
        },
        {
          title: "Project Arogya & General Medical Camps",
          
          desc: "General wellness screenings, hemoglobin tests for adolescent girls, and timely referrals to primary health centres (PHCs).",
          
        },
        {
          title: "Child Nutrition & WASH Awareness",
          
          desc: "Interactive nutrition workshops using flashcards, local millets, and demonstrations of proper handwashing steps.",
          
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "School children and Anganwadi infants",  },
        { en: "Adolescent girls and rural mothers",  },
        { en: "Elderly and daily wage workers",  },
      ],
      locations: [
        { en: "100 Villages across Bhavnagar & Amreli",  },
        { en: "Coastal Fishermen Settlements in Kutch & Amreli",  },
      ],
      reportingPeriod: "2005 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Dental Patients Examined",
        
        value: "13,000",
        details: "Screened and provided preventative oral hygiene kits.",
        
      },
      {
        metric: "Health & Safety Participants",
        
        value: "14,000",
        details: "Workshops covering occupational safety, hygiene, and wellness.",
        
      },
      {
        metric: "General Medical Camps Conducted",
        
        value: "2,000",
        details: "Organized across 100 rural villages in Gujarat.",
        
      },
    ],
    relatedVideoIds: ["xrRMVGzzm-Y", "MrMnSK00440", "wqV7dwGuUKU"],
    relatedReportTitle: "Swadeep Community Health & Oral Hygiene Field Evaluation",
  },

  livelihood: {
    slug: "livelihood",
    title: "Livelihood & Coastal Fishermen Development",
    
    eyebrow: "Sagarbandhu Project • Sustainable Incomes",
    
    summary:
      "Swadeep empowers coastal fishermen communities in Mundra (Kutch) and Jafrabad (Amreli) through technical training, safety gear, fisheries information centres, and women Self-Help Groups (SHGs). In partnership with Coastal Gujarat Power Limited (Tata Power), project 'Sagarbandhu' fosters sustainable marine livelihoods.",
    
    image: "/images/livelihood.jpg",
    statsBanner: [
      { label: "Fishermen Supported", value: "500",  },
      { label: "Coastal Villages", value: "10",  },
      { label: "Women in Self-Help Groups", value: "100",  },
      { label: "Youth Trained", value: "200",  },
    ],
    communityNeed: {
      title: "Challenges in Traditional Marine Fisheries",
      
      description:
        "Small-scale traditional pagadiya and boat fishermen face extreme weather vulnerabilities, fluctuating market rates, lack of GPS/safety equipment, and seasonal unemployment during monsoon fishing bans.",
      
      points: [
        {
          en: "Extreme safety hazards during offshore fishing without modern navigational aid",
          
        },
        {
          en: "Middlemen exploitation and inadequate cold storage / fish drying infrastructure",
          
        },
        {
          en: "Need for women's financial inclusion and non-fishing income diversification",
          
        },
      ],
    },
    approachAndActivities: {
      title: "Strategic Marine Livelihood Interventions",
      
      description:
        "Building a multi-pronged ecosystem encompassing port safety infrastructure, women empowerment, child education in coastal settlements, and linkage to government subsidies.",
      
      activities: [
        {
          title: "Fisheries Information Centre at Tragadi Port",
          
          desc: "Operating a dedicated port information hub providing weather alerts, potential fishing zones (PFZ) data, and government welfare schemes.",
          
        },
        {
          title: "Safety Equipment & Insulated Ice Boxes",
          
          desc: "Supplying life jackets, floating buoys, navigation torches, and insulated boxes to maintain catch freshness and market value.",
          
        },
        {
          title: "Women Self-Help Groups (SHGs)",
          
          desc: "Forming 3 registered women's SHGs (100 women) with micro-credit linkages, dry fish packaging, and handicraft income generation.",
          
        },
        {
          title: "Sagar Shala for Migrant Children",
          
          desc: "Operating seasonal coastal schools for 120+ children of migratory fishermen families right at the coastal bandars.",
          
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Traditional boat and Pagadiya fishermen",  },
        { en: "Coastal fisherwomen and youth",  },
        { en: "Children in seasonal fishing hamlets",  },
      ],
      locations: [
        { en: "Mundra Coastal Belt, Kutch",  },
        { en: "Tragadi Port, Kutch",  },
        { en: "Jafrabad Coastal Region, Amreli",  },
      ],
      reportingPeriod: "2012 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Fishermen Households Supported",
        
        value: "500",
        details: "Direct equipment, safety, and capacity enhancement.",
        
      },
      {
        metric: "Coastal Villages Covered",
        
        value: "10",
        details: "Active interventions across Kutch and Amreli coast.",
        
      },
      {
        metric: "Women In Self-Help Groups",
        
        value: "100",
        details: "Organized across 3 sustainable SHGs with micro-credit.",
        
      },
      {
        metric: "Children Enrolled in Sagar Shala",
        
        value: "130",
        details: "Continued learning during seasonal coastal migration.",
        
      },
    ],
    relatedVideoIds: ["F-lzs2vesaU", "7Dkp95eFwVk", "OWKiwpk_s9Y"],
    relatedReportTitle: "Project Sagarbandhu: Integrated Coastal Development Report",
  },

  infrastructure: {
    slug: "infrastructure",
    title: "Rural Infrastructure & Community Transformation",
    
    eyebrow: "Schools • Anganwadis • Solar Energy",
    
    summary:
      "A healthy, inspiring physical environment motivates learning and community progress. Swadeep enhances school grounds, transforms Anganwadis through Building as Learning Aid (BaLA) educational wall art, and installs solar street lights across rural villages.",
    
    image: "/images/infrastructure.jpg",
    statsBanner: [
      { label: "Solar Street Lights Installed", value: "1,050",  },
      { label: "Villages Transformed", value: "40",  },
      { label: "School Grounds Developed", value: "30",  },
      { label: "ICDS Beautifications", value: "100",  },
    ],
    communityNeed: {
      title: "Infrastructure Gaps in Rural Gujarat",
      
      description:
        "Many rural primary schools lacked levelled sports grounds, functional sanitation units, and engaging classroom walls. Unlit village streets posed safety risks for women and children after sundown, demanding clean, renewable energy solutions.",
      
      points: [
        {
          en: "Unpaved and uneven school premises causing injuries during sports",
          
        },
        {
          en: "Dull Anganwadi rooms unsupportive of early childhood sensory stimulation",
          
        },
        {
          en: "Inadequate street lighting in interior hamlets affecting village safety",
          
        },
      ],
    },
    approachAndActivities: {
      title: "Community-Driven Infrastructure Development",
      
      description:
        "We engage village panchayats, school management committees (SMCs), and corporate CSR partners to construct durable, eco-friendly assets.",
      
      activities: [
        {
          title: "Solar Street Lighting Installations",
          
          desc: "Erecting 1,050 high-efficiency solar street lighting poles across 40 villages, ensuring reliable illumination with zero grid electricity costs.",
          
        },
        {
          title: "School Playground & Sports Development",
          
          desc: "Levelling grounds, planting shade trees, and creating sports courts across 30 rural schools in Rajula taluka.",
          
        },
        {
          title: "Building as Learning Aid (BaLA) Anganwadis",
          
          desc: "Painting 100 Anganwadi centres with pedagogical illustrations, alphabet trains, and height charts benefiting over 7,000 children.",
          
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Rural village residents and youth",  },
        { en: "Primary school students and Anganwadi children",  },
        { en: "Village Panchayats and local institutions",  },
      ],
      locations: [
        { en: "40 Villages in Rajula & Jafrabad (Amreli)",  },
        { en: "Selected villages in Bhavnagar & Kutch",  },
      ],
      reportingPeriod: "2015 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Solar Street Lights Installed",
        
        value: "1,050",
        details: "Clean solar illumination installed across 40 villages.",
        
      },
      {
        metric: "Villages Transformed",
        
        value: "40",
        details: "Benefiting thousands of rural citizens every night.",
        
      },
      {
        metric: "School Grounds Developed",
        
        value: "30",
        details: "Safe, levelled playgrounds encouraging rural athletics.",
        
      },
      {
        metric: "Children Benefited from BaLA",
        
        value: "7,000",
        details: "Enrolled in 100 newly beautified Anganwadis.",
        
      },
    ],
    relatedVideoIds: ["1Mi1bRm9oBI", "-FfJ9skQHBE", "RwLPnssozZk"],
    relatedReportTitle: "Swadeep Rural Infrastructure & Renewable Energy Report",
  },

  disaster: {
    slug: "disaster",
    title: "Disaster Preparedness, Relief & Rehabilitation",
    
    eyebrow: "Rapid Emergency Response Since 2005",
    
    summary:
      "Serving humankind physically, socially, emotionally, and economically during natural calamities. Swadeep's disaster management team has responded in the frontline during the Kutch earthquake, Kashmir earthquake, Nagapattinam Tsunami, Surat flood, COVID-19 pandemic, and Cyclone Tauktae.",
    
    image: "/images/safety.jpg",
    statsBanner: [
      { label: "COVID-19 Protective Masks", value: "1,00,000",  },
      { label: "Cyclone Tauktae Villages", value: "27",  },
      { label: "Emergency Ration Kits", value: "1,000",  },
      { label: "Livelihood Restorations", value: "20+",  },
    ],
    communityNeed: {
      title: "Vulnerability to Climate & Natural Crises",
      
      description:
        "Gujarat's coastal and rural belt is intensely exposed to cyclonic storms, extreme flooding, and seismic disturbances. Immediate relief with food grains, medical hygiene kits, and rebuilding damaged livelihoods is critical for community survival.",
      
      points: [
        {
          en: "Severe destruction of coastal dwellings and fishing boats during severe cyclones",
          
        },
        {
          en: "Acute food and drinking water shortages immediately following calamities",
          
        },
        {
          en: "Pandemic health emergencies and livelihood disruption for migrant workers",
          
        },
      ],
    },
    approachAndActivities: {
      title: "Agile Grassroots Disaster Response",
      
      description:
        "Swadeep operates rapid assessment teams in coordination with district disaster management authorities (DDMA) and local village sarpanches to deliver timely relief without duplication.",
      
      activities: [
        {
          title: "Cyclone Tauktae Emergency Relief",
          
          desc: "Reached 27 coastal villages in Rajula and Jafrabad talukas, distributing 1,000 emergency ration kits, solar lanterns, and tarpaulin roofing sheets.",
          
        },
        {
          title: "COVID-19 Pandemic Response & Mask Production",
          
          desc: "Mobilized rural women self-help groups to sew and distribute 1,00,000 certified cotton masks, along with food ration packets to vulnerable families.",
          
        },
        {
          title: "Long-Term Livelihood Rehabilitation",
          
          desc: "Assisting severely impacted fishermen and artisans with boat repair grants, tool replacement, and linkage to state disaster relief funds.",
          
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Cyclone and flood affected coastal families",  },
        { en: "Daily wage earners, widows, and elderly households",  },
        { en: "Frontline health and village workers",  },
      ],
      locations: [
        { en: "27 Coastal Villages in Rajula & Jafrabad",  },
        { en: "Past missions: Kutch, Surat, Nagapattinam",  },
      ],
      reportingPeriod: "2005 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Villages Supported in Cyclone Tauktae",
        
        value: "27",
        details: "Immediate rescue, debris clearing, and emergency provisions.",
        
      },
      {
        metric: "Households Provided Emergency Rations",
        
        value: "1,000",
        details: "Wholesome food grains and cooking supplies distributed.",
        
      },
      {
        metric: "Masks Distributed During COVID-19",
        
        value: "1,00,000",
        details: "Produced by village women SHGs and distributed free.",
        
      },
      {
        metric: "Livelihood Restorations",
        
        value: "20+",
        details: "Boats and equipment repaired for affected fishermen.",
        
      },
    ],
    relatedVideoIds: ["XNWDtwLrmzo", "1Mi1bRm9oBI", "-FfJ9skQHBE"],
    relatedReportTitle: "Swadeep Cyclone Tauktae & Disaster Response Evaluation",
  },
};
