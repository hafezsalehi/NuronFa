// mobile-hover.js - نسخه آپدیت شده
document.addEventListener("DOMContentLoaded", function () {
  // console.log("📱 Mobile Hover Activated");

  // سلکتورهای تمام سکشن‌هایی که می‌خواهیم هاور داشته باشند
  const hoverSelectors = [
    ".service-content", // سکشن سرویس موجود
    ".text0button1", // دکمه‌های موجود
    ".circle1-extra-left-content", // سکشن دایره‌ای
    ".circle1-features-icon", // آیکن‌های سکشن دایره‌ای
    ".service__main__content-gallery1", // سکشن گالری جدید
    ".ht_btn-gallery1", // دکمه‌های گالری
    // بقیه سلکتورها بعد از دیدن استایل‌های دیگر
  ];

  let hoverElements = [];

  // جمع‌آوری تمام المنت‌ها
  hoverSelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      if (!hoverElements.includes(el)) {
        hoverElements.push(el);
      }
    });
  });

  // console.log(`🎯 Found ${hoverElements.length} hover elements`);

  function checkViewportHover() {
    const windowHeight = window.innerHeight;
    let activeCount = 0;

    hoverElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;

      // بررسی اگر المنت در وسط صفحه است (بین 30% تا 70% ارتفاع)
      const isInMiddle =
        elementCenter > windowHeight * 0.3 &&
        elementCenter < windowHeight * 0.7;

      if (isInMiddle) {
        element.classList.add("mobile-hover-active");
        activeCount++;
      } else {
        element.classList.remove("mobile-hover-active");
      }
    });

    // console.log(`🎯 ${activeCount} elements currently in viewport center`);
  }

  // اجرای اولیه
  checkViewportHover();

  // با تاخیر برای پرفورمنس بهتر
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkViewportHover, 50);
  });

  window.addEventListener("resize", checkViewportHover);
});
