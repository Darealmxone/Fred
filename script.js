function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  heart.style.left = Math.random() * 100 + 'vw';
  
  heart.style.fontSize = Math.random() * 30 + 'px';
  
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  
  heart.innerText = '❤️';
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 200);
// hue hue br



// cursor pink


let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
  px = value => withUnit(value, "px"),
  ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
    diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
  removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
    color = selectRandom(config.colors);

  star.className = "star fa-solid fa-sparkle";

  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);

  appendElement(star);

  removeElement(star, config.starAnimationDuration);
}

const createGlowPoint = position => {
  const glow = document.createElement("div");

  glow.className = "glow-point";

  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow)

  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);

const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
    quantity = determinePointQuantity(distance);

  const dx = (current.x - last.x) / quantity,
    dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
    const x = last.x + dx * index,
      y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
}

const updateLastStar = position => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = e => {
  const mousePosition = { x: e.clientX, y: e.clientY }

  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime(),
    hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
    hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

  if (hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);

    updateLastStar(mousePosition);
  }

  createGlow(last.mousePosition, mousePosition);

  updateLastMousePosition(mousePosition);
}

addEventListener("mousemove", e => handleOnMove(e));

addEventListener("touchmove", e => handleOnMove(e.touches[0]));

document.body.onmouseleave = () => updateLastMousePosition(originPosition);

const selRand = (array) => array[Math.floor(Math.random() * array.length)];


let x1 = 0, y1 = 0;

const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  dist_to_draw = 50,
  delay = 1000,
  fsize = [
    '1.1rem', '1.4rem', '.8rem', '1.7rem'
  ],
  colors = [
    '#E23636',
    '#F9F3EE',
    '#E1F8DC',
    '#B8AFE6',
    '#AEE1CD',
    '#5EB0E5'
  ],
  distanceTo = (x1, y1, x2, y2) =>
    Math.sqrt((Math.pow(x2 - x1, 2)) + (Math.pow(y2 - y1, 2))),
  shouldDraw = (x, y) =>
    (distanceTo(x1, y1, x, y) >= dist_to_draw),
  addStr = (x, y) => {
    
    const str = document.createElement("div");
    str.innerHTML = '&#10022;';
    str.className = 'star';
    str.style.top = `${y + rand(-20, 20)}px`;
    str.style.left = `${x}px`;
    str.style.color = selRand(colors);
    str.style.fontSize = selRand(fsize);
    document.body.appendChild(str);
    const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);
    str.animate({
      translate: `0 ${(y + fs) > vh ? vh - y : fs}px`,
      opacity: 0,
      transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`
    }, {
      duration: delay,
      fill: 'forwards',
    });

    setTimeout(() => {
      str.remove();
    }, delay);
  };

addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  if (shouldDraw(clientX, clientY)) {
    addStr(clientX, clientY);
    x1 = clientX;
    y1 = clientY;
  }
  createGlow(last.mousePosition, { x: clientX, y: clientY });
  updateLastMousePosition({ x: clientX, y: clientY });
});
// dont fix shit!!!!!!!



// now

document.addEventListener("DOMContentLoaded", function() {
  // Array of text possibilities
  var textOptions = [
    "Love is patient and kind; love does not envy or boast; it is not arrogant or rude. It does not insist on its own way; it is not irritable or resentful; it does not rejoice at wrongdoing, but rejoices with the truth.",
    "You're a proverbs 30 woman.",
    "1 Corinthians 16:14. Do everything in love.",
    "1 Corinthians 16:15. Love is patient and kind; love does not envy or boast;"
    // Add more text options as needed
  ];

  // Randomly select a text from the array
  var randomIndex = Math.floor(Math.random() * textOptions.length);
  var selectedText = textOptions[randomIndex];

  // Display the selected text in the container
  var textContainer = document.getElementById("randomTextContainer");
  textContainer.innerText = selectedText;
});
