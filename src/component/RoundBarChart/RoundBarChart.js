import React, { useState, useRef, useEffect } from 'react';
import './RoundBarChart.scss';
import Skeleton from '../Skeleton/Skeleton';
import PropTypes from 'prop-types';
import RoundBarChartCanvas from './RoundBarChartCanvas';

const _SIZE = {
  height: 0,
  width: 0
};

const RoundBarChart = ({
  value,
  direction,
  animation = true,
  duration = 1000
}) => {
  const chartWrapper = useRef(null);
  const [initSize, setInitSize] = useState(false);
  const [canvasSize, setCanvasSize] = useState(_SIZE);

  useEffect(() => {
    const el = chartWrapper.current;

    setCanvasSize({
      height: el.parentNode.clientHeight,
      width: el.parentNode.clientWidth
    });
    setInitSize(true);
  }, [chartWrapper]);

  return (
    <div className="round-bar-chart" ref={chartWrapper}>
      {initSize ? (
        <RoundBarChartCanvas
          height={canvasSize.height}
          width={canvasSize.width}
          value={value}
          direction={direction}
          animation={animation}
          duration={duration}
        />
      ) : (
        <Skeleton height={canvasSize.height} width={canvasSize.width} />
      )}
    </div>
  );
};

RoundBarChart.propTypes = {
  value: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  animation: PropTypes.bool,
  duration: PropTypes.number
};

export default RoundBarChart;
