import './assets/style/main.css';
import canvas from './settings';
import Desk from './models/Desk';



// const settingsCanvas = require('./settings');
// const Desk = require('./models/Desk');

/*const settings = {
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight
};
const $canvas = document.createElement('canvas');
$canvas.width = settings.canvasWidth;
$canvas.height = settings.canvasHeight;

const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D;

let SIZE = 85;
let coordinates = {
    desk: {
        deskFields: []
    },
    figures: {
        pawnBlack: [],
        pawnWhite: [],
        towerBlack:[]
    }
};*/

/*class DeskField {
    constructor() {

    }
    drawReact(_X, _Y, sizeScale: number) {
        ctx.fillRect(_X, _Y, sizeScale, sizeScale);
        return this
    }
    fillStyle(_color) {
        ctx.fillStyle = _color;
        return this
    }
    drawText(_X, _Y, text) {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.font = '42px serif';
        ctx.fillText(text, _X, _Y);
        return this
    }
    drawPicture(src: string) {

    }
    saveCoordinates(_X, _Y, arr: Array<any>) {
        arr.push({
            x: _X,
            y: _Y
        });
        return this
    }
}*/

/*class Desk {
    hCanvas: number;
    wCanvas: number;
    scaleCanvas: number;
    side: string;
    field = new DeskField();
    constructor(hCanvas, wCanvas, scaleCanvas, side) {
        this.hCanvas = hCanvas;
        this.wCanvas = wCanvas;
        this.scaleCanvas = scaleCanvas;
        this.side = side;
    }
    drawDesk() {
        const color = {
            black: 'rgb(110, 110, 110)',
            white: 'rgb(220, 220, 220)'
        };
        const SCALE_WIDTH = 3.8;
        const SCALE_HEIGHT = 6;

        let x = this.wCanvas / SCALE_WIDTH;
        let y = this.hCanvas / SCALE_HEIGHT;
        let isWhite = true;

        for (let i = 1; i <= 72; i++) {
            x = x + this.scaleCanvas;
            if (i < 65) {
                this.field.fillStyle(isWhite ? color.white : color.black)
                    .drawReact(x, y, this.scaleCanvas)
                    .saveCoordinates(x, y, coordinates.desk.deskFields);
                isWhite = !isWhite;
                if (i % 8 === 0) {
                    x = this.wCanvas / SCALE_WIDTH;
                    y = y + this.scaleCanvas;
                    isWhite = !isWhite
                }
            } else {
                const arrAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse();
                let _x = x + 25;
                let _y = y + 55;
                this.field.drawText(_x, _y, arrAlphabet[72 - i])
            }

        }
        return this
    }
    drawNumbersDesk() {
        const SCALE_WIDTH = 3.5;
        const SCALE_HEIGHT = 7;
        let XX = this.wCanvas / SCALE_WIDTH;
        let YY = this.hCanvas / SCALE_HEIGHT;
        for (let j = 8; j >= 1; j--){
            YY = YY + this.scaleCanvas;
            this.field.drawText(XX, YY, j)
        }
        return this
    }
    init() {
        this.drawDesk()
            .drawNumbersDesk()
    }
}*/

