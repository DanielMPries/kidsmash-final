import { Physics } from "phaser";

enum PlayerState {
  Walk = 'walking',
  Jump = 'jumping',
  Idle = 'idling',
  Fall = 'falling'
}

enum Repeat {
  Indefinitely = -1,
  None = 0
}

export class Hero extends Physics.Arcade.Sprite {
  public static readonly textureName = 'hero';
  public static readonly texturePath = './assets/game/spritesheet.png';
  
  private debugState: Phaser.GameObjects.Text;
  private cursors : Phaser.Types.Input.Keyboard.CursorKeys;

  /**
   * Used for scene preloading
   * @param scene 
   */
  public static preload(scene: Phaser.Scene) {
    scene.load.spritesheet(Hero.textureName, Hero.texturePath, {
      frameWidth: 40,
      spacing: 2,
      frameHeight: 40
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Hero.textureName);
    scene.add.existing(this);

    this.debugState = scene.add.text(10, 10, '', {
      color: '#fff',
      fontSize: '24px',
      fontFamily: 'LuckiestGuy'
    });

    // add these to the top of the scene stage
    this.debugState.depth = 1000;
    this.depth = 1000;
    this.debugState.setVisible(this.scene.game.config.physics.arcade?.debug || false);
  }

  public create() {
    this.setupAnimations();
    this.setupPhysics();

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  private setupAnimations() {
    this.anims.create({
      key: PlayerState.Idle,
      frameRate: 6,
      frames: this.anims.generateFrameNumbers(Hero.textureName, { start: 1, end: 4 }),
      repeat: Repeat.Indefinitely
    });

    this.anims.create({
      key: PlayerState.Walk,
      frameRate: 6,
      frames: this.anims.generateFrameNumbers(Hero.textureName, { start: 7, end: 12 }),
      repeat: Repeat.Indefinitely
    });

    this.anims.create({
      key: PlayerState.Jump,
      frameRate: 6,
      frames: this.anims.generateFrameNumbers(Hero.textureName, { start: 5, end: 6 }),
      repeat: Repeat.None
    });

    this.anims.create({
      key: PlayerState.Fall,
      frameRate: 6,
      frames: this.anims.generateFrameNumbers(Hero.textureName, { start: 6, end: 6 }),
      repeat: Repeat.None
    });
  }

  private setupPhysics() {
    this.scene.physics.add.existing(this);
    this.setBounce(0.1);
    this.setGravityY(400);

    // need this to correct the collider box
    this.getBody().setSize(this.getBody().width - 20, this.getBody().height - 10);
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }

  public update() {
    this.updateDebugMessage();
    this.getBody().setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.getBody().setVelocityX(-100);
      this.setFlipX(true);
      this.playIfNotPlaying(PlayerState.Walk);
      return;
  } else if (this.cursors.right.isDown) {
      this.getBody().setVelocityX(100);
      this.setFlipX(false);
      this.playIfNotPlaying(PlayerState.Walk);
      return;
  }

  if (this.cursors.up.isDown && this.getBody().onFloor()) {
      this.getBody().setVelocityY(-400);
      this.playIfNotPlaying(PlayerState.Jump);   
      return;
  }

  if(this.getBody().onFloor())
    this.playIfNotPlaying(PlayerState.Idle);
  else 
    this.playIfNotPlaying(PlayerState.Fall);
  }

  private updateDebugMessage() {
    if(this.scene.game.config.physics.arcade?.debug) {
      const body = this.getBody();
      const fps = Math.round(this.scene.sys.game.loop.actualFps);
      body.debugBodyColor = 0xfff;
      const state = `Hero is ${this.anims.getName()}`;
      const position = `X: ${Math.round(body.x)}, Y: ${Math.round(body.y)}}`;
      const velocity = `vX: ${Math.round(body.velocity.x)}, vY: ${Math.round(body.velocity.y)}`;
      this.debugState.setText(`${state}\n${position}\nFPS: ${fps}`);
    }
  }

  private playIfNotPlaying(animation: string) : void {
    if (this.anims.getName() !== animation) 
      this.play(animation);
  }
}