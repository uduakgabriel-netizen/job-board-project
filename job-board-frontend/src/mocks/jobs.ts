export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid';
  salary: string;
  tags: string[];
  logo: string;
  postedAt: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Engineer',
    company: 'Paystack',
    location: 'Lagos (Hybrid)',
    type: 'Hybrid',
    salary: '₦1.2M - ₦2M / month',
    tags: ['React', 'TypeScript', 'Node.js'],
    logo: 'ri-bank-card-line',
    postedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Flutterwave',
    location: 'Remote',
    type: 'Remote',
    salary: '₦800k - ₦1.5M / month',
    tags: ['Figma', 'UI/UX', 'Design Systems'],
    logo: 'ri-pencil-ruler-2-line',
    postedAt: '5 hours ago',
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Moniepoint',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦500k - ₦900k / month',
    tags: ['Vue', 'JavaScript', 'CSS'],
    logo: 'ri-store-2-line',
    postedAt: '1 day ago',
  },
  {
    id: '4',
    title: 'Backend Engineer',
    company: 'Kuda Bank',
    location: 'Lagos (Hybrid)',
    type: 'Hybrid',
    salary: '₦1M - ₦1.8M / month',
    tags: ['C#', '.NET', 'SQL'],
    logo: 'ri-building-4-line',
    postedAt: '3 days ago',
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'PiggyVest',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦400k - ₦750k / month',
    tags: ['SEO', 'Content', 'Social Media'],
    logo: 'ri-piggy-bank-line',
    postedAt: '4 hours ago',
  },
  {
    id: '6',
    title: 'Data Analyst',
    company: 'Andela',
    location: 'Remote',
    type: 'Remote',
    salary: '₦600k - ₦1.1M / month',
    tags: ['Python', 'SQL', 'Tableau'],
    logo: 'ri-line-chart-line',
    postedAt: '1 week ago',
  },
];

export const mockCategories = [
  { id: 'cat-tech', name: 'Technology', icon: 'ri-macbook-line', accent: '#0ea5e9', count: 1240 },
  { id: 'cat-fin', name: 'Finance', icon: 'ri-bank-line', accent: '#10b981', count: 831 },
  { id: 'cat-health', name: 'Healthcare', icon: 'ri-heart-pulse-line', accent: '#f43f5e', count: 420 },
  { id: 'cat-edu', name: 'Education', icon: 'ri-book-open-line', accent: '#8b5cf6', count: 512 },
  { id: 'cat-mkt', name: 'Marketing', icon: 'ri-megaphone-line', accent: '#f59e0b', count: 654 },
  { id: 'cat-sales', name: 'Sales', icon: 'ri-shopping-cart-line', accent: '#6366f1', count: 910 },
];
