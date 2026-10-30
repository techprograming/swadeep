// Comprehensive, verified program details for Swadeep's 5 focus areas
// Strictly adheres to authentic organizational records from swadeep.org and field documentation.

export interface ProgramDetail {
  slug: string;
  title: string;
  titleGu: string;
  eyebrow: string;
  eyebrowGu: string;
  summary: string;
  summaryGu: string;
  image: string;
  statsBanner: { label: string; value: string; labelGu: string }[];
  communityNeed: {
    title: string;
    titleGu: string;
    description: string;
    descriptionGu: string;
    points: { en: string; gu: string }[];
  };
  approachAndActivities: {
    title: string;
    titleGu: string;
    description: string;
    descriptionGu: string;
    activities: { title: string; titleGu: string; desc: string; descGu: string }[];
  };
  targetGroupsAndScope: {
    targetGroups: { en: string; gu: string }[];
    locations: { en: string; gu: string }[];
    reportingPeriod: string;
  };
  verifiedOutcomes: {
    metric: string;
    metricGu: string;
    value: string;
    details: string;
    detailsGu: string;
  }[];
  relatedVideoIds: string[];
  relatedReportTitle: string;
}

export const PROGRAMS_DATA: Record<string, ProgramDetail> = {
  education: {
    slug: "education",
    title: "Education & Foundational Learning",
    titleGu: "શિક્ષણ અને પાયાનું અધ્યયન",
    eyebrow: "Early Childhood to High School",
    eyebrowGu: "પૂર્વ-પ્રાથમિકથી માધ્યમિક શિક્ષણ",
    summary:
      "Education is one of the most powerful instruments for reducing poverty and inequality. Starting the efforts from pre-primary education (Anganwadis), Swadeep has extended through primary to higher secondary schools, ensuring children from vulnerable communities build strong foundational literacy and complete their schooling.",
    summaryGu:
      "શિક્ષણ એ ગરીબી અને અસમાનતા ઘટાડવાનું સૌથી સક્ષમ સાધન છે. પૂર્વ-પ્રાથમિક શિક્ષણ (આંગણવાડી) થી શરૂ કરીને સ્વદીપે ઉચ્ચતર માધ્યમિક સુધીના વિદ્યાર્થીઓ માટે પાયાનું શિક્ષણ મજબૂત બનાવ્યું છે.",
    image: "/images/education.jpg",
    statsBanner: [
      { label: "Children Benefited", value: "60,000+", labelGu: "લાભાર્થી બાળકો" },
      { label: "Villages Covered", value: "200+", labelGu: "સહાયક ગામડાંઓ" },
      { label: "ICDS Centres Supported", value: "277", labelGu: "આંગણવાડી કેન્દ્રો" },
      { label: "Schools Reached", value: "130", labelGu: "શાળાઓ" },
    ],
    communityNeed: {
      title: "The Grassroots Challenge",
      titleGu: "ક્ષેત્રીય પડકારો અને જરૂરિયાત",
      description:
        "In rural and tribal belts of Gujarat, children often face significant learning gaps in foundational reading, writing, and numeracy. Frontline Anganwadi workers lack continuous interactive pedagogy training, while first-generation learners require supplementary after-school coaching to prevent school dropouts.",
      descriptionGu:
        "ગ્રામીણ અને પછાત વિસ્તારોમાં બાળકોને પાયાના વાંચન, લેખન અને ગણિતમાં મુશ્કેલી પડે છે. આંગણવાડી બહેનોને પ્રવૃત્તિ આધારિત તાલીમ અને બાળકોને શાળા પછીના શિક્ષણની તાતી જરૂર હોય છે.",
      points: [
        {
          en: "Early childhood development gaps in rural Anganwadi centres",
          gu: "આંગણવાડી કેન્દ્રોમાં પૂર્વ-પ્રાથમિક શૈક્ષણિક સાધનોની અછત",
        },
        {
          en: "Drop-out risks among marginalized students transitioning to secondary school",
          gu: "માધ્યમિક શાળામાં પ્રવેશ વખતે વિદ્યાર્થીઓનો શાળા છોડવાનો દર",
        },
        {
          en: "Need for experiential, child-friendly learning pedagogy and action songs",
          gu: "બાળગીતો અને પ્રવૃત્તિ દ્વારા રમતા રમતા શિક્ષણની જરૂરિયાત",
        },
      ],
    },
    approachAndActivities: {
      title: "Our Holistic Educational Approach",
      titleGu: "અમારી કાર્યપદ્ધતિ અને મુખ્ય પ્રવૃત્તિઓ",
      description:
        "We implement an integrated model combining classroom infrastructure enhancement, teacher training, community parental mobilization, and Learning Resource Centres (LRC).",
      descriptionGu:
        "અમે વર્ગખંડ સુધારણા, આંગણવાડી કાર્યકર તાલીમ, વાલી સંવાદ અને લર્નિંગ રિસોર્સ સેન્ટર (LRC) દ્વારા સર્વાંગી શિક્ષણ આપીએ છીએ.",
      activities: [
        {
          title: "Learning Resource Centres (LRC)",
          titleGu: "લર્નિંગ રિસોર્સ સેન્ટર્સ (LRC)",
          desc: "Establishing community learning hubs with reading libraries, digital tools, and activity-based learning modules.",
          descGu: "વાંચનાલય, શૈક્ષણિક રમકડાં અને ડિજિટલ સાધનોથી સજ્જ સમુદાય શિક્ષણ કેન્દ્રો.",
        },
        {
          title: "Anganwadi Worker Capacity Building",
          titleGu: "આંગણવાડી બહેનોની તાલીમ",
          desc: "Conducting hands-on pedagogical workshops on early child cognitive stimulation, action rhymes, and motor skill exercises.",
          descGu: "બાળગીતો, વાર્તાકથન અને સર્જનાત્મક પ્રવૃત્તિઓ અંગે આંગણવાડી કાર્યકરો માટે કાર્યશાળાઓ.",
        },
        {
          title: "High School Retention & Career Guidance",
          titleGu: "માધ્યમિક શિક્ષણ સહાય અને કારકિર્દી માર્ગદર્શન",
          desc: "Mentoring adolescent students with foundational subject coaching and career counseling in partnership with APM Terminals and AIF.",
          descGu: "કિશોરો માટે વિષયવાર માર્ગદર્શન અને ભાવિ કારકિર્દી વિકલ્પોનું પરામર્શ.",
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Pre-primary children (3-6 years) in ICDS Anganwadis", gu: "આંગણવાડીના પૂર્વ-પ્રાથમિક બાળકો (૩ થી ૬ વર્ષ)" },
        { en: "Primary and secondary school students", gu: "પ્રાથમિક અને માધ્યમિક શાળાઓના વિદ્યાર્થીઓ" },
        { en: "Anganwadi workers & community educators", gu: "આંગણવાડી કાર્યકરો અને ગ્રામીણ શિક્ષકો" },
      ],
      locations: [
        { en: "Ahmedabad District", gu: "અમદાવાદ જિલ્લો" },
        { en: "Bhavnagar & Sihor taluka", gu: "ભાવનગર અને શિહોર તાલુકો" },
        { en: "Amreli (Rajula & Jafrabad)", gu: "અમરેલી (રાજુલા અને જાફરાબાદ)" },
        { en: "U.T. Dadra and Nagar Haveli", gu: "દાદરા અને નગર હવેલી" },
      ],
      reportingPeriod: "2005 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Children Benefited",
        metricGu: "લાભાર્થી બાળકો",
        value: "60,000+",
        details: "Direct learning interventions across primary and secondary levels.",
        detailsGu: "પ્રાથમિક અને માધ્યમિક સ્તરે સીધો શૈક્ષણિક લાભ મેળવનાર બાળકો.",
      },
      {
        metric: "ICDS Centres Strengthened",
        metricGu: "સહાયક આંગણવાડી કેન્દ્રો",
        value: "277",
        details: "Equipped with educational wall art (BaLA) and worker training.",
        detailsGu: "બાલા વોલ પેઇન્ટિંગ અને તાલીમથી સુસજ્જ આંગણવાડીઓ.",
      },
      {
        metric: "Schools Covered",
        metricGu: "શાળાઓ",
        value: "130",
        details: "100 primary schools and 30 secondary schools supported.",
        detailsGu: "૧૦૦ પ્રાથમિક અને ૩૦ માધ્યમિક શાળાઓમાં શૈક્ષણિક સુવિધા.",
      },
    ],
    relatedVideoIds: ["RwLPnssozZk", "bGyVtZGVnqA", "lEqG7ZXw_Dc"],
    relatedReportTitle: "Swadeep Education Interventions & LRC Field Summary",
  },

  health: {
    slug: "health",
    title: "Healthcare, Dental Care & Safety",
    titleGu: "આરોગ્ય, દાંતની સંભાળ અને સુરક્ષા",
    eyebrow: "Awareness • Prevention • Cure",
    eyebrowGu: "જાગૃતિ • નિવારણ • સારવાર",
    summary:
      "Awareness – Prevention – Cure – more Prevention is Swadeep's operational philosophy. We bring essential healthcare, dental hygiene camps, malnutrition screening, and health and safety workshops to underprivileged rural and coastal communities.",
    summaryGu:
      "જાગૃતિ - નિવારણ - સારવાર - વધુ નિવારણ એ સ્વદીપનો મુખ્ય મંત્ર છે. અમે ગ્રામીણ અને પછાત પરિવારો માટે દાંતની સંભાળ, આરોગ્ય શિબિરો અને પોષણ જાગૃતિ કાર્યક્રમો ચલાવીએ છીએ.",
    image: "/images/health.jpg",
    statsBanner: [
      { label: "Dental Health Beneficiaries", value: "13,000", labelGu: "દાંત તપાસ લાભાર્થીઓ" },
      { label: "Health & Safety Participants", value: "14,000", labelGu: "આરોગ્ય-સુરક્ષા સહભાગી" },
      { label: "General Health Camps", value: "2,000", labelGu: "આરોગ્ય કેમ્પો" },
      { label: "Villages Reached", value: "100", labelGu: "સહાયક ગામડાંઓ" },
    ],
    communityNeed: {
      title: "Healthcare Realities in Underserved Areas",
      titleGu: "ગ્રામીણ આરોગ્યની વાસ્તવિકતા અને જરૂરિયાત",
      description:
        "Rural villages and coastal fishing hamlets often lack accessible dental care and preventive diagnostics. High fluoride levels in groundwater lead to widespread fluorosis and early tooth decay, while preventive hygiene practices require continuous community awareness.",
      descriptionGu:
        "દરિયાકાંઠાના અને ગ્રામીણ વિસ્તારોમાં દાંતના નિષ્ણાત ડોક્ટરોની અછત અને ક્ષારયુક્ત પાણીને કારણે દાંતના રોગો વધુ જોવા મળે છે. વહેલા નિદાન અને સ્વચ્છતાની તાતી જરૂર હોય છે.",
      points: [
        {
          en: "Severe prevalence of dental caries and dental fluorosis among rural school children",
          gu: "શાળાના બાળકોમાં દાંતના સડા અને ફ્લોરોસિસનું ઊંચું પ્રમાણ",
        },
        {
          en: "Lack of basic diagnostic facilities in remote hamlets",
          gu: "અંતરિયાળ ગામોમાં પ્રાથમિક તપાસ સુવિધાઓનો અભાવ",
        },
        {
          en: "Need for systematic maternal and child nutritional counselling",
          gu: "સગર્ભા બહેનો અને બાળકો માટે પોષણ આહાર અંગે માર્ગદર્શનની જરૂરિયાત",
        },
      ],
    },
    approachAndActivities: {
      title: "Grassroots Healthcare Methodology",
      titleGu: "આરોગ્ય ક્ષેત્રે અમારી કાર્યપદ્ધતિ",
      description:
        "We mobilize qualified medical professionals and dentists directly to community doorsteps and schools, paired with actionable hygiene toolkits.",
      descriptionGu:
        "અમે લાયકાત ધરાવતા ડોક્ટરો અને ડેન્ટિસ્ટ સાથે ગામડે-ગામડે જઈ શાળાઓ અને આંગણવાડીમાં તપાસ કેમ્પ યોજીએ છીએ.",
      activities: [
        {
          title: "Comprehensive Dental Hygiene Drives",
          titleGu: "સઘન દાંત આરોગ્ય તપાસ શિબિરો",
          desc: "Conducting professional dental checkups, cavity screenings, and distribution of toothbrushes and oral care kits across 100 villages.",
          descGu: "૧૦૦ ગામોમાં ૧૩,૦૦૦ બાળકો-લોકોની દાંત તપાસ અને બ્રશ-પેસ્ટનું વિતરણ.",
        },
        {
          title: "Project Arogya & General Medical Camps",
          titleGu: "પ્રોજેક્ટ આરોગ્ય અને જનરલ મેડિકલ કેમ્પ",
          desc: "General wellness screenings, hemoglobin tests for adolescent girls, and timely referrals to primary health centres (PHCs).",
          descGu: "સામાન્ય સ્વાસ્થ્ય તપાસ, કિશોરીઓમાં હિમોગ્લોબિન ચકાસણી અને જરૂર પડ્યે હોસ્પિટલ રેફરલ.",
        },
        {
          title: "Child Nutrition & WASH Awareness",
          titleGu: "બાળ પોષણ અને સ્વચ્છતા જાગૃતિ",
          desc: "Interactive nutrition workshops using flashcards, local millets, and demonstrations of proper handwashing steps.",
          descGu: "સ્થાનિક શાકભાજી અને પૌષ્ટિક અનાજ દ્વારા પોષણ શિક્ષણ અને હાથ ધોવાની પદ્ધતિ.",
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "School children and Anganwadi infants", gu: "શાળાના બાળકો અને આંગણવાડીના ભૂલકાંઓ" },
        { en: "Adolescent girls and rural mothers", gu: "કિશોરીઓ અને ગ્રામીણ માતાઓ" },
        { en: "Elderly and daily wage workers", gu: "વૃદ્ધો અને શ્રમિક પરિવારો" },
      ],
      locations: [
        { en: "100 Villages across Bhavnagar & Amreli", gu: "ભાવનગર અને અમરેલીના ૧૦૦ ગામો" },
        { en: "Coastal Fishermen Settlements in Kutch & Amreli", gu: "કચ્છ અને અમરેલીના સાગરકાંઠા વસાહતો" },
      ],
      reportingPeriod: "2005 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Dental Patients Examined",
        metricGu: "દાંત તપાસ લાભાર્થી",
        value: "13,000",
        details: "Screened and provided preventative oral hygiene kits.",
        detailsGu: "તપાસ અને ઓરલ કેર કિટ સહાય.",
      },
      {
        metric: "Health & Safety Participants",
        metricGu: "આરોગ્ય-સલામતી સહભાગીઓ",
        value: "14,000",
        details: "Workshops covering occupational safety, hygiene, and wellness.",
        detailsGu: "કાર્યસ્થળ સુરક્ષા અને સ્વાસ્થ્ય તાલીમ.",
      },
      {
        metric: "General Medical Camps Conducted",
        metricGu: "આરોગ્ય શિબિરો",
        value: "2,000",
        details: "Organized across 100 rural villages in Gujarat.",
        detailsGu: "૧૦૦ ગ્રામીણ વિસ્તારોમાં સફળ આયોજન.",
      },
    ],
    relatedVideoIds: ["xrRMVGzzm-Y", "MrMnSK00440", "wqV7dwGuUKU"],
    relatedReportTitle: "Swadeep Community Health & Oral Hygiene Field Evaluation",
  },

  livelihood: {
    slug: "livelihood",
    title: "Livelihood & Coastal Fishermen Development",
    titleGu: "આજીવિકા અને સાગરકાંઠા માછીમાર વિકાસ",
    eyebrow: "Sagarbandhu Project • Sustainable Incomes",
    eyebrowGu: "સાગરબંધુ પ્રોજેક્ટ • આત્મનિર્ભર આજીવિકા",
    summary:
      "Swadeep empowers coastal fishermen communities in Mundra (Kutch) and Jafrabad (Amreli) through technical training, safety gear, fisheries information centres, and women Self-Help Groups (SHGs). In partnership with Coastal Gujarat Power Limited (Tata Power), project 'Sagarbandhu' fosters sustainable marine livelihoods.",
    summaryGu:
      "મુંદ્રા (કચ્છ) અને જાફરાબાદ (અમરેલી) ના સાગરકાંઠે વસતા માછીમાર પરિવારો માટે ટાટા પાવર સાથે મળીને 'સાગરબંધુ' પ્રોજેક્ટ દ્વારા આજીવિકા, મહિલા બચત જૂથો અને સાગર શાળા શિક્ષણનું સફળ સંચાલન.",
    image: "/images/livelihood.jpg",
    statsBanner: [
      { label: "Fishermen Supported", value: "500", labelGu: "લાભાર્થી માછીમારો" },
      { label: "Coastal Villages", value: "10", labelGu: "સાગરકાંઠા ગામો" },
      { label: "Women in Self-Help Groups", value: "100", labelGu: "SHG મહિલા સભ્યો" },
      { label: "Youth Trained", value: "200", labelGu: "તાલીમાર્થી યુવાનો" },
    ],
    communityNeed: {
      title: "Challenges in Traditional Marine Fisheries",
      titleGu: "પરંપરાગત માછીમારી ક્ષેત્રના પડકારો",
      description:
        "Small-scale traditional pagadiya and boat fishermen face extreme weather vulnerabilities, fluctuating market rates, lack of GPS/safety equipment, and seasonal unemployment during monsoon fishing bans.",
      descriptionGu:
        "નાના અને પગડિયા માછીમારોને હવામાનની અણધારી આપત્તિઓ, સલામતી સાધનોનો અભાવ અને ચોમાસામાં માછીમારી બંધ રહેતા આર્થિક મુશ્કેલીઓનો સામનો કરવો પડે છે.",
      points: [
        {
          en: "Extreme safety hazards during offshore fishing without modern navigational aid",
          gu: "દરિયામાં માછીમારી વખતે નેવિગેશન અને સુરક્ષા સાધનોની અછત",
        },
        {
          en: "Middlemen exploitation and inadequate cold storage / fish drying infrastructure",
          gu: "વચેટિયાઓ દ્વારા ભાવ શોષણ અને માછલી સુકવણીની પરંપરાગત રીતો",
        },
        {
          en: "Need for women's financial inclusion and non-fishing income diversification",
          gu: "માછીમાર પરિવારની બહેનો માટે પૂરક આવકના સાધનોનો અભાવ",
        },
      ],
    },
    approachAndActivities: {
      title: "Strategic Marine Livelihood Interventions",
      titleGu: "આજીવિકા વિકાસ માટે અમારા પગલાં",
      description:
        "Building a multi-pronged ecosystem encompassing port safety infrastructure, women empowerment, child education in coastal settlements, and linkage to government subsidies.",
      descriptionGu:
        "બંદર પર સુવિધાઓ, મહિલા સ્વસહાય જૂથો, સાગર શાળા અને સરકારી યોજનાઓ સાથે જોડાણ કરી ટકાઉ આવકનું નિર્માણ.",
      activities: [
        {
          title: "Fisheries Information Centre at Tragadi Port",
          titleGu: "ત્રગડી બંદર ખાતે માછીમાર માહિતી કેન્દ્ર",
          desc: "Operating a dedicated port information hub providing weather alerts, potential fishing zones (PFZ) data, and government welfare schemes.",
          descGu: "હવામાન આગાહી, ભરતી-ઓટની માહિતી અને સરકારી સહાય યોજનાઓનું માર્ગદર્શન.",
        },
        {
          title: "Safety Equipment & Insulated Ice Boxes",
          titleGu: "સુરક્ષા સાધનો અને આઇસ બોક્સ સહાય",
          desc: "Supplying life jackets, floating buoys, navigation torches, and insulated boxes to maintain catch freshness and market value.",
          descGu: "લાઇફ જેકેટ, ફ્લોટિંગ રિંગ અને માછલીની ગુણવત્તા જાળવવા ઇન્સ્યુલેટેડ આઇસ બોક્સ.",
        },
        {
          title: "Women Self-Help Groups (SHGs)",
          titleGu: "મહિલા સ્વ-સહાય જૂથો (SHGs)",
          desc: "Forming 3 registered women's SHGs (100 women) with micro-credit linkages, dry fish packaging, and handicraft income generation.",
          descGu: "૧૦૦ મહિલાઓને સંગઠિત કરી ૩ બચત જૂથોની રચના અને માછલી સુકવણી-વેચાણ પ્રોત્સાહન.",
        },
        {
          title: "Sagar Shala for Migrant Children",
          titleGu: "માછીમાર બાળકો માટે સાગર શાળા",
          desc: "Operating seasonal coastal schools for 120+ children of migratory fishermen families right at the coastal bandars.",
          descGu: "દરિયાકાંઠાના બંદરો પર સ્થળાંતરિત માછીમારોના ૧૨૦ બાળકો માટે વિશેષ સાગર શાળા.",
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Traditional boat and Pagadiya fishermen", gu: "પરંપરાગત અને પગડિયા માછીમારો" },
        { en: "Coastal fisherwomen and youth", gu: "સાગરકાંઠાની મહિલાઓ અને બેરોજગાર યુવાનો" },
        { en: "Children in seasonal fishing hamlets", gu: "બંદર પર વસતા માછીમારોના બાળકો" },
      ],
      locations: [
        { en: "Mundra Coastal Belt, Kutch", gu: "મુંદ્રા સાગરકાંઠો, કચ્છ" },
        { en: "Tragadi Port, Kutch", gu: "ત્રગડી બંદર, કચ્છ" },
        { en: "Jafrabad Coastal Region, Amreli", gu: "જાફરાબાદ સાગરકાંઠો, અમરેલી" },
      ],
      reportingPeriod: "2012 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Fishermen Households Supported",
        metricGu: "લાભાર્થી માછીમાર પરિવારો",
        value: "500",
        details: "Direct equipment, safety, and capacity enhancement.",
        detailsGu: "સાધનો, સુરક્ષા અને તાલીમ દ્વારા આજીવિકા મજબૂત કરી.",
      },
      {
        metric: "Coastal Villages Covered",
        metricGu: "દરિયાકાંઠાના ગામો",
        value: "10",
        details: "Active interventions across Kutch and Amreli coast.",
        detailsGu: "કચ્છ અને અમરેલીના ૧૦ સાગરકાંઠા ગામોમાં સક્રિય કાર્ય.",
      },
      {
        metric: "Women In Self-Help Groups",
        metricGu: "સ્વસહાય જૂથ મહિલાઓ",
        value: "100",
        details: "Organized across 3 sustainable SHGs with micro-credit.",
        detailsGu: "૩ બચત જૂથો દ્વારા આર્થિક આત્મનિર્ભરતા.",
      },
      {
        metric: "Children Enrolled in Sagar Shala",
        metricGu: "સાગર શાળાના બાળકો",
        value: "130",
        details: "Continued learning during seasonal coastal migration.",
        detailsGu: "સ્થળાંતર દરમિયાન અવિરત શિક્ષણ મળ્યું.",
      },
    ],
    relatedVideoIds: ["F-lzs2vesaU", "7Dkp95eFwVk", "OWKiwpk_s9Y"],
    relatedReportTitle: "Project Sagarbandhu: Integrated Coastal Development Report",
  },

  infrastructure: {
    slug: "infrastructure",
    title: "Rural Infrastructure & Community Transformation",
    titleGu: "ગ્રામીણ માળખાકીય સુવિધાઓ અને પરિવર્તન",
    eyebrow: "Schools • Anganwadis • Solar Energy",
    eyebrowGu: "શાળાઓ • આંગણવાડી • સોલાર ઊર્જા",
    summary:
      "A healthy, inspiring physical environment motivates learning and community progress. Swadeep enhances school grounds, transforms Anganwadis through Building as Learning Aid (BaLA) educational wall art, and installs solar street lights across rural villages.",
    summaryGu:
      "સારી માળખાકીય સુવિધા વ્યક્તિના મન પર સકારાત્મક અસર કરે છે. સ્વદીપે ૨૯ શાળાઓના મેદાન સુધાર્યા, ૧૦૦ આંગણવાડીઓને બાલા પેઇન્ટિંગથી સજાવી અને ૧૦૫૦ સોલાર સ્ટ્રીટ લાઇટ્સ સ્થાપિત કરી છે.",
    image: "/images/infrastructure.jpg",
    statsBanner: [
      { label: "Solar Street Lights Installed", value: "1,050", labelGu: "સોલાર લાઇટ્સ" },
      { label: "Villages Transformed", value: "40", labelGu: "સહાયક ગામડાંઓ" },
      { label: "School Grounds Developed", value: "30", labelGu: "શાળા મેદાન વિકાસ" },
      { label: "ICDS Beautifications", value: "100", labelGu: "આંગણવાડી શણગાર" },
    ],
    communityNeed: {
      title: "Infrastructure Gaps in Rural Gujarat",
      titleGu: "ગ્રામીણ માળખાકીય સુવિધાઓની જરૂરિયાત",
      description:
        "Many rural primary schools lacked levelled sports grounds, functional sanitation units, and engaging classroom walls. Unlit village streets posed safety risks for women and children after sundown, demanding clean, renewable energy solutions.",
      descriptionGu:
        "ગ્રામીણ પ્રાથમિક શાળાઓમાં રમતના મેદાન, શૌચાલય સુવિધા અને રંગબેરંગી વાતાવરણનો અભાવ હતો. રાત્રિના સમયે ગામના રસ્તાઓ પર અંધારું રહેવાથી મહિલાઓ અને બાળકોની સુરક્ષા જોખમાતી હતી.",
      points: [
        {
          en: "Unpaved and uneven school premises causing injuries during sports",
          gu: "શાળાના અસમતલ મેદાનને લીધે રમતગમતમાં બાળકોને પડતી મુશ્કેલી",
        },
        {
          en: "Dull Anganwadi rooms unsupportive of early childhood sensory stimulation",
          gu: "આંગણવાડીના નિરસ ઓરડાઓને શૈક્ષણિક બનાવવાની જરૂરિયાત",
        },
        {
          en: "Inadequate street lighting in interior hamlets affecting village safety",
          gu: "ગામડાંના માર્ગો પર અંધારાને કારણે રાત્રિ સુરક્ષાના પ્રશ્નો",
        },
      ],
    },
    approachAndActivities: {
      title: "Community-Driven Infrastructure Development",
      titleGu: "સમુદાય સહયોગ આધારિત માળખાકીય વિકાસ",
      description:
        "We engage village panchayats, school management committees (SMCs), and corporate CSR partners to construct durable, eco-friendly assets.",
      descriptionGu:
        "અમે ગ્રામ પંચાયત, શાળા વ્યવસ્થાપન સમિતિ અને CSR પાર્ટનર્સના સહયોગથી ટકાઉ અને પર્યાવરણને અનુકૂળ માળખું ઊભું કરીએ છીએ.",
      activities: [
        {
          title: "Solar Street Lighting Installations",
          titleGu: "૧૦૫૦ સોલાર સ્ટ્રીટ લાઇટ્સ સ્થાપના",
          desc: "Erecting 1,050 high-efficiency solar street lighting poles across 40 villages, ensuring reliable illumination with zero grid electricity costs.",
          descGu: "૪૦ ગામોમાં ૧,૦૫૦ સોલાર સ્ટ્રીટ લાઇટ્સ લગાવી અંધારા માર્ગોને પ્રકાશિત કર્યા.",
        },
        {
          title: "School Playground & Sports Development",
          titleGu: "શાળા રમતગમત મેદાન સમતલીકરણ",
          desc: "Levelling grounds, planting shade trees, and creating sports courts across 30 rural schools in Rajula taluka.",
          descGu: "રાજુલા તાલુકાની ૩૦ શાળાઓના મેદાન સમતલ કરી રમતના સાધનો ઉપલબ્ધ કરાવ્યા.",
        },
        {
          title: "Building as Learning Aid (BaLA) Anganwadis",
          titleGu: "બાલા (BaLA) આંગણવાડી સજાવટ",
          desc: "Painting 100 Anganwadi centres with pedagogical illustrations, alphabet trains, and height charts benefiting over 7,000 children.",
          descGu: "૧૦૦ આંગણવાડીઓની દીવાલો પર શૈક્ષણિક ચિત્રો દોરી ૭,૦૦૦ બાળકોને આનંદદાયક વાતાવરણ પૂરું પાડ્યું.",
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Rural village residents and youth", gu: "ગ્રામીણ નાગરિકો અને યુવા પેઢી" },
        { en: "Primary school students and Anganwadi children", gu: "શાળા અને આંગણવાડીના બાળકો" },
        { en: "Village Panchayats and local institutions", gu: "ગ્રામ પંચાયતો અને સ્થાનિક સંસ્થાઓ" },
      ],
      locations: [
        { en: "40 Villages in Rajula & Jafrabad (Amreli)", gu: "અમરેલીના રાજુલા અને જાફરાબાદના ૪૦ ગામો" },
        { en: "Selected villages in Bhavnagar & Kutch", gu: "ભાવનગર અને કચ્છના પસંદગીના ગામો" },
      ],
      reportingPeriod: "2015 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Solar Street Lights Installed",
        metricGu: "સોલાર લાઇટ્સ સ્થાપિત",
        value: "1,050",
        details: "Clean solar illumination installed across 40 villages.",
        detailsGu: "૪૦ ગામડાંઓમાં અવિરત રાત્રિ પ્રકાશ.",
      },
      {
        metric: "Villages Transformed",
        metricGu: "લાભાર્થી ગામો",
        value: "40",
        details: "Benefiting thousands of rural citizens every night.",
        detailsGu: "હજારો ગ્રામજનો માટે સુરક્ષિત માર્ગો.",
      },
      {
        metric: "School Grounds Developed",
        metricGu: "શાળા મેદાન વિકાસ",
        value: "30",
        details: "Safe, levelled playgrounds encouraging rural athletics.",
        detailsGu: "બાળકોના સર્વાંગી વિકાસ માટે સુરક્ષિત રમતના મેદાન.",
      },
      {
        metric: "Children Benefited from BaLA",
        metricGu: "બાલા આંગણવાડી લાભાર્થી બાળકો",
        value: "7,000",
        details: "Enrolled in 100 newly beautified Anganwadis.",
        detailsGu: "૧૦૦ સુંદર આંગણવાડીઓમાં અભ્યાસ કરતા બાળકો.",
      },
    ],
    relatedVideoIds: ["1Mi1bRm9oBI", "-FfJ9skQHBE", "RwLPnssozZk"],
    relatedReportTitle: "Swadeep Rural Infrastructure & Renewable Energy Report",
  },

  disaster: {
    slug: "disaster",
    title: "Disaster Preparedness, Relief & Rehabilitation",
    titleGu: "આપત્તિ વ્યવસ્થાપન, રાહત અને પુનર્વસન",
    eyebrow: "Rapid Emergency Response Since 2005",
    eyebrowGu: "૨૦૦૫ થી તાત્કાલિક આપત્તિ રાહત કાર્ય",
    summary:
      "Serving humankind physically, socially, emotionally, and economically during natural calamities. Swadeep's disaster management team has responded in the frontline during the Kutch earthquake, Kashmir earthquake, Nagapattinam Tsunami, Surat flood, COVID-19 pandemic, and Cyclone Tauktae.",
    summaryGu:
      "કુદરતી આપત્તિ વખતે માનવજાતની સામાજિક, શારીરિક અને આર્થિક સેવા. કચ્છ ભૂકંપ, ત્સુનામી, સુરત પૂર, કોવિડ-૧૯ મહામારી અને તાઉતે વાવાઝોડા દરમિયાન સ્વદીપની ટીમે ક્ષેત્રમાં ઉતરી અવિરત રાહત કાર્ય કર્યું છે.",
    image: "/images/safety.jpg",
    statsBanner: [
      { label: "COVID-19 Protective Masks", value: "1,00,000", labelGu: "માસ્ક વિતરણ" },
      { label: "Cyclone Tauktae Villages", value: "27", labelGu: "તાઉતે અસરગ્રસ્ત ગામો" },
      { label: "Emergency Ration Kits", value: "1,000", labelGu: "રાશન કિટ સહાય" },
      { label: "Livelihood Restorations", value: "20+", labelGu: "આજીવિકા પુનઃસ્થાપના" },
    ],
    communityNeed: {
      title: "Vulnerability to Climate & Natural Crises",
      titleGu: "આપત્તિ અને કુદરતી હોનારતના સંકટો",
      description:
        "Gujarat's coastal and rural belt is intensely exposed to cyclonic storms, extreme flooding, and seismic disturbances. Immediate relief with food grains, medical hygiene kits, and rebuilding damaged livelihoods is critical for community survival.",
      descriptionGu:
        "ગુજરાતનો સાગરકાંઠો વાવાઝોડા અને પૂર જેવી કુદરતી આપત્તિઓ સામે અત્યંત સંવેદનશીલ છે. આવી સ્થિતિમાં તાત્કાલિક અનાજ, દવાઓ અને મકાન છાપરાંની સહાય સૌથી જરૂરી બને છે.",
      points: [
        {
          en: "Severe destruction of coastal dwellings and fishing boats during severe cyclones",
          gu: "વાવાઝોડામાં માછીમારોની હોડીઓ, ઝૂંપડાં અને સાધનોનું વ્યાપક નુકસાન",
        },
        {
          en: "Acute food and drinking water shortages immediately following calamities",
          gu: "આપત્તિ પછી તરત જ પીવાના શુદ્ધ પાણી અને રાશનની તંગી",
        },
        {
          en: "Pandemic health emergencies and livelihood disruption for migrant workers",
          gu: "મહામારી દરમિયાન શ્રમિકો માટે આજીવિકા અને સલામતી કટોકટી",
        },
      ],
    },
    approachAndActivities: {
      title: "Agile Grassroots Disaster Response",
      titleGu: "અમારી આપત્તિ રાહત કાર્યપદ્ધતિ",
      description:
        "Swadeep operates rapid assessment teams in coordination with district disaster management authorities (DDMA) and local village sarpanches to deliver timely relief without duplication.",
      descriptionGu:
        "અમે જિલ્લા પ્રશાસન અને સ્થાનિક સરપંચોના સંકલનમાં રહીને સૌથી વધુ જરૂરિયાતમંદ પરિવારો સુધી સીધી રાહત સામગ્રી પહોંચાડીએ છીએ.",
      activities: [
        {
          title: "Cyclone Tauktae Emergency Relief",
          titleGu: "તાઉતે વાવાઝોડું રાહત કામગીરી",
          desc: "Reached 27 coastal villages in Rajula and Jafrabad talukas, distributing 1,000 emergency ration kits, solar lanterns, and tarpaulin roofing sheets.",
          descGu: "૨૭ ગામોમાં ૧,૦૦૦ પરિવારોને રાશન કિટ, તાડપત્રી અને સોલાર ફાનસની સહાય.",
        },
        {
          title: "COVID-19 Pandemic Response & Mask Production",
          titleGu: "કોવિડ-૧૯ મહામારી સહાય અને માસ્ક વિતરણ",
          desc: "Mobilized rural women self-help groups to sew and distribute 1,00,000 certified cotton masks, along with food ration packets to vulnerable families.",
          descGu: "મહિલા જૂથો દ્વારા ૧,૦૦,૦૦૦ માસ્કનું નિર્માણ-વિતરણ અને શ્રમિકોને રાશન સહાય.",
        },
        {
          title: "Long-Term Livelihood Rehabilitation",
          titleGu: "આજીવિકા પુનર્વસન સહાય",
          desc: "Assisting severely impacted fishermen and artisans with boat repair grants, tool replacement, and linkage to state disaster relief funds.",
          descGu: "નુકસાન પામેલી બોટના સમારકામ અને સાધનો આપી પરિવારોને પુનઃ આત્મનિર્ભર બનાવ્યા.",
        },
      ],
    },
    targetGroupsAndScope: {
      targetGroups: [
        { en: "Cyclone and flood affected coastal families", gu: "વાવાઝોડા અને પૂર અસરગ્રસ્ત પરિવારો" },
        { en: "Daily wage earners, widows, and elderly households", gu: "દૈનિક શ્રમિકો, વિધવા બહેનો અને વડીલો" },
        { en: "Frontline health and village workers", gu: "આરોગ્ય અને પંચાયતના ક્ષેત્રીય કાર્યકરો" },
      ],
      locations: [
        { en: "27 Coastal Villages in Rajula & Jafrabad", gu: "રાજુલા અને જાફરાબાદના ૨૭ ગામો" },
        { en: "Past missions: Kutch, Surat, Nagapattinam", gu: "અગાઉના મિશન: કચ્છ, સુરત, નાગપટ્ટિનમ" },
      ],
      reportingPeriod: "2005 – Present",
    },
    verifiedOutcomes: [
      {
        metric: "Villages Supported in Cyclone Tauktae",
        metricGu: "તાઉતે વાવાઝોડા રાહત ગામો",
        value: "27",
        details: "Immediate rescue, debris clearing, and emergency provisions.",
        detailsGu: "તાત્કાલિક રાહત અને આવશ્યક સાધન સહાય.",
      },
      {
        metric: "Households Provided Emergency Rations",
        metricGu: "રાશન સહાય લાભાર્થી કુટુંબો",
        value: "1,000",
        details: "Wholesome food grains and cooking supplies distributed.",
        detailsGu: "જીવનજરૂરી અનાજ અને સામગ્રીનું વિતરણ.",
      },
      {
        metric: "Masks Distributed During COVID-19",
        metricGu: "કોવિડ માસ્ક વિતરણ",
        value: "1,00,000",
        details: "Produced by village women SHGs and distributed free.",
        detailsGu: "મહિલા બચત જૂથો દ્વારા સિલાઈ કરી મફત વિતરણ.",
      },
      {
        metric: "Livelihood Restorations",
        metricGu: "આજીવિકા પુનઃસ્થાપના",
        value: "20+",
        details: "Boats and equipment repaired for affected fishermen.",
        detailsGu: "નુકસાન પામેલ હોડીઓનું સમારકામ કરી રોજગારી શરૂ કરાવી.",
      },
    ],
    relatedVideoIds: ["XNWDtwLrmzo", "1Mi1bRm9oBI", "-FfJ9skQHBE"],
    relatedReportTitle: "Swadeep Cyclone Tauktae & Disaster Response Evaluation",
  },
};
