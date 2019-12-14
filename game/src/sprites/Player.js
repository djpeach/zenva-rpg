import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'characters', 325);
    this.scene = scene;
    this.health = 3;
    this.hitDelay = false;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setScale(4);
  }

  enemyCollision (player, enemy) {
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0xff0000;
      this.scene.time.addEvent({
        delay: 1200,
        callback: () => {
          this.hitDelay = false;
          this.tint = 0xffffff;
        },
        callbackScope: this
      });
    }
  }

  loseHealth () {
    this.health--;
    this.scene.events.emit('loseHealth', this.health);
    if (this.health === 0) {
      this.scene.loadNextLevel(true);
    }
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
