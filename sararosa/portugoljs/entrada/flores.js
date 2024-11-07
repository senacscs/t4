'use strict';

//---

console.clear();

//---

let w = 0;
let h = 0;
let initialWidth = w;
let initialHeight = h;

let animationFrame = null;
let isTouchDevice = false;

const canvas = document.createElement( 'canvas' );
const context = canvas.getContext( '2d', { willReadFrequently: true, alpha: false } );

let imageData = null;
let data = null;

const center = { x: w / 2, y: h / 2 };
const border = { left: 1, top: 1, right: w, bottom: h };

let pointerPos = { x: center.x, y: center.y };
let pointerDownButton = -1;
let pointerMoveTimeout;

const pointerMoveTimeoutTime = 2500;

//---

const dotColorR = 25;
const dotColorG = 155;
const dotColorB = 0;
const dotColorA = 255;
const dotsRadius = 4;
const dotsDistance = 10;
const dotDistanceInit = 10000000;
const dotsDiameter = dotsRadius * 2;
const dotsSpeed = 10;
const dotsWobbleFactor = 0.95;
const dotsWobbleSpeed = 0.05;
const dotsMaxEscapeRouteLengthBasis = 100;
let dotsMaxEscapeRouteLength = 100;
const dotsMouseDistanceSensitivitySpeed = 5;
const dotsMouseDistanceSensitivityMax = 250;
const dotsMouseDistanceSensitivityMinBasis = 100;
let dotsMouseDistanceSensitivityMin = 100;
let dotsMouseDistanceSensitivity = dotsMouseDistanceSensitivityMin;
let dotsHolder = [];
let dotsCount = 0;
const dotsMinPositionOffset = 0;
const dotsMaxPositionOffset = 10;

let introPath = [];
let introInterval = null;
let introIndex = 0;
let introPathCoordinatesCount = 256;
let introSpeedBasis = 10;
let introSpeed = introSpeedBasis;

