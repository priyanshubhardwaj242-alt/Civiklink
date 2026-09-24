import LOCAL_SCHEMES from './data/schemes.json';

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


export const SCHEMES = LOCAL_SCHEMES;

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
