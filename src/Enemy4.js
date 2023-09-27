//destructoring assignement
const { Sprite } = Phaser.Physics.Arcade;

/* const img = Phaser.Physics.Arcade.Image; */

export class Enemy4 extends Sprite {
    speed = 100;

    constructor(level,x,y,texture){
        super(level,x,y,texture);

        level.add.existing(this);
        level.physics.world.enableBody(this);

        level.enemies.add(this);
    }
}