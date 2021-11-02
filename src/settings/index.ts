const settings = {
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight
};
const $canvas = document.createElement('canvas');
$canvas.width = settings.canvasWidth;
$canvas.height = settings.canvasHeight;

const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D;

const SCALE = 85;

type iFigures = Array<{[key: string]: number | string}>
type ICoordinates = {
    desk: {
        deskFields: Array<{x: number, y: number}>
    },
    figures: {
        pawn: iFigures,
        tower: iFigures,
        queen: iFigures,
        king: iFigures,
        knight: iFigures,
        bishop: iFigures
    }
}

const coordinates: ICoordinates = {
    desk: {
        deskFields: []
    },
    figures: {
        pawn: [],
        tower: [],
        queen: [],
        king: [],
        bishop: [],
        knight: []
    }
};

export default {
    $canvas,
    ctx,
    SCALE,
    coordinates,
}
