setupScrollSpy();
startTypewriterEffect(document.querySelector(".intro-page .big-title"));
setupSwiper();
setupCursor();

function setupSwiper() {
  const swiper = new Swiper('.portfolio-slides', {
    direction: 'horizontal',
    loop: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    allowTouchMove: false,

    effect: 'coverflow',
    coverflowEffect: {
      rotate: 30,
      slideShadows: false,
    },
    centeredSlides: true,
    slidesPerView: "auto",
  });
}

function getElementXPosition(element) {
  if (element.style.display == "none") {
    console.error("getElementXPosition() cannot be used when display: none (element: ", element, ")");
  }
  let offsetLeft = element.offsetLeft;
  if (element.offsetParent != null) {
    offsetLeft += getElementXPosition(element.offsetParent);
  }
  return offsetLeft;
}


function getElementYPosition(element) {
  if (element.style.display == "none") {
    console.error("getElementYPosition() cannot be used when display: none (element: ", element, ")");
  }
  let offsetTop = element.offsetTop;
  if (element.offsetParent != null) {
    offsetTop += getElementYPosition(element.offsetParent);
  }
  return offsetTop;
}


function startTypewriterEffect(element) {
  const text = element.innerText;
  let currentBigTitleLen = 0;
  element.innerText = "";
  element.classList.remove("typewriter-hidden");
  const typewriterEffectInterval = setInterval(function () {
    ++currentBigTitleLen;
    element.innerText = text.substring(0, currentBigTitleLen);
    if (currentBigTitleLen == text.length) {
      clearInterval(typewriterEffectInterval);
    }
  }, 200);
}

function setupCursor() {
  const cursor = document.querySelector(".cursor");
  cursor.classList.add("hidden");
  window.addEventListener("mousemove", function (e) {
    cursor.style.left = `${e.clientX - (cursor.clientWidth / 2)}px`;
    cursor.style.top = `${e.clientY - (cursor.clientHeight / 2)}px`;
    cursor.classList.remove("hidden");
  });

  for (const element of document.querySelectorAll("a, button, .swiper-button-prev, .swiper-button-next")) {
    element.addEventListener("mouseenter", function () {
      cursor.classList.add("pointer");
    });
    element.addEventListener("mouseleave", function () {
      cursor.classList.remove("pointer");
    });
    element.addEventListener("click", function () {
      cursor.classList.add("pointer-fired");
      setTimeout(function() {
        cursor.classList.remove("pointer-fired");
      }, 400);
    });
  }
}


function setupScrollSpy() {
  const scrollActivateOffset = 50;
  const topMenuScrollActivateOffset = -20;
  let footerTypewriterEffectStarted = false;

  window.addEventListener("scroll", function () {
    const html = document.querySelector("html");

    // 스크롤할때 현재 페이지에만 page-active 클래스를 줌
    const pages = document.querySelectorAll(".page-container");
    for (const page of pages) {
      page.classList.remove("page-active");
    }
    let currentPage = null;
    for (const page of pages) {
      if (page.offsetTop < (html.scrollTop + (window.innerHeight / 3))) {
        currentPage = page;
      }
    }
    currentPage.classList.add("page-active");

    // 푸터 타자기 효과
    if (!footerTypewriterEffectStarted) {
      const footerBigTitle = document.querySelector("footer .big-title");
      if ((getElementYPosition(footerBigTitle) + scrollActivateOffset) < (html.scrollTop + window.innerHeight)) {
        startTypewriterEffect(footerBigTitle);
        footerTypewriterEffectStarted = true;
      }
    }

    // 스크롤할때 현재 페이지에 맞춰 상단 메뉴에 흰색으로 강조된 메뉴를 바꿈
    for (const menuItem of document.querySelectorAll(".root-menu-item")) {
      menuItem.classList.remove("root-menu-item-highlight");
    }
    const nonHeaderPages = document.querySelectorAll("div.page-container, footer");
    let currentPageIndex = 0;
    for (let i = 0; i < nonHeaderPages.length; ++i) {
      if ((getElementYPosition(nonHeaderPages[i]) + topMenuScrollActivateOffset < html.scrollTop)) {
        currentPageIndex = i;
      }
    }
    document.querySelector(`.root-menu-item:nth-of-type(${currentPageIndex + 1})`).classList.add("root-menu-item-highlight");

    // 스크롤 인디케이터 업데이트
    const scrollIndicatorWidthPercent = (html.scrollTop * 100) / (html.offsetHeight - window.innerHeight);
    document.querySelector(".scroll-indicator").style.width = `${scrollIndicatorWidthPercent}%`;
  });
}
