
start();

function start(){
  window.addEventListener('deviceorientation', setduration); 
}

console.log("AS");

function setduration(event){
  this.removeEventListener("deviceorientation",arguments.callee);

  var duration = event.beta;
  var speed1 , sqeed2; 
  if (duration > 10){
    speed1 = 6;
    speed2 = 3;
  }
  else if(duration < -10){
    speed1 = 3;
    speed2 = 6;
  }
  else{
    speed1 = 5;
    speed2 = 5;
  }
  console.log(duration);

  testAni(speed1 , speed2);
}

//const duration = 5;

// lets grab references to red car related things
function testAni(speed1 , speed2){
  
  const duration = speed1;

  const duration1 = speed1;
  const duration2 = speed2;

  console.log(duration1 +" , "+ duration2);

  const red = { 
    line: document.querySelector('#red-line'),
    car: document.querySelector('#red-car-container'),
    circle: document.querySelector('#red-circle'),
    smoke: document.querySelector('#red-car-smoke')
  }
  
  // lets grab references to blue car related things
  
  const blue = { 
    line: document.querySelector('#blue-line'),
    car: document.querySelector('#blue-car-container'),
    circle: document.querySelector('#blue-circle'),
    smoke: document.querySelector('#blue-car-smoke')
  }
  
  // lets make some circles to animate as tire smoke
  
  let smokeContainers = [blue.smoke, red.smoke];
  smokeContainers.map((container, i) => {
  for (var y = 0; y < 20; y ++) {
      var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
      circle.setAttributeNS(null, 'cx', 60);
      circle.setAttributeNS(null, 'cy', 30);
      circle.setAttributeNS(null, 'r', 2);
      circle.setAttributeNS(null, 'class', `smoke ${i == 0 ? 'blue' : 'red'}-smoke`);
      
      container.appendChild(circle);
  }})
  
  // lets create a timeline for the cars
  
  const timeline = new gsap.timeline({repeat: -1});
  
  // lets set some initial values on the cars
  
  timeline.set(['#red-car', '#blue-car'], {transformOrigin: '90% 50%', x: '-80', y: '-25'});
  
  // lets make the bridge road transparent to start
  
  timeline.set('#bridge-over', {opacity: 0});
  
  // lets tell the red car to follow the hidden red path
  // you can uncomment line 25 in css to see them 
  
  timeline.to(red.car, {
    duration: duration1,
    transformOrigin: '50% 50%',
    motionPath: {
      path: '#red-path',
      autoRotate: true
    },
    ease: 'linear'
  })
  
  // lets tell the blue car to follow the blue path
  
  timeline.to(blue.car, {
    duration: duration2,
    transformOrigin: '50% 50%',
    motionPath: {
      path: '#blue-path',
      autoRotate: true,
      start: 0.05,
      end: 1.05
    },
    ease: 'linear'
  }, 0)
  
  // lets tell the bridge road to show as the cars pass under
  
  timeline.to('#bridge-over', {duration: duration * 0.1, opacity: 1}, duration / 2)
  
  // lets kick the back of the red car out as it goes around 2 corners
  // the cars are nested in 2 groups, the first group follows the path
  // the inner group is animated here to skid
  
  timeline.to('#red-car', {duration: duration1 * 0.1, rotate: 30}, duration1 * 0.02)
  timeline.to('#red-car', {duration: duration1 * 0.4, rotate: 0, ease: 'elastic'}, duration1 * 0.16)
  timeline.to('#red-car', {duration: duration1 * 0.15, rotate: -40}, duration1 * 0.51)
  timeline.to('#red-car', {duration: duration1 * 0.35, rotate: 0, ease: 'elastic'}, duration1 * 0.62)
  
  // lets kick the back of blue the car out as it goes around 2 corners
  
  timeline.to('#blue-car', {duration: duration2 * 0.1, rotate: 10}, duration2 * 0.01)
  timeline.to('#blue-car', {duration: duration2 * 0.5, rotate: 0, ease: 'elastic'}, duration2 * 0.16)
  timeline.to('#blue-car', {duration: duration2 * 0.2, rotate: -40}, duration2 * 0.37)
  timeline.to('#blue-car', {duration: duration2 * 0.4, rotate: 0, ease: 'elastic'}, duration2 * 0.55)
  
  // lets animate the blue cars tire smoke
  
  timeline.fromTo('.blue-smoke', {opacity: 0.2, scale: 2, x: 'random(0, 40)', y: 0}, {
    delay: 'random(0.1, 0.4)', 
    duration: 'random(0.2, 0.4)', 
    x: 'random(-20, -50)', 
    y: 'random(0, 30)', 
    scale: 'random(0, 6)', 
    opacity: 0
  }, duration2 * 0.01)
  
  timeline.fromTo('.blue-smoke', {opacity: 0.4, scale: 2, x: 'random(0, 40)', y:0}, {
    delay: 'random(0.1, 0.55)', 
    duration: 'random(0.2, 0.4)', 
    x: 'random(-40, -50)', 
    y: 'random(-30, -50)', 
    scale: 'random(3, 6)', 
    opacity: 0
  }, duration2 * 0.39)
  
  // lets animate the red cars tire smoke
  
  timeline.fromTo('.red-smoke', {opacity: 0.2, scale: 2, x: 'random(0, 40)', y: 0}, {
    delay: 'random(0.1, 0.4)', 
    duration: 'random(0.2, 0.4)', 
    x: 'random(-20, -50)', 
    y: 'random(0, 30)', 
    scale: 'random(0, 6)', 
    opacity: 0
  }, duration1 * 0.05)
  
  timeline.fromTo('.red-smoke', {opacity: 0.4, scale: 2, x: 'random(0, 40)', y:0}, {
    delay: 'random(0.1, 0.4)', 
    duration: 'random(0.2, 0.4)', 
    x: 'random(-40, -50)', 
    y: 'random(-30, -50)', 
    scale: 'random(3, 6)', 
    opacity: 0
  }, duration1 * 0.5)
  
  // lets setup some settings for the waves.
  // the first values in the arrays are the initial transform
  // the second is how much to move for 2 steps
  
  const waveMachine = {
    "#wave-1": {x:[0, 0], y: [-20, 25]},
    "#wave-2": {x:[0, 5], y: [-20, 30]},
    "#wave-3": {x:[0, -25], y: [-10, 30]},
    "#wave-4": {x:[-10, -50], y: [-10, 20]},
    "#wave-5": {x:[10, -40], y: [0, -20]},
    "#wave-6": {x:[10, -10], y: [0, -20]},
    "#wave-7": {x:[0, 40], y: [-10, -20]},
    "#wave-8": {x:[-10, 40], y: [0, 0]},
    "#wave-9": {x:[-10, 40], y: [0, 40]},
  }
  
  // lets animate all the waves
  // these are individual animates so that they
  // don't all loop in sync
  
  Object.keys(waveMachine).forEach(key => {
    let settings = waveMachine[key];
    gsap.set(key, {
      transformOrigin: 'center center',
      x: settings.x[0], 
      y: settings.y[0], 
      scale: 1, 
      opacity: 0
    })
    gsap.to(key, {
        duration: 3 + Math.random() * 2,
        delay: Math.random() * -2,
        keyframes: [
          {
            x: settings.x[0], 
            y: settings.y[0], 
            scale: 1, 
            opacity: 0
          },
          { 
            x: '+=' + (settings.x[1] / 2), 
            y: '+=' + (settings.y[1] / 2), 
            scale: 1.2,
            opacity: 0.5,
          },
          {
            x: '+=' + (settings.x[1] / 2), 
            y: '+=' + (settings.y[1] / 2),
            scale: 1.4,
            opacity: 0,
          }
        ],
        repeat: -1
      })
  })
  
  // lets uncomment this line below if you want to scrub the timeline with you cursor
  
   // ScrubGSAPTimeline(timeline);
  
  
  
  // lets not worry about this
  document.querySelector('#roof').addEventListener('click', () => gsap.to('#roof', {opacity: 0}))


}
