export class BootScene extends Phaser.Scene {

  /**
   * Called after init, assets get loaded here
   */
  preload() { 
    this.load.image('codemash-logo', 'assets/codemash-logo.png');    
  }

  /**
   * Called after preload, assets get initialized here
   */
  create() { 
    
    //#region 
    let center = {
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2
    }

    this.cameras.main.fadeIn(1000);

    let logo = this.add.image(center.x, center.y, 'codemash-logo');
    logo.setScale(0.5);
    
    setTimeout(() => {
      this.cameras.main.fadeOut(1000);
    }, 3000);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('main-menu');
    });
    //#endregion
  }

  /**
   * Called after create and run on each cycle of the game loop 
   */
  update() { }

   /**
   * Called after update and run on each cycle of the game loop
   */
  render() { }
}