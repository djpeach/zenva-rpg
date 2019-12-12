import 'phaser';
import Player from '../sprites/Player'
import Portal from '../sprites/Portal'

export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  init(data) {
    this._LEVEL = data.level;
    this._LEVELS = data.levels;
    this._NEWGAME = data.newGame;
  }

  preload () {
  }

  create () {
    this.scale.on('resize', this.resize, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.createMap();
    this.createPlayer();
    this.createPortal();
    this.cameras.main.startFollow(this.player);
    this.addCollisions();
  }

  update() {
    this.player.update(this.cursors);
  }

  createPlayer() {
    this.map.findObject('Player', (object => {
      if (this._NEWGAME && this._LEVEL === 1) {
        if (object.type === 'StartingPosition') {
          this.player = new Player(this, object.x, object.y);
        }
      } else {
        this.player = new Player(this, object.x, object.y)
      }
    }));
  }

  createPortal() {
    this.map.findObject('Portal', (object => {
      this.portal = new Portal(this, object.x, object.y - 68);
    }));
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.blockedLayer);
    this.physics.overlap(this.player, this.portal, this.loadNextLevel.bind(this))
  }

  resize (gameSize, baseSize, displaySize, resolution) {
   let width = gameSize.width;
   let height = gameSize.height;
   if (width === undefined) {
     width = this.sys.game.config.width;
   }
   if (height === undefined) {
     height = this.sys.game.config.height;
   }
   this.cameras.resize(width, height);
 }

  createMap () {
    this.add.tileSprite(0, 0, 8000, 8000, 'RPGpack_sheet', 31);
    this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] });
    this.tiles = this.map.addTilesetImage('RPGpack_sheet');
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1])
  }

  loadNextLevel() {
    this.scene.restart({ level: 2, newGame: false, levels: [this._LEVELS] });
  }
};
