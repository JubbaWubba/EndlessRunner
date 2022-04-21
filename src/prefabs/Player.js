// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame,leftMove,RightMove) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.ML = leftMove;
        this.MR =RightMove;
        this.moveSpeed = 20;


    }

    update() {

        //Left to Right Movement
        if(this.ML.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (this.MR.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }

    }
}