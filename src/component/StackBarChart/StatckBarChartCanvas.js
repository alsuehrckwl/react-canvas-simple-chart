import React, { useRef, useState, useEffect } from 'react';
import CanvasContexUtil from '../../canvas/canvasContextUtil';
import CanvasAnimation from '../../canvas/canvasAnimation';
import PropTypes from 'prop-types';

const StackBarChartCanvas = ({
  height,
  width,
  value,
  direction,
  animation,
  duration
}) => {
  const canvasRef = useRef(null);
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
          color: '#3498DB',
          direction,
          value
        },
        'StackBarChart'
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
            CA.setValue(timeFraction, width);
            CC.createCanvas(CA.val);
            CA.requestAnimationFrame(draw);
          } else {
            return;
          }
        };

        draw();
      } else {
        if (!dontRender) {
          CC.createCanvas(width);
          setDontRender(true);
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

  return <canvas ref={canvasRef} height={height} width={width} />;
};

StackBarChartCanvas.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.number),
  direction: PropTypes.string,
  animation: PropTypes.bool,
  duration: PropTypes.number
};

export default StackBarChartCanvas;
