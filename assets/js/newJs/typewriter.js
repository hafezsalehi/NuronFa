document.addEventListener("DOMContentLoaded", function () {
  const typingSection = document.querySelector(".typing-section-type");
  const typingText = document.getElementById("typing-text-type");
  const layer1 = document.getElementById("layer1Type");
  const layer3 = document.getElementById("layer3Type");

  const text =
    "دنیای اطراف شما بوم نقاشی ماست. ما با قلم موی خلاقیت و رنگ‌های پایدار، دیوارهای بی‌روح را به تابلوهایی زنده تبدیل می‌کنیم. هر خط، هر طرح و هر رنگ، داستانی از زیبایی و نوآوری را روایت می‌کند. فضای زندگی و کار شما شایانه بهترین هاست، پس آن را به دست ما بسپارید.";

  const typingDuration = 1000;
  const typingSpeed = typingDuration / text.length;

  let index = 0;

  // رنگ‌های لایه اول
  const layer1Colors = [
    "rgba(205, 0, 0, 0.8)",
    "rgba(215, 50, 0, 0.8)",
    "rgba(225, 100, 0, 0.8)",
    "rgba(255, 150, 0, 0.8)",
    "rgba(235, 200, 0, 0.8)",
    "rgba(200, 255, 0, 0.8)",
    "rgba(100, 255, 0, 0.8)",
    "rgba(0, 255, 50, 0.8)",
    "rgba(0, 255, 150, 0.8)",
    "rgba(0, 200, 215, 0.8)",
    "rgba(0, 100, 255, 0.8)",
    "rgba(100, 0, 185, 0.8)",
    "rgba(150, 255, 50, 0.8)",
    "rgba(50, 255, 150, 0.8)",
    "rgba(50, 200, 255, 0.8)",
    "rgba(100, 100, 255, 0.8)",
    "rgba(200, 0, 205, 0.8)",
  ];

  // رنگ‌های لایه سوم - شفافیت بسیار کم
  const layer3Colors = [
    "rgba(255, 50, 50, 0.15)",
    "rgba(50, 255, 50, 0.15)",
    "rgba(50, 50, 255, 0.15)",
    "rgba(255, 255, 50, 0.15)",
    "rgba(255, 50, 255, 0.15)",
    "rgba(50, 255, 255, 0.15)",
  ];

  // ایجاد دایره‌های لایه اول
  function createLayer1Circles() {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createCircle(layer1, layer1Colors, 80, 180);
      }, i * 10);
    }
  }

  // ایجاد دایره‌های لایه سوم
  function createLayer3Circles() {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createCircle(layer3, layer3Colors, 60, 150);
      }, i * 50);
    }
  }

  // تابع ایجاد دایره
  function createCircle(container, colors, minSize, maxSize) {
    const circle = document.createElement("div");
    circle.classList.add("circle-type");

    const size = minSize + Math.random() * (maxSize - minSize);
    const color = colors[Math.floor(Math.random() * colors.length)];

    // محدود کردن موقعیت به داخل سکشن
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${left}%`;
    circle.style.top = `${top}%`;
    circle.style.background = color;

    container.appendChild(circle);

    setTimeout(() => {
      if (circle.parentNode) {
        circle.parentNode.removeChild(circle);
      }
    }, 8000);
  }

  function typeWriter() {
    if (index < text.length) {
      typingText.innerHTML =
        text.substring(0, index + 1) + '<span class="paint-brush-type"></span>';
      index++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      typingText.innerHTML = text + '<span class="paint-brush-type"></span>';
    }
  }

  // شروع با تاخیر بیشتر
  setTimeout(() => {
    createLayer1Circles();
    createLayer3Circles();

    setInterval(createLayer1Circles, 1000);
    setInterval(createLayer3Circles, 1000);
  }, 1000);

  // شروع تایپ
  setTimeout(typeWriter, 500);

  // توقف انیمیشن‌ها وقتی سکشن خارج از دید است
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        // می‌توانید اینجا انیمیشن‌ها را متوقف کنید اگر نیاز است
      }
    });
  });

  if (typingSection) {
    observer.observe(typingSection);
  }
});
