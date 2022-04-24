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

        //UI
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);


        //Key Input Defined 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KeyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  
        //create player avatar
        this.player = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'player',0,keyLEFT, keyRIGHT, KeyUp).setOrigin(0.5, 0);
        // create Obstacle
        this.obstacle1 = new Obstacle(this, game.config.width/2, game.config.height, 'monster',0,).setOrigin(0.5, 0);
        //Initialize Health Variable
        this.health = 3;

        // display score
         let scoreConfig = {
           fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
                  },
            fixedWidth: 100
                }

        this.healthbar = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.health, scoreConfig);
        //clock
        this.clock = this.time.delayedCall(1000, () => {

      }, null, this)
      this.distancescore = this.add.text(borderUISize + borderPadding+250, borderUISize + borderPadding*2, this.remaining, scoreConfig);

      


        
    }
    update() {
      //movement for player + obstacle
      this.player.update()
      this.obstacle1.update()

      //Distance Calc
      this.distanceupdate()


      }

      distanceupdate() {
        this.clock.delay += 90;
        this.remaining = this.clock.getOverallRemainingSeconds(); 
        this.distancescore.text =Math.floor(this.remaining * 1) +"m";
    }
  }

