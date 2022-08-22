const targetSections = document.querySelectorAll('section');
const target = document.querySelectorAll('[data-animate]');
var windowTop = 0;

document.addEventListener('touchstart', function(e){
  startY = e.changedTouches[0].screenY;
  console.log('touch start');
});

document.addEventListener('touchmove', debounce(function(e){
  afterY = e.changedTouches[0].screenY;
  deltaY = afterY - startY;
  windowTop = window.pageYOffset + (window.innerHeight*.75);

  //anima o CTA
  var i = 0;
  targetSections.forEach(function(element){
    if (element.offsetTop < pageYOffset){
      i++;
    }
  });

  contrastCTA(i);

  //anima o Hero
  if(deltaY < 0 && window.pageYOffset == 0 && target.length){
    target.forEach(function(element){
      element.classList.add('animate');
      document.body.style.overflowY = "visible";
    });
  }else if(deltaY > 0 && window.pageYOffset == 0 && target.length){
    target.forEach(function(element){
      document.body.style.overflowY = "hidden";
      element.classList.remove('animate');
    });
  }

  //anima as seções
  targetTextos.forEach(function(element){
    if(windowTop > element.offsetTop){
      element.classList.add('animate');
    }else{
      element.classList.remove('animate');
    }
  });

}, 200));
