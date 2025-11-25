// ==========debogg==============
// اضافه کردن به اسکریپت موجود
// تنظیمات پیشرفته‌تر برای محدوده بزرگتر
let lastScrollY = window.scrollY;
let isInGallery = false;

function checkScrollPosition() {
  const gallerySection = document.querySelector(".gallery1");
  const floatingBox = document.querySelector(".floating-box-fl");

  if (!gallerySection || !floatingBox) return;

  const galleryRect = gallerySection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // **تعریف محدوده بزرگتر - 1.5 برابر ارتفاع صفحه از بالا و پایین**
  const expandedTopThreshold = -windowHeight * 0.2; // 50% بالاتر از گالری
  const expandedBottomThreshold = windowHeight * 1.2; // 50% پایین‌تر از گالری

  // چک کردن آیا در محدوده گسترده‌شده گالری هستیم؟
  isInGallery =
    galleryRect.top < expandedBottomThreshold &&
    galleryRect.bottom > expandedTopThreshold;

  // غیرفعال کردن انیمیشن در محدوده گسترده‌شده
  if (isInGallery) {
    floatingBox.style.animation = "fadeInRotateFl 1.2s ease-out forwards";
    floatingBox.classList.add("no-float-animation");
  } else {
    floatingBox.style.animation =
      "fadeInRotateFl 1.2s ease-out forwards, floatFl 3s infinite ease-in-out";
    floatingBox.classList.remove("no-float-animation");
  }

  lastScrollY = window.scrollY;
}

// throttle اسکرول
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      checkScrollPosition();
      scrollTimeout = null;
    }, 50);
  }
});

// همچنین موقعیت resize رو هم چک کن
window.addEventListener("resize", checkScrollPosition);

// اجرای اولیه
checkScrollPosition();

// =========================

const floatingBoxFl = document.getElementById("floatingBoxFl");
const minimizeButtonFl = document.querySelector(".minimize-button-fl");
let isMinimizedFl = window.innerWidth <= 600;
let isDraggingFl = false;
let currentXFl = floatingBoxFl.offsetLeft;
let currentYFl = floatingBoxFl.offsetTop;
let initialXFl, initialYFl;
let lastXFl = currentXFl; // برای ردیابی جهت حرکت

// تنظیم حالت اولیه باکس
if (isMinimizedFl) {
  floatingBoxFl.classList.add("minimized-fl");
  minimizeButtonFl.textContent = "▼";
} else {
  floatingBoxFl.classList.remove("minimized-fl");
  minimizeButtonFl.textContent = "▲";
}

// تابع تنظیم اندازه فونت
function resizeFont() {
  const boxWidth = floatingBoxFl.offsetWidth;
  const fontSize = isMinimizedFl
    ? Math.max(10, boxWidth * 0.04)
    : Math.max(12, boxWidth * 0.05);
  floatingBoxFl.style.fontSize = `${fontSize}px`;
}

// اجرا هنگام لود و تغییر اندازه صفحه
resizeFont();
window.addEventListener("resize", resizeFont);

// درگ و دراپ (ماوس)
floatingBoxFl.addEventListener("mousedown", startDraggingFl);
document.addEventListener("mousemove", dragFl);
document.addEventListener("mouseup", stopDraggingFl);

// درگ و دراپ (لمس)
floatingBoxFl.addEventListener("touchstart", startDraggingFlTouch, {
  passive: false,
});
document.addEventListener("touchmove", dragFlTouch, { passive: false });
document.addEventListener("touchend", stopDraggingFl);

function startDraggingFl(e) {
  if (
    e.target.classList.contains("minimize-button-fl") ||
    e.target.classList.contains("close-button-fl") ||
    e.target.classList.contains("buy-button-fl") ||
    e.target.classList.contains("scroll-button-fl") ||
    e.target.classList.contains("image-item-fl") ||
    e.target.tagName === "IMG" ||
    e.target.tagName === "SPAN"
  )
    return;
  initialXFl = e.clientX - currentXFl;
  initialYFl = e.clientY - currentYFl;
  lastXFl = currentXFl;
  isDraggingFl = true;
  floatingBoxFl.classList.add("dragging-fl");
}

function startDraggingFlTouch(e) {
  if (
    e.target.classList.contains("minimize-button-fl") ||
    e.target.classList.contains("close-button-fl") ||
    e.target.classList.contains("buy-button-fl") ||
    e.target.classList.contains("scroll-button-fl") ||
    e.target.classList.contains("image-item-fl") ||
    e.target.tagName === "IMG" ||
    e.target.tagName === "SPAN"
  )
    return;
  const touch = e.touches[0];
  initialXFl = touch.clientX - currentXFl;
  initialYFl = touch.clientY - currentYFl;
  lastXFl = currentXFl;
  isDraggingFl = true;
  floatingBoxFl.classList.add("dragging-fl");
}

function dragFl(e) {
  if (isDraggingFl) {
    e.preventDefault();
    currentXFl = e.clientX - initialXFl;
    currentYFl = e.clientY - initialYFl;
    floatingBoxFl.style.right = "auto";
    floatingBoxFl.style.top = `${currentYFl}px`;
    floatingBoxFl.style.left = `${currentXFl}px`;

    // تنظیم زاویه کج شدن بر اساس جهت حرکت
    const deltaX = currentXFl - lastXFl;
    const rotateAngle =
      deltaX > 0 ? Math.min(deltaX * 0.1, 15) : Math.max(deltaX * 0.1, -15);
    floatingBoxFl.style.transform = `rotate(${rotateAngle}deg)`;
    lastXFl = currentXFl;
  }
}

function dragFlTouch(e) {
  if (isDraggingFl) {
    e.preventDefault();
    const touch = e.touches[0];
    currentXFl = touch.clientX - initialXFl;
    currentYFl = touch.clientY - initialYFl;
    floatingBoxFl.style.right = "auto";
    floatingBoxFl.style.top = `${currentYFl}px`;
    floatingBoxFl.style.left = `${currentXFl}px`;

    // تنظیم زاویه کج شدن بر اساس جهت حرکت
    const deltaX = currentXFl - lastXFl;
    const rotateAngle =
      deltaX > 0 ? Math.min(deltaX * 0.1, 5) : Math.max(deltaX * 0.1, -5);
    floatingBoxFl.style.transform = `rotate(${rotateAngle}deg)`;
    lastXFl = currentXFl;
  }
}

function stopDraggingFl() {
  isDraggingFl = false;
  floatingBoxFl.classList.remove("dragging-fl");
  floatingBoxFl.style.transform = ""; // بازگشت به حالت اولیه (بدون rotate)
}

// مینیمایز و باز کردن باکس
function toggleMinimizeFl() {
  isMinimizedFl = !isMinimizedFl;
  floatingBoxFl.classList.toggle("minimized-fl");
  minimizeButtonFl.textContent = isMinimizedFl ? "▼" : "▲";
  resizeFont();
}

// بستن باکس
function closeBoxFl() {
  floatingBoxFl.classList.add("hidden-fl");
}

// اسکرول به بخش خاص
function scrollToSectionFl() {
  const targetSectionFl = document.getElementById("target-section-fl");
  targetSectionFl.scrollIntoView({ behavior: "smooth" });
}

// دریافت قیمت بیت‌کوین