let bloomBackgroundImage = null;
let bloomHolder = [];
const bloomColors = [

    { 
        petalColors: [
            { r: 215, g: 157, b: 0, a: 1.00 },
            { r: 250, g: 221, b: 5, a: 1.00 },
        ],
        centerColors: [
            { r: 27, g: 9, b: 0, a: 1.00 },
            { r: 101, g: 32, b: 0, a: 1.00 },
            { r: 74, g: 26, b: 0, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 226, g: 209, b: 240, a: 1.00 },
            { r: 247, g: 107, b: 239, a: 1.00 },
        ],
        centerColors: [
            { r: 157, g: 103, b: 19, a: 1.00 },
            { r: 123, g: 72, b: 12, a: 1.00 },
            { r: 33, g: 11, b: 11, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 193, g: 2, b: 16, a: 1.00 },
            { r: 247, g: 48, b: 24, a: 1.00 },
            { r: 250, g: 76, b: 27, a: 1.00 },
        ],
        centerColors: [
            { r: 80, g: 52, b: 30, a: 1.00 },
            { r: 65, g: 36, b: 19, a: 1.00 },
            { r: 54, g: 3, b: 2, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 206, g: 213, b: 224, a: 1.00 },
            { r: 194, g: 195, b: 215, a: 1.00 },
            { r: 220, g: 224, b: 239, a: 1.00 },
        ],
        centerColors: [
            { r: 239, g: 211, b: 104, a: 1.00 },
            { r: 205, g: 165, b: 31, a: 1.00 },
            { r: 192, g: 193, b: 35, a: 1.00 },
            { r: 145, g: 149, b: 0, a: 1.00 },
            { r: 83, g: 86, b: 24, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 61, g: 24, b: 116, a: 1.00 },
            { r: 70, g: 26, b: 130, a: 1.00 },
            { r: 93, g: 84, b: 210, a: 1.00 },
            { r: 102, g: 110, b: 241, a: 1.00 },
            { r: 107, g: 115, b: 249, a: 1.00 },
            { r: 89, g: 96, b: 235, a: 1.00 },
            { r: 67, g: 76, b: 232, a: 1.00 },
        ],
        centerColors: [
            { r: 0, g: 4, b: 14, a: 1.00 },
            { r: 34, g: 31, b: 89, a: 1.00 },
            { r: 73, g: 68, b: 156, a: 1.00 },
            { r: 46, g: 29, b: 118, a: 1.00 },
            { r: 23, g: 9, b: 55, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 35, g: 42, b: 99, a: 1.00 },
            { r: 63, g: 86, b: 208, a: 1.00 },
            { r: 112, g: 180, b: 252, a: 1.00 },
            { r: 82, g: 146, b: 252, a: 1.00 },
        ],
        centerColors: [
            { r: 146, g: 146, b: 123, a: 1.00 },
            { r: 101, g: 99, b: 86, a: 1.00 },
            { r: 71, g: 67, b: 61, a: 1.00 },
            { r: 60, g: 56, b: 53, a: 1.00 },
            { r: 36, g: 28, b: 59, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 255, g: 180, b: 9, a: 1.00 },
            { r: 245, g: 148, b: 3, a: 1.00 },
            { r: 235, g: 120, b: 4, a: 1.00 },
            { r: 233, g: 106, b: 6, a: 1.00 },
            { r: 239, g: 119, b: 7, a: 1.00 },
            { r: 246, g: 145, b: 9, a: 1.00 },
        ],
        centerColors: [
            { r: 206, g: 154, b: 12, a: 1.00 },
            { r: 232, g: 162, b: 8, a: 1.00 },
            { r: 241, g: 151, b: 2, a: 1.00 },
            { r: 247, g: 161, b: 3, a: 1.00 },
            { r: 223, g: 123, b: 0, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 255, g: 252, b: 221, a: 1.00 },
            { r: 247, g: 246, b: 244, a: 1.00 },
            { r: 255, g: 245, b: 255, a: 1.00 },
        ],
        centerColors: [
            { r: 255, g: 185, b: 4, a: 1.00 },
            { r: 232, g: 165, b: 0, a: 1.00 },
            { r: 220, g: 160, b: 4, a: 1.00 },
            { r: 197, g: 150, b: 8, a: 1.00 },
            { r: 201, g: 171, b: 119, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 254, g: 221, b: 22, a: 1.00 },
            { r: 231, g: 186, b: 0, a: 1.00 },
            { r: 243, g: 213, b: 21, a: 1.00 },
            { r: 227, g: 180, b: 0, a: 1.00 },
            { r: 224, g: 191, b: 26, a: 1.00 },
        ],
        centerColors: [
            { r: 255, g: 255, b: 191, a: 1.00 },
            { r: 247, g: 239, b: 94, a: 1.00 },
            { r: 245, g: 224, b: 11, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 207, g: 31, b: 166, a: 1.00 },
            { r: 210, g: 10, b: 181, a: 1.00 },
            { r: 218, g: 38, b: 205, a: 1.00 },
            { r: 248, g: 0, b: 198, a: 1.00 },
            { r: 192, g: 35, b: 153, a: 1.00 },
        ],
        centerColors: [
            { r: 247, g: 173, b: 252, a: 1.00 },
            { r: 245, g: 144, b: 224, a: 1.00 },
            { r: 223, g: 114, b: 199, a: 1.00 },
            { r: 230, g: 89, b: 219, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 123, g: 143, b: 255, a: 1.00 },
            { r: 119, g: 128, b: 153, a: 1.00 },
            { r: 118, g: 127, b: 248, a: 1.00 },
            { r: 89, g: 112, b: 252, a: 1.00 },
            { r: 79, g: 101, b: 200, a: 1.00 },
        ],
        centerColors: [
            { r: 96, g: 70, b: 206, a: 1.00 },
            { r: 50, g: 37, b: 153, a: 1.00 },
            { r: 65, g: 83, b: 255, a: 1.00 },
            { r: 96, g: 70, b: 206, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 107, g: 3, b: 0, a: 1.00 },
            { r: 143, g: 1, b: 15, a: 1.00 },
            { r: 187, g: 14, b: 0, a: 1.00 },
            { r: 215, g: 24, b: 40, a: 1.00 },
            { r: 237, g: 41, b: 53, a: 1.00 },
        ],
        centerColors: [
            { r: 141, g: 89, b: 75, a: 1.00 },
            { r: 77, g: 40, b: 14, a: 1.00 },
            { r: 78, g: 22, b: 5, a: 1.00 },
            { r: 54, g: 5, b: 11, a: 1.00 },
        ], 
    },

    { 
        petalColors: [
            { r: 219, g: 158, b: 43, a: 1.00 },
            { r: 212, g: 140, b: 38, a: 1.00 },
            { r: 207, g: 126, b: 34, a: 1.00 },

        ],
        centerColors: [
            { r: 111, g: 53, b: 15, a: 1.00 },
            { r: 238, g: 191, b: 53, a: 1.00 },
            { r: 236, g: 177, b: 59, a: 1.00 },

        ], 
    },

    { 
        petalColors: [
            { r: 234, g: 206, b: 184, a: 1.00 },
            { r: 215, g: 141, b: 140, a: 1.00 },
            { r: 196, g: 47, b: 85, a: 1.00 },
            { r: 178, g: 37, b: 45, a: 1.00 },

        ],
        centerColors: [
            { r: 116, g: 65, b: 0, a: 1.00 },
            { r: 232, g: 186, b: 75, a: 1.00 },
            { r: 229, g: 194, b: 126, a: 1.00 },

        ], 
    },

    { 
        petalColors: [
            { r: 254, g: 252, b: 240, a: 1.00 },
            { r: 242, g: 247, b: 241, a: 1.00 },

        ],
        centerColors: [
            { r: 238, g: 238, b: 42, a: 1.00 },
            { r: 234, g: 209, b: 31, a: 1.00 },
            { r: 179, g: 166, b: 28, a: 1.00 },

        ], 
    },

    { 
        petalColors: [
            { r: 57, g: 36, b: 129, a: 1.00 },
            { r: 129, g: 113, b: 188, a: 1.00 },
            { r: 171, g: 173, b: 224, a: 1.00 },
            { r: 241, g: 233, b: 255, a: 1.00 },

        ],
        centerColors: [
            { r: 21, g: 10, b: 76, a: 1.00 },
            { r: 51, g: 34, b: 105, a: 1.00 },
            { r: 80, g: 62, b: 120, a: 1.00 },

        ], 
    },

];

