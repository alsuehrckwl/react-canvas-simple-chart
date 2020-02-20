import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../Skeleton/Skeleton';
import StackBarChartCanvas from './StatckBarChartCanvas';
import './StackBarChart.scss';

const _SIZE = {
  height: 0,
  width: 0
};

const StackBarCharts = ({
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
    <div className="stack-bar-chart" ref={chartWrapper}>
      {initSize ? (
        <StackBarChartCanvas
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

StackBarCharts.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number),
  direction: PropTypes.string,
  animation: PropTypes.bool,
  duration: PropTypes.number
};

export default StackBarCharts;
