# Jobberman-Lite Frontend

A modern, responsive job board landing page built with React 18, TypeScript, Tailwind CSS, and Vite.

## Overview

This is a complete frontend implementation of the Jobberman-Lite job board platform featuring:

- **Home Page**: Hero section with search, stats, categories, latest jobs, and CTA
- **Jobs Page**: Dynamic job listing with filters (job type, location) and pagination
- **Registration Pages**: Dedicated registration flows for job seekers and employers
- **Theme System**: Custom light/dark mode with localStorage persistence
- **Glassmorphism Design**: Modern UI with backdrop blur effects and gradient accents
- **Responsive Design**: Mobile-first design that works on all devices

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with dark mode support
- **Routing**: React Router DOM v7
- **Icons**: Remix Icon (via CDN)
- **Fonts**: Google Fonts (Inter)

## Getting Started

### Prerequisites

- Node.js 16+ (or pnpm)
- npm, yarn, or pnpm package manager

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000` (or your configured port).

### Build for Production

```bash
npm run build
# or
pnpm build

# Preview the build locally
npm run preview
# or
pnpm preview
```

## Project Structure

```
src/
├── components/
│   ├── feature/          # Main feature components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeProvider.tsx
│   └── common/           # Reusable UI components
├── pages/
│   ├── home/
│   │   ├── page.tsx
│   │   └── components/   # Home page sections
│   │       ├── HeroSection.tsx
│   │       ├── StatsBar.tsx
│   │       ├── CategoryGrid.tsx
│   │       ├── LatestJobs.tsx
│   │       ├── JobCard.tsx
│   │       └── CTASection.tsx
│   ├── jobs/
│   │   └── page.tsx      # Jobs listing with filters
│   └── register/
│       ├── page.tsx      # Job seeker registration
│       └── employer/
│           └── page.tsx  # Employer registration
├── hooks/
│   └── useTheme.ts       # Custom theme hook
├── mocks/
│   └── jobs.ts           # Mock data for jobs and categories
├── App.tsx               # Main app with routing
├── main.tsx              # Entry point
└── index.css             # Global styles and Tailwind imports
```

## Key Features

### Theme System

- Custom implementation with `useTheme` hook
- Reads `jb-theme` from localStorage
- Falls back to system `prefers-color-scheme`
- Updates `document.documentElement` class for dark mode
- ThemeProvider wraps entire app

### Color Palette

| Element | Light | Dark |
|---------|-------|------|
| Page bg | white | slate-950 |
| Section alt bg | slate-50 | slate-950 |
| Primary accent | sky-500 | sky-400 |
| Text (body) | slate-500 | slate-400 |

### Components

#### HeroSection
- Full viewport hero with animated blobs
- Search bar with keyword and location inputs
- Trending tags for quick search
- Grid background pattern overlay

#### StatsBar
- 4 key metrics with icons
- IntersectionObserver for fade-in animation
- Glassmorphism container with all stats
- Trusted companies strip

#### CategoryGrid
- 6 job categories (Technology, Finance, Healthcare, etc.)
- Color-coded category cards
- Click-through to filtered job listings

#### JobCard
- Job type badges (color-coded by type)
- Company logo placeholder with icon
- Tags display
- Salary and posted date footer
- Hover effects with smooth transitions

#### JobsPage
- Sidebar filters (job type, location)
- Grid layout for job cards
- Pagination (12 items per page)
- No results state with clear filters button

#### Registration Pages
- Form validation
- Password confirmation
- Employer-specific fields (company, industry, size)
- Seamless navigation between seeker/employer flows

## Customization

### Modifying the Theme

Edit `src/hooks/useTheme.ts` to change the theme logic or storage key.

### Adding More Jobs

Update mock data in `src/mocks/jobs.ts`:

```typescript
export const mockJobs: Job[] = [
  // Add more mock job objects
];

export const mockCategories: Category[] = [
  // Add more categories
];
```

### Styling

- Tailwind classes are used throughout
- Dark mode variants use `dark:` prefix (class strategy)
- Custom animation defined in `tailwind.config.ts`: `animate-pulse-slow`
- All transitions use `transition-all duration-300`

## API Integration

The project is configured to proxy API requests to `http://localhost:8000` (Django backend):

```typescript
// In vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

Replace mock functions with real API calls as needed:

```typescript
// Example: Hook for fetching jobs
const { data: jobs } = useQuery(['jobs'], () =>
  fetch('/api/jobs').then(r => r.json())
);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting via Vite
- Lazy loading with React Router
- IntersectionObserver for animations
- Optimized image formats
- CSS class pruning with Tailwind

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT
