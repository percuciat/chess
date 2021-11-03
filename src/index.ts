import './assets/style/main.css';
import canvas from './settings';
import Desk from './models/Desk';


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

}


document.body.appendChild(canvas.$canvas);
document.addEventListener('DOMContentLoaded', function () {
    const board = new Desk('white');
    board.init();
    console.log('CC', canvas.STORE_COORDINATES_FIGURES.figures)
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
