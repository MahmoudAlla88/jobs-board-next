// export default function HomePage() {
//   return (
//     <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
//       <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
//         <h1>أهلاً بك في منصة الوظائف الإبداعية</h1>
//         <p>استكشف فرص العمل في التصميم، البرمجة، التسويق والمزيد!</p>
//         <button style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//           تصفح الوظائف
//         </button>
//       </section>

//       <section>
//         <h2>وظائف مميزة:</h2>
//         <ul>
//           <li>🎨 مصمم UI/UX لشركة ناشئة</li>
//           <li>💻 مطور React للعمل عن بعد</li>
//           <li>📈 مسوّق رقمي بخبرة SEO</li>
//         </ul>
//       </section>

//       <footer style={{ marginTop: '4rem', borderTop: '1px solid #ccc', paddingTop: '1rem', textAlign: 'center' }}>
//         <p>© 2025 منصة الوظائف الإبداعية. جميع الحقوق محفوظة.</p>
//       </footer>
//     </main>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import { Search, Briefcase, Users, TrendingUp, Star, ArrowRight, Globe, Zap, Heart } from 'lucide-react';

export default function HomePage() {
  const [hoveredJob, setHoveredJob] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredJobs = [
    {
      id: 1,
      title: 'مصمم UI/UX لشركة ناشئة',
      company: 'تقنية الإبداع',
      salary: '5000-8000 ريال',
      location: 'الرياض',
      type: 'دوام كامل',
      icon: '🎨',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      id: 2,
      title: 'مطور React للعمل عن بعد',
      company: 'حلول رقمية',
      salary: '6000-10000 ريال',
      location: 'عن بُعد',
      type: 'مرن',
      icon: '💻',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      id: 3,
      title: 'مسوّق رقمي بخبرة SEO',
      company: 'نمو التسويق',
      salary: '4000-7000 ريال',
      location: 'جدة',
      type: 'دوام كامل',
      icon: '📈',
      gradient: 'from-green-400 to-emerald-400'
    }
  ];

  const stats = [
    { icon: Briefcase, number: '2500+', label: 'وظيفة متاحة' },
    { icon: Users, number: '15000+', label: 'عضو مسجل' },
    { icon: TrendingUp, number: '85%', label: 'معدل التوظيف' },
    { icon: Star, number: '4.9', label: 'تقييم المنصة' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800" dir="rtl">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-20 right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                منصة الوظائف الإبداعية
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 space-x-reverse">
              <button className="text-gray-600 hover:text-purple-600 transition-colors duration-200">الوظائف</button>
              <button className="text-gray-600 hover:text-purple-600 transition-colors duration-200">الشركات</button>
              <button className="text-gray-600 hover:text-purple-600 transition-colors duration-200">عنا</button>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                تسجيل الدخول
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              أهلاً بك في
            </span>
            <br />
            <span className="text-gray-800">مستقبل العمل الإبداعي</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            استكشف آلاف الفرص الوظيفية في التصميم، البرمجة، التسويق الرقمي والمزيد من المجالات الإبداعية
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/20">
                <input
                  type="text"
                  placeholder="ابحث عن وظيفة أحلامك..."
                  className="flex-1 px-6 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
              تصفح الوظائف
              <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="group bg-white/20 backdrop-blur-md text-gray-800 px-8 py-4 rounded-2xl text-lg font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center">
              <Globe className="w-5 h-5 ml-2" />
              للشركات
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">وظائف مميزة</h2>
          <p className="text-xl text-gray-600">اكتشف أحدث الفرص الوظيفية من أفضل الشركات</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="group relative bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredJob(job.id)}
              onMouseLeave={() => setHoveredJob(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"
                   style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
              
              <div className="relative">
                <div className="text-4xl mb-4">{job.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-4">{job.company}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">الراتب:</span>
                    <span className="font-semibold text-green-600">{job.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الموقع:</span>
                    <span className="font-semibold">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">النوع:</span>
                    <span className="font-semibold">{job.type}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  التقدم للوظيفة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 rounded-3xl"></div>
          <div className="relative">
            <Heart className="w-12 h-12 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ابق على اطّلاع بأحدث الوظائف</h2>
            <p className="text-xl mb-8 opacity-90">اشترك في نشرتنا الإخبارية واحصل على أفضل الفرص الوظيفية مباشرة في بريدك الإلكتروني</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
                اشترك
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">منصة الوظائف الإبداعية</h3>
              </div>
              <p className="text-gray-600">منصتك المفضلة للعثور على أفضل الوظائف الإبداعية في المنطقة</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الوظائف</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-purple-600 transition-colors duration-200">التصميم</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">البرمجة</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">التسويق</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">المبيعات</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الشركات</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-purple-600 transition-colors duration-200">نشر وظيفة</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">البحث عن مواهب</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">الأسعار</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button className="hover:text-purple-600 transition-colors duration-200">مركز المساعدة</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">اتصل بنا</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">الخصوصية</button></li>
                <li><button className="hover:text-purple-600 transition-colors duration-200">الشروط</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-gray-600">
            <p>© 2025 منصة الوظائف الإبداعية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}