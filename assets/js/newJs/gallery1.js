/* gallery1.optimized.js — نسخه کامل */
(function () {
  "use strict";

  // ----- متغیرهای اصلی -----
  let gallerySection,
    imgContainerGl,
    thumbnailsContainerGl,
    thumbnailsGl,
    boxesGl;
  let currentIndexGl = 0;
  let isAnimatingGl = false;
  let slideIntervalGl = null;
  let isPlayingGl = true;
  let animationTimeoutGl = null;

  const titleContentGl = document.getElementById("title-content-gl");
  const artistContentGl = document.getElementById("artist-content-gl");
  const locationContentGl = document.getElementById("location-content-gl");
  const yearContentGl = document.getElementById("year-content-gl");
  const messageContentGl = document.getElementById("message-content-gl");

  const toggleBtnGl = document.getElementById("toggle-btn-gl");
  const toggleIconGl = toggleBtnGl && toggleBtnGl.querySelector("i");

  // ----- helper: get image data safely -----
  function getImageData(index) {
    if (
      typeof galleryDataGl !== "undefined" &&
      galleryDataGl.images &&
      Array.isArray(galleryDataGl.images) &&
      galleryDataGl.images[index]
    ) {
      return galleryDataGl.images[index];
    }

    const box = boxesGl && boxesGl[index];
    const img = box ? box.querySelector("img") : null;
    return {
      title: img
        ? img.getAttribute("alt") || `Image ${index + 1}`
        : `Image ${index + 1}`,
      artist: artistContentGl ? artistContentGl.textContent : "",
      city: locationContentGl
        ? locationContentGl.textContent.split(",")[0] || ""
        : "",
      country: "",
      year: yearContentGl ? yearContentGl.textContent : "",
      message: messageContentGl ? messageContentGl.textContent : "",
      description: "",
      src: img ? img.src : "",
    };
  }

  // ----- update info with fade -----
  function updateInfoGl(index) {
    const data = getImageData(index);

    const els = [
      titleContentGl,
      artistContentGl,
      locationContentGl,
      yearContentGl,
      messageContentGl,
    ].filter(Boolean);

    // فید-اوت
    els.forEach((el) => {
      el.classList.remove("fade-in-gl");
      el.classList.add("fade-out-gl");
    });

    setTimeout(() => {
      if (titleContentGl) titleContentGl.textContent = data.title || "";
      if (artistContentGl) artistContentGl.textContent = data.artist || "";
      if (locationContentGl) {
        const locationText = data.city
          ? data.city + (data.country ? `, ${data.country}` : "")
          : data.country || "";
        locationContentGl.textContent = locationText;
      }
      if (yearContentGl) yearContentGl.textContent = data.year || "";
      if (messageContentGl) messageContentGl.textContent = data.message || "";

      // فید-این
      els.forEach((el) => {
        el.classList.remove("fade-out-gl");
        el.classList.add("fade-in-gl");
      });

      setTimeout(() => {
        els.forEach((el) => el.classList.remove("fade-in-gl"));
      }, 500);
    }, 150);
  }

  // ----- active thumbnail -----
  function updateActiveThumbnailGl(index) {
    if (!thumbnailsGl) return;
    thumbnailsGl.forEach((thumb, i) => {
      thumb.classList.toggle("active-gl", i === index);
    });
  }

  // ----- position boxes (3D stack) -----
  // ----- position boxes (3D stack) -----
  function updateBoxPositionsGl() {
    if (!imgContainerGl) return;

    boxesGl = Array.from(imgContainerGl.querySelectorAll(".box-gl"));
    const total = boxesGl.length;

    boxesGl.forEach((box, domIndex) => {
      let visualPosition = (domIndex - currentIndexGl + total) % total;

      // همیشه ترانزیشن داشته باش
      box.style.transition = "all 0.6s ease-in-out";

      if (visualPosition >= 0 && visualPosition < 5) {
        const styles = [
          {
            z: 50,
            opacity: 1,
            right: "45%",
            transform: "translate(50%, -50%) rotateY(10deg) scale(1)",
            display: "block",
          },
          {
            z: 40,
            opacity: 0.8,
            right: "50%",
            transform:
              "translate(50%, -50%) rotateY(10deg) translateZ(-50px) scale(0.95)",
            display: "block",
          },
          {
            z: 30,
            opacity: 0.6,
            right: "55%",
            transform:
              "translate(50%, -50%) rotateY(10deg) translateZ(-100px) scale(0.9)",
            display: "block",
          },
          {
            z: 20,
            opacity: 0.4,
            right: "60%",
            transform:
              "translate(50%, -50%) rotateY(10deg) translateZ(-150px) scale(0.85)",
            display: "block",
          },
          {
            z: 10,
            opacity: 0.2,
            right: "65%",
            transform:
              "translate(50%, -50%) rotateY(10deg) translateZ(-200px) scale(0.8)",
            display: "block",
          },
        ][visualPosition];

        // اعمال استایل‌ها
        box.style.zIndex = styles.z;
        box.style.opacity = styles.opacity;
        box.style.display = styles.display;
        box.style.right = styles.right;
        box.style.transform = styles.transform;
      } else {
        // مخفی کردن باکس‌های خارج از دید
        box.style.zIndex = "0";
        box.style.opacity = "0";
        box.style.display = "none";
        box.style.transform =
          "translate(50%, -50%) rotateY(10deg) translateZ(-300px) scale(0.7)";
      }
    });
  }

  // ----- slide change (auto) -----
  // ----- slide change (auto) -----
  function changeSlideGl() {
    if (isAnimatingGl) {
      return;
    }

    isAnimatingGl = true;
    const next = (currentIndexGl + 1) % boxesGl.length;


    // آپدیت اطلاعات و موقعیت همزمان
    updateInfoGl(next);
    updateActiveThumbnailGl(next);
    currentIndexGl = next;
    updateBoxPositionsGl();

    // فقط یک تایم‌اوت برای رسیت انیمیشن
    clearTimeout(animationTimeoutGl);
    animationTimeoutGl = setTimeout(() => {
      isAnimatingGl = false;
    }, 600);
  }
  // ----- setSlide from thumbnail -----
  function setSlideGl(index, { stopAndAnimate = true } = {}) {
    if (index === currentIndexGl || isAnimatingGl) {
      if (index === currentIndexGl && stopAndAnimate) {
        stopSlideshowGl();
        playButtonAnimationGl();
      }
      return;
    }

    isAnimatingGl = true;

    if (stopAndAnimate) {
      stopSlideshowGl();
      playButtonAnimationGl();
    }


    // آپدیت همزمان
    updateActiveThumbnailGl(index);
    updateInfoGl(index);
    currentIndexGl = index;
    updateBoxPositionsGl();

    clearTimeout(animationTimeoutGl);
    animationTimeoutGl = setTimeout(() => {
      isAnimatingGl = false;
    }, 600);
  }

  // ----- button animation -----
  function playButtonAnimationGl() {
    if (!toggleBtnGl) return;
    toggleBtnGl.classList.remove("attention-animation-gl");

    setTimeout(() => {
      toggleBtnGl.classList.add("attention-animation-gl");
      setTimeout(() => {
        if (toggleBtnGl) {
          toggleBtnGl.classList.remove("attention-animation-gl");
        }
      }, 900);
    }, 40);
  }

  // ----- slideshow controls -----
  function startSlideshowGl() {

    // پاک کردن اینتروال قبلی
    if (slideIntervalGl) {
      clearInterval(slideIntervalGl);
      slideIntervalGl = null;
    }

    // شروع اینتروال جدید
    slideIntervalGl = setInterval(() => {
      if (!isAnimatingGl) {
        changeSlideGl();
      }
    }, 3000); // 3 ثانیه

    isPlayingGl = true;
    if (toggleIconGl) toggleIconGl.className = "fas fa-pause";
    if (toggleBtnGl) toggleBtnGl.classList.remove("stopped-gl");
  }

  function stopSlideshowGl() {

    if (slideIntervalGl) {
      clearInterval(slideIntervalGl);
      slideIntervalGl = null;
    }

    isPlayingGl = false;
    if (toggleIconGl) toggleIconGl.className = "fas fa-play";
    if (toggleBtnGl) toggleBtnGl.classList.add("stopped-gl");
  }

  function toggleSlideshowGl() {
    if (isPlayingGl) {
      stopSlideshowGl();
    } else {
      startSlideshowGl();
    }
  }

  // ----- overlay helpers -----
  function openOverlay(overlayEl) {
    document.body.classList.add("gl-overlay-open");
    document.body.appendChild(overlayEl);
  }

  function closeOverlay(overlayEl) {
    if (!overlayEl) return;
    if (overlayEl.parentNode === document.body)
      document.body.removeChild(overlayEl);
    document.body.classList.remove("gl-overlay-open");
  }

  // ----- show details overlay -----
  function showDetailsGl(index) {

    stopSlideshowGl();
    playButtonAnimationGl();

    const data = getImageData(index);

    const overlay = document.createElement("div");
    overlay.className = "detail-overlay-gl";

    const detailContent = document.createElement("div");
    detailContent.className = "detail-content-gl";
    detailContent.setAttribute("role", "dialog");
    detailContent.setAttribute("aria-modal", "true");

    // stop propagation when interacting inside content
    detailContent.addEventListener("click", (e) => e.stopPropagation());

    const closeBtn = document.createElement("button");
    closeBtn.className = "detail-close-gl";
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeOverlayAndCleanup();
    });

    const detailHeader = document.createElement("div");
    detailHeader.className = "detail-header-gl";
    const detailTitle = document.createElement("h2");
    detailTitle.className = "detail-title-gl";
    detailTitle.textContent = data.title || "";
    const detailArtist = document.createElement("p");
    detailArtist.className = "detail-artist-gl";
    detailArtist.textContent = `اثر: ${data.artist || ""} ${
      data.year ? `(${data.year})` : ""
    }`;
    detailHeader.appendChild(detailTitle);
    detailHeader.appendChild(detailArtist);

    const detailBody = document.createElement("div");
    detailBody.className = "detail-body-gl";
    detailBody.innerHTML = `
      <p><strong>موقعیت:</strong> ${data.city || ""} ${
      data.country ? ", " + data.country : ""
    }</p>
      <p><strong>پیام اثر:</strong> ${data.message || ""}</p>
      <p style="margin-top:15px;">${data.description || ""}</p>
    `;

    // assemble
    detailContent.appendChild(closeBtn);
    detailContent.appendChild(detailHeader);
    detailContent.appendChild(detailBody);
    overlay.appendChild(detailContent);

    // close overlay when clicking background
    const backgroundClick = (e) => {
      if (e.target === overlay) closeOverlayAndCleanup();
    };
    overlay.addEventListener("click", backgroundClick);

    // ESC to close
    const onEsc = (e) => {
      if (e.key === "Escape") closeOverlayAndCleanup();
    };

    function closeOverlayAndCleanup() {
      closeOverlay(overlay);
      document.removeEventListener("keydown", onEsc);
      overlay.removeEventListener("click", backgroundClick);
    }

    document.addEventListener("keydown", onEsc);
    openOverlay(overlay);

  }

  // show enlarged image overlay
  // show enlarged image overlay
  function showEnlargeImage(src) {
    stopSlideshowGl();
    playButtonAnimationGl();

    const overlay = document.createElement("div");
    overlay.className = "detail-overlay-gl";

    // با یک کلیک بسته شود
    overlay.style.cursor = "pointer";

    const wrapper = document.createElement("div");
    wrapper.style.cssText =
      "display:flex;align-items:center;justify-content:center;padding:20px;max-width:100%;max-height:100%;";
    // wrapper.addEventListener("click", (e) => e.stopPropagation()); // جلوگیری از بسته شدن وقتی روی عکس کلیک میشه

    const img = document.createElement("img");
    img.src = src;
    img.alt = "enlarged";
    img.style.cssText =
      "max-width:90%;max-height:90%;object-fit:contain;border-radius:15px;box-shadow:0 0 30px rgba(255,255,255,0.2);cursor:default;";

    wrapper.appendChild(img);

    // با یک کلیک روی overlay (background) بسته شود
    overlay.addEventListener("click", () => {
      closeOverlay(overlay);
    });

    // ESC هم برای بستن
    const onEsc = (e) => {
      if (e.key === "Escape") closeOverlay(overlay);
    };
    document.addEventListener("keydown", onEsc);

    // cleanup on close
    const observer = new MutationObserver(() => {
      if (!document.body.contains(overlay)) {
        document.removeEventListener("keydown", onEsc);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true });

    overlay.appendChild(wrapper);
    openOverlay(overlay);
  }

  // ----- event delegation setup -----
  function setupDelegation() {
    // thumbnail clicks: delegate from thumbnails container
    thumbnailsContainerGl.addEventListener("click", (e) => {
      const thumb = e.target.closest(".thumbnail-gl");
      if (!thumb) return;
      e.stopPropagation();
      const index = Array.from(thumbnailsGl).indexOf(thumb);
      if (index >= 0 && !isAnimatingGl) {
        setSlideGl(index, { stopAndAnimate: true });
      }
    });

    // info column clicks: delegate from info column parent
    const infoColumn = document.querySelector(".info-column-gl");
    if (infoColumn) {
      infoColumn.addEventListener("click", (e) => {
        // جلوگیری از bubble شدن
        e.stopPropagation();


        // پیدا کردن نزدیک‌ترین info-item
        const item = e.target.closest(".info-item-gl");
        if (!item) {
          return;
        }



        // نمایش جزئیات
        showDetailsGl(currentIndexGl);
      });
    }

    // image container delegation for box clicks
    imgContainerGl.addEventListener("click", (e) => {
      const box = e.target.closest(".box-gl");
      if (!box) return;
      e.stopPropagation();
      const index = Array.from(boxesGl).indexOf(box);
      if (!isAnimatingGl) {
        if (index === currentIndexGl) {
          const img = box.querySelector("img");
          if (img) showEnlargeImage(img.src);
        } else {
          setSlideGl(index, { stopAndAnimate: true });
        }
      }
    });

    // control button
    toggleBtnGl.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSlideshowGl();
    });
  }

  // ----- init -----
  function init() {
    // جلوگیری از اجرای دوباره
    if (window.gallery1Initialized) {
      return;
    }
    window.gallery1Initialized = true;


    gallerySection = document.querySelector(".gallery1");
    imgContainerGl = document.querySelector(".img-container-gl");
    thumbnailsContainerGl = document.querySelector(".thumbnails-container-gl");
    thumbnailsGl = Array.from(document.querySelectorAll(".thumbnail-gl"));
    boxesGl = Array.from(document.querySelectorAll(".box-gl"));



    // حالت اولیه
    updateActiveThumbnailGl(0);
    updateInfoGl(0);
    updateBoxPositionsGl();

    setupDelegation();

    // کمی تاخیر قبل از شروع اسلایدشو
    setTimeout(() => {
      startSlideshowGl();
    }, 1000);

    window.addEventListener("resize", () => {
      if (!isAnimatingGl) {
        updateBoxPositionsGl();
      }
    });

  }

  // DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
