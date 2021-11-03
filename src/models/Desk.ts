import settingsCanvas from '../settings';
import Figures from './Figures';

const { $canvas, SCALE, ctx, STORE_COORDINATES_FIGURES } = settingsCanvas;
const F = new Figures();

export default class Desk {
    side: 'white' | 'black';
    constructor(side: 'white' | 'black') {
        this.side = side;
    }
    drawDesk() {

        const SCALE_WIDTH = 3.8;
        const SCALE_HEIGHT = 6;

        let x = $canvas.width / SCALE_WIDTH;
        let y = $canvas.height / SCALE_HEIGHT;
        let isWhite = true;

        for (let i = 1; i <= 72; i++) {
            x = x + SCALE;
            if (i < 65) {
                ctx.fillStyle = isWhite ? 'rgb(220, 220, 220)' : 'rgb(110, 110, 110)';
                ctx.fillRect(x, y, SCALE, SCALE);
                STORE_COORDINATES_FIGURES.desk.deskFields.push({x, y});
                isWhite = !isWhite;
                if (i % 8 === 0) {
                    x = $canvas.width / SCALE_WIDTH;
                    y = y + SCALE;
                    isWhite = !isWhite
                }
            } else {
                const alp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                const arrAlphabet = this.side === 'white' ? alp.reverse() : alp;
                let _x = x + 25;
                let _y = y + 55;
                ctx.fillStyle = 'rgb(0,0,0)';
                ctx.font = '42px serif';
                ctx.fillText(arrAlphabet[72 - i], _x, _y);
            }

        }
        return this
    }
    drawNumbersDesk() {
        const SCALE_WIDTH = 3.5;
        const SCALE_HEIGHT = 7;
        let _x = $canvas.width / SCALE_WIDTH;
        let _y = $canvas.height / SCALE_HEIGHT;
        const add = (j: number): void => {
            _y = _y + SCALE;
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.font = '42px serif';
            ctx.fillText(String(j), _x, _y);
        };
        if (this.side === 'white' ){
            for (let j = 8; j >= 1; j--){
                add(j)
            }
        } else {
            for (let j = 1; j <= 8; j++){
                add(j)
            }
        }

        return this
    }
    init() {
        this.drawDesk()
            .drawNumbersDesk();
        F.drawAllFigures()
    }
};