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
async function fetchPriceFl() {
  const priceDisplayFl = document.getElementById("priceDisplayFl");
  priceDisplayFl.classList.add("price-loading-fl");
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const price = data.bitcoin.usd;
    priceDisplayFl.textContent = `قیمت: WLR: $${price.toLocaleString()}`;
    priceDisplayFl.classList.remove("price-loading-fl");
    priceDisplayFl.classList.add("price-updated-fl");
    setTimeout(() => priceDisplayFl.classList.remove("price-updated-fl"), 500);
  } catch (error) {
    priceDisplayFl.textContent = "خطا در بارگذاری قیمت";
    console.error("Error fetching price:", error);
  }
}

// بارگذاری اولیه و به‌روزرسانی هر 30 ثانیه
fetchPriceFl();
setInterval(fetchPriceFl, 30000);
