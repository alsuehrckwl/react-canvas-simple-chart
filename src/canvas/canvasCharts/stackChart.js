class StackChart {
  constructor(context, options, color) {
    this.context = context || null;
    this.options = options || {};

    this.value = this.options.value || [];
    this.percentage = new Array(this.value.length).fill(1);
    this.x = this.options.x || 0;
    this.y = this.options.y || 0;
    this.height = this.options.height || 0;
    this.width = this.options.width || 0;
    this.vertical = this.options.vertical || false;
    this.direction = this.options.direction || 'left';
    this.color = color || ['#3498DB', '#ED2026', '#BBBBBB', '#EFEFEF'];

    this.create = this.create.bind(this);
    this.setPercentage = this.setPercentage.bind(this);
    this.setStyle = this.setStyle.bind(this);

    this.setPercentage();
  }

  setPercentage() {
    const divide = this.width / 100;

    this.percentage = this.percentage.map((item, index) => {
      return (item = divide * this.value[index]);
    });
  }

  setStyle(color) {
    this.context.fillStyle = color;
    this.context.save();
  }

  create(val) {
    const cnf = {
      x: this.x,
      y: this.y,
      h: 0,
      w: 0,
      text: {}
    };

    if (val) {
      if (this.vertical) {
        cnf.w = this.width;
        cnf.h = val;
      } else {
        cnf.h = this.height;

        if (this.direction === 'right') {
          cnf.x = this.width;
          cnf.w = this.width - val;
        } else {
          cnf.w = val;
        }
      }
    }

    this.context.save();
    this.context.beginPath();

    if (this.direction === 'right') {
      this.percentage.forEach((item, index) => {
        const calcItem = this.width - item;
        const w = cnf.w > calcItem ? calcItem : cnf.w;
        let x = calcItem;

        if (index > 0) {
          // x = cnf.w > calcItem ? cnf.w - calcItem : (cnf.x + cnf.w) * index;
        } else {
          x = this.width;
          // x = this.width;
        }

        // console.log(x);
        // console.log(cnf);
        // console.log('calcItem = ', calcItem);

        this.setStyle(this.color[index]);
        this.context.fillRect(x, cnf.y, w, cnf.h);
      });
    } else {
      this.percentage.forEach((item, index) => {
        const w = cnf.w > item ? item : cnf.w;
        let x = 0;

        if (index > 0) {
          x = cnf.w > item ? cnf.w - item : (cnf.x + cnf.w) * index;
        }

        this.setStyle(this.color[index]);
        this.context.fillRect(x, cnf.y, w, cnf.h);
      });
    }

    this.context.closePath();
    this.context.restore();
  }
}

export default StackChart;
