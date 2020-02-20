class BarChart {
  constructor(context, options) {
    this.context = context || null;
    this.options = options || {};

    this.x = this.options.x || 0;
    this.y = this.options.y || 0;
    this.height = this.options.height || 0;
    this.width = this.options.width || 0;
    this.vertical = this.options.vertical || false;
    this.direction = this.options.direction || 'left';

    this.create = this.create.bind(this);
    this.setText = this.setText.bind(this);
  }

  create(val) {
    const cnf = {
      x: this.x,
      y: this.y,
      h: 0,
      w: 0,
      pi: 0,
      piLine: 0,
      text: {}
    };
    const calc = ((val / this.width) * 100).toFixed(2);
    const percentage = `${isNaN(calc) ? '0.00' : calc}%`;

    if (val) {
      if (this.vertical) {
        cnf.w = this.width;
        cnf.h = val;
      } else {
        cnf.h = this.height;
        cnf.pi = cnf.h / 2;

        if (this.direction === 'right') {
          cnf.x = this.width;
          cnf.w = this.width - val;
          cnf.piLine = cnf.w - cnf.pi;
        } else {
          cnf.w = val;
          cnf.piLine = cnf.w + cnf.pi;
        }
      }
    }

    this.context.save();
    this.context.beginPath();

    if (this.direction === 'right') {
      this.context.moveTo(cnf.x, cnf.y);
      this.context.lineTo(cnf.w, cnf.y);
      this.context.arcTo(cnf.piLine, cnf.y, cnf.piLine, cnf.pi, cnf.pi);
      this.context.arcTo(cnf.piLine, cnf.h, cnf.w, cnf.h, cnf.pi);
      this.context.lineTo(cnf.x, cnf.h);
    } else {
      this.context.moveTo(cnf.x, cnf.y);
      this.context.lineTo(cnf.w, cnf.x);
      this.context.arcTo(cnf.piLine, cnf.x, cnf.piLine, cnf.pi, cnf.pi);
      this.context.arcTo(cnf.piLine, cnf.h, cnf.w, cnf.h, cnf.pi);
      this.context.lineTo(cnf.x, cnf.w);
    }

    this.context.closePath();
    this.context.fill();
    this.setText(percentage, cnf);
    this.context.restore();
  }

  setText(text, cnf) {
    let textPosition = 0;

    this.context.save();
    this.context.font = '12px YoonGothicPro';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = '#fff';

    if (this.direction === 'right') {
      if (cnf.w < this.width - 16) {
        textPosition = this.width - 16;
        this.context.textAlign = 'right';
        this.context.direction = 'rtl';
      }
    } else {
      if (cnf.w > 16) {
        textPosition = 16;
        this.context.textAlign = 'left';
        this.context.direction = 'ltr';
      }
    }

    if (textPosition > 0) {
      this.context.fillText(text, textPosition, cnf.pi);
    }

    this.context.restore();
  }
}

export default BarChart;
