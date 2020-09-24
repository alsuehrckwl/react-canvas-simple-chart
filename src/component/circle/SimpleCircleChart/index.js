import React, { useState, useRef, useEffect } from 'react';
import SimpleCircleChartD3 from './SimpleCircleChartD3';
import Skeleton from 'components/skeleton';

const _SIZE = {
  height: 0,
  width: 0
};

const SimpleCircleChart = ({ value, text, color = null }) => {
  const chartWrapper = useRef(null);
  const [initSize, setInitSize] = useState(false);
  const [canvasSize, setCanvasSize] = useState(_SIZE);

  useEffect(() => {
    const el = chartWrapper.current;

    setCanvasSize({
      height: el.clientHeight,
      width: el.clientWidth
    });
    setInitSize(true);
  }, [chartWrapper]);

  return (
    <div className="simple-circle-chart" ref={chartWrapper}>
      {initSize ? (
        <SimpleCircleChartD3
          height={canvasSize.height}
          width={canvasSize.width}
          value={value}
          text={text}
          color={color}
        />
      ) : (
        <Skeleton height={canvasSize.height} width={canvasSize.width} />
      )}
    </div>
  );
};

export default SimpleCircleChart;
