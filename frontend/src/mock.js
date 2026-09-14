// Mock data for CivicLink

export const CATEGORIES = [
  {
    id: 'msme',
    name: 'MSME & Business Credit',
    description: 'Collateral-free business loans, working capital & capital subsidies for micro enterprises.',
    tag: 'PMEGP, MUDRA, Stand-Up India',
    icon: 'Briefcase',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'agri',
    name: 'Agriculture & Rural Enterprise',
    description: 'Kisan credit loans, livestock capital subsidies & rural enterprise development grants.',
    tag: 'KCC, NLM, PM-KUSUM',
    icon: 'Sprout',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 'artisan',
    name: 'Artisans & Traditional Trades',
    description: 'Collateral-free credit, toolkits & skill upgradation for 18 traditional craftsmanship trades.',
    tag: 'PM Vishwakarma, NSFDC',
    icon: 'Hammer',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'edu',
    name: 'Education & Scholarships',
    description: 'Pre-matric, post-matric and top-class education financial assistance for deserving students.',
    tag: 'PM-YASASVI, NMMS',
    icon: 'GraduationCap',
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: 'social',
    name: 'Social Security & Pensions',
    description: 'Guaranteed monthly pensions, accident insurance & term life protection for workers.',
    tag: 'APY, PMSBY, PMJJBY',
    icon: 'ShieldCheck',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'health',
    name: 'Health & Family Welfare',
    description: '\u20B95 Lakh cashless health cover, maternal benefits & specialized child welfare schemes.',
    tag: 'AB-PMJAY, PMMVY, SSY',
    icon: 'HeartPulse',
    color: 'from-red-500 to-rose-500',
  },
];

export const FOCUS_TAGS = [
  'MUDRA Loan',
  'Women Entrepreneurs',
  'PM Vishwakarma',
  'Agriculture & Dairy',
  'Scholarships',
  'Ayushman Bharat',
];

export const MINISTRIES = [
  'Ministry of Finance',
  'Ministry of Micro, Small and Medium Enterprises',
  'Ministry of Agriculture & Farmers Welfare',
  'Ministry of Rural Development',
  'Ministry of Social Justice and Empowerment',
  'Ministry of Health and Family Welfare',
  'Ministry of Women and Child Development',
  'Ministry of Skill Development and Entrepreneurship',
  'Ministry of Education',
  'Ministry of Housing and Urban Affairs',
  'Ministry of Textiles',
  'Ministry of Labour and Employment',
];

export const SECTORS = [
  'Credit / Loan',
  'Insurance',
  'Pension',
  'Subsidy',
  'Skill Development',
  'Health',
  'Education',
  'Agriculture',
  'Housing',
  'Employment',
];

export const BENEFICIARIES = [
  'General Citizen',
  'Women',
  'Farmers',
  'Students',
  'Senior Citizens',
  'SC / ST',
  'OBC',
  'Minorities',
  'Artisans',
  'MSME Entrepreneurs',
  'Below Poverty Line',
];

export const APPLICATION_ROUTES = [
  'Online Portal',
  'Bank / Financial Institution',
  'CSC (Common Service Centre)',
  'District / Block Office',
  'State Nodal Agency',
];

