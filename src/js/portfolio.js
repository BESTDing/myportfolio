
window.onload = function () {
  addEvent();
  /*
   *初始化niceScroll
   */
  $('.scrollspy').scrollSpy();
  if (window.pageYOffset > 0) {
    var backTopEm = $('.back-top')[0];
    backTopEm.style.visibility = 'visible';
    backTopEm.setAttribute('class', 'back-top fixed-action-btn animated fadeIn')
    ISDISPLAYBACKTOP = true;
  }
}
/*
 * 回到顶部处理函数
 */

function  backTop(event) {
  /**
   * 手动触发点击事件
   */
  // var homeEm = document.querySelectorAll('.nav-list .nav-item')[0];
  // var clickEvent = document.createEvent('MouseEvents');
  // clickEvent.initEvent('click', true, true, document.defaultView);
  // homeEm.dispatchEvent(clickEvent);
}

/*
 *滚动事件处理函数
 */

var ISDISPLAYBACKTOP = false;
function handlerScroll(event) {
  var backTopEm = $('.back-top')[0];
  console.log(backTopEm.className);
  if (window.pageXOffset > 0) {
    event.preventDefault();
  }
  if (ISDISPLAYBACKTOP && window.pageYOffset > 0) {
    return;
  } else if (ISDISPLAYBACKTOP && window.pageYOffset === 0) {
      backTopEm.style.visibility = 'hidden';
      backTopEm.setAttribute('class', 'back-top fixed-action-btn animated fadeOut')
      // backTopEm.addClass('animated fadeOut');
      ISDISPLAYBACKTOP = false;
  } else  {
    backTopEm.style.visibility = 'visible';
    backTopEm.setAttribute('class', 'back-top fixed-action-btn animated fadeIn')
    ISDISPLAYBACKTOP = true;
  }
}

function addEvent() {
  var switchSlideEm = document.querySelectorAll('#switch-slide')[0];
  switchSlideEm.onclick = toggleSlide;
  var slidMaskEm = document.querySelectorAll('.slid-mask')[0];
  slidMaskEm.onclick = toggleSlide;
  var navItems = document.querySelectorAll('.slid-out .nav-item');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].onclick = toggleSlide;
  }
  /*
   *添加backTop事件
   */

  $('.back-top')[0].onclick = backTop;

  /*
   * 添加滚动时间处理函数
   */
  window.onscroll = handlerScroll;

  /**
   * 添加显示作品描述的处理函数
   */
  /*太挫了😈😈*/
  var portfolioBottom = document.querySelectorAll('.bottom-nav');
  for (var i = 0; i < portfolioBottom.length; i++) {
    portfolioBottom[i].children[0].onclick = showPortfolioDescription;
    portfolioBottom[i].children[1].onclick = showPortfolioDescription;
  }

  /**
   * 添加隐藏时间处理函数
   */
  var descriptionEm = document.querySelectorAll('.bottom-nav + .description');
  for (i = 0; i < descriptionEm.length; i++) {
    descriptionEm[i].children[0].onclick = hidePortfolioDescription;
    descriptionEm[i].children[1].onclick = hidePortfolioDescription;
  }
}
var ISDISPLAY = false;

function toggleSlide() {
  var slideOutEm = document.querySelectorAll('#slid-out')[0];
  var slidMaskEm = document.querySelectorAll('.slid-mask')[0];
  if (!ISDISPLAY) {
    /*显示*/
    slideOutEm.style.left = 0;
    slideOutEm.setAttribute('class', 'animated slideInLeft slid-out ');
    slidMaskEm.style.visibility = 'inherit';
    slidMaskEm.setAttribute('class', 'animated  slid-mask fadeIn')
    ISDISPLAY = true;
  } else {
    slideOutEm.style.left = -200;
    slideOutEm.setAttribute('class', 'animated slideOutLeft slid-out ');
    slidMaskEm.style.visibility = 'hidden';
    slidMaskEm.setAttribute('class', 'animated  slid-mask fadeOut')
    ISDISPLAY = false;
  }
}

/**
 * 获取浏览器滚动条位置
 *
 */
function getScrollOffsets(w) {
  w = w || window;
  if (w.pageXOffset != null) {
    return {x: w.pageXOffset, y: w.pageYOffset};
  }
  var d = w.document;
  if (d.compatMode == 'CSS1Compat') {
    return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};
  } else  {
    return {x: d.body.scrollLeft, y: d.body.scrollTop};
  }
}

/**
 *获取元素在文档中的位置
 */

function getElementBoundingInDocument(e) {
  var box = e.getBoundingClientRect();
  var offsets = getScrollOffsets();
  var x = box.left + offsets.x;
  var y = box.top + offsets.y;
  return {x: x, y: y};
}

/**
 * 滚动到指定元素
 */

function scrollToElement(event) {
  var queryString = '';
  if (event.target.firstChild.firstChild) {
    queryString = event.target.firstChild.firstChild.nodeValue;
  } else {
    queryString = event.target.firstChild.nodeValue;
  }
  queryString = queryString.toLowerCase();
  // console.log(queryString);
  if (queryString === 'home') {
    $('body').getNiceScroll().doScrollPos(0, 0);
    if (ISDISPLAY) {
      toggleSlide();
    }
    return;
  }
  console.log(queryString);
  var em = window.document.querySelectorAll('.' + queryString)[0];
  console.log(em);
  var box = getElementBoundingInDocument(em);
  $('body').getNiceScroll().doScrollPos(0, box.y);
  if (ISDISPLAY) {
    toggleSlide();
  }
}

function showPortfolioDescription(event) {
  var queryString = event.target.getAttribute('query-string');
  console.log(queryString);
  var imageEm = document.querySelectorAll('.portfolio-wrapper .responsive-img')[0];
  var box = imageEm.getBoundingClientRect();
  var descriptionEm = document.querySelectorAll('.' + queryString + ' .description')[0];
  descriptionEm.style.top = (-box.height) + 'px';
  descriptionEm.style.height = (box.height + 90) + 'px';
  descriptionEm.style.width = box.width + 'px';
  descriptionEm.style.display = 'block';
  descriptionEm.setAttribute('class', 'description animated slideInUp');
}

function hidePortfolioDescription(event) {
  var queryString = event.target.getAttribute('query-string');
  var descriptionEm = document.querySelectorAll('.' + queryString + ' .description')[0];
  descriptionEm.setAttribute('class', 'description animated slideOutDown');
  setTimeout(function () {
    descriptionEm.style.display = 'none';
  }, 500);
}
