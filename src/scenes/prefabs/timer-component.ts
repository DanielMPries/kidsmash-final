import { GradientText } from "./gradient-text";

export class TimerComponent extends Phaser.GameObjects.Container {
  timerText: GradientText | undefined;
  timerValue: number;
  cb: CallableFunction;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    value: number,
    cb: CallableFunction
  ) {
    super(scene);

    this.cb = cb;
    this.timerValue = value;

    this.timerText = new GradientText(scene, x, y, this.timerValue.toString(), {
      fontFamily: 'LuckiestGuy',
      fontSize: '42px'
    });

    // keeps the timer text in the same position
    this.timerText.setScrollFactor(0);
  }

  public start(): void {
    setInterval(() => {
      this.timerText?.setText(this.timerValue.toString());
      this.timerValue--;
      if(this.timerValue === -1) {
        this.cb();
      }
    }, 1000);
  }
}