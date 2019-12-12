import 'phaser';
import tilemap1 from '../../assets/tilemaps/level1'
import tilemap2 from '../../assets/tilemaps/level2'
import RPGpack_sheet from '../../assets/images/RPGpack_sheet.png'
import characters from '../../assets/images/roguelikeChar_transparent.png'
import portal from '../../assets/images/raft.png'

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.levels = {
      1: 'level1',
      2: 'level2',
    };
    this.load.tilemapTiledJSON('level1', tilemap1);
    this.load.tilemapTiledJSON('level2', tilemap2);
    this.load.spritesheet('RPGpack_sheet', RPGpack_sheet, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('characters', characters, { frameWidth: 17, frameHeight: 17 });
    this.load.image('portal', 'assets/images/raft.png');
  }

  create () {
    this.scene.start('Game', { level: 1, newGame: true, levels: this.levels });
  }
};
