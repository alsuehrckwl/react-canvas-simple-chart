export default class AnimationTimer {
  constructor(duration) {
    this.start = 0;
    this.fraction = 0;
    this.duration = duration || 0;

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
  }

  init() {
    this.start = performance.now();
  }

  update(timer) {
    if (this.start === 0) {
      this.init();
    }

    this.fraction = (timer - this.start) / this.duration;

    if (this.fraction > 1) {
      this.fraction = 1;
    }

    return this.fraction;
  }
}