//---

function init() {

    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    //---

    if ( isTouchDevice === true ) {

        canvas.addEventListener( 'touchmove', cursorMoveHandler, false );
        canvas.addEventListener( 'touchend', cursorLeaveHandler, false );
        canvas.addEventListener( 'touchcancel ', cursorLeaveHandler, false );

    } else {

        canvas.addEventListener( 'pointermove', cursorMoveHandler, false );
        canvas.addEventListener( 'pointerdown', cursorDownHandler, false );
        canvas.addEventListener( 'pointerup', cursorUpHandler, false );
        canvas.addEventListener( 'pointerleave', cursorLeaveHandler, false );

    }

    //---

    const entrada = document.getElementById("entrada");

    const innerWidth = window.innerWidth || document.documentElement.clientWidth || entrada.clientWidth;
    const innerHeight = window.innerHeight || document.documentElement.clientHeight || entrada.clientHeight;

    const bloomCount = Math.max( Math.min( Math.round( ( innerWidth * innerHeight ) * 0.000282 ), 512 ), 128 );

    createBloomBackground();
    createBlooms( bloomCount );

    //---

    entrada.appendChild( canvas );

    window.addEventListener( 'resize', onResize, false );

    restart();

}

function onResize( event ) {
    
    restart();

}

function restart() {

    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    w = innerWidth;
    h = innerHeight;

    //---

    canvas.width = w;
    canvas.height = h;

    imageData = context.getImageData( 0, 0, w, h );
    data = imageData.data;
    
    //---
    
    center.x = w / 2;
    center.y = h / 2;
    
    pointerPos.x = -10000;
    pointerPos.y = -10000;
    
    border.right = w;
    border.bottom = h;

    //---

    removeDots();
    addDots();

    //---
    
    if ( animationFrame != null ) {
    
        cancelAnimFrame( animationFrame );
    
    }
    
    render();

    //---

    initIntroPath( introPathCoordinatesCount );
    stopIntro();
    playIntro();

}

