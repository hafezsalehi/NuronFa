const owners = [
  { name: "Df21u698...", city: "Tehran", avatar: "👨" },
  { name: "A1b2c3d4...", city: "Istanbul", avatar: "👩" },
  { name: "X9y8z7w6...", city: "Paris", avatar: "🧔" },
  { name: "E5f6g7h8...", city: "Dubai", avatar: "👧" },
  { name: "I9j0k1l2...", city: "London", avatar: "👨‍💼" },
  { name: "M3n4o5p6...", city: "New York", avatar: "👩‍⚕️" },
  { name: "Q7r8s9t0...", city: "Berlin", avatar: "👨‍🎓" },
  { name: "U1v2w3x4...", city: "Bangkok", avatar: "👩‍🎨" },
  { name: "Y5z6a7b8...", city: "Hsfahan", avatar: "👨‍🔧" },
  { name: "C9d0e1f2...", city: "Seoul", avatar: "👩‍🍳" },
  { name: "G3h4i5j6...", city: "Sydney", avatar: "👨‍🌾" },
  { name: "K7l8m9n0...", city: "Toronto", avatar: "👩‍💻" },
  { name: "O1p2q3r4...", city: "Amsterdam", avatar: "👨‍🎤" },
  { name: "S5t6u7v8...", city: "Vienna", avatar: "👩‍🎓" },
  { name: "W9x0y1z2...", city: "Prague", city: "👨‍🚀" },
  { name: "A3b4c5d6...", city: "Athens", avatar: "👩‍🚒" },
  { name: "E7f8g9h0...", city: "Cairo", avatar: "👨‍✈️" },
  { name: "I1j2k3l4...", city: "Mumbai", avatar: "👩‍⚖️" },
  { name: "M5n6o7p8...", city: "Rome", avatar: "👨‍🔬" },
  { name: "Q9r0s1t2...", city: "Lisbon", avatar: "👩‍🏫" },
  { name: "U3v4w5x6...", city: "Moscow", avatar: "👨‍💻" },
  { name: "Y7z8a9b0...", city: "Tabriz", avatar: "👩‍🔧" },
  { name: "C1d2e3f4...", city: "Madrid", avatar: "👨‍🏭" },
  { name: "G5h6i7j8...", city: "Brussels", avatar: "👩‍🚀" },
  { name: "K9l0m1n2...", city: "Warsaw", avatar: "👨‍🎨" },
  { name: "O3p4q5r6...", city: "Stockholm", avatar: "👩‍💼" },
  { name: "S7t8u9v0...", city: "Mexico City", avatar: "👨‍🚒" },
  { name: "W1x2y3z4...", city: "Buenos Aires", avatar: "👩‍✈️" },
  { name: "A5b6c7d8...", city: "Sao Paulo", avatar: "👨‍⚖️" },
  { name: "E9f0g1h2...", city: "Shiraz", avatar: "👩‍🌾" },
  { name: "I3j4k5l6...", city: "Helsinki", avatar: "👨‍🍳" },
  { name: "M7n8o9p0...", city: "Sari", avatar: "👩‍🔬" },
  { name: "Q1r2s3t4...", city: "Dublin", avatar: "👨‍🏫" },
  { name: "U5v6w7x8...", city: "Zurich", avatar: "👨‍💼" },
  { name: "Y9z0a1b2...", city: "Kuala Lumpur", avatar: "👩‍🎤" },
  { name: "C3d4e5f6...", city: "Budapest", avatar: "👨‍🚀" },
  { name: "G7h8i9j0...", city: "Vancouver", avatar: "👩‍🚒" },
  { name: "K1l2m3n4...", city: "Barcelona", avatar: "👨‍✈️" },
  { name: "O5p6q7r8...", city: "Rasht", avatar: "👩‍⚖️" },
  { name: "S9t0u1v2...", city: "Jakarta", avatar: "👨‍🔬" },
];
// آدرس تصاویر از مسیر پروژه
const images = [
  "images/Fractionalslider/fr1.jpg",
  "images/Fractionalslider/fr2.jpg",
  "images/Fractionalslider/fr3.jpg",
  "images/Fractionalslider/fr4.jpg",
];

