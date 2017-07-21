window.onload = function () {
  addEvent();
}

function addEvent() {
  var switchSlideEm = document.querySelectorAll('#switch-slide')[0];
  switchSlideEm.onclick = toggleSlide;
  var slidMaskEm = document.querySelectorAll('.slid-mask')[0];
  slidMaskEm.onclick = toggleSlide;
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