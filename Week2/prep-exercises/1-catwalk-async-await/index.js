'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  img.style.left = startPos + 'px';
  let currentLeftPos = startPos;
  return new Promise((resolve) => {
    function catMoving () {
      currentLeftPos = currentLeftPos + STEP_SIZE_PX;
      img.style.left = currentLeftPos +'px';
   
    if (currentLeftPos <= stopPos) {
      setTimeout(catMoving, STEP_INTERVAL_MS)
    } else {resolve();}
  }
  catMoving();
  });
}

function dance(img) {
  return new Promise((resolve) => {
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src =
        'http://www.anniemation.com/clip_art/images/cat-walk.gif';
        resolve();
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  async function walkingCat() {
    await walk(img, startPos, centerPos);
    await dance(img);
    await walk(img, centerPos,stopPos);
    walkingCat();
  }

  walkingCat();
}

window.addEventListener('load', catWalk);