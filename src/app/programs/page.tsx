import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  DynamicIcon,
  CheckCircleIcon,
  BookOpenIcon,
  HeartPulseIcon,
  UsersGroupIcon,
  LandmarkIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "What We Do | Swadeep Shikshan Vikas Sanstha",
  description:
    "At Swadeep, we concentrate our efforts on deprived communities by working on thematic areas of Development: Education, Health, Livelihood, Rural Infrastructure Development, and Disaster Management.",
};

export default function ProgramsPage() {
  return (
    <main id="main-content" className="flex-1 bg-cream">
      {/* 1. Hero Banner */}
      <section
        aria-labelledby="programs-hero-heading"
        className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-dark via-forest to-forest-900 text-cream overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container-wide section-padding relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-bold tracking-wider text-cream/90 uppercase">
            <span>Swadeep Shikshan Vikas Sanstha</span>
          </div>

          <h1
            id="programs-hero-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            What We Do?
          </h1>

          <p className="font-gujarati text-xl sm:text-2xl text-saffron-light font-medium">
            અમારા કાર્યક્ષેત્રો — પાયાના સ્તરે પરિણામલક્ષી વિકાસ
          </p>

          <p className="font-body text-cream/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2">
            At Swadeep, we concentrate our efforts on deprived communities by working on thematic areas of Development.
          </p>
        </div>
      </section>

      {/* Quick Nav Anchor Bar */}
      <nav
        aria-label="Programs quick navigation"
        className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-forest/10 shadow-xs py-3"
      >
        <div className="container-wide flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold">
          <a
            href="#education"
            className="px-4 py-2 rounded-full bg-cream hover:bg-forest hover:text-white transition-colors whitespace-nowrap text-forest-dark"
          >
            Education
          </a>
          <a
            href="#health"
            className="px-4 py-2 rounded-full bg-cream hover:bg-forest hover:text-white transition-colors whitespace-nowrap text-forest-dark"
          >
            Health
          </a>
          <a
            href="#livelihood"
            className="px-4 py-2 rounded-full bg-cream hover:bg-forest hover:text-white transition-colors whitespace-nowrap text-forest-dark"
          >
            Livelihood
          </a>
          <a
            href="#infrastructure"
            className="px-4 py-2 rounded-full bg-cream hover:bg-forest hover:text-white transition-colors whitespace-nowrap text-forest-dark"
          >
            Rural Infrastructure
          </a>
          <a
            href="#disaster"
            className="px-4 py-2 rounded-full bg-cream hover:bg-forest hover:text-white transition-colors whitespace-nowrap text-forest-dark"
          >
            Disaster Management
          </a>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 1. EDUCATION */}
      {/* ============================================================ */}
      <section
        id="education"
        className="section-padding py-20 lg:py-24 border-b border-forest/10 scroll-mt-28"
        aria-labelledby="education-heading"
      >
        <div className="container-wide max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
              PROGRAMS • EDUCATION
            </span>
            <h2
              id="education-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark"
            >
              Education
            </h2>
            <p className="font-body text-charcoal/90 text-base sm:text-lg leading-relaxed">
              Education is one of the most powerful instruments for reducing poverty and inequality as it lays the foundation for sustained development. As sustainability is concerned, Swadeep believes in to build a strong base for a long lasting age of the building of knowledge and well-being. Starting the efforts from pre-primary education (Anganwadis), we have now reached to higher secondary schools with the vision to support children complete their schooling. Making the learning more joyful and more fruitful with developing different strategies according to the needs of the classrooms especially after the COVID-19 pandemic.
            </p>
          </div>

          {/* Image Banner */}
          <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-forest/10">
            <Image
              src="/images/education.jpg"
              alt="Education Program - Swadeep Shikshan Vikas Sanstha"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Sub-sections */}
          <div className="space-y-10">
            {/* Pre-Primary Education */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-6">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Pre-Primary Education: (Work With Anganwadi)
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                While ‘primary education provides the fundamentals of all formal learning’, pre-primary learning may be called the foundation for both education and personal development. The information of formal pre-primary education in rural India is comparatively less, although the family and community function as a broader arena for holistic learning. Swadeep aims to strengthen pre-primary education system through Capacity Building of Stakeholders. The approach is to make pre-primary education more joyful for the ICDS Toddlers by introducing a multi-level learning support program. We have created a well-structured curriculum and provided resource materials which cover eight key aspects of Pre-primary education:
              </p>

              {/* 8 Key Aspects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {[
                  "Approaches to Learning",
                  "Social and Emotional Development",
                  "Mathematics",
                  "Creativity",
                  "Science and Technology",
                  "Social Studies",
                  "Language, Literacy and Communication",
                  "Physical Development & Health",
                ].map((aspect, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-cream-dark/60 border border-forest/10 font-heading font-semibold text-sm text-forest-dark flex items-center gap-2"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-forest shrink-0" />
                    <span>{aspect}</span>
                  </div>
                ))}
              </div>

              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed pt-2">
                The strategy is to join hands with Anganwadi Workers/Helpers and Parents of ICDS Children as both plays an important role. Efforts are made to help the AWW and AWH with adequate pre-primary pedagogy and support with educational aids so they can carry out some well thought, well planned pre-primary educational activities with ease and according to the need of classroom.
              </p>
            </div>

            {/* Elementary Education */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-6">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Elementary Education
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                A study suggests that over 95% of Indian children in the age group 6 to 14 are enrolled in schools. Although these children have been in school for several years, many have not acquired the foundational skills like basic reading and arithmetic which are essential and very much crucial to be in the flow of academic main stream. The real challenge is to identify and enable those children to acquire foundational literacy and numeracy in a quick and sustainable way so that they get a real chance to complete the elementary stage in a meaningful way. An educational support program is launched by Swadeep in public primary schools to improve the academic level of students suffering from this problem as well as to increase and maintain the quality of education for main stream learners.
              </p>

              <div className="space-y-5 pt-2">
                <div className="p-6 rounded-2xl bg-cream-dark/40 border border-forest/10 space-y-2">
                  <h4 className="font-heading text-xl font-bold text-forest">
                    Learning Resource Centers (LRC)
                  </h4>
                  <p className="font-body text-charcoal/85 text-base leading-relaxed">
                    A dedicated team of skilled teachers has been formed and made available at every identified school by Swadeep. The team addresses learning deficits of children by creating a learning intervention encompassing the diversified learning needs of primary grade children. The LRC focuses on basic education support, particularly in the areas of literacy and numeracy, with the help of activity based learning methods like; group project works, games, art &amp; craft, stories, rhymes, action songs and any many more with the use of appropriate high quality teaching learning materials. The team also tries to check the learning levels of children after certain period of time to provide a better and personalized learning experience. This whole package aims to bring students at least to their age appropriate academic levels.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-dark/40 border border-forest/10 space-y-2">
                  <h4 className="font-heading text-xl font-bold text-forest">
                    Digital Education
                  </h4>
                  <p className="font-body text-charcoal/85 text-base leading-relaxed">
                    The penetration of digital education into the hinterland and rural areas is evolving fast. The outreach of educational programs is improving day by day with the digitalization of education. Swadeep, to promote digital education in rural area provides the platform where students get the opportunity to learn digitally. Under various field based projects Swadeep established smart classes for govt. school children with necessary technical equipment and grade wise educational content in it. The teachers of these identified schools are trained to operate and use the smart class according to classroom needs. The scope is also open for students to learn individually by smart class.
                  </p>
                </div>
              </div>
            </div>

            {/* Beyond Elementary */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-6">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Beyond Elementary
              </h3>

              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-cream-dark/40 border border-forest/10 space-y-2">
                  <h4 className="font-heading text-xl font-bold text-forest">
                    High School Support
                  </h4>
                  <p className="font-body text-charcoal/85 text-base leading-relaxed">
                    Secondary high school education serves as a link between the elementary and higher education. This phase is comparatively very much crucial and vulnerable as it needs to work with the adolescents, whom are very much trying to be aware of themself and to explore the world full of new things. At this stage of academics, Swadeep is trying to help them to get better learning and to better shape themselves for future opportunities. Swadeep is running some educational projects which provide teachers support, tutor classes, educational materials, career counseling and much more.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-dark/40 border border-forest/10 space-y-2">
                  <h4 className="font-heading text-xl font-bold text-forest">
                    Adult Literacy
                  </h4>
                  <p className="font-body text-charcoal/85 text-base leading-relaxed">
                    Is basic formal education only for the children? Not really! Some reports say that most women are unable to read or write In Rural areas. Hence they are unable to read any signs, health warnings, general information, even basic number operations seems difficult to them. Some cases of exploitation are also in front of our opened eyes because of not being aware of the rights of an individual in the working area. Adult Literacy class aims to overcome this roadblock by providing quality literacy programs to the women in remote rural areas. Touching a milestone of teaching reading and writing of 5th-grade level, women are empowered with the knowledge like habit of saving money, importance of girls’ education, finding &amp; keeping sustainable employment.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-dark/40 border border-forest/10 space-y-2">
                  <h4 className="font-heading text-xl font-bold text-forest">
                    Open Schooling
                  </h4>
                  <p className="font-body text-charcoal/85 text-base leading-relaxed">
                    Open schooling aims towards to provide an opportunity to children who are unable to attend conventional schools access for any reason. It provides the same education as those who do attend traditional schools. Swadeep observed that the school dropout ration was very high in a particular concentrated under privileged area in Gujarat and tried to transform the mindset of community by motivating the youth to complete their studies from institutions which promotes Open Schooling such as- ‘Dr. Babasaheb Ambedkar Open University’, ‘National Institute of Open Schooling’ etc. Swadeep identified the potential youth from village and helped them with admission as well as preparation of exams. Swadeep continued this effort which turned surprisingly positive as the results came out. The youth is now achieving more traditional academic levels and motivating others to do so.
                  </p>
                </div>
              </div>

              <p className="font-body text-forest font-semibold text-base italic pt-2">
                We would love to expand our scope of work with other states to share our expertise in for school level computer literacy, Science-Mathematics on wheel, Self-defense training for women and of course, in the field of training and capacity building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HEALTH */}
      {/* ============================================================ */}
      <section
        id="health"
        className="section-padding py-20 lg:py-24 border-b border-forest/10 scroll-mt-28 bg-cream-dark/30"
        aria-labelledby="health-heading"
      >
        <div className="container-wide max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
              PROGRAMS • HEALTH
            </span>
            <h2
              id="health-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark"
            >
              Health
            </h2>
            <p className="font-body text-charcoal/90 text-base sm:text-lg leading-relaxed">
              Once a wise man said, “Take care of your body, it is the only place you have to live.” The COVID-19 has also taught and proved that prevention is undoubtedly better than cure. Not only for protecting people from disease, Swadeep is also making efforts to make hygiene a routine in everyday life for vulnerable communities. We are also standing strong to provide basic health check-ups, cure and aids. Awareness- Prevention- Cure- more Prevention is our working method with the aim for better health of the people.
            </p>
          </div>

          {/* Image Banner */}
          <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-forest/10">
            <Image
              src="/images/health.jpg"
              alt="Health Program - Swadeep Shikshan Vikas Sanstha"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Sub-sections */}
          <div className="space-y-8">
            {/* Project Arogya */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-5">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Project ‘Arogya’
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                Under the project Arogya, Swadeep started special initiatives to promote good health among the village community by conducting BCC (Behaviour base Community Change) Programs, Activities that promote Health Awareness, Health Camps and Strengthening of ICDS centres of project area. During the project period, we organised total 10 health camps, covered 5 ICDS centers and engaged the community of 5 villages in different BCC Programs.
              </p>
              <ul className="space-y-3 font-body text-charcoal/85 text-base">
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>The project implemented in 3 villages which are Dhama, Fatepura and Khirsara from Surendranagar and Kutch districts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>The community change programs covered almost 9626 peoples from 5 villages of Project area by conducting specially planned activities with community.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>10 different types of Health Camps were organised during the project period which benefited almost 1895 people from these villages with free check-ups and medicines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>The efforts were made towards Strengthening of ICDS with the help of conducting various programs and activities. The material was also provided at ICDS to better achieve the health goals for the children which benefited total 5 ICDS, 80 Children and 8 ICDS workers and helpers.</span>
                </li>
              </ul>
            </div>

            {/* Dental Hygiene */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-5">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Dental Hygiene
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                Swadeep has envisaged the Dental Hygiene Awareness Program for an affordable, accessible and equitable oral health care delivery in a well-coordinated manner for bringing about ‘optimal oral health’ for rural community. The program is running in Rajula, Amreli district and Mahuva, Bhavnagar. The Dental Hygiene Awareness Program promotes oral health activities designed to encourage good oral health practices and increase awareness of the importance of oral health and preventive care. The Dental Hygiene Awareness Program collaborates with oral health resources available for local health departments, schools, Anganwadis, community and others concerned with oral health awareness activities.
              </p>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                A well-equipped and specially designed mobile van is also developed to conduct the dental check-up camps especially in the hinterland to help people get the easy access of the service.
              </p>
            </div>

            {/* Health & Hygiene Key Activities */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-5">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Community Health &amp; Hygiene Focus
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                We are trying our best to sensitize the community on health and hygiene. Currently we are deeply into different activities in identified rural areas of Gujarat, Dadra &amp; Nagar Haveli as well:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Dispose of solid and liquid waste",
                  "Promotion of use of toilets",
                  "Proper hand wash technique",
                  "Cleanliness of surrounding",
                  "Safe drinking water",
                  "Health check-up camps",
                  "Medical assistance",
                  "Personal hygiene kit for students",
                  "Cleanliness drives in schools and villages",
                  "Promotion of better health practices",
                  "Information and guidance of Govt. health care schemes",
                  "Distribution of masks and sanitizers",
                  "Dental hygiene",
                  "Workshop for better mental health",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-cream-dark/50 border border-forest/10 flex items-center gap-2.5 font-body text-sm text-charcoal/90"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-forest shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-forest font-semibold text-base italic pt-3">
                We consider the Health as one of our core competency and looking forward to join hands with Corporates, Non-corporates and NGOs to work collaborate in Gujarat as well as other states.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. LIVELIHOOD */}
      {/* ============================================================ */}
      <section
        id="livelihood"
        className="section-padding py-20 lg:py-24 border-b border-forest/10 scroll-mt-28"
        aria-labelledby="livelihood-heading"
      >
        <div className="container-wide max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
              PROGRAMS • LIVELIHOOD
            </span>
            <h2
              id="livelihood-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark"
            >
              Livelihood
            </h2>
            <p className="font-body text-charcoal/90 text-base sm:text-lg leading-relaxed">
              Swadeep has been working on one of the key thematic interventions under the Livelihoods portfolio which is fisheries livelihood development. The fishery sector has witnessed serious crises during the last decade owing to its limitations to adjust to the changing environment. It is caught in a net of interrelated problems like lack of finance, lack of storage facilities, lack of awareness of market information, uncertain quality of fish, low level of education among fishermen, lack of availability of other and alternative profitable occupations, inadequate income, relatively high level of expenditure, extremes of climate and many more. Swadeep is standing strong with the community to provide basic amenities of everyday life and to help them achieve a better livelihood.
            </p>
            <p className="font-body text-charcoal/90 text-base sm:text-lg leading-relaxed">
              Not limited with just fishermen livelihood, Swadeep also carries other livelihood initiatives to help community anyway possible.
            </p>
            <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
              Gujarat is India’s largest marine fish producer, mostly due to its 1640 km long coastline supports four lakh population of fishermen and women. Three fishing communities are predominant in Gujarat. They are Kharvas, Kolis and Macchiyaras. Swadeep has been working since year 2013 for the upliftment of fishermen community in Mundra, Kutch and later at Jafrabad Taluka in Amreli. The objective of fisheries livelihood project is to ensure holistic development of livelihood option for fishermen.
            </p>
          </div>

          {/* Image Banner */}
          <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-forest/10">
            <Image
              src="/images/livelihood.jpg"
              alt="Livelihood Program - Swadeep Shikshan Vikas Sanstha"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Sub-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-forest/10 space-y-3">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Fisheries Information Center
              </h3>
              <p className="font-body text-charcoal/85 text-base leading-relaxed">
                Swadeep has provided a one stop solution at just some foot steps away from their residences to get the proper scientific information about the fishing, types of fishes, the method of drying for better quality, product branding, market linkages and better price of the product. It has now also become a great resource for meeting and training accommodation at Tragadi port.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-forest/10 space-y-3">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Providing Aids and Fishing Equipment
              </h3>
              <p className="font-body text-charcoal/85 text-base leading-relaxed">
                Swadeep identified the problems of fishermen community at Tragadi port and tried to better equip the fishermen with Ice box, solar dryer, solar boat light, tarpaulin, toilet facility, Individual first aid box, boat first aid box, instruments for packaging, gloves, and many more.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-forest/10 space-y-3">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Training and Capacity Building of Fishermen/Women
              </h3>
              <p className="font-body text-charcoal/85 text-base leading-relaxed">
                To strengthen the women of fishermen community at Tragadi port, 3 SHGs (Self Help Group) has been formed and the women are trained enough to develop quality products, packaging and marketing at their own. The trainings are conducted regularly for the topics like fish drying, formation of micro enterprise, saving of money, coastal security and awareness of education for parents.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-forest/10 space-y-3">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Government Scheme and Collaborations
              </h3>
              <p className="font-body text-charcoal/85 text-base leading-relaxed">
                The govt. is providing so many schemes for fishermen community at Tragadi port to help them in different areas. Swadeep is providing the connections between these two ends by spreading awareness of the related schemes, helping them in official paper works and being with them in any difficulty anyway in the procedure. Swadeep organizes the camps at Tragadi port to help them get the documents like Fishing license, Boat license, PAN card, Aadhar card, E-Shram card and Kissan credit card.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-forest/10 space-y-3">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Sagar Shala
              </h3>
              <p className="font-body text-charcoal/85 text-base leading-relaxed">
                Sagarshala is functioning in coordination with Sarva Shiksha Abhiyan for the children of the families of fishermen living on Tragadi port. In which children are taught by teachers for STP class from government education department. Children&apos;s educational materials and in-school infrastructure supports are provided by CGPL with the implementation support of Swadeep. Total 120 students are registered in Sagarshala.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-forest/10 space-y-3">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Helping the Community Affected by COVID-19
              </h3>
              <p className="font-body text-charcoal/85 text-base leading-relaxed">
                Swadeep understands the importance of single earning resource which holds the full financial responsibility to feed a full family. During COVID-19 pandemic, small businesses are hit badly. Swadeep is standing strong by them to help them grow. We have provided livelihood resources to 10 people associated with the occupation of vegetable sellers, fruit sellers and cutlery vendors. The number might look small at this moment but for the families of these people, these resources have brought a new hope with a little touch of joy to be financially stabilized again. The ration kits were also distributed to the needy ones at the time of lockdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. RURAL INFRASTRUCTURE DEVELOPMENT */}
      {/* ============================================================ */}
      <section
        id="infrastructure"
        className="section-padding py-20 lg:py-24 border-b border-forest/10 scroll-mt-28 bg-cream-dark/30"
        aria-labelledby="infrastructure-heading"
      >
        <div className="container-wide max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
              PROGRAMS • RURAL INFRASTRUCTURE
            </span>
            <h2
              id="infrastructure-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark"
            >
              Rural Infrastructure Development
            </h2>
            <p className="font-body text-charcoal/90 text-base sm:text-lg leading-relaxed">
              A good infrastructure not only provides the comfort but also it visually makes a very positive effect in individual. Swadeep has worked in this area for the betterment of villages, schools, Anganwadis and hostels also. Because, everyone deserves a little comfort and massive happiness level!
            </p>
          </div>

          {/* Image Banner */}
          <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-forest/10">
            <Image
              src="/images/infrastructure.jpg"
              alt="Rural Infrastructure - Swadeep Shikshan Vikas Sanstha"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Sub-sections */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                School Infrastructure
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                The appearance of school is one of the major things that attract children towards school. Who would not love a school at first sight which looks like it is made by keeping only children at focus? Swadeep is having a vast experience of transforming the appearance of building and developing a child-friendly playground. We lay a special emphasis on providing playground equipment (indoor and outdoor), school library and beautification of school grounds including painting work, plantation of trees and much more. The project is currently implemented in 29 schools of Rajula taluka in Amreli district of Gujarat.
              </p>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Swadeep has also raised a helping hand for intellectual and implementation support for the development of some user specific infrastructure and educational facilities for Bhavnagar Railway School.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>The Bedding facility was provided for the Rampara School hostel with capacity of 100 children.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Beautification of Anganwadi
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                Painting the walls of Anganwadi center with educational content which is not just visually beautiful but it also helps children grab the basic academic level of their age. Till the date, we have well-provided a beauty touch to Anganwadi centers with the drawings of basic learning topics like vegetables, flowers, fruits, vehicles, animals, colors, shapes, numbers, alphabets, etc. The experience of seeing the favorite cartoon character on the wall of their learning place makes children more comfortable in the building.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-forest/10 space-y-4">
              <h3 className="font-heading text-2xl font-bold text-forest-dark">
                Installation of Solar Street Lights
              </h3>
              <p className="font-body text-charcoal/85 text-base sm:text-lg leading-relaxed">
                Swadeep does not stop working only for the educational buildings. We also provide the solutions for infrastructure development for community with always keeping environment at the first priority. Under a project, the successful Installation of solar street lights is completed in the interior villages of Rajula taluka.
              </p>
              <p className="font-body text-forest font-semibold text-base italic pt-1">
                We also hold the expertise and would surely love to work for the development of roads, Panchayats and installation of solar lights to better serve the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. DISASTER MANAGEMENT */}
      {/* ============================================================ */}
      <section
        id="disaster"
        className="section-padding py-20 lg:py-24 scroll-mt-28"
        aria-labelledby="disaster-heading"
      >
        <div className="container-wide max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron-50 px-3.5 py-1.5 rounded-full border border-saffron-200">
              PROGRAMS • DISASTER MANAGEMENT
            </span>
            <h2
              id="disaster-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark"
            >
              Disaster Management
            </h2>
            <p className="font-body text-charcoal/90 text-base sm:text-lg leading-relaxed">
              When nature shows its destructive side in India and especially in Gujarat, Swadeep strongly count it as a duty to serve the humankind; who might have lost their everything in fraction of seconds or have suffered for the days. Swadeep believe to be at the site which has faced the calamity to serve the society socially, physically, mentally, emotionally and economically. Swadeep always takes this kind of situation at priority to share one’s sorrows and help all the lives in any possible way.
            </p>
          </div>

          {/* Image Banner */}
          <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-forest/10">
            <Image
              src="/images/safety.jpg"
              alt="Disaster Management - Swadeep Shikshan Vikas Sanstha"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Disaster Experience & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-forest/10 space-y-5">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Past Disaster Response Experience
              </h3>
              <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                Director and Senior team members of Swadeep are having great experience of work in following disasters:
              </p>
              <ul className="space-y-2.5 font-body text-charcoal/85 text-base">
                {[
                  "Kutch earthquake - 2001",
                  "Kashmir earthquake - 2005",
                  "Nagapattanam Tsunami - 2004",
                  "Surat & Navsari flood - 2006",
                  "Koshi flood, Bihar - 2008",
                  "COVID-19 Pandemic - 2020",
                  "Tauktae cyclone – 2021",
                ].map((disaster, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <CheckCircleIcon className="w-5 h-5 text-saffron shrink-0" />
                    <span className="font-semibold text-forest-dark">{disaster}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-forest/10 space-y-5">
              <h3 className="font-heading text-xl font-bold text-forest-dark">
                Major Highlights of Relief Work
              </h3>
              <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                Apart from this, Swadeep has been actively working in the underserviced areas during latest calamities Gujarat and U/T Dadra Nagar Haveli has faced in last some years. These activities were performed with the support of some social groups and individuals.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-cream-dark/50 border border-forest/10 space-y-1.5">
                  <h4 className="font-heading font-bold text-forest">COVID-19 Relief</h4>
                  <ul className="text-sm font-body text-charcoal/85 space-y-1 list-disc list-inside">
                    <li>32,000 masks distributed in 5 districts of Gujarat and U/T Dadra Nagar Haveli</li>
                    <li>6,000 educational kits distributed in collaboration with Sesame Workshop India</li>
                    <li>COVID-19 Awareness work and ration kit distributions in rural areas of Gujarat</li>
                    <li>Workshops for better mental health for community</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-cream-dark/50 border border-forest/10 space-y-1.5">
                  <h4 className="font-heading font-bold text-forest">Tauktae Cyclone Relief</h4>
                  <ul className="text-sm font-body text-charcoal/85 space-y-1 list-disc list-inside">
                    <li>3,000 ration kits distributed in the majorly affected areas of Rajula taluka of Amreli District</li>
                    <li>500 solar lights, 150 tarpaulin and 50 full-fledged kitchen kits provided to the needy ones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-forest-dark text-cream text-center">
        <div className="container-wide max-w-3xl mx-auto space-y-4 section-padding">
          <h2 className="font-heading text-3xl font-extrabold text-white">
            Support Our Grassroots Work
          </h2>
          <p className="font-body text-cream/85 text-base sm:text-lg">
            Swadeep is a non-profit organization and hence, any donation given to organization is liable for tax exemption.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-bold text-white bg-saffron hover:bg-saffron-dark transition-all duration-200 shadow-md"
            >
              <span>Donation Details</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-bold text-cream hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
