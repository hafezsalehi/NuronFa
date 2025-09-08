document.addEventListener("DOMContentLoaded", function () {
  // پیکربندی ابعاد و پوشه‌ها
  const ratioConfig = {
    "ratio-11": {
      folder: "11",
      count: 3, // تعداد تصاویر در این پوشه
    },
    "ratio-43": {
      folder: "43",
      count: 2,
    },
    "ratio-34": {
      folder: "34",
      count: 3,
    },
    "ratio-169": {
      folder: "169",
      count: 3,
    },
    "ratio-916": {
      folder: "916",
      count: 4,
    },
  };

  // لیست کلاس‌های نسبت‌های مختلف
  const ratioClasses = Object.keys(ratioConfig);

  // لیست موقعیت‌های مختلف برای گرید
  const gridPositions = [
    { col: "span 2", row: "span 2", cls: "ratio-11" },
    { col: "span 3", row: "span 4", cls: "ratio-43" },
    { col: "span 4", row: "span 3", cls: "ratio-34" },
    { col: "span 4", row: "span 2", cls: "ratio-169" },
    { col: "span 2", row: "span 4", cls: "ratio-916" },
    { col: "span 3", row: "span 3", cls: "ratio-11" },
    { col: "span 2", row: "span 3", cls: "ratio-43" },
    { col: "span 3", row: "span 2", cls: "ratio-34" },
    { col: "span 6", row: "span 2", cls: "ratio-169" },
    { col: "span 2", row: "span 6", cls: "ratio-916" },
  ];

  // ذخیره‌سازی وضعیت چرخش
  let isShuffling = true;
  let shuffleInterval;
  let layoutInterval;
  let usedImages = {};

  // مقداردهی اولیه usedImages
  Object.keys(ratioConfig).forEach((ratio) => {
    usedImages[ratio] = new Set();
  });

  // تابع برای به هم ریختن آرایه (Fisher-Yates shuffle)
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // تابع برای دریافت یک تصویر تصادفی که قبلا استفاده نشده
  function getRandomUnusedImage(ratioClass) {
    const config = ratioConfig[ratioClass];
    const folder = config.folder;
    const count = config.count;

    // اگر همه تصاویر استفاده شده‌اند، مجموعه را پاک کنید
    if (usedImages[ratioClass].size >= count) {
      usedImages[ratioClass].clear();
    }

    // ایجاد لیست تمام تصاویر ممکن
    const allImages = Array.from({ length: count }, (_, i) => {
      const number = (i + 1).toString().padStart(2, "0");
      return `./assets/img/${folder}/b${number}.jpg`;
    });

    // فیلتر کردن تصاویر استفاده نشده
    const availableImages = allImages.filter(
      (img) => !usedImages[ratioClass].has(img)
    );

    if (availableImages.length === 0) {
      usedImages[ratioClass].clear();
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return allImages[randomIndex];
    }

    // انتخاب یک تصویر تصادفی از بین تصاویر استفاده نشده
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];

    // اضافه کردن تصویر به مجموعه تصاویر استفاده شده
    usedImages[ratioClass].add(selectedImage);

    return selectedImage;
  }

  // تابع برای تغییر چینش باکس‌ها
  function shuffleLayout() {
    const items = document.querySelectorAll(".artist-item");
    const artistsGrid = document.querySelector(".artists-grid");

    // ایجاد یک آرایه از موقعیت‌های تصادفی
    const shuffledPositions = shuffleArray([...gridPositions]).slice(
      0,
      items.length
    );

    // اعمال موقعیت‌های جدید به آیتم‌ها
    items.forEach((item, index) => {
      const position = shuffledPositions[index];

      // حذف کلاس‌های نسبت قبلی
      ratioClasses.forEach((cls) => {
        item.classList.remove(cls);
      });

      // اضافه کردن کلاس نسبت جدید
      item.classList.add(position.cls);

      // اعمال موقعیت جدید در گرید
      item.style.gridColumn = position.col;
      item.style.gridRow = position.row;
    });

    // اعمال چینش جدید به گرید
    artistsGrid.style.display = "none";
    setTimeout(() => {
      artistsGrid.style.display = "grid";
    }, 50);
  }

  // تابع برای چرخش تصاویر
  function rotateImages() {
    // دریافت تمام عناصر artist-item
    const items = document.querySelectorAll(".artist-item");

    // اختصاص مسیرهای جدید به تصاویر
    items.forEach((item) => {
      const ratioClass = Array.from(item.classList).find((cls) =>
        cls.startsWith("ratio-")
      );
      if (!ratioClass) return;

      const container = item.querySelector(".image-container");
      const currentImg = container.querySelector(".current");
      const nextImg = container.querySelector(".next");
      const loadingElement = container.querySelector(".loading");

      // دریافت یک تصویر تصادفی برای این نسبت ابعاد
      const randomImagePath = getRandomUnusedImage(ratioClass);

      // اگر اولین بار است که تصاویر لود می‌شوند
      if (!currentImg && !nextImg) {
        // ایجاد عناصر img
        const img1 = document.createElement("img");
        const img2 = document.createElement("img");

        img1.classList.add("current");
        img2.classList.add("next");

        img1.src = randomImagePath;
        img2.src = randomImagePath;

        // حذف اسکلتون لودینگ و اضافه کردن تصاویر
        if (loadingElement) {
          loadingElement.remove();
        }

        container.appendChild(img1);
        container.appendChild(img2);

        // اضافه کردن اطلاعات هنرمند
        const artistInfo = document.createElement("div");
        artistInfo.classList.add("artist-info");
        artistInfo.innerHTML = `
                    <div class="artist-name">اثر هنری</div>
                    <div class="artist-category">والری</div>
                `;
        item.appendChild(artistInfo);

        return;
      }

      // برای چرخش‌های بعدی
      // تنظیم تصویر بعدی
      nextImg.src = randomImagePath;

      // اضافه کردن کلاس برای انتقال
      setTimeout(() => {
        currentImg.style.opacity = "0";
        nextImg.style.opacity = "1";
      }, 50);

      // پس از اتمام انتقال، کلاس‌ها را به روز کنید
      setTimeout(() => {
        // تعویض کلاس‌ها
        currentImg.classList.remove("current");
        currentImg.classList.add("next");
        nextImg.classList.remove("next");
        nextImg.classList.add("current");

        // بازنشانی استایل‌ها
        currentImg.style.opacity = "";
        nextImg.style.opacity = "";
      }, 1200);
    });
  }

  // شروع چرخش هر 3 ثانیه
  function startShuffling() {
    if (shuffleInterval) clearInterval(shuffleInterval);
    shuffleInterval = setInterval(rotateImages, 3000);

    if (layoutInterval) clearInterval(layoutInterval);
    layoutInterval = setInterval(shuffleLayout, 6000); // تغییر چینش هر 6 ثانیه

    isShuffling = true;
    document.getElementById("pauseBtn").textContent = "توقف چرخش";
    document.querySelector(".shuffle-indicator").style.display = "flex";
  }

  // توقف چرخش
  function stopShuffling() {
    if (shuffleInterval) clearInterval(shuffleInterval);
    if (layoutInterval) clearInterval(layoutInterval);

    isShuffling = false;
    document.getElementById("pauseBtn").textContent = "شروع چرخش";
    document.querySelector(".shuffle-indicator").style.display = "none";
  }

  // کنترل چرخش با دکمه
  document.getElementById("pauseBtn").addEventListener("click", function () {
    if (isShuffling) {
      stopShuffling();
    } else {
      startShuffling();
    }
  });

  // چرخش دستی با دکمه
  document.getElementById("shuffleBtn").addEventListener("click", function () {
    rotateImages();
    shuffleLayout();
  });

  // دکمه تغییر چینش دستی
  const layoutBtn = document.createElement("button");
  layoutBtn.classList.add("control-btn");
  layoutBtn.id = "layoutBtn";
  layoutBtn.textContent = "تغییر چینش";
  layoutBtn.addEventListener("click", shuffleLayout);
  document.querySelector(".controls").appendChild(layoutBtn);

  // شروع چرخش
  startShuffling();

  // همچنین یک بار در ابتدا تصاویر را بچرخان
  setTimeout(() => {
    rotateImages();
    shuffleLayout();
  }, 100);

  // پیش‌لود تصاویر برای عملکرد بهتر
  function preloadImages() {
    Object.keys(ratioConfig).forEach((ratioClass) => {
      const config = ratioConfig[ratioClass];
      const folder = config.folder;
      const count = config.count;

      for (let i = 1; i <= count; i++) {
        const number = i.toString().padStart(2, "0");
        const img = new Image();
        img.src = `./assets/img/${folder}/b${number}.jpg`;
      }
    });
  }

  preloadImages();
});
