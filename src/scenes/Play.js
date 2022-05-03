class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        this.load.image('monster', './assets/spaceship.png');
        this.load.image('player', './assets/player.png');
        this.load.audio('drive', './assets/driving2.wav'); // Credit to user PeteBarry @freesound.org
        this.load.audio('hit', './assets/collision.wav');
        this.load.audio('backmusic', './assets/backgroundmusic.wav'); //Credit to Ross Budgen on Youtube
        this.load.image('background', './assets/sand_background.png');
        this.load.spritesheet('PlayerCar', './assets/PlayerCar01.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 15});
        this.load.spritesheet('Bug1', './assets/Bug01.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('Bug2', './assets/Bug02.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('Bug3', './assets/Bug03.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});

      }

    create() {
      //Background 
      this.backgroundImg = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xe9b669).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xe9b669).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xe9b669).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xe9b669).setOrigin(0, 0);

        //Key Input Defined 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KeyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //create player avatar
        //animations 
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('PlayerCar', { start: 0, end: 15, first: 0}),
            frameRate: 30
        }); 
        this.player = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'player',0,keyLEFT, keyRIGHT, KeyUp).setOrigin(0.5, 0);
        this.playeravatar = this.add.sprite(this.player.x, this.player.y, 'PlayerCar').setOrigin(0.5, 0);
        this.playeravatar.play({ key: 'walk', repeat: 40000000000 });


        // create Obstacle
        this.anims.create({
          key: 'Bug1w',
          frames: this.anims.generateFrameNumbers('Bug1', { start: 0, end: 3, first: 0}),
          frameRate: 30
      }); 
        this.anims.create({
        key: 'Bug2w',
        frames: this.anims.generateFrameNumbers('Bug2', { start: 0, end: 3, first: 0}),
        frameRate: 30
      }); 
        this.anims.create({
        key: 'Bug3w',
        frames: this.anims.generateFrameNumbers('Bug3', { start: 0, end: 3, first: 0}),
        frameRate: 30
       }); 
       
        this.obstacle1p = new Obstacle(this, game.config.width/2, game.config.height-800, 'player',0,).setOrigin(0.5, 0);
        this.obstacle1 = this.add.sprite(this.obstacle1p.x, this.obstacle1p.y, 'Bug1').setOrigin(0.5, 0);
        this.obstacle1.play({ key: 'Bug1w', repeat: 40000000000 });

        this.obstacle2p = new Obstacle(this, game.config.width/2+240, game.config.height-1000, 'player',0,).setOrigin(0.5, 0);
        this.obstacle2 = this.add.sprite(this.obstacle2p.x, this.obstacle2p.y, 'Bug2').setOrigin(0.5, 0);
        this.obstacle2.play({ key: 'Bug2w', repeat: 40000000000 });

        this.obstacle3p = new Obstacle(this, game.config.width/2-240, game.config.height-1200, 'player',0,).setOrigin(0.5, 0);
        this.obstacle3 = this.add.sprite(this.obstacle3p.x, this.obstacle3p.y, 'Bug3').setOrigin(0.5, 0);
        this.obstacle3.play({ key: 'Bug3w', repeat: 40000000000 });

  
        //Initialize Health Variable
        this.health = 3;
        // Initialize score multiplyer
        this.scoremultiplyer =1;
        // Scroll Speed
        this.scrollvar = 2;
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
      var distanceText = this.add.text(borderUISize*12.5 + borderPadding, borderUISize + borderPadding*2.2, "Distance:  ", healthConfig);
      var distanceTxt = this.distancescore;
      distanceText.setStroke('#000000', 5);
      distanceTxt.setStroke('#000000', 5);
      // Timer event to increase player height
      this.obstacleTimer = this.time.addEvent({ delay: 150, callback: this.test, callbackScope: this, loop: true});
      // Timer to increase both time and 
      this.increaseTimer = this.time.addEvent({ delay: 5000, callback: this.speedmultiplier, callbackScope: this, loop: true});

      //Driving audio stuff
      this.driveaudio = this.sound.add("drive", { loop: true, volume: .9 });
      this.backaudio = this.sound.add("backmusic", { loop: true, volume: .10 });
      this.hitaudio = this.sound.add("hit", {volume: 2 });
      this.backaudio.play();

    }
    update() {
      if (!this.GameOver) {
      this.backgroundImg.tilePositionY -= this.scrollvar;
      }
      //Player avatar movement
      this.playeravatar.x = this.player.x
      this.playeravatar.y = this.player.y
      // Bug movement
      this.obstacle1.y = this.obstacle1p.y
      this.obstacle1.x = this.obstacle1p.x
      this.obstacle2.y = this.obstacle2p.y
      this.obstacle2.x = this.obstacle2p.x
      this.obstacle3.y = this.obstacle3p.y
      this.obstacle3.x = this.obstacle3p.x
      if (this.GameOver) {
        this.playeravatar.anims.stop()
      }

      //Restart
      if(this.GameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.backaudio.stop()
        this.scene.restart();
    }
      if(!this.GameOver) {
      //movement for player + obstacle
      this.player.update()
      this.obstacle1p.update()
      this.obstacle2p.update()
      this.obstacle3p.update()
      }

      // Collision Check
      if(this.checkCollision(this.player, this.obstacle1)) {
        this.hostilehit();
        this.obstacle1p.reset();
    }

    if(this.checkCollision(this.player, this.obstacle2)) {
      this.hostilehit();
      this.obstacle2p.reset();
  }

  if(this.checkCollision(this.player, this.obstacle3)) {
    this.hostilehit();
    this.obstacle3p.reset();
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
      //audio
      this.driveaudio.stop();
      this.hitaudio.play()
      if(this.health !=0) {
      this.driveaudio.play({delay: 0.5});
      }
      //reset scroll speed
      this.scrollvar =2
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
      // Bugs
      this.obstacle1.moveSpeed +=1;
      this.obstacle2.moveSpeed +=1;
      this.obstacle3.moveSpeed +=1;
      this.scoremultiplyer += 1;
      // Background Scrolling Speed
      if(this.scrollvar <= 6) {
        this.scrollvar += 1
      }

    }
  }

