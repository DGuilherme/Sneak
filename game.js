let board;
let context;
let blockSize = 20;
let cols = 30;
let rows = 20;

let appleAudio;
let gameOverAudio;

let snakeX = 0;
let snakeY = 0;
let tail = [];

let foodX;
let foodY;

let score = 0;

let velocityX = 1;
let velocityY = 0;

let gameOver = false;

window.onload = () => {
    board = document.getElementById('board');
    context = board.getContext('2d');

    appleAudio = new Audio('apple_sound.mp3');
    gameOverAudio = new Audio('game_over_sound.mp3');

    board.width = cols * blockSize;
    board.height = rows * blockSize;

    document.addEventListener('keyup', changeDirection)

    board.addEventListener('click', () => {
        gameOver = false,
        score = 0
    })

    foodPlace();

    setInterval(update, 1000 / 10);
}

function update (){

    // Clear Screen
    createRectangle(0, 0, board.width, board.height);

    if(gameOver){

        createText('Game Over', board.width / 2, board.height / 2 - 25, 'center', 50 );

        createText(`Score: ${score}`, board.width / 2, board.height / 2 - 25, 'center');

        createText('Click to Start Again', (cols * blockSize) / 2, board.height / 2 - 50, 'center');

        return
    }

    // Write score
    createText(`Score: ${score}`, 30, 40);

    // Create first food
    createRectangle(foodX, foodY, blockSize, blockSize, 'lime');

    // Eat action
    if(snakeX == foodX && snakeY == foodY){
        tail.push([foodX, foodY])

        score += 10;

        appleAudio.play();

        foodPlace();
    }

    // Snake Tail
    for(let i = tail.length -1; i > 0; i-- ){
        tail[i] = tail[i - 1];
    }

    if(tail.length){
        tail[0] = [snakeX, snakeY];
    }

    // Snake position
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    createRectangle(snakeX, snakeY, blockSize, blockSize,'orange');

    for(let i = 0; i < tail.length; i++){
        createRectangle(tail[i][0], tail[i][1], blockSize, blockSize, 'lime');
    }

    // Hit the wall
    if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOverEvent();
    }

    // Shot herself
    for(let i = 0; i < tail.length; i++){
        if(snakeX == tail[i][0] && snakeY == tail[i][1]){
            gameOverEvent();
        }
    }

}

function foodPlace(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e){
    if(e.code == "ArrayUp"){
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrayDown"){
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrayLeft"){
        velocityX = -1;
        velocityY = 0;
    }else if(e.code == "ArrayRight"){
        velocityX = 1;
        velocityY = 0;
    }
}

function gameOverEvent(){
    gameOver = true;

    gameOverAudio.play();

    tail = [];

    snakeX = 0;
    snakeY = 0;

    velocityX = 1;
    velocityY = 0;

}

function createRectangle(x, y, width, height, color = "black"){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function createText(text, x, y, textAlign = "start", fontSize = 20){
    context.fillStyle = 'lime';
    context.font = `${fontSize}px Roboto Mono`;
    context.textAlign = textAlign;
    context.fillText(text, x, y) 
}


