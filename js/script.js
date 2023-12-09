
console.log('test')
//define html element
const board=document.getElementById('game-board');
const instructionText=document.getElementById('instruction-text')
//game variable
let gameStarted= false;
let gameSpeedDelay=200;
let gameInterval;
const gridSize=20;
let snake=[{x:10,y:10}]
let food=generateFood();
let direction='right';
// draw game map,snake,food
function draw(){
board.innerHTML='';
drawFood();
drawSnake();
}
function drawSnake(){
snake.forEach((segment)=>{
    const snakeElement=createGameElement('div','snake');
    setPosition(snakeElement,segment)
    board.appendChild(snakeElement)

})

}
//create a snake
function createGameElement(tag,className){

const element=document.createElement(tag);
element.className=className;
return element;
}
//set the position of the snake or food
function setPosition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;

}
///testinf draw funtion
///draw();
function drawFood(){
    const foodElement=createGameElement('div','food');
    setPosition(foodElement,food)
    board.appendChild(foodElement)

}
function generateFood(){
    const x = Math.floor(Math.random() * gridSize)+1;
    const y = Math.floor(Math.random() * gridSize)+1;
    return { x, y };
}
//moving the snake
function move(){
    const head={...snake[0]};
    switch (direction){
        case 'up':
            head.y--;
        break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;

    }
snake.unshift(head)
  //  snake.pop()
    if (head.x===food.x &&head.y===food.y){
increaseSpeed();
food=generateFood();
clearInterval();
        gameInterval=setInterval(()=>{
            move();
draw();
        },gameSpeedDelay);

    }else {
       snake.pop()

    }
}
setInterval(()=>{
    move();
    draw();

},200)
//start game funtion
function startGame(){
    clearInterval(gameInterval); // Clear any existing intervals
    gameStarted = true;
    instructionText.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        draw();
    }, gameSpeedDelay);
}
//keypress event lisner
function handleKeyPress(event){
    if((!gameStarted && event.code==='Space')||(!gameStarted && event.key==='')){
       startGame();
    }else {

switch (event.key){

case 'ArrowUp':
    direction='up';
    break;
    case 'ArrowDown':
        direction='down';
        break;
    case 'ArrowLeft':
        direction='left';
        break;
    case 'ArrowRight':
        direction='right';
        break;
}
    }

}
document.addEventListener('keydown',handleKeyPress);
function increaseSpeed(){
    gameSpeedDelay -= 10;
    console.log(gameSpeedDelay)

}