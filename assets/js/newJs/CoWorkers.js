// لیست کامل 36 لوگو و متن
const allLogosCo = [
  { logo: "images/cologos/company01.png", text: "شرکت نرم‌افزاری آلفا" },
  { logo: "images/cologos/company02.png", text: "استارتاپ فناوری آلفا" },
  { logo: "images/cologos/company03.png", text: "گروه توسعه آلفا" },
  { logo: "images/cologos/company04.png", text: "استارتاپ فناوری بتا" },
  { logo: "images/cologos/company05.png", text: "شرکت نوآوری بتا" },
  { logo: "images/cologos/company06.png", text: "گروه تحقیقاتی بتا" },
  { logo: "images/cologos/company07.png", text: "هولدینگ گاما" },
  {
    logo: "images/cologos/company08.png",
    text: "شرکت سرمایه‌گذاری گاما",
  },
  { logo: "images/cologos/company09.png", text: "گروه بین‌المللی گاما" },
  { logo: "images/cologos/company10.png", text: "گروه صنعتی دلتا" },
  { logo: "images/cologos/company11.png", text: "شرکت تولیدی دلتا" },
  { logo: "images/cologos/company12.png", text: "کارخانجات دلتا" },
  { logo: "images/cologos/company13.png", text: "شرکت فناوری اپسیلون" },
  { logo: "images/cologos/company14.png", text: "موسسه خدمات اپسیلون" },
  { logo: "images/cologos/company15.png", text: "گروه مشاوره اپسیلون" },
  { logo: "images/cologos/company16.png", text: "موسسه زتا" },
  { logo: "images/cologos/company17.png", text: "آکادمی زتا" },
  { logo: "images/cologos/company18.png", text: "مرکز آموزش زتا" },
  { logo: "images/cologos/company19.png", text: "گروه اتا" },
  { logo: "images/cologos/company20.png", text: "شرکت فناوری اتا" },
  { logo: "images/cologos/company21.png", text: "استارتاپ اتا" },
  { logo: "images/cologos/company22.png", text: "شرکت تتا" },
  { logo: "images/cologos/company23.png", text: "گروه مهندسی تتا" },
  { logo: "images/cologos/company24.png", text: "موسسه تحقیقاتی تتا" },
  { logo: "images/cologos/company25.png", text: "استارتاپ یوتا" },
  { logo: "images/cologos/company26.png", text: "شرکت نوپای یوتا" },
  { logo: "images/cologos/company27.png", text: "گروه یوتا" },
  { logo: "images/cologos/company28.png", text: "گروه کاپا" },
  { logo: "images/cologos/company29.png", text: "شرکت بین‌المللی کاپا" },
  { logo: "images/cologos/company30.png", text: "گروه کاپا" },
  { logo: "images/cologos/company31.png", text: "شرکت لامبدا" },
  { logo: "images/cologos/company32.png", text: "موسسه تحقیقات لامبدا" },
  { logo: "images/cologos/company33.png", text: "آزمایشگاه لامبدا" },
  { logo: "images/cologos/company34.png", text: "هولدینگ مو" },
  { logo: "images/cologos/company35.png", text: "شرکت سرمایه‌گذاری مو" },
  { logo: "images/cologos/company36.png", text: "صندوق مو" },
];

// تابع برای انتخاب تصادفی 12 لوگو از لیست 36 تایی (برای دسکتاپ)
function getRandomLogosForDesktopCo() {
  const shuffled = [...allLogosCo];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 12);
}

// تابع برای انتخاب تصادفی 4 لوگو از لیست 36 تایی (برای موبایل)
function getRandomLogosForMobileCo() {
  const shuffled = [...allLogosCo];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 4);
}

// تابع برای تغییر لوگوها و متن‌ها
function rotateLogosCo() {
  if (window.innerWidth <= 480) {
    // حالت موبایل - فقط 4 المان
    const randomLogos = getRandomLogosForMobileCo();
    for (let i = 0; i < 4; i++) {
      const logoElement = document.getElementById(`logo${i + 1}-co`);
      const textElement = document.getElementById(`text${i + 1}-co`);
      const currentData = randomLogos[i];
      logoElement.src = currentData.logo;
      textElement.textContent = currentData.text;

      logoElement.style.opacity = "0";
      textElement.style.opacity = "0";
      setTimeout(() => {
        logoElement.style.opacity = "1";
        textElement.style.opacity = "1";
      }, 100);
    }
  } else {
    // حالت دسکتاپ و تبلت - همه 12 المان
    const randomLogos = getRandomLogosForDesktopCo();
    for (let i = 0; i < 12; i++) {
      const logoElement = document.getElementById(`logo${i + 1}-co`);
      const textElement = document.getElementById(`text${i + 1}-co`);
      const currentData = randomLogos[i];
      logoElement.src = currentData.logo;
      textElement.textContent = currentData.text;

      logoElement.style.opacity = "0";
      textElement.style.opacity = "0";
      setTimeout(() => {
        logoElement.style.opacity = "1";
        textElement.style.opacity = "1";
      }, 100);
    }
  }
}

// انیمیشن زوم چرخشی برای کارت‌ها
function startCardAnimationCo() {
  const cards = document.querySelectorAll(".card-co");
  let currentIndex = 0;

  // حذف کلاس active از همه کارت‌ها
  function resetCards() {
    cards.forEach((card) => {
      card.classList.remove("active-co");
    });
  }

  // نمایش کارت بعدی
  function showNextCard() {
    resetCards();

    // اضافه کردن کلاس active به کارت فعلی
    cards[currentIndex].classList.add("active-co");

    // افزایش ایندکس برای کارت بعدی
    currentIndex = (currentIndex + 1) % cards.length;
  }

  // شروع انیمیشن
  showNextCard();

  // تنظیم تایمر برای تغییر هر 4 ثانیه
  setInterval(showNextCard, 4000);
}

// تنظیم اندازه اولیه
document.addEventListener("DOMContentLoaded", function () {
  // بارگذاری اولیه با لوگوهای تصادفی
  rotateLogosCo();

  // شروع انیمیشن کارت‌ها
  startCardAnimationCo();

  // تغییر خودکار لوگوها هر 4 ثانیه
  setInterval(rotateLogosCo, 4000);
});

// اضافه کردن کلیک برای شش‌ضلعی‌ها
document.querySelectorAll(".small-hexagon-co").forEach((hexagon) => {
  hexagon.addEventListener("click", function () {
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 300);
  });
});

// مدیریت ریسایز پنجره
window.addEventListener("resize", function () {
  rotateLogosCo();
});
