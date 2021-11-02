import settingsCanvas from '../settings';

const { $canvas, SCALE, ctx, coordinates } = settingsCanvas;


class Figure {
    position;
    picture;
    color;
    constructor(position: {x: number, y: number}, srcPicture: string, color: string) {
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
    changePosition(x: number, y: number) {
        this.position = {x, y}
    }
}

class Pawn extends Figure{
    readonly nameFigure = 'pawn';
    constructor(position: {x: number, y: number}, srcPicture: string, color: string) {
        super(position, srcPicture, color)
    }
    drawPawn() {

    }
    /*drawPawn(x: number, y: number) {
        let pic = new Image();
        pic.src = this.dataFigure.picture;
        let p = this.dataFigure.position;
        pic.onload = function() {
            p.x = x + 20;
            p.y = y + 15;
            ctx.drawImage(pic, 0, 0, 265, 265,  p.x, p.y, 150, 110);
        };

    }*/
}

export default class IFigures {
   drawAllFigures() {
       let pawn = new Pawn({x: 0, y: 0}, '/src/assets/pB.png','black');
       let pawnW = new Pawn({x: 0, y: 0}, '/src/assets/pW.png','white');
       function _f(i: number, instanceFigure: Pawn) {
           let {x, y} = coordinates.desk.deskFields[i];
           instanceFigure.drawFigure(x, y);
           let obj = {
               id: 'p' + Date.now(),
               x,
               y,
               name: instanceFigure.nameFigure,
               color: instanceFigure.color
           };
           console.log('coordinates.figures[instanceFigure.name]', instanceFigure.nameFigure)
            coordinates.figures[instanceFigure.nameFigure].push(obj);
       }
       for (let u = 8; u <= 15; u++){
           _f(u, pawn);
       }
       for (let u = 48; u <= 55; u++){
           _f(u, pawnW);
       }
       /*let pic = new Image();
       pic.src = '/src/assets/pB.png';
       pic.onload = function() {
           for (let u = 8; u <= 15; u++){
               let {x: xP, y: yP} = coordinates.desk.deskFields[u];
               let xFigure = xP + 20;
               let yFigure = yP + 15;
               ctx.drawImage(pic, 0, 0, 265, 265, xFigure, yFigure, 150, 110);
               coordinates.figures.pawnBlack.push({xFigure, yFigure});
           }
       };*/
      /* let picWhite = new Image();
       picWhite.src = '/src/assets/pW.png';
       picWhite.onload = function() {
           for (let u = 48; u <= 55; u++){
               let {x: xP, y: yP} = coordinates.desk.deskFields[u];
               let xFigure = xP + 20;
               let yFigure = yP + 15;
               ctx.drawImage(picWhite, 0, 0, 265, 265, xFigure, yFigure, 150, 110);
               field.saveCoordinates(xFigure, yFigure, coordinates.figures.pawnWhite)
           }
       };*/
   }
}



