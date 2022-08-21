const sectionsScroll = [document.querySelectorAll('section')[0], document.querySelectorAll('section')[1], document.querySelectorAll('section')[4]];
const targetTextos = document.querySelectorAll('[data-animateTexto]');
var sectionScroll = 0;
var animatedHeroPC = false;
var snapScroll = false;

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

document.addEventListener('wheel', debounce(function(e){
  var delta = null,direction = false;

  if ( !e ) { // if the event is not provided, we get it from the window object
     e = window.event;
  }
  if ( e.wheelDelta ) { // will work in most cases
     delta = e.wheelDelta / 60;
  } else if ( e.detail ) { // fallback for Firefox
     delta = -e.detail / 2;
  }
  if ( delta !== null ) {
     direction = delta > 0 ? 'up' : 'down';
  }

   setSectionScroll(direction);
}, 200));

document.addEventListener('keydown', debounce(function(e){
  var direction = false;

  if(keysUp[e.keyCode]){
    direction = "up";
  }else if(keysDown[e.keyCode]){
    direction = "down";
  }

  setSectionScroll(direction);
}, 200));

document.addEventListener('DOMMouseScroll', debounce(function(e){
  var delta = null,direction = false;

  if ( !e ) { // if the event is not provided, we get it from the window object
     e = window.event;
  }
  if ( e.wheelDelta ) { // will work in most cases
     delta = e.wheelDelta / 60;
  } else if ( e.detail ) { // fallback for Firefox
     delta = -e.detail / 2;
  }
  if ( delta !== null ) {
     direction = delta > 0 ? 'up' : 'down';
  }

   setSectionScroll(direction);
}, 200));

setTimeout( function(e){
  document.addEventListener('scroll', function(e){
    if(!window.mobileCheck() && !snapScroll){ //se não é mobile e se nenhuma outra função foi chamada
      //dá um snap-scroll pra seção mais próxima
      var i = 0;
      while(pageYOffset > (sectionsScroll[i].offsetTop + sectionsScroll[i].offsetHeight*.66)){
        i++;
      }
      sectionScroll = i;
      if(i == 0){
        animateHeroPC();
      }
      snapAnimation(sectionScroll, false);
    }
  });
},1000);

function setSectionScroll(direction){
  snapScroll = true;

  if(animatedHeroPC){

    if(direction == 'down' && sectionScroll < 2){
      sectionScroll++;
    }else if(direction == "up" && sectionScroll > 0){
      sectionScroll--;
    }

    snapAnimation(sectionScroll, true);

  }else{
    animateHeroPC();
  }

  setTimeout(function(e){
    snapScroll = false;
  }, 500);
}

function snapAnimation(section, snap){
  if(snap){
    window.scrollTo(0, sectionsScroll[section].offsetTop);
  }

  if(section == 1){
    setTimeout(function(e){
      targetTextos[0].classList.add('animate');
      targetTextos[1].classList.add('animate');
      targetTextos[2].classList.add('animate');
    },350);
    contrastCTA(1);

  }else if(section == 2){
    setTimeout(function(e){
      targetTextos[3].classList.add('animate');
    },350);
    contrastCTA(4);

  }else if(sectionScroll == 0){
    contrastCTA(0);
  }

}

function animateHeroPC(){
  document.getElementById('texto-int').classList.add('animate');

  animatedHeroPC = true;
}

function contrastCTA(section){
  const windowTop = window.pageYOffset + (window.innerHeight*.75);
  const btn = document.getElementById('cta-btn');
  const cta = document.getElementById('cta');
  const txtCtaPc = document.getElementById('texto-cta-pc');

  if(section == 0 || section == 4){
    btn.style.backgroundColor = "var(--amarelo)";
    btn.style.border = "2px solid transparent";
    cta.style.backgroundColor = "var(--preto)";
    if(!window.mobileCheck()){
      cta.style.border = "2px solid transparent";
    }
    txtCtaPc.style.color = "var(--branco)";
  }else if(section == 2){
    btn.style.backgroundColor = "var(--amarelo)";
    btn.style.border = "2px solid var(--preto)";
    cta.style.backgroundColor = "var(--branco)";
    if(!window.mobileCheck()){
	     cta.style.border = "2px solid var(--preto)";
    }
    txtCtaPc.style.color = "var(--preto)";
  }else if(section == 1 || section == 3){
    btn.style.backgroundColor = "var(--branco)";
    btn.style.border = "2px solid var(--preto)";
    cta.style.backgroundColor = "var(--branco)";
    if(!window.mobileCheck()){
	     cta.style.border = "2px solid var(--preto)";
    }
    txtCtaPc.style.color = "var(--preto)";
  }
}
