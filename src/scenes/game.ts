import { GradientText } from "./prefabs/gradient-text";
import { Hero } from "./prefabs/hero";
import { TimerComponent } from "./prefabs/timer-component";

export class GameScene extends Phaser.Scene {
  private gameTimer : TimerComponent | undefined;
  private hero : Hero;
  private map : Phaser.Tilemaps.Tilemap;
  private ground : Phaser.Tilemaps.TilemapLayer;
  private scaleFactor = 2;
  private collectedItems : string[] = [];

  constructor() {
    super("game-scene");
  }

  preload() {
    this.load.image('tiles', './assets/game/propPack.png');
    this.load.spritesheet('food', './assets/game/food.png', {
      frameWidth:24,
      frameHeight: 24,
      spacing:0,
      margin:0
    });

    // load the json tilemap
    this.load.tilemapTiledJSON('tilemap', './assets/game/level.json');

    Hero.preload(this);
  }

  create() {
    this.hero = new Hero(this, 200, 60);

    this.cameras.main.fadeIn();

    this.hero.create();

    this.createGround();
    this.createCollectables();

    this.gameTimer = new TimerComponent(this, this.sys.canvas.width / 2, 20, 99, () => {
      this.scene.start('credits');
    });

    this.gameTimer.start();
  }

  private createCollectables() {
    let food = this.physics.add.group();
    let foodObjects = this.map.createFromObjects('Food', {});
    this.physics.add.group(foodObjects);
    foodObjects.forEach((object) => {
      console.log(object);
      const sprite = object as Phaser.Physics.Arcade.Sprite;
      sprite.body.setSize(18,12);
      food.add(sprite, true);
      sprite.x *= this.scaleFactor;
      sprite.y *= this.scaleFactor;
      sprite.setScale(1.5);

      let frame = 0;
      switch(sprite.name) {
        case 'lettuce':
          frame = 0;
          break;
        case 'tomato':
          frame = 1;
          break;
        case 'pepper':
          frame = 2;
          break;
        case 'onion':
          frame = 3;
          break;
        case 'avocado':
          frame = 4;
          break;
        case 'cheese':
          frame = 5;
          break;
        case 'steak':
          frame = 6;
          break;
        case 'pork':
          frame = 7;
          break;
        case 'chicken':
          frame = 8;
          break;
        case 'shells':
          frame = 9;
          break;
      }
      sprite.setTexture('food', frame);
      
      this.physics.add.overlap(this.hero, object, (_hero, _food) => {
        this.collectedItems.push(_food.name);
        console.log(`You collected ${_food.name}`);
        _food.destroy();
        if(this.collectedItems.length === 8) {

          let winText = new GradientText(
            this, 
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            'You Win!',
            {
              fontFamily: 'LuckiestGuy',
              fontSize: '100px'
            });

          winText.setScrollFactor(0);
          setInterval(() => {
            this.scene.start('main-menu');
          }, 5000);
        }
      });
    });
    this.physics.add.collider(food, this.ground);
  }

  private createGround() {
    this.map = this.make.tilemap({ key: 'tilemap' });
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels * this.scaleFactor, this.map.heightInPixels * this.scaleFactor);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels * this.scaleFactor, this.map.heightInPixels * this.scaleFactor);
    this.cameras.main.startFollow(this.hero);

    let stageBg = this.add.graphics();
    stageBg.fillGradientStyle(0xDD517F, 0xDD517F, 0xE68E36, 0xE68E36);
    stageBg.fillRect(0,0, this.map.widthInPixels * this.scaleFactor, this.sys.canvas.height);

    const tileset = this.map.addTilesetImage('propPack', 'tiles');
    let bg = this.map.createLayer('Background', tileset, 0, 0).setScale(this.scaleFactor);

    let bgOverlay = this.add.graphics();
    bgOverlay.fillStyle(0x333, 0.5);
    bgOverlay.setBlendMode(Phaser.BlendModes.DARKEN);
    bgOverlay.fillRect(0,0, this.map.widthInPixels * 2, this.sys.canvas.height);

    this.ground = this.map.createLayer('Platform', tileset, 0, 0).setScale(2);
    this.map.setCollisionByExclusion([-1], true);
    this.physics.add.collider(this.hero, this.ground);
  }

  update(time: number, delta: number): void {
      this.hero.update();
  }
}
