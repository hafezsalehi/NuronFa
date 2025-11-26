// توابع全局
function toggleMinimizeFl() {
  const floatingBoxFl = document.getElementById("floatingBoxFl");
  const minimizeButtonFl = document.querySelector(".minimize-button-fl");
  if (floatingBoxFl && minimizeButtonFl) {
    const isMinimized = floatingBoxFl.classList.contains("minimized-fl");
    floatingBoxFl.classList.toggle("minimized-fl");
    minimizeButtonFl.textContent = isMinimized ? "▲" : "▼";
    resizeFont();
  }
}

function closeBoxFl() {
  const floatingBoxFl = document.getElementById("floatingBoxFl");
  if (floatingBoxFl) {
    floatingBoxFl.classList.add("hidden-fl");
  }
}

function scrollToSectionFl(event) {
  if (event) {
    event.stopPropagation();
  }

  const targetSectionFl = document.getElementById("target-section-fl");
  const floatingBoxFl = document.getElementById("floatingBoxFl");

  if (targetSectionFl && floatingBoxFl) {
    const isCurrentlyMinimized =
      floatingBoxFl.classList.contains("minimized-fl");
    targetSectionFl.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    toggleMinimizeFl();
  }
}

// دریافت قیمت بیت‌کوین با نمایش WLR
async function fetchPriceFl() {
  const priceDisplayFl = document.getElementById("priceDisplayfl");
  const priceDisplayGl = document.getElementById("priceDisplaygl");
  if (priceDisplayFl) priceDisplayFl.classList.add("price-loading-fl");

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
    if (priceDisplayFl) {
      priceDisplayFl.textContent = `LBLU: ${price.toLocaleString()}$`;
      priceDisplayFl.classList.remove("price-loading-fl");
      priceDisplayFl.classList.add("price-updated-fl");
      setTimeout(
        () => priceDisplayFl.classList.remove("price-updated-fl"),
        500
      );
    }
    if (priceDisplayGl) {
      priceDisplayGl.textContent = `LBLU: ${price.toLocaleString()}$`;
    }
  } catch (error) {
    if (priceDisplayFl) {
      priceDisplayFl.textContent = "خطا در بارگذاری قیمت";
    }
  }
}

// اجرا پس از لود DOM
document.addEventListener("DOMContentLoaded", function () {
  fetchPriceFl();

  // ==========debogg==============
  const gallerySection = document.querySelector(".gallery1");
  const floatingBoxFl = document.getElementById("floatingBoxFl");
  const minimizeButtonFl = document.querySelector(".minimize-button-fl");

  if (!floatingBoxFl) return;

  let isMinimizedFl = window.innerWidth <= 600;
  let isDraggingFl = false;
  let currentXFl = floatingBoxFl.offsetLeft;
  let currentYFl = floatingBoxFl.offsetTop;
  let initialXFl, initialYFl;
  let lastXFl = currentXFl;

  // تنظیم حالت اولیه باکس
  if (isMinimizedFl) {
    floatingBoxFl.classList.add("minimized-fl");
    if (minimizeButtonFl) minimizeButtonFl.textContent = "▼";
  } else {
    floatingBoxFl.classList.remove("minimized-fl");
    if (minimizeButtonFl) minimizeButtonFl.textContent = "▲";
  }

  // تابع تنظیم اندازه فونت
  function resizeFont() {
    const boxWidth = floatingBoxFl.offsetWidth;
    const fontSize = floatingBoxFl.classList.contains("minimized-fl")
      ? Math.max(10, boxWidth * 0.04)
      : Math.max(12, boxWidth * 0.05);
    floatingBoxFl.style.fontSize = `${fontSize}px`;
  }

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
    if (isClickableElement(e.target)) return;
    initialXFl = e.clientX - currentXFl;
    initialYFl = e.clientY - currentYFl;
    lastXFl = currentXFl;
    isDraggingFl = true;
    floatingBoxFl.classList.add("dragging-fl");
    e.preventDefault();
  }

  function startDraggingFlTouch(e) {
    if (isClickableElement(e.target)) return;
    const touch = e.touches[0];
    initialXFl = touch.clientX - currentXFl;
    initialYFl = touch.clientY - currentYFl;
    lastXFl = currentXFl;
    isDraggingFl = true;
    floatingBoxFl.classList.add("dragging-fl");
    e.preventDefault();
  }

  function dragFl(e) {
    if (isDraggingFl) {
      e.preventDefault();
      currentXFl = e.clientX - initialXFl;
      currentYFl = e.clientY - initialYFl;
      floatingBoxFl.style.right = "auto";
      floatingBoxFl.style.top = `${currentYFl}px`;
      floatingBoxFl.style.left = `${currentXFl}px`;

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
    floatingBoxFl.style.transform = "";
  }

  function isClickableElement(element) {
    return (
      element.classList.contains("minimize-button-fl") ||
      element.classList.contains("close-button-fl") ||
      element.classList.contains("buy-button-fl") ||
      element.classList.contains("scroll-button-fl") ||
      element.classList.contains("image-item-fl") ||
      element.tagName === "IMG" ||
      element.tagName === "SPAN" ||
      element.tagName === "BUTTON"
    );
  }

  // منطق اسکرول و گالری
  let lastScrollY = window.scrollY;
  let isInGallery = false;

  function checkScrollPosition() {
    if (!gallerySection || !floatingBoxFl) return;

    const galleryRect = gallerySection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const expandedTopThreshold = -windowHeight * 0.2;
    const expandedBottomThreshold = windowHeight * 1.2;

    isInGallery =
      galleryRect.top < expandedBottomThreshold &&
      galleryRect.bottom > expandedTopThreshold;

    if (isInGallery) {
      floatingBoxFl.style.animation = "fadeInRotateFl 1.2s ease-out forwards";
      floatingBoxFl.classList.add("no-float-animation");
    } else {
      floatingBoxFl.style.animation =
        "fadeInRotateFl 1.2s ease-out forwards, floatFl 3s infinite ease-in-out";
      floatingBoxFl.classList.remove("no-float-animation");
    }

    lastScrollY = window.scrollY;
  }

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        checkScrollPosition();
        scrollTimeout = null;
      }, 50);
    }
  });

  window.addEventListener("resize", checkScrollPosition);
  checkScrollPosition();
});
