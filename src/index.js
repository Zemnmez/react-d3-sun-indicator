import React, { Component } from 'react'
import D3 from 'reactive-d3';
import * as d3 from 'd3';

import styles from './styles.css';

const secondsInADay = 24 * 60 * 60;
export default class SunIndicator extends React.Component {
  join({main, width, height}) {
    let {time = new Date(), bgc = "white", fgc = "black"} = this.props;
    let svg = d3.select(main);
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    let seconds = time.getHours()*60*60 + time.getMinutes() * 60 + time.getSeconds();

    let ratio = seconds / secondsInADay;

    let phases = [
      {name: "before", value: 100 * ratio, class: styles.travelled},
      {name: "after", value: 100 * (1 - ratio), class: styles.remaining}
    ];

    const arcs = d3.pie().sort(null).value(d => d.value)
      .startAngle(Math.PI* (-1/2) ).endAngle(Math.PI / 2)(phases);

    const r = Math.min(width, height)/2-1;
    const arc = d3.arc().innerRadius(0).outerRadius(r);

    const g = d3.select("."+styles.centre);

    g.attr("transform", `translate(${width /2},${height/2})`)

    // take *just* the arc, rather than the segment ... just delete everything
    // past L
    const justArc = (...etc) => arc(...etc).replace(/L.*$/g, "");

    let segments = g.selectAll("path").data(arcs);

    segments.exit().remove();

    segments = segments.enter().append("path")
        .merge(segments)
        .attr("fill", d => "none")
        .attr("stroke", d => fgc)
        .attr("d", justArc)
        .attr("class", d => d.data.class)
        .each((d, i, n) => {
          let titles = d3.select(n[i]).selectAll("title");

          titles.exit().remove();

          titles.enter()
            .append("title")
            .merge(titles)
            .text(d => d.data.name);
        });



    // draw a sunny circle
    const passedPath = segments.filter("." + styles.travelled).attr("d");
    const [finalX, finalY] = /[\d-.e]+,[\d-.e]+$/.exec(passedPath)[0].split(",");

    let circles = g.selectAll("circle").data([[finalX, finalY]]);

    circles.exit().remove();

    circles = circles.enter()
      .append("circle")
      .merge(circles)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("class", styles.sun)
      .attr("cx", ([x, y]) => x)
      .attr("cy", ([x, y]) => y)
      .attr("r", r / 20);


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

