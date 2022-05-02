// Obstacle prefab
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.moveSpeed = 6;         // pixels per frame
    }

    update() {
        this.y += this.moveSpeed;
        // wrap around from left edge to right edge
        if(-this.y <=  -game.config.height) {
            this.reset();
        }

    }
    reset() {
        this.y = game.config.height - 800; //reset function
        //randomizes x position
        this.x = Phaser.Math.Between(borderUISize + this.width, game.config.width - borderUISize - this.width)
    }   
}
