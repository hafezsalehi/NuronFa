document.addEventListener("DOMContentLoaded", function () {
  const sliderSldr = document.getElementById("slider-sldr");
  const prevBtnSldr = document.getElementById("prevBtn-sldr");
  const nextBtnSldr = document.getElementById("nextBtn-sldr");
  const autoPlayCheckboxSldr = document.getElementById("autoPlay-sldr");
  const currentCenterSpanSldr = document.getElementById("currentCenter-sldr");

  // اطلاعات آثار هنری
  const artworksSldr = [
    {
      id: 1,
      title: "نگارگر طبیعت",
      description: "اثری از کمال‌الملک - نقاشی رنگ روغن از مناظر طبیعی ایران",
      image: "images/slider1/sl1.webp",
    },
    {
      id: 2,
      title: "چهره‌پردازی",
      description: "پرتره‌ای از یک بانوی قاجاری با تکنیک آبرنگ",
      image: "images/slider1/sl2.webp",
    },
    {
      id: 3,
      title: "معماری اسلامی",
      description: "نمایی از مسجد شیخ لطف‌الله با طراحی هندسی پیچیده",
      image: "images/slider1/sl3.webp",
    },
    {
      id: 4,
      title: "خطاطی نستعلیق",
      description: "خوشنویسی شعر حافظ با قلم نی و مرکب",
      image: "images/slider1/sl4.webp",
    },
    {
      id: 5,
      title: "مینیاتور ایرانی",
      description: "صحنه‌ای از شاهنامه با رنگ‌های طبیعی و طلاکاری",
      image: "images/slider1/sl5.webp",
    },
    {
      id: 6,
      title: "طرح اسلیمی",
      description: "نقوش تزئینی اسلامی با الهام از طبیعت",
      image: "images/slider1/sl6.webp",
    },
    {
      id: 7,
      title: "فرش دستباف",
      description: "قالی کرمان با طرح لچک ترنج و رنگ‌های گیاهی",
      image: "images/slider1/sl7.webp",
    },
    {
      id: 8,
      title: "نگارگری مکتب اصفهان",
      description: "صحنه‌ای از باغ ایرانی با درختان سرو و جویبار",
      image: "images/slider1/sl8.webp",
    },
    {
      id: 9,
      title: "خاتم‌کاری",
      description: "هنر ترکیب چوب و استخوان با طرح‌های هندسی",
      image: "images/slider1/sl9.webp",
    },
    {
      id: 10,
      title: "مقواسازی",
      description: "تزئین صفحات کتاب با طلا و لاجورد",
      image: "images/slider1/sl10.webp",
    },
  ];

  let currentArtworksSldr = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // حالا 7 اندیس داریم
  let autoSlideIntervalSldr;
  let isAnimatingSldr = false;

  // مقداردهی اولیه اسلایدر
  initializeSliderSldr();

  function initializeSliderSldr() {
    // ایجاد 7 قاب اولیه
    for (let i = 0; i < 9; i++) {
      createFrameSldr(i);
    }
    updateCurrentTitleSldr();
  }

  function createFrameSldr(index) {
    const frame = document.createElement("div");
    frame.className = "frame-sldr";
    if (index === 0 || index === 9) {
      frame.classList.add("thin-frame-sldr");
    }
    frame.setAttribute("data-position", index + 1);

    const artwork = artworksSldr[currentArtworksSldr[index]];

    frame.innerHTML = `
                <div class="frame-content-sldr">
                    <img src="${artwork.image}" alt="${artwork.title}" class="frame-image-sldr">
                    <div class="image-text-sldr">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.description}</p>
                    </div>
                </div>
            `;

    sliderSldr.appendChild(frame);
  }

  // حرکت به اسلاید بعدی
  function nextSlideSldr() {
    if (isAnimatingSldr) return;
    isAnimatingSldr = true;

    // انیمیشن خروج عکس‌ها و متن‌ها قبل از تغییر محتوا
    animateExitSldr("next");

    setTimeout(() => {
      // حذف اولین اثر و اضافه کردن اثر بعدی
      currentArtworksSldr.shift();
      let nextIndex = currentArtworksSldr[currentArtworksSldr.length - 1] + 1;
      if (nextIndex >= artworksSldr.length) nextIndex = 0;
      currentArtworksSldr.push(nextIndex);

      // انیمیشن حرکت آثار
      animateSlidesSldr("next");

      setTimeout(() => {
        updateSliderSldr();
        updateCurrentTitleSldr();
        isAnimatingSldr = false;
      }, 400);
    }, 500);
  }

  // حرکت به اسلاید قبلی
  function prevSlideSldr() {
    if (isAnimatingSldr) return;
    isAnimatingSldr = true;

    // انیمیشن خروج عکس‌ها و متن‌ها قبل از تغییر محتوا
    animateExitSldr("prev");

    setTimeout(() => {
      // حذف آخرین اثر و اضافه کردن اثر قبلی
      currentArtworksSldr.pop();
      let prevIndex = currentArtworksSldr[0] - 1;
      if (prevIndex < 0) prevIndex = artworksSldr.length - 1;
      currentArtworksSldr.unshift(prevIndex);

      // انیمیشن حرکت آثار
      animateSlidesSldr("prev");

      setTimeout(() => {
        updateSliderSldr();
        updateCurrentTitleSldr();
        isAnimatingSldr = false;
      }, 400);
    }, 500);
  }

  // انیمیشن خروج عکس‌ها و متن‌ها
  function animateExitSldr(direction) {
    const images = document.querySelectorAll(".frame-image-sldr");
    const textElements = document.querySelectorAll(".image-text-sldr");

    // انیمیشن خروج برای عکس‌ها
    images.forEach((img, index) => {
      img.classList.remove("image-exit-sldr");
      void img.offsetWidth;
      img.classList.add("image-exit-sldr");
    });

    // انیمیشن خروج برای متن‌ها
    textElements.forEach((text, index) => {
      text.classList.remove(
        "center-text-animation-sldr",
        "side-text-animation-sldr",
        "center-text-exit-sldr",
        "side-text-exit-sldr"
      );

      if (index === 3) {
        // حالا تصویر وسطی در موقعیت 4 است (ایندکس 3)
        text.classList.add("center-text-exit-sldr");
      } else if (index !== 0 && index !== 8) {
        // متن‌های قاب‌های باریک مخفی هستند
        text.classList.add("side-text-exit-sldr");
      }
    });
  }

  // انیمیشن حرکت آثار
  function animateSlidesSldr(direction) {
    const frameImages = document.querySelectorAll(".frame-image-sldr");
    const frameContents = document.querySelectorAll(".frame-content-sldr");

    frameContents.forEach((content, index) => {
      const img = content.querySelector(".frame-image-sldr");
      img.classList.remove("image-moving-sldr", "image-entering-sldr");

      // محاسبه حرکت و مقیاس برای 7 قاب
      let moveX, startScale, endScale;

      if (direction === "next") {
        moveX = "100%";
        // تنظیم مقیاس برای هر قاب
        if (index === 4) {
          // قاب وسطی
          startScale = 1.05;
          endScale = 1;
        } else if (index === 3) {
          // قاب سمت راست وسطی
          startScale = 1;
          endScale = 1.05;
        } else {
          startScale = 1;
          endScale = 1;
        }
      } else {
        moveX = "-100%";
        if (index === 3) {
          // قاب سمت چپ وسطی
          startScale = 1;
          endScale = 1.05;
        } else if (index === 4) {
          // قاب وسطی
          startScale = 1.05;
          endScale = 1;
        } else {
          startScale = 1;
          endScale = 1;
        }
      }

      img.style.setProperty("--move-x-sldr", moveX);
      img.style.setProperty("--start-scale-sldr", startScale);
      img.style.setProperty("--end-scale-sldr", endScale);

      setTimeout(() => {
        img.classList.add("image-moving-sldr");
      }, index * 80);
    });
  }

  // به‌روزرسانی اسلایدر
  function updateSliderSldr() {
    const frames = document.querySelectorAll(".frame-sldr");

    frames.forEach((frame, index) => {
      const artwork = artworksSldr[currentArtworksSldr[index]];
      const frameContent = frame.querySelector(".frame-content-sldr");

      frameContent.innerHTML = `
                    <img src="${artwork.image}" alt="${artwork.title}" class="frame-image-sldr">
                    <div class="image-text-sldr">
                        <h3>${artwork.title}</h3>
                        <p>${artwork.description}</p>
                    </div>
                `;

      // اضافه کردن انیمیشن به عکس‌ها
      const imageElement = frameContent.querySelector(".frame-image-sldr");
      if (index === 4) {
        imageElement.classList.add("center-image-enter-sldr");
      } else if (index !== 0 && index !== 8) {
        imageElement.classList.add("side-image-enter-sldr");
      }

      // اضافه کردن انیمیشن به متن‌ها
      const textElement = frameContent.querySelector(".image-text-sldr");
      if (index === 4) {
        textElement.classList.add("center-text-animation-sldr");
      } else if (index !== 0 && index !== 8) {
        textElement.classList.add("side-text-animation-sldr");
      }
    });
  }

  // به‌روزرسانی عنوان اثر فعلی
  function updateCurrentTitleSldr() {
    const centerArtwork = artworksSldr[currentArtworksSldr[5]]; // موقعیت 4 (ایندکس 3)
    currentCenterSpanSldr.textContent = centerArtwork.title;

    currentCenterSpanSldr.style.animation = "none";
    setTimeout(() => {
      currentCenterSpanSldr.style.animation = "textFadeIn-sldr 0.6s ease-out";
    }, 10);
  }

  // شروع پخش خودکار
  function startAutoSlideSldr() {
    autoSlideIntervalSldr = setInterval(nextSlideSldr, 6000);
  }

  // توقف پخش خودکار
  function stopAutoSlideSldr() {
    clearInterval(autoSlideIntervalSldr);
  }

  // رویدادهای کلیک
  nextBtnSldr.addEventListener("click", function () {
    nextSlideSldr();
    if (autoPlayCheckboxSldr.checked) {
      stopAutoSlideSldr();
      startAutoSlideSldr();
    }
  });

  prevBtnSldr.addEventListener("click", function () {
    prevSlideSldr();
    if (autoPlayCheckboxSldr.checked) {
      stopAutoSlideSldr();
      startAutoSlideSldr();
    }
  });

  // کنترل پخش خودکار
  autoPlayCheckboxSldr.addEventListener("change", function () {
    if (this.checked) {
      startAutoSlideSldr();
    } else {
      stopAutoSlideSldr();
    }
  });

  // توقف پخش خودکار هنگام هاور
  const sliderWrapperSldr = document.querySelector(".slider-wrapper-sldr");
  sliderWrapperSldr.addEventListener("mouseenter", stopAutoSlideSldr);
  sliderWrapperSldr.addEventListener("mouseleave", function () {
    if (autoPlayCheckboxSldr.checked) {
      startAutoSlideSldr();
    }
  });

  // شروع پخش خودکار
  startAutoSlideSldr();
});
