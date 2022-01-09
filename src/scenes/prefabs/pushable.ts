export class PushableText {
  static apply(gameObject: Phaser.GameObjects.Text, onClick: Function): void {
    gameObject.setInteractive()
    .on(Phaser.Input.Events.POINTER_OVER, () => {
      gameObject.scene.tweens.add({
        targets: gameObject,
        scale: .8,
        ease: Phaser.Math.Easing.Sine.InOut,
        duration: 200
      });
    })
    .on(Phaser.Input.Events.POINTER_OUT, () => {
      gameObject.scene.tweens.add({
        targets: gameObject,
        scale: 1,
        ease: Phaser.Math.Easing.Sine.InOut,
        duration: 200
      });
    })
    .on(Phaser.Input.Events.POINTER_UP, onClick);
  }
}