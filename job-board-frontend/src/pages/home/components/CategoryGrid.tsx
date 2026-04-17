import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';

const fallbackCategories = [
  { id: 'tech', name: 'Technology', icon: 'ri-code-s-slash-line', accent: '#0EA5E9', count: 0 },
  { id: 'finance', name: 'Finance', icon: 'ri-money-dollar-circle-line', accent: '#10B981', count: 0 },
  { id: 'healthcare', name: 'Healthcare', icon: 'ri-heart-pulse-line', accent: '#EF4444', count: 0 },
  { id: 'education', name: 'Education', icon: 'ri-graduation-cap-line', accent: '#8B5CF6', count: 0 },
  { id: 'retail', name: 'Retail', icon: 'ri-shopping-bag-line', accent: '#F59E0B', count: 0 },
  { id: 'manufacturing', name: 'Manufacturing', icon: 'ri-tools-line', accent: '#6366F1', count: 0 },
];

export function CategoryGrid() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories/');
        const apiCats = res.data.results || res.data;
        if (apiCats.length > 0) {
          const icons = ['ri-code-s-slash-line', 'ri-money-dollar-circle-line', 'ri-heart-pulse-line', 'ri-graduation-cap-line', 'ri-shopping-bag-line', 'ri-tools-line'];
          const accents = ['#0EA5E9', '#10B981', '#EF4444', '#8B5CF6', '#F59E0B', '#6366F1'];
          setCategories(apiCats.map((c: any, i: number) => ({
            ...c,
            icon: icons[i % icons.length],
            accent: accents[i % accents.length],
            count: c.count || 0,
          })));
        }
      } catch { /* use fallback */ }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/jobs?search=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4"><i className="ri-folder-open-line"></i> Category</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Explore by category</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">Find the perfect role that matches your expertise. We have thousands of job listings across various industries.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} onClick={() => handleCategoryClick(category.name)} className="group cursor-pointer bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-100/50 dark:hover:shadow-none">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${category.accent}15`, color: category.accent }}>
                <i className={category.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{category.name}</h3>
              <div className="flex items-center justify-between mt-6">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Browse openings</span>
                <span className="text-sm font-medium text-sky-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">Explore <i className="ri-arrow-right-line"></i></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
