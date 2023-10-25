$(function () {
  setupScrollSpy();
  startTypewriterEffect($(".intro-page .big-title"));
  setupSwiper();
  setupCursor();
});

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

function startTypewriterEffect(element) {
  const text = element.text();
  let currentBigTitleLen = 0;
  element.text("");
  element.removeClass("typewriter-hidden");
  const typewriterEffectInterval = setInterval(function () {
    ++currentBigTitleLen;
    element.text(text.substring(0, currentBigTitleLen));
    if (currentBigTitleLen == text.length) {
      clearInterval(typewriterEffectInterval);
    }
  }, 200);
}

function setupCursor() {
  const cursor = $(".cursor");
  cursor.addClass("hidden");
  $(window).mousemove(function (e) {
    cursor.css("left", e.clientX - (cursor.height() / 2));
    cursor.css("top", e.clientY - (cursor.height() / 2));
    cursor.removeClass("hidden");
  });

  const pointables = $("a, button, .swiper-button-prev, .swiper-button-next");
  pointables.hover(
    function () {
      cursor.addClass("pointer");
    },
    function () {
      cursor.removeClass("pointer");
    }
  );
  pointables.click(function () {
    cursor.addClass("pointer-fired");
    setTimeout(function () {
      cursor.removeClass("pointer-fired");
    }, 400);
  });
}


function setupScrollSpy() {
  const scrollActivateOffset = 50;
  const topMenuScrollActivateOffset = -20;
  let footerTypewriterEffectStarted = false;

  $(window).scroll(function () {
    const html = $("html");
    const scrollTop = html.scrollTop();

    // 스크롤할때 현재 페이지에만 page-active 클래스를 줌
    $(".page-container").removeClass("page-active");
    $(".page-container").filter(function(n, element) {
      if ($(element).offset().top < (scrollTop + ($(this).height() / 3))) {
        return true;
      }
      return false;
    }).addClass("page-active");

    // 푸터 타자기 효과
    if (!footerTypewriterEffectStarted) {
      const footerBigTitle = $("footer .big-title");
      if ((footerBigTitle.offset().top + scrollActivateOffset) < (scrollTop + $(this).height())) {
        startTypewriterEffect(footerBigTitle);
        footerTypewriterEffectStarted = true;
      }
    }

    // 스크롤할때 현재 페이지에 맞춰 상단 메뉴에 흰색으로 강조된 메뉴를 바꿈
    $(".root-menu-item").removeClass("root-menu-item-highlight");
 
    let currentPageIndex = 0;
    $("div.page-container, footer").each(function(n, element) {
      if (($(element).offset().top + topMenuScrollActivateOffset) < scrollTop) {
        currentPageIndex = n;
      }
    });
    $(`.root-menu-item:nth-of-type(${currentPageIndex + 1})`).addClass("root-menu-item-highlight");

    // 스크롤 인디케이터 업데이트
    const scrollIndicatorWidthPercent = (scrollTop * 100) / (html.height() - $(this).height());
    $(".scroll-indicator").css("width", `${scrollIndicatorWidthPercent}%`);
  });
}
