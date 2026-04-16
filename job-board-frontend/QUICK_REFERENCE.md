# Jobberman-Lite Frontend - Quick Reference

## 🚀 Quick Start
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 📋 Available Routes

| Route | Page | Components |
|-------|------|-----------|
| `/` | Home (Landing) | HeroSection, StatsBar, CategoryGrid, LatestJobs, CTASection |
| `/jobs` | Job Listing | Sidebar filters, Job grid, Pagination |
| `/register` | Job Seeker Signup | Registration form |
| `/register/employer` | Employer Signup | Company registration form |
| `*` | Not Found | Redirects to `/` |

## 🎨 Theme System

```typescript
// Use theme in components
import { useTheme } from '@/hooks/useTheme';

export const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
};
```

**Storage Key**: `jb-theme` (localStorage)
**Fallback**: System `prefers-color-scheme`

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main routing configuration |
| `src/mocks/jobs.ts` | All mock data (jobs, categories) |
| `src/components/feature/ThemeProvider.tsx` | Theme provider wrapper |
| `src/pages/home/page.tsx` | Home page layout |
| `src/pages/jobs/page.tsx` | Jobs listing with filters |
| `tailwind.config.ts` | Tailwind configuration |
| `vite.config.ts` | Vite & build configuration |

## 🎭 Using Mock Data

```typescript
// Import mock data
import { mockJobs, mockCategories } from '@/mocks/jobs';

// mockJobs: Job[]
// mockCategories: Category[]

// To use real API instead, fetch from /api/jobs
```

## 🧩 Component Patterns

### Create a new page
```typescript
// src/pages/mypage/page.tsx
import { Navbar } from '@/components/feature/Navbar';
import { Footer } from '@/components/feature/Footer';

export const MyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Content */}
      </main>
      <Footer />
    </div>
  );
};

// Add to App.tsx routing
<Route path="/mypage" element={<MyPage />} />
```

### Create a form component
```typescript
import { useState } from 'react';

export const MyForm = () => {
  const [data, setData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name) {
      setError('Name required');
      return;
    }
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={data.name}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 
                   border border-slate-200 dark:border-slate-700 
                   rounded-lg focus:ring-2 focus:ring-sky-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};
```

## 🎨 Common Tailwind Patterns

### Glassmorphism Container
```tsx
<div className="bg-white/70 dark:bg-slate-800/50 
                backdrop-blur-xl 
                border border-white/80 dark:border-slate-700/50 
                rounded-2xl p-6">
  {/* Content */}
</div>
```

### Button Styles
```tsx
{/* Primary Button */}
<button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 
                   text-white rounded-lg transition-colors 
                   cursor-pointer active:scale-95">
  CTA
</button>

{/* Secondary Button */}
<button className="px-6 py-2 border border-slate-200 
                   dark:border-slate-700 rounded-lg 
                   hover:bg-slate-50 dark:hover:bg-slate-700/50 
                   transition-colors cursor-pointer">
  Secondary
</button>
```

### Dark Mode Text
```tsx
<p className="text-slate-900 dark:text-white">Heading</p>
<p className="text-slate-600 dark:text-slate-400">Body</p>
<p className="text-slate-500 dark:text-slate-500">Muted</p>
```

### Grid Layouts
```tsx
{/* Responsive Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>

{/* 2x2 Stats Grid */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {/* Stats */}
</div>
```

### Hover Effects
```tsx
{/* Lift on hover */}
className="transition-all duration-300 hover:-translate-y-1 
           border rounded-2xl hover:border-sky-200"

{/* Text color on hover */}
className="text-slate-600 hover:text-sky-600 
           dark:text-slate-400 dark:hover:text-sky-400"
```

## 🔗 API Integration

### API Proxy Configuration
```typescript
// In vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
}
```

### Fetching Data
```typescript
// Using fetch
const response = await fetch('/api/jobs');
const data = await response.json();

// Using axios (if added)
import axios from 'axios';
const { data } = await axios.get('/api/jobs');
```

## 📱 Responsive Breakpoints (Tailwind)

| Prefix | Width |
|--------|-------|
| (none) | 0px → ∞ (mobile-first) |
| `sm:` | 640px → ∞ |
| `md:` | 768px → ∞ |
| `lg:` | 1024px → ∞ |
| `xl:` | 1280px → ∞ |
| `2xl:` | 1536px → ∞ |

## 🛠️ Common Tasks

### Add New Page
1. Create folder in `src/pages/`
2. Add `page.tsx` file
3. Import Navbar, Footer
4. Add route to `App.tsx`
5. Test routing

### Update Mock Data
1. Edit `src/mocks/jobs.ts`
2. Modify `mockJobs` or `mockCategories` arrays
3. Component re-renders automatically (hot reload)

### Change Colors
1. Tailwind classes use predefined tokens
2. Update `tailwind.config.ts` to modify base colors
3. Or use inline colors like `bg-sky-500`

### Enable API Calls
1. Replace mock imports with fetch/axios
2. Add error handling
3. Add loading states
4. Update component UI accordingly

## ⚡ Performance Tips

1. **Use useMemo** for expensive calculations
2. **Lazy load routes** with React.lazy()
3. **Optimize images** (compress, use WebP)
4. **Use IntersectionObserver** for animations
5. **Code splitting** happens automatically with Vite

## 🐛 Debugging

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Check component hierarchy

### Network Tab
- Open DevTools → Network tab
- Monitor API calls to backend
- Check response status and payload

### Console
- Watch for errors and warnings
- Use `console.log()` for debugging
- Check theme storage: `localStorage.getItem('jb-theme')`

## 📚 Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Check types
npx tsc --noEmit

# Install new package
npm install <package-name>

# Remove package
npm uninstall <package-name>
```

## 🔑 Key Imports

```typescript
// React & routing
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

// Theme
import { useTheme } from '@/hooks/useTheme';

// Mock data
import { mockJobs, mockCategories, Job, Category } from '@/mocks/jobs';

// Components
import { Navbar } from '@/components/feature/Navbar';
import { Footer } from '@/components/feature/Footer';
```

## 🎓 Learning Resources

- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **React Router**: https://reactrouter.com/
- **Tailwind**: https://tailwindcss.com/
- **TypeScript**: https://www.typescriptlang.org/

---

**Tip**: Use these patterns consistently across the app for maintainability!
