import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function SingleBarChartD3({
  height,
  width,
  value,
  text,
  color,
  bg = '#ECEFF3',
  location = 'left',
  active
}) {
  const divRef = useRef();
  const [datas, setData] = useState([value]);
  const div = d3
    .select(divRef.current)
    .attr('width', width)
    .attr('height', height);

  useEffect(() => {
    setData([{ value, text }]);
  }, [value, text]);

  useEffect(() => {
    const update = div.selectAll('div').data(datas);

    const enter = update.enter();

    enter.append('div').attr('class', 'background');
    enter.append('div').attr('class', 'bar');
    enter.append('span').attr('class', 'text');

    const bar = update.merge(enter);
    const text = update.merge(enter);

    bar
      .select('.background')
      .style('width', `${width}px`)
      .style('height', `${height}px`)
      .style('background-color', bg);

    bar
      .select('.bar')
      .style('position', 'absolute')
      .style('top', '0')
      .style(location === 'left' ? 'right' : 'left', '0')
      .style('width', `${0}px`)
      .style('height', `${height}px`)
      .transition()
      .duration(750)
      .style('width', (d) => {
        return `${d.value}%`;
      })
      .style('background-color', active ? '#c8363b' : '#54575e');

    text
      .select('.text')
      .style('position', 'absolute')
      .style('top', '0')
      .style(location === 'left' ? 'right' : 'left', '0')
      .style('height', `${height}px`)
      .style('font-family', 'Tahoma')
      .style('font-size', '11px')
      .style('color', 'white')
      .style('opacity', 0)
      .style('width', `${value - 3}%`)
      .style('text-align', location)
      .transition()
      .duration(750)
      .delay(300)
      .style('opacity', 1)
      .text((d) => d.text);

    update.exit().remove();
  }, [datas]);

  return <div ref={divRef} style={{ position: 'relative' }}></div>;
}

export default SingleBarChartD3;
