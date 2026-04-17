import { useEffect, useState, useRef } from 'react';

const stats = [
  { numericValue: 2500, suffix: '+', label: 'Active Jobs', icon: 'ri-briefcase-4-line' },
  { numericValue: 300, suffix: '+', label: 'Top Companies', icon: 'ri-building-2-line' },
  { numericValue: 10000, suffix: '+', label: 'Candidates Hired', icon: 'ri-user-star-line' },
  { numericValue: 36, suffix: '', label: 'States Covered', icon: 'ri-map-2-line' },
];

function CountUpNumber({ end, suffix, start }: { end: number, suffix: string, start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    const duration = 3000; // 3 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo easing function for smoother deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [start, end]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export function StatsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-slate-900 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-100 dark:border-slate-700/50 rounded-2xl p-8 md:p-12 transition-colors duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`flex flex-col items-center text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/40 flex items-center justify-center text-sky-500 mb-6 transition-colors duration-300">
                  <i className={`${stat.icon} text-3xl`}></i>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                  <CountUpNumber end={stat.numericValue} suffix={stat.suffix} start={isVisible} />
                </h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-700/50 flex flex-col items-center transition-colors duration-300">
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-wider">Trusted by top companies</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {['Paystack', 'Flutterwave', 'Moniepoint', 'PiggyVest', 'Andela'].map((company, i) => (
                <div key={i} className="text-xl font-bold text-slate-800 dark:text-slate-300 italic">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
