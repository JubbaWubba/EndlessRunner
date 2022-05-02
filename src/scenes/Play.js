class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        this.load.image('monster', './assets/spaceship.png');
        this.load.image('player', './assets/player.png');
        this.load.audio('drive', './assets/driving2.wav'); // Credit to user PeteBarry @freesound.org
        this.load.audio('hit', './assets/collision.wav');
        this.load.image('background', './assets/BGTileDesert.png');
      }

    create() {
      //Background 

      this.backgroundImg = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

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
        fontFamily: 'Haettenschweiler',
         fontSize: '35px',
         //backgroundColor: '#F3B141',
         color: '#e5e1e1',
         stroke: '#000000',
         align: 'right',
         padding: {
         top: 5,
         bottom: 5,
               },
         fixedWidth: 100
             }

       let healthConfig = {
         fontFamily: 'Haettenschweiler',
             fontSize: '25px',
             //backgroundColor: '#F3B141',
             color: '#cb0000',
             stroke: '#000000',
             align: 'right',
             padding: {
             top: 5,
             bottom: 5,
                 },
             fixedWidth: 100
                 }
                 
     // Healthbar text, edit later
     this.healthbar = this.add.text(borderUISize*-0.5 + borderPadding*2.8, borderUISize + borderPadding*1.5, this.health, scoreConfig);
     var healthText = this.add.text(borderUISize*-0.5 + borderPadding, borderUISize + borderPadding*2.2, "Lives: ", healthConfig);
     var healthTxt = this.healthbar;
     healthTxt.setStroke('#000000', 5);
     healthText.setStroke('#000000', 5);
     //clock timer for the score
     this.clock = this.time.delayedCall(1000, () => {
   }, null, this)
   //distance score text
      this.distancescore = this.add.text(borderUISize + borderPadding+450, borderUISize + borderPadding*1.5, this.remaining, scoreConfig);
      var distanceText = this.add.text(borderUISize*13 + borderPadding, borderUISize + borderPadding*2.2, "Distance: ", healthConfig);
      var distanceTxt = this.distancescore;
      distanceText.setStroke('#000000', 5);
      distanceTxt.setStroke('#000000', 5);
      // Timer event to increase player height
      this.obstacleTimer = this.time.addEvent({ delay: 500, callback: this.test, callbackScope: this, loop: true});
      // Timer to increase both time and 
      this.increaseTimer = this.time.addEvent({ delay: 5000, callback: this.speedmultiplier, callbackScope: this, loop: true});

      //Driving audio stuff
      this.driveaudio = this.sound.add("drive", { loop: true, volume: 1 });
      this.hitaudio = this.sound.add("hit", {volume: 1 });
      this.driveaudio.play();


        
    }
    update() {
      this.backgroundImg.tilePositionY -= 4;


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

if (!this.noisehit) {

}
      //Distance Calc
      if(!this.GameOver) {
      this.distanceupdate()
      }

      // Scoring
      if(this.health ==0) {
        this.clock.paused= true;
        this.GameOver = true;
        var end_score = this.add.text(game.config.width/2, game.config.height/2, 'Score: '+this.distancescore.text, this.scoreConfig).setOrigin(0.5);
        var reset_prompt = this.add.text(game.config.width/2, game.config.height/2.2, 'Press R to Reset', this.scoreConfig).setOrigin(0.5);
        end_score.setStroke('#000000', 5);
        reset_prompt.setStroke('#000000', 5);
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
      this.driveaudio.stop();
      this.hitaudio.play()
      if(this.health !=0) {
      this.driveaudio.play({delay: 0.5});
      }
    }


    //Increase timer function
    test() {
      if(!this.GameOver) {
      if(this.player.y >= (game.config.height - borderUISize - borderPadding)/2)
        this.player.y += -1;
    }
  }

    // Speed and score multiplyer
    speedmultiplier() {
      this.obstacle1.moveSpeed +=.5;
      this.obstacle2.moveSpeed +=.5;
      this.obstacle3.moveSpeed +=.5;
      this.scoremultiplyer += 1;
    }
  }

