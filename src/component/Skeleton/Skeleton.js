import React from 'react';
import './Skeleton.scss';

function Skeleton({
  count = 1,
  width = null,
  height = null,
  margin = null,
  marginPosition = null,
  circle = false
}) {
  let arr = [];

  for (let i = 0; i < count; i++) {
    let style = {};

    if (width) {
      style.width = width;
    }

    if (height) {
      style.height = height;
    }

    if (width && height && circle) {
      style.borderRadius = '50%';
    }

    if (margin) {
      if (marginPosition) {
        const split = marginPosition.split('');
        const pixel = `${margin}px`;

        style[
          `margin${split[0].toUpperCase()}${split
            .slice(1, split.length)
            .join('')}`
        ] = pixel;
      } else {
        style.margin = pixel;
      }
    }

    arr.push(
      <span key={i} className={`skeleton-loader`} style={style}>
        &zwnj;
      </span>
    );
  }

  return arr.map((element, i) => element);
}

export default Skeleton;
