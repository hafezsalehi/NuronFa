const floatingBoxFl = document.getElementById("floatingBoxFl");
let isMinimizedFl = window.innerWidth <= 600; // بسته در موبایل، باز در دسکتاپ
const minimizeButtonFl = document.querySelector(".minimize-button-fl");

// تنظیم حالت اولیه باکس
if (isMinimizedFl) {
  floatingBoxFl.classList.add("minimized-fl");
  minimizeButtonFl.textContent = "▼";
} else {
  floatingBoxFl.classList.remove("minimized-fl");
  minimizeButtonFl.textContent = "▲";
}

// درگ و دراپ
let isDraggingFl = false;
let currentXFl = floatingBoxFl.offsetLeft; // مقداردهی اولیه با موقعیت واقعی
let currentYFl = floatingBoxFl.offsetTop; // مقداردهی اولیه با موقعیت واقعی
let initialXFl;
let initialYFl;

floatingBoxFl.addEventListener("mousedown", startDraggingFl);
document.addEventListener("mousemove", dragFl);
document.addEventListener("mouseup", stopDraggingFl);

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
  }
}

function stopDraggingFl() {
  isDraggingFl = false;
  floatingBoxFl.classList.remove("dragging-fl");
}

// مینیمایز و باز کردن باکس
function toggleMinimizeFl() {
  isMinimizedFl = !isMinimizedFl;
  floatingBoxFl.classList.toggle("minimized-fl");
  minimizeButtonFl.textContent = isMinimizedFl ? "▼" : "▲";
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

// دریافت قیمت بیت‌کوین با نمایش WLR
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

// تنظیم cursor
floatingBoxFl.style.cursor = "grab";
