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
    if(!window.mobileCheck() && !snapScroll){ //se n??o ?? mobile e se nenhuma outra fun????o foi chamada
      //d?? um snap-scroll pra se????o mais pr??xima
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

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


function whatsappWeb(){
	if(!window.mobileCheck()){
		let links = document.querySelectorAll("a")

		links.forEach((link)=>{
			let href = link.getAttribute("href");
			
			if(href.startsWith("https://api.whatsapp.com")){
				href = href.replace("api", "web")
				link.setAttribute("href", href)
			}
		})
	}
}

setTimeout(()=>{
  whatsappWeb();
},10)

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

  //anima as se????es
  targetTextos.forEach(function(element){
    if(windowTop > element.offsetTop){
      element.classList.add('animate');
    }else{
      element.classList.remove('animate');
    }
  });

}, 200));
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36:1};
var keysUp = {37: 1, 38: 1, 33: 1, 36: 1};
var keysDown = {39: 1, 40: 1, 32:1, 34: 1, 35: 1}

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {

  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
var slideCount = 1;
const slider = document.querySelectorAll(".slide-slider");
const slides = document.querySelectorAll('.mySlides');

(function loop() {
 setTimeout(function () {

	nextSlide();

   loop();
 }, 2500);
}());

setTimeout(function(e){
  slider.forEach(function(e){
    //ap??s a transi????o muda a posi????o dos elementos
  	e.addEventListener('transitionend',function(el){
  			e.appendChild(e.firstElementChild);

  			e.style.transition = 'none';
  			e.style.transform = 'translate(0)';
        e.firstElementChild.style.marginRight = "20px";
  			setTimeout(function(){
  				e.style.transition = 'all 0.5s';
  			});
  	});
  	setTimeout(function(){
  		e.style.transition = "0.5s";
  	},1000);
  });
},2500);

function nextSlide(){
		slider.forEach(function(e){
			e.style.transform = "translate(-100%)";
		});

	slideCount++;
}
setTimeout(function(e){
    if(!window.mobileCheck()){
      window.scrollTo(0,0);
      disableScroll();
    }
    if(window.pageYOffset <= 20 && window.mobileCheck()){
      document.body.style.overflow = 'hidden';
    }
    contrastCTA();
  },100);

let imgs = ['microfone.webp', 'baixo.webp', 'saxofone.webp', 'guitarra.webp', 'teclado.webp'];
let altImgs = ['aulas de t??cnica vocal em Curitiba','aulas de baixo em Curitiba','aulas de saxofone em Curitiba','aulas de guitarra em Curitiba','aulas de piano em Curitiba']

document.querySelectorAll('.slide-carousel .slide-slider').forEach((carrossel)=>{
	imgs.forEach((img, i)=>{
		let imgEl = document.createElement('img')
		imgEl.src = `img/${img}`
		imgEl.alt = `${altImgs[i]}`

		imgEl.classList.add("mySlides")
		imgEl.style.marginRight = "20px"
		
		console.log(carrossel)
		carrossel.insertAdjacentElement("beforeend", imgEl);
	})
})
