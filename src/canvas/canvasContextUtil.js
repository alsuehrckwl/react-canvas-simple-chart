import BarChart from './canvasCharts/barChart';
import StackChart from './canvasCharts/stackChart';

/**
 * @description 캔버스 생성
 * @export
 * @class CanvasContexUtil
 */
export default class CanvasContexUtil {
  constructor(canvas, options, type) {
    const _cc = this;

    _cc.canvas = canvas || null;
    _cc.chart = null;
    _cc.options = options || {};
    _cc.color = _cc.options.color || '#000';
    _cc.type = type || 'RoundBarChart';
    _cc.initalizer();
  }

  /**
   * @memberof CanvasContexUtil
   */
  initalizer() {
    const _cc = this;

    switch (_cc.type) {
      case 'RoundBarChart':
        _cc.chart = new BarChart(_cc.canvas.getContext('2d'), _cc.options);
        break;
      case 'StackBarChart':
        _cc.chart = new StackChart(_cc.canvas.getContext('2d'), _cc.options);
        break;
      default:
        break;
    }

    _cc.setStyle();
    _cc.createCanvas();
  }

  /**
   * @memberof CanvasContexUtil
   */
  setStyle() {
    const _cc = this;

    _cc.chart.context.fillStyle = _cc.color;
    _cc.chart.context.save();
  }

  /**
   * @description canvas를 그려준다
   * @param {*} val px
   * @memberof CanvasContexUtil
   */
  createCanvas(val) {
    const _cc = this;

    _cc.chart.create(val);
  }

  /**
   * @memberof CanvasContexUtil
   */
  clear() {
    const _cc = this;

    _cc.chart.context.clearRect(0, 0, _cc.height, _cc.width);
  }
}
