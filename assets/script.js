/**
 * Método constructor - configuracion del juego
 * @param {*} config 
 */
function JumpingGame(config) {
    this.canvas = config.canvas;
    this.board = config.canvas.getContext("2d");
    this.typeJump = {
        "lowJump": config.lowJump,
        "mediumJump": config.mediumJump,
        "highJump": config.highJump,
    };
    this.ballRadius = config.ballRadius;
    this.widthBoard = this.canvas.width / 2;
    this.heightBoard = this.canvas.height - 30;
    this.baseHeightBoard = this.canvas.height - 30;
    this.move_y = 0;
    this.baseMaxHigh = 10;
    this.drawBall();

}
/**
 * Método para salto de pelota
 * @param {} typeJump 
 */
JumpingGame.prototype.jump = function (typeJump) {
    let properties = this.typeJump[`${typeJump}Jump`];
    this.move_y = (properties.heightIncrease * -1);
    this.drawJump(0, properties.heightIncrease * this.baseMaxHigh, false);
}
/**
 * Método para dibujar el dibujar el salto recursivamente
 * @param {*} it 
 * @param {*} limit 
 * @param {*} goDown 
 */
JumpingGame.prototype.drawJump = function (it, limit, goDown) {
    if (!goDown) {
        // salto hacia arriba
        setTimeout(() => {
            this.moveBall();
            // validar recursividad
            if (it < limit) {
                this.drawJump(it + 1, limit);
            } else {
                this.drawJump(0, limit, true);
            }
        }, 10);
    } else {
        // salto hacia abajo
        setTimeout(() => {
            this.moveBall(true);
            if (it < limit) {
                this.drawJump(it + 1, limit, true);
            }
        }, 10);
    }
}

/**
 * Método de desplazamiento de la pelota
 * @param {*} goDown 
 */
JumpingGame.prototype.moveBall = function (goDown = false) {
    this.board.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall();
    // validar cuando la pelota baja
    if (this.heightBoard + this.move_y > this.canvas.height - this.ballRadius || this.heightBoard + this.move_y < this.ballRadius || goDown) {
        this.move_y = Math.abs(this.move_y);
        // validar que la pelota no pase el piso
        if (this.heightBoard + this.move_y > this.canvas.height - this.ballRadius)
            this.move_y = Math.abs(this.move_y) * -1;

    }
    this.heightBoard += this.move_y;
}
/**
 * Método para dibujar la pelota
 */
JumpingGame.prototype.drawBall = function () {
    this.board.beginPath();
    this.board.arc(this.widthBoard, this.heightBoard, this.ballRadius, 0, Math.PI * 2);
    this.board.fillStyle = "#ecf0f1";
    this.board.fill();
    this.board.closePath();
}


//configuraciones del juego
const settings = {
    canvas: document.getElementById("boardCanvas"),
    lowJump: { heightIncrease: 3, },
    mediumJump: { heightIncrease: 4, },
    highJump: { heightIncrease: 5, },
    ballRadius: 20
};
// instancia de la función
const jpGame = new JumpingGame(settings);

// Opciones de cuando carga la página
window.onload = function () {
    document.onkeyup = checkKeyPress;
}

function checkKeyPress(event) {
    //console.log(event.which);
    if (event.which === 88) {
        jpGame.jump("low");
        console.log("letra [X] | salto 'BAJO'")
    }

    if (event.which === 32) {
        jpGame.jump("medium");
        console.log("barra espaciadora [----] | salto 'MEDIO'")
    }

    if (event.which === 38) {
        jpGame.jump("high");
        console.log("Flecha de arriba [^] | salto 'ALTO'")
    }
}