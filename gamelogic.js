var canvas, ctx, gameActive, gameControl;
    var x = 12;
    var y = 9;
    var z = 25;
    var c = 60;

    var prey, predator;
    var classic = true;
    document.getElementById("Classic").style.color = "lime";
    document.getElementById("top-side1").innerHTML = "CLASSIC";
    document.getElementById("top-side2").innerHTML = "SNAKE";
    document.getElementById("top-side1").style.color = "lime";
    document.getElementById("top-side2").style.color = "lime";
    document.getElementById("top-side1").style.paddingLeft = "13.2vh";
    document.getElementById("top-side2").style.paddingRight = "13.25vh";
    document.getElementById("shoot-button1").style.display = "none";
    document.getElementById("shoot-button2").style.display = "none";
    document.getElementById("shoot-text1").style.display = "none";
    document.getElementById("shoot-text2").style.display = "none";

    document.getElementById("Predator").onclick = function(){
        if(!predator){
        endGame(tailSize);
        score = 0;
        tailSize = defaultTailSize;
        gameControl = startGame(x);
        predator = true;
        prey = false;
        classic = false;
        document.getElementById("Predator").style.color = "purple";
        document.getElementById("Classic").style.color = "white";
        document.getElementById("Prey").style.color = "white";
        document.getElementById("top-side1").innerHTML = "CATCH";
        document.getElementById("top-side2").innerHTML = "THE 'APPLE'";
        document.getElementById("top-side1").style.color = "purple";
        document.getElementById("top-side2").style.color = "purple";
        document.getElementById("top-side1").style.paddingLeft = "14.25vh";
        document.getElementById("top-side2").style.paddingRight = "8vh";
        document.getElementById("shoot-button1").style.display = "none";
        document.getElementById("shoot-button2").style.display = "none";
        document.getElementById("shoot-text1").style.display = "none";
        document.getElementById("shoot-text2").style.display = "none";

        }
    };

    
    document.getElementById("Prey").onclick = function(){
        if(!prey){
        endGame(tailSize);
        score = 0;
        tailSize = defaultTailSize;
        gameControl = startGame(x);
        prey = true;
        predator = false;
        classic = false;
        document.getElementById("Prey").style.color = "red";
        document.getElementById("Predator").style.color = "white";
        document.getElementById("Classic").style.color = "white";
        document.getElementById("top-side1").innerHTML = "DON'T TOUCH";
        document.getElementById("top-side2").innerHTML = "THE 'APPLE'";
        document.getElementById("top-side1").style.color = "red";
        document.getElementById("top-side2").style.color = "red";
        document.getElementById("top-side1").style.paddingLeft = "7.5vh";
        document.getElementById("top-side2").style.paddingRight = "8vh";
        document.getElementById("shoot-button1").style.display = "";
        document.getElementById("shoot-button2").style.display = "";
        document.getElementById("shoot-text1").style.display = "";
        document.getElementById("shoot-text2").style.display = "";
    
        }
    };

    document.getElementById("Classic").onclick = function(){
        if(!classic){
        endGame(tailSize);
        score = 0;
        tailSize = defaultTailSize;
        gameControl = startGame(x);
        classic = true;
        predator = false;
        prey = false;
        document.getElementById("Classic").style.color = "lime";
        document.getElementById("Predator").style.color = "white";
        document.getElementById("Prey").style.color = "white";
        document.getElementById("top-side1").innerHTML = "CLASSIC";
        document.getElementById("top-side2").innerHTML = "SNAKE";
        document.getElementById("top-side1").style.color = "lime";
        document.getElementById("top-side2").style.color = "lime";
        document.getElementById("top-side1").style.paddingLeft = "13.2vh";
        document.getElementById("top-side2").style.paddingRight = "13.25vh";
        document.getElementById("shoot-button1").style.display = "none";
        document.getElementById("shoot-button2").style.display = "none";
        document.getElementById("shoot-text1").style.display = "none";
        document.getElementById("shoot-text2").style.display = "none";
        }
    };
        
    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = 'black';
    const SNAKE_COLOUR = 'aqua';
    const SNAKE_BORDER_COLOUR = 'black';

    window.onload = function(){
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
    
        document.addEventListener("keydown", keyDownEvent);
    
        gameControl = startGame(x);  
    }

    var gameControlFood;
    var gameControlShoot;
    var gameControlCheckHitApple;
    var gameControlFoodMotion;
        
    /* function to start the game */
    function startGame(x) {
        gameActive = true;
        gameControlFood = food(y);
        gameControlShoot = shoot(z);
        gameControlCheckHitApple = checkHA(c);
        gameControlFoodMotion = foodMotion();
        document.getElementById("game-score").innerHTML = "<h3>Score: " + score + "</h3>";

        return setInterval(draw, 1000 / x);
    }

        
    function pauseGame() {
        clearInterval(gameControl);
        clearInterval(gameControl);
        clearInterval(gameControlFood);
        clearInterval(gameControlShoot);
        clearInterval(gameControlFoodMotion);
        gameActive = false;
        ctx.font = '30pt Calibri';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText('Game Paused', canvas.width/2, canvas.height/2);
        }
        
    function endGame() {
        clearInterval(gameControl);
        clearInterval(gameControl);
        clearInterval(gameControlFood);
        clearInterval(gameControlShoot);
        clearInterval(gameControlFoodMotion);
        ctx.font = '45pt Calibri';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
        gameActive = false;
        snakeX = snakeY = 10;
    }

    // game world
    var gridSize = (tileSize = 25);
    var nextX = (nextY = 0);

    // snake
    var defaultTailSize = 3;
    var tailSize = defaultTailSize;
    var snakeTrail = [];
    var snakeX = (snakeY = 10);

    // apple
    var appleX = (appleY = 15);
    var nextAX = (nextAY = 0);

    // shot
    var shotX = snakeX;
    var shotY = snakeY;
    var nextShotX = (nextShotY = 0);

    var score = 0;

    // draw
    function draw() {
        // move snake in next pos
        snakeX += nextX;
        snakeY += nextY;

        // draw canvas
        ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
        ctx.strokestyle = CANVAS_BORDER_COLOUR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // paint snake
        ctx.fillStyle = SNAKE_COLOUR;
        ctx.strokestyle = SNAKE_BORDER_COLOUR;
        for (var i = 0; i < snakeTrail.length; i++) {
            ctx.fillRect(
                snakeTrail[i].x * tileSize,
                snakeTrail[i].y * tileSize,
                tileSize,
                tileSize
            );
            
            ctx.strokeRect(snakeTrail[i].x * tileSize , snakeTrail[i].y* tileSize, tileSize, tileSize);

            //snake bites it's tail?
            if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
                if (tailSize > 3) {
                    endGame(tailSize);
                    score = 0;
                }
                tailSize = defaultTailSize;  
            }

            if(classic || predator){
            if (snakeX == appleX && snakeY == appleY) {
                    tailSize++;
                    score++;
                    document.getElementById("game-score").innerHTML = "<h3>Score: " + score + "</h3>";
                    appleX = Math.floor(Math.random() * gridSize);
                    appleY = Math.floor(Math.random() * gridSize);
            }  
            }

        }

        // paint apple
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

        // paint shot
        if(prey){
            ctx.fillStyle = "blue";
            ctx.strokestyle = "black";
            ctx.fillRect(shotX * tileSize, shotY * tileSize, tileSize, tileSize);
            ctx.strokeRect(shotX * tileSize, shotY * tileSize, tileSize, tileSize);
        }

        // snake over game world?
        if (snakeX < 0) {
            if(prey){
                snakeX = gridSize - 1;
            }
            else{
                endGame(tailSize);
                tailSize = defaultTailSize; 
            score = 0;
            }
            
        }
        if (snakeX > gridSize - 1) {
            if(prey){
                snakeX = 0;
            }
            else{
                endGame(tailSize);
                tailSize = defaultTailSize; 
                score = 0;
            }
        }
        if (snakeY < 0) {
            if(prey){
                snakeY = gridSize - 1;
            }
            else{
                endGame(tailSize);
                tailSize = defaultTailSize; 
                score = 0;
            }
        }
        if (snakeY > gridSize - 1) {
            if(prey){
                snakeY = 0;
            }
            else{
                endGame(tailSize);
                tailSize = defaultTailSize; 
                score = 0;
            }
        }

        //set snake trail
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
            snakeTrail.shift();
        }

    }
    function food(y) {
        return setInterval(drawApple, 1000 / y);
    }
    function foodMotion(){
        return setInterval(appleDirection, 1000);
    }
    function shoot(z) {
        return setInterval(drawShot, 1000 / z);
    }
    function checkHA(c){
        return setInterval(checkHitApple, 1000 / c);
    }



    function drawApple(){
        if(prey || predator){
        if(nextAX == 0){
            appleY += nextAY;
        }
        if(nextAY == 0){
            appleX += nextAX;
        }
        if (appleX < 0) {
            appleX = 0;
        }
        if (appleX > gridSize - 1) {
            appleX = gridSize - 1;
        }
        if (appleY < 0) {
            appleY = 0;
        }
        if (appleY > gridSize - 1) {
            appleY = gridSize - 1;
        }
        
    }
    }

    function appleDirection() {
        if(prey || predator){
        nextAX = Math.floor(Math.random() * (1 - (-1) + 1)) + (-1);
        nextAY = Math.floor(Math.random() * (1 - (-1) + 1)) + (-1);
        }
    }
    

    function checkHitApple(){
        if(prey){
        if (shotX == appleX && shotY == appleY) {
            if(canShoot){
                shotY = snakeY;
                shotX = snakeX;
                canShoot = false;
                tailSize++;
                score++;
                document.getElementById("game-score").innerHTML = "<h3>Score: " + score + "</h3>";
                appleX = Math.floor(Math.random() * gridSize);
                appleY = Math.floor(Math.random() * gridSize);
            }
        }

        for(var i = 0; i < snakeTrail.length; i++){
            if (snakeTrail[i].x == appleX && snakeTrail[i].y == appleY) {
                tailSize--;
                score--;
                document.getElementById("game-score").innerHTML = "<h3>Score: " + score + "</h3>";
                appleX = Math.floor(Math.random() * gridSize);
                appleY = Math.floor(Math.random() * gridSize);
            }
            else if(snakeX == appleX && snakeY == appleY){
                tailSize--;
                appleX = Math.floor(Math.random() * gridSize);
                appleY = Math.floor(Math.random() * gridSize);
                score--;
                document.getElementById("game-score").innerHTML = "<h3>Score: " + score + "</h3>";
            }
            if(tailSize < 3){
                endGame(tailSize);
                tailSize = defaultTailSize; 
                score = 0;
            } 
        }   
    }
    }

    var canShoot;
    function drawShot(){
        if(prey){
        if(!canShoot){
            shotY = snakeY;
            shotX = snakeX;
            nextShotY = nextY;
            nextShotX = nextX;
        }
        else if(canShoot){
            shotX += nextShotX;
            shotY += nextShotY;
        }
        if(shotX < 0) {
            shotX = snakeX;
            shotY = snakeY;
            canShoot = false;
        }
        else if(shotX > gridSize - 1) {
            shotX = snakeX;
            shotY = snakeY;
            canShoot = false;
        }
        else if(shotY < 0) {
            shotX = snakeX;
            shotY = snakeY;
            canShoot = false;
        }
        else if(shotY > gridSize - 1) {
            shotX = snakeX;
            shotY = snakeY;
            canShoot = false;
        }
    }
    }



    var dposX, dposY, dnegX, dnegY;

    function keyDownEvent(e) {
        
        switch (e.keyCode) {
            case 32:
                canShoot = true;
                break;
            case 65:
            case 37:
                if (!dposX && (snakeTrail[snakeTrail.length-2].y != snakeY || (snakeTrail[0].y == snakeY && snakeTrail[0].x == snakeX))){
                    nextX = -1;
                    nextY = 0;
                    dnegX = true;
                    dnegY = false;
                    dposY = false;
                }
                break;
            case 87:
            case 38:
                if (!dposY && (snakeTrail[snakeTrail.length-2].x != snakeX || (snakeTrail[0].y == snakeY && snakeTrail[0].x == snakeX))){
                    nextX = 0;
                    nextY = -1;
                    dnegY = true;
                    dnegX = false;
                    dposX = false;
                } 
                break;
            case 68:  
            case 39:
                if (!dnegX && (snakeTrail[snakeTrail.length-2].y != snakeY || (snakeTrail[0].y == snakeY && snakeTrail[0].x == snakeX))){
                    nextX = 1;
                    nextY = 0;
                    dposX = true;
                    dnegY = false;
                    dposY = false;             
                }       
                break;
            case 83:
            case 40:
                if (!dnegY && (snakeTrail[snakeTrail.length-2].x != snakeX || (snakeTrail[0].y == snakeY && snakeTrail[0].x == snakeX))){
                    nextX = 0;
                    nextY = 1;
                    dposY = true;
                    dnegX = false;
                    dposX = false;
                }
                break;
            case 80:
            if(gameActive == true) {
                pauseGame();
            }
            else {
                gameControl = startGame(x);
            }
            break;
        }
    }






