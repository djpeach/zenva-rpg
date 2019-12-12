import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'characters', 325);
    this.scene = scene;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setScale(4);
  }

  update(cursors) {
    const speed = 500;
    this.setVelocity(0);
    if (cursors.up.isDown) {
      this.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      this.setVelocityY(speed);
    }

    if (cursors.left.isDown) {
      this.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      this.setVelocityX(speed);
    }
  }
}
