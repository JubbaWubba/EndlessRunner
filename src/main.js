let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, KeyUp, keyDown, keyA, keyD, keyW, keyS;

// Our artstyle was meant to emulate vintage arcade games along with sounds to match a mad-max sort of arcade game feel
// Technically interesting, the way our game makes use of timers to both increase the y-axis of players, does the speed up, and the distance score. 