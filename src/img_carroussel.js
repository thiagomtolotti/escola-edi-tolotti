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
    //após a transição muda a posição dos elementos
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
