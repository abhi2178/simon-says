const main = document.getElementById('main');
const heading = document.getElementById('headingDiv');
const userDiv = document.getElementById('bottomDiv');

let lvl = 1;
const displayColors = ['#ed6c50', '#83ed50', '#50edbb', '#d1ed50', '#ca6924'];
const divToDisplay = ['one', 'two', 'three', 'four'];
const colorName = ['Red', 'Blue', 'Yellow', 'Orange', 'Green'];
let colorSequence = [];
let colorNameSequence = [];
let responseSequence = [];

const start = (event) => {
  if (event.key === 'Enter') {
    reset();
    heading.textContent = 'Simon Says';
    mainLogic();
  } else if (event.key == 'Escape') {
    heading.textContent = 'Press Enter To Start!';
  }
};


const reset = () =>{
  colorSequence=[];
  colorNameSequence=[];
  responseSequence=[];
  lvl = 1;
  heading.textContent = 'Press Enter To Start!';
}

const mainLogic = () => {
  let tempLvl = lvl;
  while (tempLvl > 0) {
    genSequence();
    tempLvl--;
  }
  displayAni();
  useInteract();
};
 //animation part
const genSequence = () => {
  let temp = Math.floor(Math.random() * 5);
  let temp2 = Math.floor(Math.random() * 5);
  let trash = Math.floor(Math.random() * 4);
  let colorObj = {
    code: displayColors[temp],
    name: colorName[temp2],
    div: divToDisplay[trash],
  };
  colorSequence.push(colorObj);
  colorNameSequence.push(colorName[temp2]);
};

const displayAni = (index = 0) => {
  if (index < colorSequence.length) {
    document.getElementById(colorSequence[index].div).style.backgroundColor =
      colorSequence[index].code;
    document.getElementById(colorSequence[index].div).textContent =
      colorSequence[index].name;

    setTimeout(function () {
      document.getElementById(colorSequence[index].div).style.backgroundColor =
        '';
      document.getElementById(colorSequence[index].div).textContent = '';
    displayAni(index + 1);
    }, 1000);
};
}
//user logic part
const addToQueue = (event) =>{
  let temp = event.target.id;
  responseSequence.push(temp);
  if(responseSequence.length === colorNameSequence.length){
    comparison();
    responseSequence.splice(0,responseSequence.length);
  }
};

const comparison = () =>{
  let isCorrect = true;
  for(let i=0;i<colorNameSequence.length;i++){
    if(colorNameSequence[i]!=responseSequence[i]){
      heading.textContent = 'Get Good !';
      setTimeout(reset,1000);
      isCorrect = false;
      break;
    }
    else{
      continue;
    }
  }
  if(isCorrect){
  lvl = lvl+1;
  mainLogic();
  }
}


const useInteract = () =>{
  userDiv.addEventListener('click',addToQueue);
};

document.addEventListener('keyup', start);