// تصاویر جایگزین در صورت عدم دسترسی به مسیر پروژه

const sliderContainer = document.querySelector(".slider-container-frac");
let currentSlide = 0;
let isPaused = false;
let slideInterval;

// ایجاد اسلایدها
function createSlides() {
  images.forEach((imgSrc, index) => {
    const slide = document.createElement("div");
    slide.className = `slide-frac ${index === 0 ? "active-frac" : ""}`;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = `NFT Artwork ${index + 1}`;
    img.className = "slide-image-frac";

    // اگر تصویر لود نشد، از تصویر جایگزین استفاده کن
    // img.onerror = function() {
    //     this.src = fallbackImages[index];
    // };

    slide.appendChild(img);
    sliderContainer.appendChild(slide);
  });
}

// ایجاد شبکه‌بندی با انیمیشن خطوط
function createAnimatedGrid() {
  const activeSlide = document.querySelector(".slide-frac.active-frac");
  // حذف شبکه قبلی اگر وجود دارد
  const existingGrid = activeSlide.querySelector(".grid-overlay-frac");
  if (existingGrid) {
    existingGrid.remove();
  }

  // ایجاد تعداد خطوط تصادفی بین 5 تا 20
  const columns = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  const rows = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  const totalCells = columns * rows;

  const gridOverlay = document.createElement("div");
  gridOverlay.className = "grid-overlay-frac";
  gridOverlay.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gridOverlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  // ایجاد سلول‌های شبکه
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "grid-cell-frac";
    cell.dataset.index = i;
    gridOverlay.appendChild(cell);
  }

  activeSlide.appendChild(gridOverlay);

  // ایجاد خطوط عمودی با انیمیشن
  for (let i = 1; i < columns; i++) {
    const line = document.createElement("div");
    line.className = "vertical-line-frac";
    line.style.left = `${(i / columns) * 100}%`;
    line.style.animationDelay = `${i * 0.02}s`;
    gridOverlay.appendChild(line);
  }

  // ایجاد خطوط افقی با انیمیشن
  for (let i = 1; i < rows; i++) {
    const line = document.createElement("div");
    line.className = "horizontal-line-frac";
    line.style.top = `${(i / rows) * 100}%`;
    line.style.animationDelay = `${(columns + i) * 0.02}s`;
    gridOverlay.appendChild(line);
  }

  // نمایش پاپ‌آپ‌های مالکین پس از کامل شدن انیمیشن خطوط
  setTimeout(() => {
    showOwnerPopups(gridOverlay, columns, rows);
  }, Math.max(columns, rows) * 0.02 * 500 + 10);
}

