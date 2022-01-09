import { ParallaxScene } from "./parallax-scene";
import { GradientText } from "./prefabs/gradient-text";

export class CreditsScene extends ParallaxScene {
  
  private creditLines: string[] = [];             // string array that will hold all of the lines from the credits file
  private currentText: Phaser.GameObjects.Text;   // text game object
  private currentLine: number = 0;                // the index of the current line we're showing

  private timeline: Phaser.Tweens.Timeline;       // tweening timeline
  
  constructor() {
    super('credits');
  }

  /**
   * Called after init, assets get loaded here
   */
   preload() { 
    super.preload();

    this.load.text('credits', 'assets/credits/credits.txt');
   }

  /**
   * Called after preload, assets get initialized here
   */
  create() { 
    super.create();

    const credts = this.cache.text.get('credits');
    this.creditLines = credts.split('\n');
    this.currentText = new GradientText(
      this, 
      this.sys.canvas.width / 2, 
      this.sys.canvas.height, 
      this.creditLines[0],
      {
        fontFamily: 'LuckiestGuy',
        fontSize: '72px'
      });
    this.setupTweens();
    this.updateCurrentText(this.creditLines[0]);
  }

  private updateCurrentText(text: string) {
    this.currentText.setY(this.sys.canvas.height + 80);
    this.currentText.setText(text);
    this.currentText.setAlpha(1);
    this.timeline.play();
  }

  private setupTweens() {
    this.timeline = this.tweens.createTimeline();
    this.timeline.add({
      targets: this.currentText,
      y: this.sys.canvas.height * 0.35,
      duration: 4000,
      ease: Phaser.Math.Easing.Sine.InOut
    });

    this.timeline.add({
      targets: this.currentText,
      duration: 2000,
      ease: Phaser.Math.Easing.Sine.InOut,
      alpha: 0
    });

    this.timeline.setCallback('onComplete', () => {
      if(this.currentLine < this.creditLines.length - 1) {
        this.currentLine++;
        this.updateCurrentText(this.creditLines[this.currentLine]);
      } else {
        this.timeline.stop();
        this.scene.start('main-menu');
      }
    });
  }

  /**
   * Called after create and run on each cycle of the game loop 
   */
  update() { 
    super.update();
  }

   /**
   * Called after update and run on each cycle of the game loop
   */
  render() { }
}