import React, { Component } from 'react'
import D3 from 'reactive-d3';
import * as d3 from 'd3';

import styles from './styles.css';

const secondsInADay = 24 * 60 * 60;
export default class SunIndicator extends React.Component {
  join({main, width, height}) {
    let {
      time = new Date(),
      bgc = "white",
      fgc = "black",
      sunScale = 0.1
    } = this.props;

    const rx = width / 2;
    const ry = height;
    const sunr = Math.max(rx, ry) * sunScale;
    const margin = {
      top: sunr + 1,
      right: sunr + 1,
      bottom: sunr + 1,
      left: sunr + 1
    };


    let svg = d3.select(main);
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    let seconds = time.getHours()*60*60 + time.getMinutes() * 60 + time.getSeconds();

    let ratio = seconds / secondsInADay;

    let g = svg.select("."+styles.centre);
    g.attr("transform", `translate(${width/2},${height})`);


    let full = g.selectAll("."+styles.full).data([1]);

    full.exit().remove();

    full = full.enter()
      .append("path")
      .attr("clip-path", "url(#"+styles.remainingClip+")")
      .attr("class", styles.full)
      .merge(full)
      .attr(
        "d",
        `M${-rx + margin.left} ${0 - margin.bottom}A${rx - margin.left} ${ry - margin.top * 2} 0 0 1 ${rx - margin.right} ${0-margin.bottom}`
      );

    const sunPt = full.node().getPointAtLength(
      full.node().getTotalLength() * ratio
    );


    // draw a sunny circle
    let circles = g.selectAll("circle").data([sunPt]);

    circles.exit().remove();

    circles = circles.enter()
      .append("circle")
      .merge(circles)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("class", styles.sun)
      .attr("cx", ({ x, y }) => x)
      .attr("cy", ({ x, y }) => y)
      .attr("r", Math.min(rx, ry) * sunScale);


  }

  render() {
    let {className, time, ...etc} = this.props;

    return <D3 className={styles.indicator + (className || "")}
      {...etc} join={({...etc}) => this.join(etc)}>

      <svg>
        <g className={styles.centre} />
      </svg>
    </D3>
  }
}