const RAW_SCHEMES = [
  { name: 'Pradhan Mantri MUDRA Yojana (PMMY)', tag: 'Credit Guarantee & Institutional Refinance Scheme', ministry: 'Ministry of Finance', category: 'msme', desc: 'Collateral-free micro loans up to \u20B920 Lakh under Shishu, Kishor, Tarun, and Tarun Plus categories for small business & entrepreneurs.', loan: '\u20B920 Lakh', rate: 'As per bank', beneficiary: 'MSME Entrepreneurs', sector: 'Credit / Loan', route: 'Bank / Financial Institution' },
  { name: 'Prime Minister Employment Generation Programme (PMEGP)', tag: 'Credit-Linked Subsidy Scheme', ministry: 'Ministry of Micro, Small and Medium Enterprises', category: 'msme', desc: 'Credit-linked margin money subsidy up to 35% for setting up new micro-enterprises in manufacturing (project cost up to \u20B950 Lakh).', loan: '\u20B950 Lakh', rate: 'As per bank', beneficiary: 'MSME Entrepreneurs', sector: 'Subsidy', route: 'Bank / Financial Institution' },
  { name: 'Stand-Up India', tag: 'Scheduled Commercial Bank Credit Scheme', ministry: 'Ministry of Finance', category: 'msme', desc: 'Bank loans between \u20B910 Lakh and \u20B91 Crore for SC, ST, and Women entrepreneurs setting up greenfield manufacturing enterprises.', loan: '\u20B91.0 Cr', rate: 'As per bank', beneficiary: 'Women', sector: 'Credit / Loan', route: 'Bank / Financial Institution' },
  { name: 'PM Vishwakarma Yojana', tag: 'Traditional Artisan Support Scheme', ministry: 'Ministry of Micro, Small and Medium Enterprises', category: 'artisan', desc: 'Toolkit incentive, collateral-free credit up to \u20B93 Lakh, skill training and stipend for 18 traditional craft trades.', loan: '\u20B93 Lakh', rate: '5% concessional', beneficiary: 'Artisans', sector: 'Credit / Loan', route: 'Online Portal' },
  { name: 'Kisan Credit Card (KCC)', tag: 'Farm Credit Scheme', ministry: 'Ministry of Agriculture & Farmers Welfare', category: 'agri', desc: 'Short-term credit for cultivation expenses, post-harvest, marketing and consumption at concessional interest for farmers.', loan: '\u20B93 Lakh', rate: '4% (with subvention)', beneficiary: 'Farmers', sector: 'Credit / Loan', route: 'Bank / Financial Institution' },
  { name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', tag: 'Direct Income Support', ministry: 'Ministry of Agriculture & Farmers Welfare', category: 'agri', desc: 'Direct income support of \u20B96,000 per year in three equal installments to eligible land-holding farmer families.', loan: '\u20B96,000/yr', rate: 'DBT', beneficiary: 'Farmers', sector: 'Subsidy', route: 'Online Portal' },
  { name: 'PM-KUSUM (Solar Energy)', tag: 'Solar Pump & Grid Connected Scheme', ministry: 'Ministry of Agriculture & Farmers Welfare', category: 'agri', desc: 'Financial and water security to farmers through installation of solar pumps and grid-connected solar power plants.', loan: '60% subsidy', rate: 'DBT', beneficiary: 'Farmers', sector: 'Subsidy', route: 'State Nodal Agency' },
  { name: 'National Livestock Mission (NLM)', tag: 'Entrepreneurship Development', ministry: 'Ministry of Agriculture & Farmers Welfare', category: 'agri', desc: 'Capital subsidy up to 50% for entrepreneurship development in poultry, sheep, goat, piggery and fodder sectors.', loan: '\u20B950 Lakh', rate: 'Subsidy', beneficiary: 'Farmers', sector: 'Subsidy', route: 'Online Portal' },
  { name: 'PM-YASASVI Scholarship', tag: 'OBC / EBC / DNT Scholarship', ministry: 'Ministry of Social Justice and Empowerment', category: 'edu', desc: 'Pre-matric and post-matric scholarships for OBC, EBC and DNT students to pursue quality school and higher education.', loan: '\u20B91.25 Lakh/yr', rate: 'Grant', beneficiary: 'Students', sector: 'Education', route: 'Online Portal' },
  { name: 'National Means-cum-Merit Scholarship (NMMS)', tag: 'Merit Based Scholarship', ministry: 'Ministry of Education', category: 'edu', desc: '\u20B912,000 per annum scholarship to meritorious students of economically weaker sections from Class 9 to Class 12.', loan: '\u20B912,000/yr', rate: 'Grant', beneficiary: 'Students', sector: 'Education', route: 'Online Portal' },
  { name: 'Atal Pension Yojana (APY)', tag: 'Guaranteed Pension Scheme', ministry: 'Ministry of Finance', category: 'social', desc: 'Guaranteed minimum pension of \u20B91,000 to \u20B95,000 per month after age 60 for unorganised sector workers.', loan: '\u20B95,000/mo', rate: 'Pension', beneficiary: 'General Citizen', sector: 'Pension', route: 'Bank / Financial Institution' },
  { name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)', tag: 'Accident Insurance', ministry: 'Ministry of Finance', category: 'social', desc: 'Accidental death and disability cover of \u20B92 Lakh at a nominal premium of \u20B920 per year for age 18\u201370.', loan: '\u20B92 Lakh', rate: '\u20B920/yr premium', beneficiary: 'General Citizen', sector: 'Insurance', route: 'Bank / Financial Institution' },
  { name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)', tag: 'Term Life Insurance', ministry: 'Ministry of Finance', category: 'social', desc: 'Renewable term life insurance cover of \u20B92 Lakh at \u20B9436 per year for individuals in the age group 18\u201350.', loan: '\u20B92 Lakh', rate: '\u20B9436/yr premium', beneficiary: 'General Citizen', sector: 'Insurance', route: 'Bank / Financial Institution' },
  { name: 'Ayushman Bharat \u2013 PMJAY', tag: 'Health Assurance Mission', ministry: 'Ministry of Health and Family Welfare', category: 'health', desc: 'Cashless in-patient hospitalization cover of \u20B95 Lakh per family per year at empanelled hospitals for eligible families.', loan: '\u20B95 Lakh', rate: 'Cashless', beneficiary: 'Below Poverty Line', sector: 'Health', route: 'CSC (Common Service Centre)' },
  { name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)', tag: 'Maternity Benefit Scheme', ministry: 'Ministry of Women and Child Development', category: 'health', desc: 'Cash incentive of \u20B95,000 for pregnant women and lactating mothers for the birth of the first living child.', loan: '\u20B95,000', rate: 'DBT', beneficiary: 'Women', sector: 'Health', route: 'District / Block Office' },
  { name: 'Sukanya Samriddhi Yojana (SSY)', tag: 'Girl Child Savings Scheme', ministry: 'Ministry of Finance', category: 'health', desc: 'Small savings scheme for the girl child with attractive interest rate and tax benefit under Section 80C.', loan: '\u20B91.5 Lakh/yr', rate: '8.2%', beneficiary: 'General Citizen', sector: 'Subsidy', route: 'Bank / Financial Institution' },
  { name: 'Deendayal Antyodaya Yojana \u2013 NRLM', tag: 'National Rural Livelihoods Mission', ministry: 'Ministry of Rural Development', category: 'agri', desc: 'Self-help group formation, financial inclusion and livelihood support to rural poor households across India.', loan: '\u20B910 Lakh', rate: 'Concessional', beneficiary: 'Women', sector: 'Credit / Loan', route: 'State Nodal Agency' },
  { name: 'Pradhan Mantri Awas Yojana \u2013 Gramin', tag: 'Rural Housing Mission', ministry: 'Ministry of Rural Development', category: 'social', desc: 'Assistance for construction of pucca houses with basic amenities for rural households living in kutcha and dilapidated houses.', loan: '\u20B91.2 Lakh', rate: 'Grant', beneficiary: 'Below Poverty Line', sector: 'Housing', route: 'District / Block Office' },
  { name: 'PMAY \u2013 Urban 2.0', tag: 'Affordable Housing Mission', ministry: 'Ministry of Housing and Urban Affairs', category: 'social', desc: 'Interest subsidy and financial assistance for affordable housing to eligible urban households.', loan: '\u20B92.5 Lakh', rate: 'Interest subsidy', beneficiary: 'Below Poverty Line', sector: 'Housing', route: 'Online Portal' },
  { name: 'Skill India Mission \u2013 PMKVY 4.0', tag: 'Skill Development Programme', ministry: 'Ministry of Skill Development and Entrepreneurship', category: 'edu', desc: 'Short-term skill training and certification for youth with monetary reward and placement assistance.', loan: 'Training', rate: 'Free', beneficiary: 'Students', sector: 'Skill Development', route: 'Online Portal' },
];

// Expand to 90 schemes by duplicating with variations
const STATES_SUFFIX = ['(Central)', '(Bihar Extension)', '(Maharashtra Add-on)', '(Karnataka Rider)'];
export const SCHEMES = (function build() {
  const out = [];
  let id = 1;
  RAW_SCHEMES.forEach((s) => {
    out.push({ ...s, id: `SCH-${String(id).padStart(3, '0')}`, verified: true });
    id += 1;
  });
  // pad to 90 by cloning with suffix
  let i = 0;
  while (out.length < 90) {
    const base = RAW_SCHEMES[i % RAW_SCHEMES.length];
    const suffix = STATES_SUFFIX[i % STATES_SUFFIX.length];
    out.push({
      ...base,
      name: `${base.name} ${suffix}`,
      id: `SCH-${String(id).padStart(3, '0')}`,
      verified: true,
    });
    id += 1;
    i += 1;
  }
  return out;
})();

export const PARTNERS = [
  { id: 'p1', name: 'Bank of India \u2013 Connaught Place Branch', type: 'Bank / MUDRA Nodal', address: 'Parliament Street, New Delhi, 110001', distance: '1.2 km', phone: '011-2334-5678', state: 'Delhi', district: 'New Delhi' },
  { id: 'p2', name: 'CSC Digital Seva Kendra \u2013 Karol Bagh', type: 'Common Service Centre', address: 'Karol Bagh Main Market, New Delhi', distance: '3.4 km', phone: '011-2578-1122', state: 'Delhi', district: 'New Delhi' },
  { id: 'p3', name: 'NABARD Regional Office', type: 'NABARD / Agri Credit', address: 'Mumbai Central, Maharashtra', distance: '5.1 km', phone: '022-2653-9876', state: 'Maharashtra', district: 'Mumbai' },
  { id: 'p4', name: 'District Industries Centre (DIC) Pune', type: 'State Nodal Agency', address: 'Shivaji Nagar, Pune, 411005', distance: '2.8 km', phone: '020-2551-4400', state: 'Maharashtra', district: 'Pune' },
  { id: 'p5', name: 'SIDBI Branch \u2013 Bengaluru', type: 'SIDBI / MSME', address: 'MG Road, Bengaluru, 560001', distance: '4.6 km', phone: '080-2558-1200', state: 'Karnataka', district: 'Bengaluru Urban' },
  { id: 'p6', name: 'Pashusakhi Livestock Kendra', type: 'NLM Facilitation Centre', address: 'Jaipur, Rajasthan', distance: '6.2 km', phone: '0141-256-7788', state: 'Rajasthan', district: 'Jaipur' },
];

export const CHAT_QUESTIONS = [
  { key: 'name', q: 'Namaste! I am the CivicLink Assistant. May I know your name?', type: 'text', placeholder: 'Your full name' },
  { key: 'age', q: 'Thank you. What is your age in years?', type: 'number', placeholder: 'e.g. 28' },
  { key: 'gender', q: 'Please share your gender.', type: 'choice', options: ['Female', 'Male', 'Other'] },
  { key: 'category', q: 'Which social category do you belong to?', type: 'choice', options: ['General', 'OBC', 'SC', 'ST', 'Minority'] },
  { key: 'income', q: 'What is your approximate annual family income (\u20B9)?', type: 'choice', options: ['Below 2.5 Lakh', '2.5 \u2013 5 Lakh', '5 \u2013 8 Lakh', 'Above 8 Lakh'] },
  { key: 'occupation', q: 'What best describes your occupation?', type: 'choice', options: ['Farmer', 'Artisan / Craftsperson', 'Small Business / MSME', 'Student', 'Salaried', 'Homemaker', 'Unemployed'] },
  { key: 'state', q: 'Which state do you live in?', type: 'choice', options: ['Delhi', 'Maharashtra', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'Bihar', 'Rajasthan', 'Gujarat', 'Other'] },
  { key: 'need', q: 'What kind of support are you looking for?', type: 'choice', options: ['Business Loan', 'Education / Scholarship', 'Health / Insurance', 'Pension / Social Security', 'Housing', 'Agriculture Support'] },
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
  { code: 'as', label: 'অসমীয়া' },
];

// Deterministic rule-based scheme matching
export function matchSchemes(profile) {
  const results = SCHEMES.map((s) => {
    let score = 40;
    const reasons = [];
    const unmet = [];

    // occupation-based
    if (profile.occupation === 'Farmer' && s.category === 'agri') { score += 25; reasons.push('You reported farming as your occupation'); }
    if (profile.occupation === 'Artisan / Craftsperson' && s.category === 'artisan') { score += 25; reasons.push('Traditional artisan trades are covered'); }
    if (profile.occupation === 'Small Business / MSME' && s.category === 'msme') { score += 25; reasons.push('MSME entrepreneurs are the target group'); }
    if (profile.occupation === 'Student' && s.category === 'edu') { score += 25; reasons.push('Students are eligible for this scholarship'); }

    // need-based
    if (profile.need === 'Business Loan' && s.category === 'msme') { score += 15; reasons.push('Matches your requirement for business credit'); }
    if (profile.need === 'Education / Scholarship' && s.category === 'edu') { score += 15; reasons.push('Matches your scholarship requirement'); }
    if (profile.need === 'Health / Insurance' && s.category === 'health') { score += 15; reasons.push('Provides health / insurance coverage'); }
    if (profile.need === 'Pension / Social Security' && s.category === 'social') { score += 15; reasons.push('Provides social security & pension benefits'); }
    if (profile.need === 'Housing' && s.sector === 'Housing') { score += 15; reasons.push('Provides housing assistance'); }
    if (profile.need === 'Agriculture Support' && s.category === 'agri') { score += 15; reasons.push('Supports agriculture and rural development'); }

    // gender
    if (profile.gender === 'Female' && (s.beneficiary === 'Women' || s.name.includes('Women'))) { score += 10; reasons.push('Prioritised for women beneficiaries'); }

    // income
    if (profile.income && profile.income.startsWith('Below') && s.beneficiary === 'Below Poverty Line') { score += 10; reasons.push('Income bracket aligns with beneficiary criteria'); }

    // age
    const age = parseInt(profile.age || '0', 10);
    if (age >= 18 && age <= 70 && s.sector === 'Insurance') { score += 5; reasons.push('Age falls within eligibility window'); }
    if (age >= 60 && s.category === 'social' && s.name.includes('Pension')) { score += 8; reasons.push('Senior citizen eligible for pension benefits'); }

    if (reasons.length === 0) unmet.push('Profile does not directly indicate a primary match');

    return { scheme: s, score: Math.min(score, 98), reasons, unmet };
  });

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 12);
}
