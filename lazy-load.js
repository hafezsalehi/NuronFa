// تعریف بخش‌ها و مسیر فایل JS مربوطه
const sections = [
  { id: "fractional", script: "assets/js/newJs/fractionalscript.js" },
  { id: "gallery1", script: "assets/js/newJs/gallery1.js" },
  { id: "slider1", script: "assets/js/newJs/Slider1.js" },
  { id: "artists-section", script: "assets/js/newJs/artists1.js" },
  { id: "coworkers", script: "assets/js/newJs/CoWorkers.js" },
];

// تابع برای لود داینامیک فایل JS
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// ایجاد Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const section = sections.find((s) => s.id === entry.target.id);
      if (section) {
        loadScript(section.script)
          .then(() => console.log(`${section.id} script loaded!`))
          .catch((err) =>
            console.error(`Failed to load ${section.script}`, err)
          );
      }
      observer.unobserve(entry.target); // فقط یکبار اجرا شود
    }
  });
});

// شروع observation برای همه بخش‌ها
sections.forEach((s) => {
  const el = document.getElementById(s.id);
  if (el) observer.observe(el);
});