//---

function createBloomBackground( w = 128, h = 128 ) {

    const canvas = document.createElement( 'canvas' );

    canvas.width = w;
    canvas.height = h;

    const context = canvas.getContext( '2d' );
    const imageData = context.getImageData( 0, 0, w, h );
    const data = imageData.data;

    //---

    for ( let i = 0, l = data.length; i < l; i += 4 ) {

        data[ i ] = Math.floor( Math.random() * 25 ) + 25;
        data[ i + 1 ] = Math.floor( Math.random() * 40 ) + 60;
        data[ i + 2 ] = Math.floor( Math.random() * 5 ) + 5;
        data[ i + 3 ] = 255;

    }

    context.putImageData( imageData, 0, 0 );

    //---

    bloomBackgroundImage= new Image();
    bloomBackgroundImage.src = canvas.toDataURL();

}

//---

function createBlooms( count = 512 ) {

    bloomHolder = [];

    //---

    for ( let i = 0, l = count; i < l; i++ ) {

        const colors = bloomColors[ Math.floor( Math.random() * bloomColors.length ) ];
        const diameter = Math.ceil( Math.random() * 15 + 15 );
        const radius = diameter * 0.5;
        const numPetals = Math.floor( Math.random() * 7 + 4 );

        const bloom = {

            diameter,
            radius,
            numPetals,
            petalLength: radius * 0.5,
            petalWidth: radius / numPetals ,
            petalColors: colors.petalColors,
            centerColors: colors.centerColors,
            image: null,

        };

        bloom.image = createBloomImage( bloom.diameter, bloom.radius, bloom.numPetals, bloom.petalLength, bloom.petalWidth, bloom.petalColors, bloom.centerColors );

        bloomHolder.push( bloom );

    }

}

function createBloomImage( diameter, radius, numPetals, petalLength, petalWidth, petalColors, centerColors ) {

    const centerX = radius;
    const centerY = radius;

    const canvas = document.createElement( 'canvas' );

    canvas.width = diameter;
    canvas.height = diameter;

    const context = canvas.getContext( '2d' );

    //----

    const addShadowBackground = () => {

        const gradient = context.createRadialGradient( centerX, centerY, 0, centerX, centerY, radius );
        
        gradient.addColorStop( 0.55, getRGBA( 0, 0, 0, 255 ) );
        gradient.addColorStop( 1.00, getRGBA( 0, 0, 0, 0 ) );

        context.fillStyle = gradient;
        context.beginPath();
        context.arc( centerX, centerY, radius, 0, Math.PI * 2 );
        context.fill();

    };

    const addPetals = ( startAngle = 0, offsetAngle = 0 ) => {

        const petalColorsVariant = [];

        for ( let i = 0, l = petalColors.length; i < l; i++ ) {

            const rgba = petalColors[ i ];
            const rgbaVariant = addColorVariance( rgba, 40 );

            petalColorsVariant.push( rgbaVariant );

        }
        
        for ( let i = 0; i < numPetals; i++ ) {

            const petalLengthGradientOffset = Math.random() * 0.2 + 0.8;
            const petalLengthOffset = Math.random() * ( radius * 0.08 );

            const angle = startAngle + ( i * Math.PI * 2 ) / numPetals + offsetAngle;

            const x = centerX + Math.cos( angle ) * petalLength;
            const y = centerY + Math.sin( angle ) * petalLength;

            const xp = centerX + Math.cos( angle ) * petalLength * petalLengthGradientOffset;
            const yp = centerY + Math.sin( angle ) * petalLength * petalLengthGradientOffset;

            const gradientRadiusRandomOffsetInner = Math.random() * 0.33 + 0.25;
            const gradientRadiusRandomOffsetOuter = Math.random() * 0.25 + 0.75;

            const gradient = context.createRadialGradient( xp, yp, petalWidth * gradientRadiusRandomOffsetInner, xp, yp, radius * gradientRadiusRandomOffsetOuter );

            for ( let j = 0, l = petalColorsVariant.length; j < l; j++ ) {
                
                const rgba = petalColorsVariant[ j ];
                const rgbaVariant = addColorVariance( rgba, 10 );

                gradient.addColorStop( j / l, getRGBA( rgbaVariant.r, rgbaVariant.g, rgbaVariant.b, rgbaVariant.a ) );

            }

            context.fillStyle = gradient;
            context.beginPath();
            context.ellipse( x, y, petalLength - petalLengthOffset, petalWidth, angle, 0, Math.PI * 2 );
            context.fill();

        }

    };

    const addCenter = () => {

        const radiusInnerRandomOffset = Math.random() * 0.2 + 0.4;
        const radiusInner = radius * radiusInnerRandomOffset;
        
        const gradient = context.createRadialGradient( centerX, centerY, 0, centerX, centerY, radiusInner );
        
        for ( let j = 0, l = centerColors.length + 1; j < l; j++ ) {

            const rgba = j < l - 1 ? centerColors[ j ] : centerColors[ j - 1];
            const rgbaVariant = addColorVariance( rgba, 16 );
            const a = j < l - 1 ? rgbaVariant.a : 0;

            gradient.addColorStop( j / l, getRGBA( rgbaVariant.r, rgbaVariant.g, rgbaVariant.b, a ) );

        }

        context.fillStyle = gradient;
        context.beginPath();
        context.arc( centerX, centerY, radiusInner, 0, Math.PI * 2 );
        context.fill();

    };

    //---

    const randomPetalsStartAngle = Math.random() * ( Math.PI * 2 );

    addShadowBackground();

    addPetals( randomPetalsStartAngle, 0 );
    addPetals( randomPetalsStartAngle, Math.PI / numPetals );

    addCenter();

    //---

    const img = new Image();

    img.src = canvas.toDataURL();

    return img;

}

