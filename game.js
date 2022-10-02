class SnakeGame {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");

        document.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    init() {
        this.positionX = this.positionY = 10;
        this.appleX = this.appleY = 5;
        this.tailSize = 5;
        this.trail = [];
        this.gridSize = this.tileCount = 20;
        this.velocityX = this.velocityY = 0;
        this.stop = false;

        roundRect(this.context, 20, 40, 20, 20, 40);

        this.timer = setInterval(this.loop.bind(this), 1000 / 15);
    }

    reset() {
        clearInterval(this.timer);

        this.init();
    }

    loop() {
        this.update();

        this.draw();
    }

    update() {
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        if (this.positionX < 0) {
            this.positionX = this.tileCount - 1;
        } else if (this.positionY < 0) {
            this.positionY = this.tileCount - 1;
        } else if (this.positionX > this.tileCount - 1) {
            this.positionX = 0;
        } else if (this.positionY > this.tileCount - 1) {
            this.positionY = 0;
        }

        this.trail.forEach((t) => {
            if (
                this.positionX === t.positionX &&
                this.positionY === t.positionY
            ) {
                this.reset();
            }
        });

        this.trail.push({
            positionX: this.positionX,
            positionY: this.positionY
        });

        while (this.trail.length > this.tailSize) {
            this.trail.shift();
        }

        if (this.appleX === this.positionX && this.appleY === this.positionY) {
            this.tailSize++;

            this.appleX = Math.floor(Math.random() * this.tileCount);
            this.appleY = Math.floor(Math.random() * this.tileCount);
        }
    }

    draw() {
        this.context.fillStyle = "cornflowerblue";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "darkseagreen";
        this.trail.forEach((t) => {
            if (this.trail.indexOf(t) === this.trail.length - 1)
                this.context.fillStyle = "tomato";
            this.context.fillRect(
                t.positionX * this.gridSize,
                t.positionY * this.gridSize,
                this.gridSize - 5,
                this.gridSize - 5
            );
        });

        this.context.fillStyle = "wheat";
        this.context.fillRect(
            this.appleX * this.gridSize,
            this.appleY * this.gridSize,
            this.gridSize - 5,
            this.gridSize - 5
        );

        this.context.fillStyle = "white";
        this.context.font = "20px Cursive";
        this.context.fillText(this.tailSize - 5, 20, 40);
    }

    onKeyPress(e) {
        if (e.keyCode === 37 && this.velocityX !== 1 && this.stop === false) {
            this.velocityX = -1;
            this.velocityY = 0;
        } else if (
            e.keyCode === 38 &&
            this.velocityY !== 1 &&
            this.stop === false
        ) {
            this.velocityX = 0;
            this.velocityY = -1;
        } else if (
            e.keyCode === 39 &&
            this.velocityX !== -1 &&
            this.stop === false
        ) {
            this.velocityX = 1;
            this.velocityY = 0;
        }

        if (e.keyCode === 40 && this.velocityY !== -1 && this.stop === false) {
            this.velocityX = 0;
            this.velocityY = 1;
        }

        if (e.keyCode === 32) {
            if (this.stop === false) {
                clearInterval(this.timer);

                this.context.fillStyle = "white";
                this.context.font = "15px Courier";
                this.context.fillText(
                    "Game stopped. Press space to continue.",
                    40,
                    390
                );

                this.context.font = "20px Cursive";
                this.context.fillText("Snake Game", 270, 40);

                this.stop = true;
            } else {
                this.timer = setInterval(this.loop.bind(this), 1000 / 15);
                this.stop = false;
            }
        }
    }
}

window.onload = () => new SnakeGame().init();
