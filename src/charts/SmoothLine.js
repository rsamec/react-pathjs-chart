import React from 'react';
import _ from 'underscore';

var SmoothLine = require('paths-js/smooth-line');
var Axis = require('../component/Axis');

var Path = require('paths-js/path');

export default class SmoothLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showAreas: true};
    }
    getMaxAndMin(chart, key) {
        var maxValue = 0;
        var minValue = 0;
        _.each(chart.curves, function (serie) {
            var values = _.map(serie.item, function (item) {
                return item[key]
            });

            var max = _.max(values);
            if (max > maxValue) maxValue = max;
            var min = _.min(values);
            if (min < minValue) minValue = min;
        });
        return {
            minValue: minValue,
            maxValue: maxValue,
            min: key === "x" ? chart.xscale(minValue) : chart.yscale(minValue),
            max: key === "x" ? chart.xscale(maxValue) : chart.yscale(maxValue)
        }
    }

    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

        var options = this.props.options || {};
        if (options.axisX === undefined) options.axisX = {};
        if (options.axisY === undefined) options.axisY = {};

        var width = this.props.width || 450;
        var height = this.props.height || 350;



        var palette = this.props.palette || ["#3E90F0", "#7881C2", "#707B82"];
        var accessor = function (key) {
            return function (x) {
                return x[key];
            }
        };
        var chart = SmoothLine({
            data: this.props.data,
            xaccessor: accessor(this.props.xKey),
            yaccessor: accessor(this.props.yKey),
            width: width,
            height: height,
            closed: false
        });

        //add right + left
        if (options.margin !== undefined) width += (options.margin.right || 0) +  (options.margin.left || 0);
        //add top + bottom
        if (options.margin !== undefined) height += (options.margin.top || 0) + (options.margin.bottom || 0);

        var chartArea = {
            x:this.getMaxAndMin(chart,"x"),
            y:this.getMaxAndMin(chart,"y"),
            margin:options.margin
        };

        var transparent = {opacity: 0.5};

        var lines = _.map(chart.curves, function (c, i) {
            return <path d={ c.line.path.print() } stroke={ palette[i] } fill="none"/>
        });
        var areas = _.map(chart.curves, function (c, i) {
            //var transparent = { opacity: 0.5 };
            return <path d={ c.area.path.print() } style={ transparent } stroke="none" fill={ palette[i] }/>
        });

        //margins
        var y = options.margin !== undefined?options.margin.top || 0:0;
        var x = options.margin !== undefined?options.margin.left || 0:0;

        return <svg ref="vivus" width={width} height={height}>
            <g transform={"translate(" + x + "," + y + ")"}>
                { this.state.showAreas ? areas : null }
                { lines }
                <Axis scale ={chart.xscale} options={options.axisX} chartArea={chartArea} />
                <Axis scale ={chart.yscale} options={options.axisY} chartArea={chartArea} />
            </g>
        </svg>
    }
}