function addColorVariance( color, variance ) {

    const clamp = ( value, min, max ) => {

        return Math.min( Math.max( value, min ), max );

    }

    return {

        r: clamp( color.r + Math.floor( Math.random() * variance * 2 - variance ), 0, 255 ),
        g: clamp( color.g + Math.floor( Math.random() * variance * 2 - variance ), 0, 255 ),
        b: clamp( color.b + Math.floor( Math.random() * variance * 2 - variance ), 0, 255 ),
        a: 1,

    };

}

function getRGBA( r, g, b, a ) {

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

}

//---

function addDots() {

    const dotsPerRow = Math.floor( w / ( dotsDiameter + dotsDistance ) ) + dotsDiameter * 2;
    const dotsPerColumn = Math.floor( h / ( dotsDiameter + dotsDistance ) ) + dotsDiameter * 2;
    const dotsCount = dotsPerRow * dotsPerColumn;

    const xs = -dotsDiameter;
    const ys = -dotsDiameter;

    for ( let i = 0; i < dotsPerColumn; i++ ) {

        for ( let j = 0; j < dotsPerRow; j++ ) {

            const offsetX = ( Math.random() < 0.5 ? -1 : 1 ) * Math.round( Math.random() * ( dotsMaxPositionOffset - dotsMinPositionOffset ) + dotsMinPositionOffset );
            const offsetY = ( Math.random() < 0.5 ? -1 : 1 ) * Math.round( Math.random() * ( dotsMaxPositionOffset - dotsMinPositionOffset ) + dotsMinPositionOffset );

            const x = xs + j * ( dotsDistance + dotsDiameter ) + offsetX;
            const y = ys + i * ( dotsDistance + dotsDiameter ) + offsetY;

            const dot = addDot( x, y, dotsRadius, dotsDiameter, dotColorR, dotColorG, dotColorB, dotColorA );

            dotsHolder.push( dot );

        }

    }

}

