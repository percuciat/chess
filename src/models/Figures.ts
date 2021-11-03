import settingsCanvas from '../settings';

const { $canvas, SCALE, ctx, STORE_COORDINATES_FIGURES } = settingsCanvas;

type ITypeFigures = 'pawn' | 'tower' | 'knight' | 'bishop' | 'queen' | 'king';
type IPosition = {x: number, y: number}
/*
type IF = {
    nameFigure: 'pawn' | 'tower' | 'knight' | 'bishop' | 'queen' | 'king',
    position: {x: number, y: number},
    srcPicture: string,
    color: string
}*/



class Figure {
    nameFigure;
    position;
    picture;
    color;
    constructor(nameFigure: ITypeFigures, position: IPosition, srcPicture: string, color: string) {
        this.nameFigure = nameFigure;
        this.position = position;
        this.picture = srcPicture;
        this.color = color;
    }
    drawFigure(x: number, y: number){
        let pic = new Image();
        pic.src = this.picture;
        let p = this.position;
        pic.onload = function() {
            p.x = x + 20;
            p.y = y + 15;
            ctx.drawImage(pic, 0, 0, 265, 265,  p.x, p.y, 150, 110);
        };
    }
    initFigure(i: number, instanceFigure: Figure) {
        let {x, y} = STORE_COORDINATES_FIGURES.desk.deskFields[i];
        instanceFigure.drawFigure(x, y);
        let obj = {
            id: instanceFigure.nameFigure + Date.now() + i,
            x,
            y,
            name: instanceFigure.nameFigure,
            color: instanceFigure.color
        };
        STORE_COORDINATES_FIGURES.figures[instanceFigure.nameFigure].push(obj);
    }
    changePosition(x: number, y: number) {
        this.position = {x, y}
    }
}


class Pawn extends Figure{
    constructor(nameFigure: 'pawn', position: IPosition, srcPicture: string, color: string) {
        super(nameFigure, position, srcPicture, color)
    }
    movePawn() {

    }
}

class Tower extends Figure{
    constructor(nameFigure: 'tower', position: IPosition, srcPicture: string, color: string) {
        super(nameFigure, position, srcPicture, color)
    }
    moveTower() {

    }
}

class Queen extends Figure{
    constructor(nameFigure: 'queen', position: IPosition, srcPicture: string, color: string) {
        super(nameFigure, position, srcPicture, color)
    }
    moveQueen() {

    }
}

class King extends Figure{
    constructor(nameFigure: 'king', position: IPosition, srcPicture: string, color: string) {
        super(nameFigure, position, srcPicture, color)
    }
    moveKing() {

    }
}

class Knight extends Figure{
    constructor(nameFigure: 'knight', position: IPosition, srcPicture: string, color: string) {
        super(nameFigure, position, srcPicture, color)
    }
    moveKnight() {

    }
}

class Bishop extends Figure{
    constructor(nameFigure: 'bishop', position: IPosition, srcPicture: string, color: string) {
        super(nameFigure, position, srcPicture, color)
    }
    moveBishop() {

    }
}

// need update to factory
class FiguresCollection {
    pawnWhite: Pawn;
    pawnBlack: Pawn;
    towerWhite: Tower;
    towerBlack: Tower;
    queenBlack: Queen;
    queenWhite: Queen;
    kingWhite: King;
    kingBlack: King;
    knightWhite: Knight;
    knightBlack: Knight;
    bishopWhite: Bishop;
    bishopBlack: Bishop;

    constructor() {
        this.pawnWhite = new Pawn('pawn',{x: 0, y: 0}, '/src/assets/pW.png','white');
        this.pawnBlack = new Pawn('pawn',{x: 0, y: 0}, '/src/assets/pB.png', 'black');
        this.towerWhite = new Tower('tower',{x: 0, y: 0}, '/src/assets/tW1.png', 'white');
        this.towerBlack = new Tower('tower',{x: 0, y: 0}, '/src/assets/tB1.png', 'black');
        this.queenWhite = new Queen('queen',{x: 0, y: 0}, '/src/assets/qW1.png', 'white');
        this.queenBlack = new Queen('queen',{x: 0, y: 0}, '/src/assets/qB1.png', 'black');
        this.kingWhite = new King('king',{x: 0, y: 0}, '/src/assets/kingW1.png', 'white');
        this.kingBlack = new King('king',{x: 0, y: 0}, '/src/assets/kingB1.png', 'black');
        this.knightWhite = new Knight('knight',{x: 0, y: 0}, '/src/assets/kW1.png', 'white');
        this.knightBlack = new Knight('knight',{x: 0, y: 0}, '/src/assets/kB1.png', 'black');
        this.bishopWhite = new Bishop('bishop',{x: 0, y: 0}, '/src/assets/bW1.png', 'white');
        this.bishopBlack = new Bishop('bishop',{x: 0, y: 0}, '/src/assets/bB1.png', 'black');
    }

    initFigures(figure: ITypeFigures) {
        switch (figure) {
            case 'pawn':
                for (let u = 8; u <= 15; u++){
                    this.pawnBlack.initFigure(u, this.pawnBlack)
                }
                for (let u = 48; u <= 55; u++){
                    this.pawnWhite.initFigure(u, this.pawnWhite)
                }
                break;
            case 'tower':
                for (let u = 0; u <= 7; u = u + 7){
                    this.towerBlack.initFigure(u, this.towerBlack)
                }
                for (let u = 56; u <= 64; u = u + 7){
                    this.towerWhite.initFigure(u, this.towerWhite)
                }
                break;
            case 'knight':
                for (let u = 1; u <= 6; u = u + 5){
                    this.knightBlack.initFigure(u, this.knightBlack)
                }
                for (let u = 57; u <= 63; u = u + 5){
                    this.knightWhite.initFigure(u, this.knightWhite)
                }
                break;
            case 'bishop':
                for (let u = 2; u <= 5; u = u + 3){
                    this.bishopBlack.initFigure(u, this.bishopBlack)
                }
                for (let u = 58; u <= 62; u = u + 3){
                    this.bishopWhite.initFigure(u, this.bishopWhite)
                }
                break;
            case 'queen':
                this.queenBlack.initFigure(3, this.queenBlack);
                this.queenWhite.initFigure(59, this.queenWhite);
                break;
            case 'king':
                this.kingBlack.initFigure(4, this.kingBlack);
                this.kingWhite.initFigure(60, this.kingWhite);
                break;
            default: return 0
        }
    }
}


export default class IFigures {
   drawAllFigures() {
        const t = new FiguresCollection();

        for (let i in STORE_COORDINATES_FIGURES.figures){
            t.initFigures(i)
        }

   }
}



