class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        this.load.image('monster', './assets/spaceship.png');
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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  
        //create player avatar
        this.player = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'player',0,keyLEFT, keyRIGHT, KeyUp).setOrigin(0.5, 0);
        // create Obstacle
        this.obstacle1 = new Obstacle(this, game.config.width/2, game.config.height-800, 'monster',0,).setOrigin(0.5, 0);
        this.obstacle2 = new Obstacle(this, game.config.width/2+240, game.config.height-1000, 'monster',0,).setOrigin(0.5, 0);
        this.obstacle3 = new Obstacle(this, game.config.width/2-240, game.config.height-1200, 'monster',0,).setOrigin(0.5, 0);

        //Initialize Health Variable
        this.health = 3;
        // Initialize score multiplyer
        this.scoremultiplyer =1;
        //Game Over
        this.GameOver = false;

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

        // Healthbar text, edit later
        this.healthbar = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'Health: '+this.health, scoreConfig);
        //clock timer for the score
        this.clock = this.time.delayedCall(1000, () => {
      }, null, this)
      //distance score text
      this.distancescore = this.add.text(borderUISize + borderPadding+250, borderUISize + borderPadding*2, this.remaining, scoreConfig);
      // Timer event to increase player height
      this.obstacleTimer = this.time.addEvent({ delay: 500, callback: this.test, callbackScope: this, loop: true});
      // Timer to increase both time and 
      this.increaseTimer = this.time.addEvent({ delay: 5000, callback: this.speedmultiplier, callbackScope: this, loop: true});



        
    }
    update() {
      //Restart
      if(this.GameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
    }
      if(!this.GameOver) {
      //movement for player + obstacle
      this.player.update()
      this.obstacle1.update()
      this.obstacle2.update()
      this.obstacle3.update()
      }

      // Collision Check
      if(this.checkCollision(this.player, this.obstacle1)) {
        this.hostilehit();
        this.obstacle1.reset();
    }

    if(this.checkCollision(this.player, this.obstacle2)) {
      this.hostilehit();
      this.obstacle2.reset();
  }

  if(this.checkCollision(this.player, this.obstacle3)) {
    this.hostilehit();
    this.obstacle3.reset();
}

      //Distance Calc
      if(!this.GameOver) {
      this.distanceupdate()
      }


      if(this.health ==0) {
        this.clock.paused= true;
        this.GameOver = true;
        this.add.text(game.config.width/2, game.config.height/2, 'Score: '+this.distancescore.text, this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4, 'Press R to Reset', this.scoreConfig).setOrigin(0.5);


      }
      }





      checkCollision(player, obstacle) {
        // simple AABB checking
        if (player.x < obstacle.x + obstacle.width && 
          player.x + player.width > obstacle.x && 
          player.y < obstacle.y + obstacle.height &&
          player.height + player.y > obstacle. y) {
                return true;
        } else {
            return false;
        }
    }

      distanceupdate() {
        this.clock.delay += 90 * this.scoremultiplyer;
        this.remaining = this.clock.getOverallRemainingSeconds(); 
        this.score= Math.floor(this.remaining * 1) +"m";
        this.distancescore.text =this.score
    }



    // What happens when the player hits an obstacle
    hostilehit() {
      // Health display -1
      this.health -= 1;
      this.healthbar.text = this.health
      // reset player back down
      this.player.y = game.config.height - borderUISize - borderPadding;
      // reset obstacle movespeed back to default
      this.obstacle1.moveSpeed =6;
      this.obstacle2.moveSpeed =6;
      this.obstacle3.moveSpeed =6;
      // reset score multiplyer
      this.scoremultiplyer = 1;
    }


    //Increase timer function
    test() {
      if(this.player.y >= (game.config.height - borderUISize - borderPadding)/2)
        this.player.y += -1;
    }

    speedmultiplier() {
      this.obstacle1.moveSpeed +=1;
      this.obstacle2.moveSpeed +=1;
      this.obstacle3.moveSpeed +=1;
      this.scoremultiplyer += 1;
    }
  }