function addDot( x, y, radius, diameter, r, g, b, a ) {

    const rgbaVariant = addColorVariance( { r, g, b, a }, 32 );

    const dot = {};

    dot.cx = x;
    dot.cy = y;
    dot.x = x;
    dot.y = y;
    dot.sx = 0;
    dot.sy = 0;
    dot.color = {};
    dot.color.r = rgbaVariant.r;
    dot.color.g = rgbaVariant.g;
    dot.color.b = rgbaVariant.b;
    dot.color.a = a;
    dot.colorDark = {};
    dot.colorDark.r = Math.floor( r * 0.45 );
    dot.colorDark.g = Math.floor( g * 0.45 );
    dot.colorDark.b = Math.floor( b * 0.45 );
    dot.colorDark.a = a;
    dot.colorDraw = {};
    dot.colorDraw.r = r;
    dot.colorDraw.g = g;
    dot.colorDraw.b = b;
    dot.colorDraw.a = a;
    dot.activeTime = 0;
    dot.distance = 0;
    dot.bloom = bloomHolder[ Math.floor( Math.random() * bloomHolder.length ) ];
    dot.radius = dot.bloom.radius;
    dot.r = dot.bloom.radius;
    dot.minRadius = dot.bloom.radius * 0.75;
    dot.maxRadius = dot.bloom.radius * 2.5;
    dot.diameter = dot.bloom.diameter;

    return dot;

}

function removeDots() {

    if ( dotsHolder.length > 0 ) {

        dotsHolder = [];
    
    }

}

//---

function initIntroPath( numPoints ) {

    introPath = [];

    const radiusX = w / 4;
    const radiusY = h / 3;
    const centerX = w / 2;
    const centerY = h / 2;

    for ( let i = 0; i < numPoints; i++ ) {

        const angle = ( i / numPoints ) * 2 * Math.PI;
        const x = centerX + radiusX * Math.cos( angle );
        const y = centerY + radiusY * Math.sin( 2 * angle ) / 2;
        
        introPath.push( { x, y } );

    }

}

function playIntro() {

    introInterval = setInterval( () => {

        const pos = introPath[ introIndex ];

        pointerPos = pos;

        introIndex++;

        if ( introIndex >= introPath.length - 1 ) {

            introIndex = 0;

        }

    }, introSpeed );

}

function stopIntro() {

    clearTimeout( pointerMoveTimeout );

    if ( introInterval !== null ) {

        clearInterval( introInterval );
        
        introInterval = null;

    }

}

//---

function cursorDownHandler( event ) {

    pointerDownButton = event.button;

}

function cursorUpHandler( event ) {

    pointerDownButton = -1;

}

function cursorLeaveHandler( event ) {

    pointerPos = { x: -10000, y: -10000 };
    pointerDownButton = -1;

}

function cursorMoveHandler( event ) {

    stopIntro();

    //---

    clearTimeout( pointerMoveTimeout );

    pointerMoveTimeout = setTimeout( () => {

        playIntro();

    }, pointerMoveTimeoutTime );

    //---

    pointerPos = getCursorPosition( canvas, event );

}

function getCursorPosition( element, event ) {

    const rect = element.getBoundingClientRect();
    const position = { x: 0, y: 0 };

    if ( event.type === 'mousemove' || event.type === 'pointermove' ) {

        position.x = event.pageX - rect.left; //event.clientX
        position.y = event.pageY - rect.top; //event.clientY

    } else if ( event.type === 'touchmove' ) {

        position.x = event.touches[ 0 ].pageX - rect.left;
        position.y = event.touches[ 0 ].pageY - rect.top;

    }

    return position;

}

//---

function clearImageData() {

    for ( let i = 0, l = data.length; i < l; i += 4 ) {

        data[ i ] = 0;
        data[ i + 1 ] = 0;
        data[ i + 2 ] = 0;
        data[ i + 3 ] = 0;

    }

}

function setPixel( x, y, r, g, b, a ) {

    const i = ( x + y * imageData.width ) * 4;

    data[ i ] = r;
    data[ i + 1 ] = g;
    data[ i + 2 ] = b;
    data[ i + 3 ] = a;

}

//---

