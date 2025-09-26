// داده‌های نمونه برای 40 مالک
const owners = [
  { name: "علی محمدی", city: "تهران", avatar: "👨" },
  { name: "فاطمه احمدی", city: "مشهد", avatar: "👩" },
  { name: "رضا کریمی", city: "اصفهان", avatar: "🧔" },
  { name: "سارا حسینی", city: "شیراز", avatar: "👧" },
  { name: "محمد رضایی", city: "تبریز", avatar: "👨‍💼" },
  { name: "زهرا جعفری", city: "اهواز", avatar: "👩‍⚕️" },
  { name: "امیر حسنی", city: "کرج", avatar: "👨‍🎓" },
  { name: "نازنین محمودی", city: "قم", avatar: "👩‍🎨" },
  { name: "حسین اکبری", city: "رشت", avatar: "👨‍🔧" },
  { name: "مینا صادقی", city: "ارومیه", avatar: "👩‍🍳" },
  { name: "کامران نظری", city: "زاهدان", avatar: "👨‍🌾" },
  { name: "لیلا رحیمی", city: "کرمانشاه", avatar: "👩‍💻" },
  { name: "پویا امینی", city: "همدان", avatar: "👨‍🎤" },
  { name: "نرگس قاسمی", city: "یزد", avatar: "👩‍🎓" },
  { name: "سجاد موسوی", city: "اردبیل", avatar: "👨‍🚀" },
  { name: "مریم علیزاده", city: "بندرعباس", avatar: "👩‍🚒" },
  { name: "امید جمالی", city: "کاشان", avatar: "👨‍✈️" },
  { name: "نگین یوسفی", city: "گرگان", avatar: "👩‍⚖️" },
  { name: "فرهاد نوروزی", city: "ساری", avatar: "👨‍🔬" },
  { name: "هستی محمدپور", city: "شاهرود", avatar: "👩‍🏫" },
  { name: "مهدی سلطانی", city: "بجنورد", avatar: "👨‍💻" },
  { name: "النا احمدیان", city: "سبزوار", avatar: "👩‍🔧" },
  { name: "بهرام رضوی", city: "قزوین", avatar: "👨‍🏭" },
  { name: "پرنیا سلیمانی", city: "خرم‌آباد", avatar: "👩‍🚀" },
  { name: "کیانوش نجفی", city: "سنندج", avatar: "👨‍🎨" },
  { name: "آتنا طاهری", city: "یزد", avatar: "👩‍💼" },
  { name: "مهران عباسی", city: "بوشهر", avatar: "👨‍🚒" },
  { name: "سپیده مرادی", city: "بیرجند", avatar: "👩‍✈️" },
  { name: "پارسا کرمانی", city: "کرمان", avatar: "👨‍⚖️" },
  { name: "نیلوفر صالحی", city: "ایلام", avatar: "👩‍🌾" },
  { name: "آرش دادگر", city: "یزد", avatar: "👨‍🍳" },
  { name: "رها فرهادی", city: "سمنان", avatar: "👩‍🔬" },
  { name: "امیرحسین غفاری", city: "یزد", avatar: "👨‍🏫" },
  { name: "سپهر امیری", city: "قم", avatar: "👨‍💼" },
  { name: "نازیا محمودی", city: "مشهد", avatar: "👩‍🎤" },
  { name: "پیمان صادقیان", city: "اصفهان", avatar: "👨‍🚀" },
  { name: "مهسا نوری", city: "شیراز", avatar: "👩‍🚒" },
  { name: "سروش رضایی", city: "تبریز", avatar: "👨‍✈️" },
  { name: "آیدا محمدی", city: "تهران", avatar: "👩‍⚖️" },
  { name: "محمدرضا حسینی", city: "کرج", avatar: "👨‍🔬" },
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

  console.log(
    `نمایش ${popupCount} پاپ‌آپ برای ${totalCells} سلول (${columns}x${rows})`
  );

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
  setTimeout(() => {
    console.log(`تعداد پاپ‌آپ‌های نمایش داده شده: ${displayedPopups}`);
  }, popupCount * 300 + 500);
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
