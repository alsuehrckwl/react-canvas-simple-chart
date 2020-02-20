import AnimationUtil from '../animation/animationUtil';
import { easingUtil } from '../util/easingUtil';

/**
 * @description canvas animation 유틸
 * @class CanvasAnimation
 */
class CanvasAnimation {
  constructor(frame, direction, duration, easingType) {
    const _ca = this;

    _ca.frame = frame || 60;
    _ca.direction = direction || 'width';
    _ca.duration = duration || 1000;
    _ca.requestId = null;

    _ca.value = 0;
    _ca.active = true;

    _ca.easingType = easingType || 'linear';
  }

  get val() {
    const _ca = this;

    return _ca.value;
  }

  /**
   * @description raf 호출
   * @param {*} raf 재귀호출될 animation 함수
   */
  requestAnimationFrame(raf) {
    const _ca = this;

    _ca.requestId = AnimationUtil.requestAnimationFrameCheck(raf);
  }

  /**
   * @description raf 취소
   */
  cancelAnimationFrame() {
    const _ca = this;

    AnimationUtil.cancelAnimationFrameCheck(_ca.requestId);
    _ca.requestId = null;
  }

  /**
   * @description value 셋팅
   */
  setValue(fraction, percentage) {
    const _ca = this;

    if (easingUtil[_ca.easingType](fraction) === 1) {
      this.active = false;
    }

    _ca.value = easingUtil[_ca.easingType](fraction) * percentage;
  }

  /**
   * @description value return
   * @returns value
   */
  getValue() {
    const _ca = this;

    return _ca.value;
  }
}

export default CanvasAnimation;