function drawLine( x1, y1, x2, y2, r, g, b, a ) {

    const dx = Math.abs( x2 - x1 );
    const dy = Math.abs( y2 - y1 );

    const sx = ( x1 < x2 ) ? 1 : -1;
    const sy = ( y1 < y2 ) ? 1 : -1;

    let err = dx - dy;

    let lx = x1;
    let ly = y1;    

    while ( true ) {

        if ( lx > 0 && lx < w && ly > 0 && ly < h ) {

            setPixel( lx, ly, r, g, b, a );

        }

        if ( lx === x2 && ly === y2 ) {
        
            break;
        
        }

        const e2 = 2 * err;

        if ( e2 > -dx ) { 

            err -= dy; 
            lx += sx; 

        }

        if ( e2 < dy ) { 

            err += dx; 
            ly += sy; 

        }

    }

}

//---

function drawCircle( x, y, radius, r, g, b, a ) {

    const left = border.left;
    const right = border.right;
    const top = border.top;
    const bottom = border.bottom;
    
    if ( radius === 1 ) {

        if ( x > left && x < right && y > top && y < bottom ) {

            setPixel( x | 0, y | 0, r, g, b, a );

        }

        return;

    }

    const radiusSquared = radius * radius;
    const xStart = Math.max( x - radius, left );
    const xEnd = Math.min( x + radius, right );
    const yStart = Math.max( y - radius, top );
    const yEnd = Math.min( y + radius, bottom );

    for ( let x2d = xStart; x2d < xEnd; x2d++ ) {
        
        for ( let y2d = yStart; y2d < yEnd; y2d++ ) {

            const aa = x - x2d;
            const bb = y - y2d;
            const distanceSquared = aa * aa + bb * bb;

            if ( distanceSquared <= radiusSquared ) {

                setPixel( x2d | 0, y2d | 0, r, g, b, a );

            }

        }

    }

}

//---

function draw() {

    dotsMouseDistanceSensitivity = Math.min( dotsMouseDistanceSensitivityMax, Math.max( dotsMouseDistanceSensitivityMin, dotsMouseDistanceSensitivity + ( pointerDownButton === 0 ? dotsMouseDistanceSensitivitySpeed : -dotsMouseDistanceSensitivitySpeed ) ) );

    //---

    const l = dotsHolder.length;

    for ( let i = 0; i < l; i++ ) {

        const dot = dotsHolder[ i ];
        
        //---

        const a = pointerPos.x - dot.cx;
        const b = pointerPos.y - dot.cy;

        const dotActive = a * a + b * b <= dotsMouseDistanceSensitivity * dotsMouseDistanceSensitivity;

        if ( dotActive === true ) {

            const distX = pointerPos.x - dot.cx;
            const distY = pointerPos.y - dot.cy;

            dot.distance = Math.sqrt( distX * distX + distY * distY );

            //---

            const angle = Math.atan2( distY, distX );

            const dirX = Math.cos( angle ) * -1;
            const dirY = Math.sin( angle ) * -1;

            const targetPosX = dot.cx + dirX * dotsMaxEscapeRouteLength;
            const targetPosY = dot.cy + dirY * dotsMaxEscapeRouteLength;
            
            //---

            dot.x += ( targetPosX - dot.x ) / dotsSpeed;
            dot.y += ( targetPosY - dot.y ) / dotsSpeed;
            
            //---

            dot.activeTime = 1;

        } else {

            dot.distance = dotDistanceInit;  

            //---

            dot.activeTime -= 0.005;

            //---
            
            if ( dot.activeTime > -2 ) {

                dot.sx = dot.sx * dotsWobbleFactor + ( dot.cx - dot.x ) * dotsWobbleSpeed;
                dot.sy = dot.sy * dotsWobbleFactor + ( dot.cy - dot.y ) * dotsWobbleSpeed;

                dot.x = Math.round( dot.x + dot.sx );
                dot.y = Math.round( dot.y + dot.sy );

            }

        }

        //---

        if ( dot.distance === dotDistanceInit ) {

            dot.colorDraw.r = dot.color.r;
            dot.colorDraw.g = dot.color.g;
            dot.colorDraw.b = dot.color.b;

            dot.r = dot.radius;

        } else {

            const brightness = dot.distance / dotsMouseDistanceSensitivity;
            const clampedBrightness = Math.max( 0, Math.min( 1, brightness ) );
            // const invertedBrightness = 1 - clampedBrightness;
            const invertedBrightness = ( 1 - clampedBrightness ) * 0.33;

            dot.colorDraw.r = dot.color.r + ( 255 - dot.color.r ) * invertedBrightness;
            dot.colorDraw.g = dot.color.g + ( 255 - dot.color.g ) * invertedBrightness;
            dot.colorDraw.b = dot.color.b + ( 255 - dot.color.b ) * invertedBrightness;

            dot.r = dot.minRadius + ( dot.maxRadius - dot.minRadius ) * ( 1 - clampedBrightness );

        }
    
        //---
        
        if ( dot.activeTime > 0 ) {

            drawCircle( dot.cx, dot.cy, dot.r * 0.5, dot.colorDark.r, dot.colorDark.g, dot.colorDark.b, dot.colorDark.a );

        }

    }
    
    dotsHolder = dotsHolder.sort( ( a, b ) => {

        return ( b.distance - a.distance );

    } );

    for ( let i = 0; i < l; i++ ) {

        const dot = dotsHolder[ i ];

        if ( dot.activeTime > 0 ) {

            drawLine( dot.cx, dot.cy, dot.x | 0, dot.y | 0, dot.colorDraw.r, dot.colorDraw.g, dot.colorDraw.b, dot.color.a );

        }

    }

}

