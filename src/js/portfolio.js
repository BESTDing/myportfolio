window.onload = function () {
  addEvent();
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
}
var ISDISPLAY = false;

function toggleSlide() {
  var slideOutEm = document.querySelectorAll('#slid-out')[0];
  var slidMaskEm = document.querySelectorAll('.slid-mask')[0];
  if (!ISDISPLAY) {
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
    scroll_To(0);
    return;
  }
  console.log(queryString);
  var em = window.document.querySelectorAll('.' + queryString)[0];
  console.log(em);
  var box = getElementBoundingInDocument(em);
  if (box.y > 898)
    scroll_To(897);
  else
  scroll_To(box.y);
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


function scroll_To(tar_y){ //tar_y 即滑动条顶端 距离页面最上面的距离
  //console.log('oooooooo')
  var timer = setTimeout(function(){
    var current_y = document.body.scrollTop
    //console.log(current_y)
    step = 40 //步长系数 即剩余的距离除以40 每1ms 移动一段距离
    if (tar_y>current_y){ //tar_y > current_y 即向下滚动
      var dist = Math.ceil((tar_y-current_y)/step)
      var next_y = current_y+dist
      if(next_y<tar_y){  //向上滚动和向下滚动判定的区别 是这里！！
        window.scrollTo(0,next_y)
        scroll_To(tar_y)
        console.log('向下')
      }
      else{
        window.scrollTo(0,tar_y)
        clearTimeout(timer)
      }
    }
    else{ //tar_y < current_y 即向上滚动
      var dist = Math.floor((tar_y-current_y)/step)
      var next_y = current_y+dist
      if(next_y>tar_y){
        window.scrollTo(0,next_y)
        scroll_To(tar_y)
        console.log('向上')
      }
      else{
        window.scrollTo(0,tar_y)
        clearInterval(timer)
      }
    }
  },1)
}