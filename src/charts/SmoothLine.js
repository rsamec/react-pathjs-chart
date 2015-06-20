import React from 'react';
import _ from 'underscore';
import Vivus from 'vivus';

var SmoothLine = require('paths-js/smooth-line');

export default class SmoothLineChart extends React.Component {
    constructor(props){
        super(props);
        this.state = { showAreas: false };
    }
    componentDidMount() {
        new Vivus(this.refs.vivus.getDOMNode(), {
            type: 'delayed',
            duration: 200,
            start: 'autostart',
            selfDestroy: true
        }, this.addAreas.bind(this));
    }
    addAreas() {
        this.setState({ showAreas: true });
    }
    render () {
        var palette = this.props.palette ||  ["#3E90F0", "#7881C2", "#707B82"];
        var accessor = function(key) {  return function (x) {return x[key];} };
        var chart = SmoothLine({
            data: this.props.data,
            xaccessor: accessor(this.props.xKey),
            yaccessor: accessor(this.props.yKey),
            width: this.props.width || 450,
            height: this.props.height || 350,
            closed: false
        });
        var lines = _.map(chart.curves,function(c, i) {
            return <path d={ c.line.path.print() } stroke={ palette[i] } fill="none" />
        });
        var areas = _.map(chart.curves,function(c, i) {
            var transparent = { opacity: 0.5 };
            return <path d={ c.area.path.print() } style={ transparent } stroke="none" fill={ palette[i] } />
        });
        return <svg ref="vivus" width="500" height="400">
            <g transform="translate(30, 0)">
          { this.state.showAreas ? areas : null }
          { lines }
            </g>
        </svg>
    }
}