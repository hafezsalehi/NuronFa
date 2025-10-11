document.addEventListener("DOMContentLoaded", function () {
  // console.log("DOM Loaded - Initializing typing section...");

  const typingSection = document.querySelector(".typing-section-type");
  const typingText = document.getElementById("typing-text-type");
  const layer1 = document.getElementById("layer1Type");

  // بررسی وجود المان‌ها
  if (!typingSection || !typingText || !layer1) {
    console.error("Required elements not found!");
    return;
  }

  // console.log("All elements found, starting animations...");

  const text = "دنیا پر از رنگهای زیباست. ما هم زیبا ببینیم و زیبا بیاندیشیم";

  const typingDuration = 2000;
  const typingSpeed = typingDuration / text.length;

  let index = 0;
  let isAnimating = false;
  let animationInterval = null;

  // رنگ‌های لایه اول
  const layer1Colors = [
    "rgba(255, 0, 255, 0.9)",
    "rgba(255, 150, 0, 0.9)",
    "rgba(235, 200, 0, 0.9)",
    "rgba(100, 255, 0, 0.9)",
    "rgba(0, 255, 200, 0.9)",
    "rgba(0, 200, 215, 0.9)",
    "rgba(0, 150, 255, 0.9)",
    "rgba(200, 0, 205, 0.7)",
  ];

  // ایجاد دایره‌ها
  function createLayer1Circles() {
    if (!isAnimating) return;

    // console.log("Creating circles...");

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        if (isAnimating) {
          createCircle(layer1, layer1Colors, 60, 200);
        }
      }, i * 20);
    }
  }

  function createCircle(container, colors, minSize, maxSize) {
    const circle = document.createElement("div");
    circle.classList.add("circle-type");

    const size = minSize + Math.random() * (maxSize - minSize);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${left}%`;
    circle.style.top = `${top}%`;
    circle.style.background = color;

    container.appendChild(circle);

    // حذف بعد از انیمیشن
    setTimeout(() => {
      if (circle.parentNode === container) {
        container.removeChild(circle);
      }
    }, 6000);
  }

  function typeWriter() {
    if (index < text.length && isAnimating) {
      typingText.innerHTML =
        text.substring(0, index + 1) + '<span class="paint-brush-type"></span>';
      index++;
      setTimeout(typeWriter, typingSpeed);
    } else if (index >= text.length) {
      typingText.innerHTML = text + '<span class="paint-brush-type"></span>';
    }
  }

  function startAnimations() {
    if (isAnimating) return;

    // console.log("Starting animations...");
    isAnimating = true;

    // شروع دایره‌ها
    createLayer1Circles();
    animationInterval = setInterval(createLayer1Circles, 4000);

    // شروع تایپ
    if (index < text.length) {
      typeWriter();
    }
  }

  function stopAnimations() {
    // console.log("Stopping animations...");
    isAnimating = false;

    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }

    // پاکسازی دایره‌ها
    layer1.innerHTML = "";
  }

  // Observer برای مدیریت عملکرد
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log("Section in view - starting animations");
          startAnimations();
        } else {
          // console.log("Section out of view - stopping animations");
          stopAnimations();
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // شروع اولیه
  observer.observe(typingSection);

  // تایپ اولیه
  setTimeout(() => {
    isAnimating = true;
    typeWriter();
  }, 1000);

  // پاکسازی
  window.addEventListener("beforeunload", () => {
    stopAnimations();
    observer.disconnect();
  });
});