function drawDesk (h: number, w: number, sizeScale: number) {
    // данные функции модуль
    const color = {
        black: 'rgb(110, 110, 110)',
        white: 'rgb(220, 220, 220)'
    };


    let x = w / 3.8;
    let y = h / 6;

    // отдельный модуль
    const field = new DeskField();

    const arrAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse();
    let isWhite = true;
    for (let i = 1; i <= 72; i++) {
        x = x + sizeScale;
        if (i < 65) {
            field.fillStyle(isWhite ? color.white : color.black)
                .drawReact(x, y, sizeScale)
                .saveCoordinates(x, y, coordinates.desk.deskFields);
            isWhite = !isWhite;
            if(i % 8 === 0) {
                x = w / 3.8;
                y = y + sizeScale;
                isWhite = !isWhite
            }
        }
        else {
            // alphabet
            let _x = x + 25;
            let _y = y + 55;
            field.drawText(_x, _y, arrAlphabet[72 - i])
        }
    }


    // отдельный модуль
    // numbers fields
    let XX = w / 3.5;
    let YY = h / 7;
    for (let j = 8; j >= 1; j--){
        YY = YY + sizeScale;
        field.drawText(XX, YY, j)
    }

    // отдельный модуль

   /* let pic = new Image();
    pic.src = '/src/assets/pB.png';
    pic.onload = function() {
        for (let u = 8; u <= 15; u++){
            let {x: xP, y: yP} = coordinates.desk.deskFields[u];
            let xFigure = xP + 20;
            let yFigure = yP + 15;
            ctx.drawImage(pic, 0, 0, 265, 265, xFigure, yFigure, 150, 110);
            field.saveCoordinates(xFigure, yFigure, coordinates.figures.pawnBlack)
        }
    };

    let picWhite = new Image();
    picWhite.src = '/src/assets/pW.png';
    picWhite.onload = function() {
        for (let u = 48; u <= 55; u++){
            let {x: xP, y: yP} = coordinates.desk.deskFields[u];
            let xFigure = xP + 20;
            let yFigure = yP + 15;
            ctx.drawImage(picWhite, 0, 0, 265, 265, xFigure, yFigure, 150, 110);
            field.saveCoordinates(xFigure, yFigure, coordinates.figures.pawnWhite)
        }
    };


    let picBlackTower = new Image();
    picBlackTower.src = '/src/assets/tB1.png';
    picBlackTower.onload = function() {
        for (let u = 0; u <= 7; u= u + 7){
            let {x: xP, y: yP} = coordinates.desk.deskFields[u];
            let xFigure = xP + 20;
            let yFigure = yP + 15;
            ctx.drawImage(picBlackTower, 0, 0, 265, 265, xFigure, yFigure, 150, 110);
            field.saveCoordinates(xFigure, yFigure, coordinates.figures.towerBlack)
        }
    };

    let picWhiteTower = new Image();
    picWhiteTower.src = '/src/assets/tW1.png';
    picWhiteTower.onload = function() {
        for (let u = 56; u <= 64; u= u + 7){
            let {x: xP, y: yP} = coordinates.desk.deskFields[u];
            let xFigure = xP + 20;
            let yFigure = yP + 15;
            ctx.drawImage(picWhiteTower, 0, 0, 265, 265, xFigure, yFigure, 150, 110);
            field.saveCoordinates(xFigure, yFigure, coordinates.figures.towerBlack)
        }
    };

    console.log('coordinates', coordinates)*/
}


document.body.appendChild(canvas.$canvas);
document.addEventListener('DOMContentLoaded', function () {
    const board = new Desk('white');
    board.init();
    console.log('CC', canvas.coordinates.figures)
    //drawDesk(settingsCanvas.$canvas.height, settingsCanvas.$canvas.width, settingsCanvas.SCALE)
});

/*
const WorkerW = require('./models/Worker');
const List = require('./dom/List');


const WorkerSimple = new WorkerW();

const $List = new List('ul', 'log-list');

const getString = <T extends {[key: string]: string}>(a: T ) => a.city

$List.insertThisElemIntoDOM('.log');
for (let r = 0; r < 4; r++) {
    $List.createChild('li', 'log-list__item', getString({city: 'London'}))
}

type IObj = {[key: string]: string | number}

function f<T extends IObj, U extends keyof IObj>(obj: T, key: U): T[U] {
    return obj[key]
}

console.log(f({age: 22, phone: 'Gar'}, 'age'));


type R = { a: number }

type MyType<T> = T extends infer R ? R : never;

let j : MyType<boolean> = true


console.log('JJ', j)
*/
