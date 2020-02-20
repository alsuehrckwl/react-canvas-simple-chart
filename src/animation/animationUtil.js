/**
 * @desciprtion raf 브라우저 체크 유틸
 * @export
 * @class AnimationUtil
 */
export default class AnimationUtil {
  /**
   * @description raf 체크
   * @static
   * @memberof AnimationUtil
   */
  static requestAnimationFrameCheck = (anime) => {
    let checkFunction = null;

    if (typeof window === 'undefined') {
      return;
    }

    checkFunction =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    return checkFunction(anime);
  };

  /**
   * @description raf 종료
   * @static
   * @memberof AnimationUtil
   */
  static cancelAnimationFrameCheck = (requestId) => {
    let checkFunction = null;

    if (typeof window === 'undefined') {
      return;
    }

    checkFunction =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    return checkFunction(requestId);
  };
}