// نمایش پاپ‌آپ‌های مالکین
function showOwnerPopups(grid, columns, rows) {
  // انتخاب 4 تا 8 بخش تصادفی برای نمایش پاپ‌آپ
  const popupCount = Math.floor(Math.random() * 20) + 4; // 4 تا 24
  const totalCells = columns * rows;
  const randomCells = [];

  // اطمینان از انتخاب سلول‌های منحصر به فرد
  while (randomCells.length < popupCount) {
    const randomIndex = Math.floor(Math.random() * totalCells);
    if (!randomCells.includes(randomIndex)) {
      randomCells.push(randomIndex);
    }
  }

  // console.log(
  //   `نمایش ${popupCount} پاپ‌آپ برای ${totalCells} سلول (${columns}x${rows})`  );

  let displayedPopups = 0;

  // ایجاد پاپ‌آپ‌ها با تأخیر
  randomCells.forEach((cellIndex, i) => {
    setTimeout(() => {
      const cell = grid.querySelector(
        `.grid-cell-frac[data-index="${cellIndex}"]`
      );
      if (!cell) return;

      const owner = owners[Math.floor(Math.random() * owners.length)];

      const popup = document.createElement("div");
      popup.className = "owner-popup-frac";
      popup.innerHTML = `
                        <div class="owner-avatar-frac">${owner.avatar}</div>
                        <div class="owner-name-frac">${owner.name}</div>
                        <div class="owner-city-frac">${owner.city}</div>
                    `;

      // ابعاد پاپ‌آپ
      const popupWidth = 140;
      const popupHeight = 110;

      // محاسبه موقعیت سلول در grid
      const cellCol = cellIndex % columns;
      const cellRow = Math.floor(cellIndex / columns);

      // محاسبه موقعیت نسبی درون سلول (درصد)
      const cellWidthPercent = 100 / columns;
      const cellHeightPercent = 100 / rows;

      // موقعیت سلول در grid (درصد)
      const cellLeftPercent = cellCol * cellWidthPercent;
      const cellTopPercent = cellRow * cellHeightPercent;

      // موقعیت تصادفی درون سلول (درصد)
      const randomLeftPercent = Math.random() * (cellWidthPercent - 10) + 5; // 5% تا 95% عرض سلول
      const randomTopPercent = Math.random() * (cellHeightPercent - 10) + 5; // 5% تا 95% ارتفاع سلول

      // موقعیت نهایی پاپ‌آپ (درصد)
      const popupLeftPercent = cellLeftPercent + randomLeftPercent;
      const popupTopPercent = cellTopPercent + randomTopPercent;

      // تبدیل درصد به پیکسل
      const gridWidth = grid.offsetWidth;
      const gridHeight = grid.offsetHeight;

      let left = (popupLeftPercent / 100) * gridWidth - popupWidth / 2;
      let top = (popupTopPercent / 100) * gridHeight - popupHeight / 2;

      // اطمینان از قرارگیری پاپ‌آپ درون grid
      left = Math.max(10, Math.min(left, gridWidth - popupWidth - 10));
      top = Math.max(10, Math.min(top, gridHeight - popupHeight - 10));

      popup.style.left = `${left}px`;
      popup.style.top = `${top}px`;

      grid.appendChild(popup); // اضافه کردن پاپ‌آپ به grid به جای cell
      displayedPopups++;

      // نمایش پاپ‌آپ با انیمیشن
      setTimeout(() => {
        popup.classList.add("show-frac");
      }, 100);

      // مخفی کردن پاپ‌آپ پس از 3 ثانیه
      setTimeout(() => {
        popup.classList.remove("show-frac");
        setTimeout(() => {
          if (popup.parentNode) {
            popup.remove();
          }
        }, 300);
      }, 3000);
    }, i * 300); // تأخیر بین نمایش پاپ‌آپ‌ها
  });

  // گزارش تعداد پاپ‌آپ‌های نمایش داده شده
  // setTimeout(() => {
  //   console.log(`تعداد پاپ‌آپ‌های نمایش داده شده: ${displayedPopups}`);
  // }, popupCount * 300 + 500);
}

// تغییر به اسلاید بعدی
function nextSlide() {
  const slides = document.querySelectorAll(".slide-frac");
  slides[currentSlide].classList.remove("active-frac");

  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active-frac");

  // ایجاد شبکه‌بندی جدید برای اسلاید فعلی
  setTimeout(createAnimatedGrid, 100);
}

// تغییر به اسلاید قبلی
function prevSlide() {
  const slides = document.querySelectorAll(".slide-frac");
  slides[currentSlide].classList.remove("active-frac");

  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active-frac");

  // ایجاد شبکه‌بندی جدید برای اسلاید فعلی
  setTimeout(createAnimatedGrid, 100);
}

// شروع اسلایدر
function startSlider() {
  slideInterval = setInterval(nextSlide, 6000);
}

// توقف/ادامه اسلایدر
// function togglePause() {
//   isPaused = !isPaused;
//   const pauseBtn = document.getElementById("pause-btn-frac");

//   if (isPaused) {
//     clearInterval(slideInterval);
//     pauseBtn.textContent = "ادامه";
//   } else {
//     startSlider();
//     pauseBtn.textContent = "توقف";
//   }
// }

// راه‌اندازی اولیه
document.addEventListener("DOMContentLoaded", () => {
  createSlides();
  createAnimatedGrid();
  startSlider();

  // اضافه کردن event listener برای دکمه‌ها
  //   document.getElementById("prev-btn-frac").addEventListener("click", prevSlide);
  //   document.getElementById("next-btn-frac").addEventListener("click", nextSlide);
  //   document
  //     .getElementById("pause-btn-frac")
  //     .addEventListener("click", togglePause);
});
