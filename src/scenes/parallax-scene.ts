import { Colors } from "./prefabs/colors";

export class ParallaxScene extends Phaser.Scene {
  layers : Phaser.GameObjects.TileSprite[] = [];
  stage: Object;

  /**
   * Called after init, assets get loaded here
   */
   preload() { 
    for(let i = 0; i < 3; i++) {
      this.load.image(`bg${i}`, `./assets/main-menu/background${i + 1}.png`);
    }
  }

 /**
  * Called after preload, assets get initialized here
  */
 create() { 
    //#region Setup Background
    this.setupBackground();
    this.setupParallax();
    //#endregion
 }

 private setupParallax() {
   for(let i = 2; i >= 0; i--) {
    let tileSprite = this.add
      .tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, `bg${i}`)
      .setOrigin(0)
      .setTint(Colors.Snow, Colors.Cranberry)
      .setScale(2);
    this.layers.push(tileSprite);
   }
 }

 private setupBackground() {
   let bg = this.add.graphics();
   bg = this.add.graphics();
   bg.fillGradientStyle(Colors.Cranberry, Colors.Cranberry, Colors.California, Colors.California);
   bg.fillRect(0, 0, this.sys.canvas.width, this.sys.canvas.height);
 }

 /**
  * Called after create and run on each cycle of the game loop 
  */
 update() { 
   this.layers.forEach((layer, index) => {
    let scrollFactor = ((index + 1) / this.layers.length) / 5;
    this.layers[index].tilePositionX -= scrollFactor;
   });
 }

  /**
  * Called after update and run on each cycle of the game loop
  */
 render() { }
}