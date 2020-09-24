import React, { useState, useRef, useEffect } from 'react';
import Skeleton from 'components/skeleton';
import SingleBarChartD3 from './SingleBarChartD3';

const _SIZE = {
  height: 0,
  width: 0
};

const SingleBarChart = ({ value, text, color = null, location, active }) => {
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
        <SingleBarChartD3
          height={canvasSize.height}
          width={canvasSize.width}
          value={value}
          text={text}
          color={color}
          location={location}
          active={active}
        />
      ) : (
        <Skeleton height={canvasSize.height} width={canvasSize.width} />
      )}
    </div>
  );
};

export default SingleBarChart;
