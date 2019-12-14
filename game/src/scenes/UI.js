import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor(){
    super({ key: 'UI', active: true});
  }

  init () {
    this.coinsCollected = 0;
  }

  create () {
    this.scoreText = this.add.text(12, 12, 'Score: 0', { fontSize: '32px', fill: '#fff'});
    this.healthText = this.add.text(12, 50, `Health: 3`, { fontSize: '32px', fill: '#fff'});

    this.gameScene = this.scene.get('Game');

    this.gameScene.events.on('coinCollected', () => {
      this.coinsCollected++;
      this.scoreText.setText(`Score: ${this.coinsCollected}`)
    });
    this.gameScene.events.on('loseHealth', (health) => {
      this.healthText.setText(`Health: ${health}`)
    });
    this.gameScene.events.on('newGame', () => {
      this.coinsCollected = 0;
      this.scoreText.setText(`Score: ${this.coinsCollected}`);
      this.healthText.setText(`Health: 3`)
    });
  }
};