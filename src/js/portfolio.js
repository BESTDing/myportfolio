window.onload = function () {
  addEvent();
  /*
   *初始化niceScroll
   */
  $('body').niceScroll();
}
/*
 * 回到顶部处理函数
 */

function  backTop(event) {
  $('body').getNiceScroll().doScrollPos(0, 0);
}

/*
 *滚动事件处理函数
 */

var ISDISPLAYBACKTOP = false;
function handlerScroll() {
  var backTopEm = $('.back-top')[0];
  console.log(backTopEm.className);
  if (ISDISPLAYBACKTOP && window.pageYOffset > 0) {
    return;
  } else if (ISDISPLAYBACKTOP && window.pageYOffset === 0) {
      backTopEm.style.visibility = 'hidden';
      backTopEm.setAttribute('class', 'back-top fixed-action-btn animated fadeOut')
      // backTopEm.addClass('animated fadeOut');
      ISDISPLAYBACKTOP = false;
  } else  {
    backTopEm.style.visibility = 'inherit';
    backTopEm.setAttribute('class', 'back-top fixed-action-btn animated fadeIn')
    ISDISPLAYBACKTOP = true;
  }
}

function addEvent() {
  var switchSlideEm = document.querySelectorAll('#switch-slide')[0];
  switchSlideEm.onclick = toggleSlide;
  var slidMaskEm = document.querySelectorAll('.slid-mask')[0];
  slidMaskEm.onclick = toggleSlide;
  var navItems = document.querySelectorAll('.nav-item');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].onclick = scrollToElement;
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
  var portfolioBottom = document.querySelectorAll('.portfolio-wrapper .bottom-nav')[0];
  portfolioBottom.children[0].onclick = showPortfolioDescription;
  portfolioBottom.children[1].onclick = showPortfolioDescription;

  var sellBottom = document.querySelectorAll('.sell-wrapper .bottom-nav')[0];
  sellBottom.children[0].onclick = showSellDescription;
  sellBottom.children[1].onclick = showSellDescription;

  /**
   * 添加隐藏时间处理函数
   */
  var descriptionEm = document.querySelectorAll('.portfolio-wrapper .description')[0];
  descriptionEm.children[0].onclick = hidePortfolioDescription;
  descriptionEm.children[1].onclick = hidePortfolioDescription;
  
  var sellDesriptionEm = document.querySelectorAll('.sell-wrapper .description')[0];
  sellDesriptionEm.children[0].onclick = hideSellDescription;
  sellDesriptionEm.children[1].onclick = hideSellDescription;

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

/**
 * 临时时间处理函数
 */

function temHandler(event) {
  console.log(event);
}


function showPortfolioDescription(event) {
  console.log(1);
  var imageEm = document.querySelectorAll('.portfolio-wrapper .responsive-img')[0];
  var box = imageEm.getBoundingClientRect();
  var descriptionEm = document.querySelectorAll('.portfolio-wrapper .description')[0];
  descriptionEm.style.top = (-box.height) + 'px';
  descriptionEm.style.height = (box.height + 90) + 'px';
  descriptionEm.style.width = box.width + 'px';
  descriptionEm.style.visibility = 'inherit';
  descriptionEm.setAttribute('class', 'description animated slideInUp');
}

function hidePortfolioDescription() {
  var descriptionEm = document.querySelectorAll('.portfolio-wrapper .description')[0];
  descriptionEm.setAttribute('class', 'description animated slideOutDown')
  setTimeout(function () {
    descriptionEm.style.top = 0;
    descriptionEm.style.visibility = 'hidden';
  }, 500);
}

function  showSellDescription(event) {
  var imageEm = document.querySelectorAll('.sell-wrapper .responsive-img')[0];
  var box = imageEm.getBoundingClientRect();
  var descriptionEm = document.querySelectorAll('.sell-wrapper .description')[0];
  descriptionEm.style.top = (-box.height) + 'px';
  descriptionEm.style.height = (box.height + 90) + 'px';
  descriptionEm.style.width = box.width + 'px';
  descriptionEm.style.visibility = 'inherit';
  descriptionEm.setAttribute('class', 'description animated slideInUp');
}


function hideSellDescription() {
  var descriptionEm = document.querySelectorAll('.sell-wrapper .description')[0];
  descriptionEm.setAttribute('class', 'description animated slideOutDown')
  setTimeout(function () {
    descriptionEm.style.top = 0;
    descriptionEm.style.visibility = 'hidden';
  }, 500);
}