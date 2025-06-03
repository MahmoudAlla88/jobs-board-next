export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>أهلاً بك في منصة الوظائف الإبداعية</h1>
        <p>استكشف فرص العمل في التصميم، البرمجة، التسويق والمزيد!</p>
        <button style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', marginTop: '1rem' }}>
          تصفح الوظائف
        </button>
      </section>

      <section>
        <h2>وظائف مميزة:</h2>
        <ul>
          <li>🎨 مصمم UI/UX لشركة ناشئة</li>
          <li>💻 مطور React للعمل عن بعد</li>
          <li>📈 مسوّق رقمي بخبرة SEO</li>
        </ul>
      </section>

      <footer style={{ marginTop: '4rem', borderTop: '1px solid #ccc', paddingTop: '1rem', textAlign: 'center' }}>
        <p>© 2025 منصة الوظائف الإبداعية. جميع الحقوق محفوظة.</p>
      </footer>
    </main>
  );
}
