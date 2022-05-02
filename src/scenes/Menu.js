class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
      this.load.image('TitleScreen', './assets/DDTitleScreen.png');
    }

    create() {
      let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 0
    }
    //define key
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    //text
    this.logo=this.add.sprite(320,240,"TitleScreen")



    }

    update() {
      //Start Game
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start('playScene');    
      }
    }
  }

