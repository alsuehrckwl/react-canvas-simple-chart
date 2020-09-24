import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

// const data = [25, 30, 45, 60, 20];

function SimpleCircleChartD3({ height, width, value, text, color }) {
  const svgRef = useRef();

  const [datas, setData] = useState([value]);
  const radius = Math.min(width, height);
  const innerRadius = radius / 2.5;
  const outerRadius = radius / 2;
  const duration = 500;

  const svg = d3
    .select(svgRef.current)
    .attr('width', width)
    .attr('height', height);

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0);

  useEffect(() => {
    setData([value]);
  }, [value]);

  useEffect(() => {
    const update = svg.selectAll('g').data(datas);

    const enter = update
      .enter()
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    enter.append('path').attr('class', 'background');
    enter.append('path').attr('class', 'circle');
    enter.append('text');

    const circle = update.merge(enter);
    const textSvg = update.merge(enter);

    circle
      .select('.background')
      .datum({ endAngle: 360 * (Math.PI / 180) })
      .style('fill', '#f3f4f5')
      .attr('d', arc);

    circle
      .select('.circle')
      .datum({ startAngle: 0, endAngle: (360 / 100) * datas * (Math.PI / 180) })
      .style('fill', !!color ? color : 'orange')
      .attr('d', arc)
      .transition()
      .delay(0)
      .duration(duration)
      .attrTween('d', (d) => {
        const interpolate = d3.interpolate(d.startAngle, d.endAngle - 0.03);
        return (t) => {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });

    textSvg
      .select('text')
      .text(text)
      .attr('x', 0)
      .attr('y', 3)
      .attr('font-family', '굴림')
      .attr('font-size', '9px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle');

    update.exit().remove();
  }, [datas]);

  return <svg ref={svgRef}></svg>;
}

export default SimpleCircleChartD3;
