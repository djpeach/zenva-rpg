import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, frame) {
    super(scene, x, y, 'characters', frame);
    this.scene = scene;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setScale(4);
    this.movementDelay = Math.floor(Math.random() * 1500) + 1500;

    this.timeEvent = this.scene.time.addEvent({
      delay: this.movementDelay,
      callback: this.move,
      loop: true,
      callbackScope: this
    });
  }

  move() {
    const randNumber = Math.floor((Math.random() * 4) + 1);
    switch(randNumber) {
      case 1:
        this.setVelocityX(100);
        break;
      case 2:
        this.setVelocityX(-100);
        break;
      case 3:
        this.setVelocityY(100);
        break;
      case 4:
        this.setVelocityY(-100);
        break;
      default:
        this.setVelocityX(100);
        break;
    }

    this.movementDelay = Math.floor(Math.random() * 1500) + 1500;

    this.scene.time.addEvent({
      delay: 500,
      callback: () => { if (this.active) { this.setVelocity(0); }}
    })
  }
}