//---

function render( timestamp ) {

    const pattern = context.createPattern( bloomBackgroundImage, 'repeat' );

    context.fillStyle = pattern;
    context.fillRect( 0, 0, w, h );

    //---

    imageData = context.getImageData( 0, 0, w, h );
    data = imageData.data;

    //---

    draw();

    //---

    context.putImageData( imageData, 0, 0 );

    //---

    for ( let i = 0; i < dotsHolder.length; i++ ) {

        const dot = dotsHolder[ i ];

        const x = ( dot.x - dot.r ) | 0;
        const y = ( dot.y - dot.r ) | 0;

        const d1 = ( dot.r * 2 ) | 0;
        const d2 = dot.diameter | 0;
        
        if ( dot.activeTime > 0 ) {

            context.drawImage( dot.bloom.image, 0, 0, dot.diameter, dot.diameter, x, y, d1, d1 );

        } else {

            context.drawImage( dot.bloom.image, 0, 0, d2, d2, x, y, d2, d2 );

        }

    }

    //---
    // grayscale

    if ( pointerDownButton === 1 ) {

        imageData = context.getImageData( 0, 0, w, h );
        data = imageData.data;

        for ( let i = 0; i < data.length; i += 4 ) {

            const r = data[ i ];
            const g = data[ i + 1 ];
            const b = data[ i + 2 ];

            const grayscale = 0.3 * r + 0.59 * g + 0.11 * b;

            data[ i ] = grayscale;
            data[ i + 1 ] = grayscale;
            data[ i + 2 ] = grayscale;

        }

        context.putImageData( imageData, 0, 0 );

    }

    //---
    // invert grayscale

    if ( pointerDownButton === 2 ) {

        imageData = context.getImageData( 0, 0, w, h );
        data = imageData.data;

        for ( let i = 0; i < data.length; i += 4 ) {

            const r = 255 - data[ i ];
            const g = 255 - data[ i + 1 ];
            const b = 255 - data[ i + 2 ];

            const grayscale = 0.3 * r + 0.59 * g + 0.11 * b;

            data[ i ] = grayscale;
            data[ i + 1 ] = grayscale;
            data[ i + 2 ] = grayscale;

        }

        context.putImageData( imageData, 0, 0 );

    }

    //---

    animationFrame = requestAnimFrame( render );

}

window.requestAnimFrame = ( () => {

    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.msRequestAnimationFrame;

} )();

window.cancelAnimFrame = ( () => {

    return  window.cancelAnimationFrame       ||
            window.mozCancelAnimationFrame;

} )();

//---

document.addEventListener( 'DOMContentLoaded', () => {

    init();

} );