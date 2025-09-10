// script.js
document.addEventListener("DOMContentLoaded", function () {
  // ذخیره‌سازی وضعیت چرخش
  let isShuffling = true;
  let shuffleInterval;
  let usedImages = {};

  // مقداردهی اولیه usedImages
  Object.keys(artworksData).forEach((ratio) => {
    usedImages[ratio] = new Set();
  });

  // تابع برای به هم ریختن آرایه
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
    const ratioData = artworksData[ratioClass];
    if (!ratioData || !ratioData.artworks || ratioData.artworks.length === 0)
      return null;

    const artworks = ratioData.artworks;

    // اگر همه تصاویر استفاده شده‌اند، مجموعه را پاک کنید
    if (usedImages[ratioClass].size >= artworks.length) {
      usedImages[ratioClass].clear();
    }

    // فیلتر کردن تصاویر استفاده نشده
    const availableImages = artworks.filter(
      (artwork) => !usedImages[ratioClass].has(artwork.file)
    );

    if (availableImages.length === 0) {
      usedImages[ratioClass].clear();
      return artworks[Math.floor(Math.random() * artworks.length)];
    }

    // انتخاب یک تصویر تصادفی از بین تصاویر استفاده نشده
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedArtwork = availableImages[randomIndex];

    // اضافه کردن تصویر به مجموعه تصاویر استفاده شده
    usedImages[ratioClass].add(selectedArtwork.file);

    return selectedArtwork;
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

      const ratioFolder = ratioClass.replace("ratio-", "");
      const container = item.querySelector(".image-container");
      const currentImg = container.querySelector(".current");
      const nextImg = container.querySelector(".next");
      const loadingElement = container.querySelector(".loading");
      let artistInfo = item.querySelector(".artist-info");

      // دریافت یک تصویر تصادفی برای این نسبت ابعاد
      const artwork = getRandomUnusedImage(ratioFolder);
      if (!artwork) return;

      const randomImagePath = `./images/img/${ratioFolder}/${artwork.file}`;

      // جهت انیمیشن (راست یا چپ)
      const direction = Math.random() > 0.5 ? "right" : "left";

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
        artistInfo = document.createElement("div");
        artistInfo.classList.add("artist-info");
        artistInfo.innerHTML = `
                  <div class="artist-name">${artwork.name}</div>
                  <span class="artist-category">${artwork.category}</span>
                  <span class="artist-artist">اثر: ${artwork.artist}</span>
              `;
        item.appendChild(artistInfo);

        return;
      }

      // برای چرخش‌های بعدی
      // به روزرسانی اطلاعات هنرمند بلافاصله
      if (artistInfo) {
        artistInfo.innerHTML = `
                  <div class="artist-name">${artwork.name}</div>
                  <span class="artist-category">${artwork.category}</span>
                  <span class="artist-artist">اثر: ${artwork.artist}</span>
              `;
      }

      // تنظیم تصویر بعدی
      nextImg.src = randomImagePath;

      // اعمال انیمیشن به قاب
      if (direction === "right") {
        item.classList.add("frame-move-right");
      } else {
        item.classList.add("frame-move-left");
      }

      // اعمال انیمیشن به تصاویر
      if (direction === "right") {
        nextImg.classList.add("slide-in-right");
        currentImg.classList.add("slide-out-left");
      } else {
        nextImg.classList.add("slide-in-left");
        currentImg.classList.add("slide-out-right");
      }

      // بعد از اتمام انیمیشن، کلاس‌ها را به روز کنید
      setTimeout(() => {
        // تعویض کلاس‌ها
        currentImg.classList.remove(
          "current",
          "slide-out-left",
          "slide-out-right"
        );
        currentImg.classList.add("next");
        nextImg.classList.remove("next", "slide-in-left", "slide-in-right");
        nextImg.classList.add("current");

        // بازنشانی transform
        currentImg.style.transform = "";
        nextImg.style.transform = "";
        item.classList.remove("frame-move-right", "frame-move-left");
        item.style.transform = "";
      }, 1200);
    });
  }

  // شروع چرخش هر 4 ثانیه
  function startShuffling() {
    if (shuffleInterval) clearInterval(shuffleInterval);
    shuffleInterval = setInterval(rotateImages, 4000);
    isShuffling = true;
    document.getElementById("pauseBtn").innerHTML =
      '<i class="fas fa-pause"></i> توقف چرخش';
    document.querySelector(".shuffle-indicator").style.display = "flex";
  }

  // توقف چرخش
  function stopShuffling() {
    if (shuffleInterval) clearInterval(shuffleInterval);
    isShuffling = false;
    document.getElementById("pauseBtn").innerHTML =
      '<i class="fas fa-play"></i> شروع چرخش';
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
  document.getElementById("shuffleBtn").addEventListener("click", rotateImages);

  // شروع چرخش
  startShuffling();

  // همچنین یک بار در ابتدا تصاویر را بچرخان
  setTimeout(rotateImages, 100);
});
