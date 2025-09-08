document.addEventListener("DOMContentLoaded", function () {
  // ذخیره مسیرهای اصلی تصاویر
  const imagePaths = [
    "./assets/img/b0.jpg",
    "./assets/img/b1.jpg",
    "./assets/img/b2.jpg",
    "./assets/img/b4.jpg",
    "./assets/img/b5.jpg",
    "./assets/img/b6.jpg",
    "./assets/img/b7.jpg",
    "./assets/img/b8.jpg",
    "./assets/img/b9.jpg",
    "./assets/img/b10.jpg",
    "./assets/img/b11.jpg",
    "./assets/img/b12.jpg",
  ];

  // تابع برای به هم ریختن آرایه (Fisher-Yates shuffle)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // تابع برای چرخش تصاویر
  function rotateImages() {
    // دریافت تمام عناصر image-container
    const containers = document.querySelectorAll(".image-container");

    // ایجاد یک کپی از مسیرهای تصاویر و به هم ریختن آن
    const shuffledPaths = shuffleArray([...imagePaths]);

    // اختصاص مسیرهای جدید به تصاویر
    containers.forEach((container, index) => {
      const currentImg = container.querySelector(".current");
      const nextImg = container.querySelector(".next");

      // تعویض نقش‌ها
      nextImg.src = shuffledPaths[index];

      // اضافه کردن کلاس برای انتقال
      currentImg.style.opacity = "0";
      nextImg.style.opacity = "1";

      // پس از اتمام انتقال، کلاس‌ها را به روز کنید
      setTimeout(() => {
        // تعویض کلاس‌ها
        currentImg.classList.remove("current");
        currentImg.classList.add("next");
        nextImg.classList.remove("next");
        nextImg.classList.add("current");

        // بازنشانی opacity
        currentImg.style.opacity = "";
        nextImg.style.opacity = "";
      }, 1200);
    });
  }

  // شروع چرخش هر 3 ثانیه
  setInterval(rotateImages, 3000);

  // همچنین یک بار در ابتدا تصاویر را بچرخان
  setTimeout(rotateImages, 1000);
});
