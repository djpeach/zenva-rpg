import 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import BootScene from './scenes/Boot';
import UIScene from './scenes/UI';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    this.scene.add('UI', UIScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {

  // updated to 3.16
  game.scale.resize(window.innerWidth, window.innerHeight);
});
