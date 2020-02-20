import React, { useEffect, useRef, useState } from 'react';
import CanvasAnimation from '../../canvas/canvasAnimation';
import CanvasContexUtil from '../../canvas/canvasContextUtil';
import PropTypes from 'prop-types';

const RoundBarChartCanvas = ({
  height,
  width,
  value,
  direction,
  animation,
  duration
}) => {
  const canvasRef = useRef(null);
  const [percentage, setPercentage] = useState(0);
  const [dontRender, setDontRender] = useState(false);
  const [CC, setCC] = useState(null);
  const [CA, setCA] = useState(null);

  useEffect(() => {
    setCC(
      new CanvasContexUtil(
        canvasRef.current,
        {
          x: 0,
          y: 0,
          height,
          width,
          color: '#4e454a',
          direction
        },
        'RoundBarChart'
      )
    );
    setCA(new CanvasAnimation(60, 'width', duration, 'easeOutExpo'));
  }, [canvasRef]);

  useEffect(() => {
    if (!!CC && !!CA) {
      if (animation) {
        let start = performance.now();

        const draw = (timer) => {
          let timeFraction = (timer - start) / duration;
          if (timeFraction > 1) timeFraction = 1;

          if (CA.active) {
            CA.setValue(timeFraction, percentage);
            CC.createCanvas(CA.val);
            CA.requestAnimationFrame(draw);
          } else {
            return;
          }
        };

        draw();
      } else {
        if (!dontRender) {
          if (percentage > 0) {
            CC.createCanvas(percentage);
            setDontRender(true);
          }
        }
      }
    }

    return () => {
      if (!!CA) {
        if (animation) {
          CA.cancelAnimationFrame();
        }
      }
    };
  });

  useEffect(() => {
    const per = (width / 100) * value;
    setPercentage(per);
  }, [value]);

  return <canvas ref={canvasRef} height={height} width={width} />;
};

RoundBarChartCanvas.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  value: PropTypes.number,
  direction: PropTypes.string,
  animation: PropTypes.bool,
  duration: PropTypes.number
};

export default RoundBarChartCanvas;
