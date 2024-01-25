"use strict";

// Функция конвертации времени. В качестве аргумента принимает время в миллисекундах.
function timeToString(time) {
  let diffInHrs = time / 3600000; // В 1 часе 3600000 миллисекунд. Разделив наше время на это число мы получим значение в часах.
  let hh = Math.floor(diffInHrs); // Округляем значение

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
};

const value = document.querySelector('.value');
const controls = document.querySelector('.controls-active');
const controlsPaused = document.querySelector('.controls-paused');
const controlsInitial = document.querySelector('.controls-initial');
const lapButton = document.querySelector('.button--lap');
const resetButton = document.querySelector('.button--reset');
const pauseButton = document.querySelector('.button--pause');
const startButton = document.querySelector('.button--start');
const table = document.querySelector('.table');
table.classList.add('hidden');
let startTime;
let lastTime = 0;
let interval;
let count = 1;
let newArr = [];


function start() {
  startTime = Date.now() - lastTime;
  interval = setInterval(function () {
    lastTime = Date.now() - startTime;
    value.innerHTML = timeToString(lastTime);
  },10)
};
function pause() {
  clearInterval(interval);
};
function reset() {
  newArr = [];
  clearInterval(interval);
  lastTime = 0;
  count = 1;
  value.innerHTML = timeToString(0);
  for(let keys of document.querySelectorAll('.table-row')){
    if(keys === document.querySelector('.table-row')){
      keys.remove();
    };
  };
};
let lap = (id, time) => `
<div class="table-row">
<div class="table-cell">Круг ${id}</div>
<div class="table-cell">Время ${time}</div>
`;
function id(){ return count++; };
function getTable(){
  let arr = [];
  const tr = Array.from(document.querySelectorAll('.table-cell'));
  for(let keys of tr){
    arr.push(keys.textContent);
  };
  newArr.push(arr);
};

for(let startId of document.querySelectorAll('.button--start')){

  startId.addEventListener('click',() => {  
    start();
    controlsInitial.classList.add('hidden');
    controls.classList.remove('hidden');
  });
}
document.querySelector('.button--two').addEventListener('click', () => {
  controlsPaused.classList.add('hidden');
  controls.classList.remove('hidden');    
})
pauseButton.addEventListener('click',() => {
  pause();
  controlsPaused.classList.remove('hidden');
  controls.classList.add('hidden');
  
});
 lapButton.addEventListener('click', () => {
  table.insertAdjacentHTML('beforeend', lap(id(), timeToString(lastTime)));
  getTable();
  table.classList.remove('hidden');
});
resetButton.addEventListener('click', () => {
  reset();
  table.classList.add('hidden');
  controlsPaused.classList.add('hidden');
  controlsInitial.classList.remove('hidden');
});