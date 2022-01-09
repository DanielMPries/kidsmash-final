import { ParallaxScene } from "./parallax-scene";
import { Colors } from "./prefabs/colors";
import { GradientText } from "./prefabs/gradient-text";
import { PushableText } from "./prefabs/pushable";

export class MainMenu extends ParallaxScene {
  gameStartText: Phaser.GameObjects.Text | undefined;
  creditsText: Phaser.GameObjects.Text | undefined;

  constructor() {
    super('main-menu');
  }

  /**
   * Called after init, assets get loaded here
   */
   preload() { 
     super.preload();

     this.load.image('logo', 'assets/Logo.png');
   }

  /**
   * Called after preload, assets get initialized here
   */
  create() { 
    super.create();
    let centerX = this.sys.canvas.width / 2;

    let logoImage = this.add.image(centerX, 250, 'logo');
    logoImage.setOrigin(0.5);
    logoImage.setScale(0.75);
    
    this.gameStartText = new GradientText(
      this,
      this.sys.canvas.width / 2,
      480,
      "Lets Go!",
      {
        fontFamily: 'LuckiestGuy',
        fontSize: '72px'
      });

    PushableText.apply(this.gameStartText, () => {
      this.scene.start('game-scene');
    });

    this.creditsText = new GradientText(
      this,
      this.sys.canvas.width / 2,
      550,
      "Credits", 
      {
        fontFamily: 'LuckiestGuy',
        fontSize: '42px'
      }
    );

    PushableText.apply(this.creditsText, () => {
      this.scene.start('credits');
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