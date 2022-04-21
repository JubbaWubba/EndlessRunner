class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        this.load.image('monster', './assets/monster.png');
        this.load.image('player', './assets/player.png');

      }

    create() {

       // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //Key Input Defined 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KeyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  
        //create player avatar
        this.player = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'player',0,keyLEFT, keyRIGHT, KeyUp).setOrigin(0.5, 0);
        // create monster
        this.monster1 = new Monster(this, game.config.width/2, game.config.height, 'monster',0,).setOrigin(0.5, 0);


        
    }
    update() {

      this.player.update()
      this.monster1.update()
      }
    
  }

