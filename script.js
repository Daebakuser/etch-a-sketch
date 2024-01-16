const header = document.querySelector('#header');
const rainbowModeDiv = document.querySelector('#rainbow-mode');
const gridContainer = document.querySelector('#grid-container');
const eraserButton = document.querySelector('#eraser-button');
const clearButton = document.querySelector('#clear-button');
const rangeBar = document.querySelector('#range-bar');
const rangeValue = document.querySelector('#range-value');
const colorPickerContainer = document.querySelector('#color-container');
const colorPickerInput = document.querySelector('#color-picker');

function getRandomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for(let i =0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function changeHeaderColor(){
    const  colorInput = getRandomColor();
    header.style.color = colorInput;
}

setInterval("changeHeaderColor()",500);

function changeBorderColor(){
    rainbowModeDiv.style.borderColor = getRandomColor();
}

setInterval("changeBorderColor()",500);

const DEFAULT_COLOR='#000000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE =16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor){
    currentColor = newColor;
}

function setCurrentMode(newMode){
    activateButton(newMode);
    currentMode = newMode;
}

function setGridSize(newSize){
    currentSize = newSize;
    console.log('updated');
}

function changeGridSize(value){
    setGridSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value){
    rangeValue.textContent = `${value} x ${value}`; 
}

function reloadGrid(){
    clearGrid();
    createGrid(currentSize);
}

function clearGrid(){
    gridContainer.textContent = '';
}


function createGrid(gridSize){
    for(let i=0; i<gridSize; i++ ){
        const row = document.createElement('div');
        row.classList.add('row');
        gridContainer.appendChild(row);
        for(let j=0; j<gridSize; j++){
            const column = document.createElement('div');
            column.classList.add('column');
            column.addEventListener('mousedown', changeColor);
            row.appendChild(column);
        }
    }
}


function changeColor(e){
    if(currentMode === 'rainbow'){
        e.target.style.backgroundColor =`hsl(${Math.random()*360},100%,50%)`;
    }else if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    }else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = '#ffffff';
    }
}

function activateButton(newMode){
    if(currentMode==='rainbow'){
        rainbowModeDiv.classList.remove('active');
        rainbowModeDiv.classList.remove('glow');
    }else if(currentMode === 'color'){
        colorPickerContainer.classList.remove('active');
        colorPickerContainer.classList.remove('glow')
    }else if(currentMode === 'eraser'){
        eraserButton.classList.remove('active');
        eraserButton.classList.remove('glow');
    }

    if(newMode==='rainbow'){
        rainbowModeDiv.classList.add('active');
        rainbowModeDiv.classList.add('glow')
    }else if(newMode === 'color'){
        colorPickerContainer.classList.add('active');
        colorPickerContainer.classList.add('glow')
    }else if(newMode === 'eraser'){
        eraserButton.classList.add('active');
        eraserButton.classList.add('glow');
    }
}


colorPickerInput.oninput =(e) => setCurrentColor(e.target.value);
colorPickerContainer.onclick = () => setCurrentMode('color');
rainbowModeDiv.onclick = ()=>setCurrentMode('rainbow');
eraserButton.onclick = ()=>setCurrentMode('eraser');
clearButton.onclick = ()=>reloadGrid();
rangeBar.onmousedown = (e) => updateSizeValue(e.target.value);
rangeBar.onclick = (e) => changeGridSize(e.target.value);

clearButton.addEventListener('click', ()=>{
    clearButton.classList.add('glow');
    eraserButton.classList.remove('glow');
    rainbowModeDiv.classList.remove('glow');
    colorPickerContainer.classList.remove('glow')
    setTimeout(() => {
        clearButton.classList.remove('glow');  
    }, 300);
});


createGrid(DEFAULT_SIZE);