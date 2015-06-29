import React from 'react';
import Colors from '../pallete/Colors.js';
import _ from 'underscore';
var Bar = require('paths-js/bar');

var Axis = require('../component/Axis');

function cyclic(coll, i) {
    return coll[i % coll.length];
}
function identity(key) {
    return function (x) {
        return x[key];
    }
};
function color(key) {
    return function (x) {
        return x[key];
    }
};

var BarChart = React.createClass({
    color(i) {
        var pallete = this.props.pallete || Colors.mix(this.props.color || '#9ac7f7');
        return Colors.string(cyclic(pallete, i));
    },
    getMaxAndMin(values, scale) {
        var maxValue = 0;
        var minValue = 0;

        var max = _.max(values);
        if (max > maxValue) maxValue = max;
        var min = _.min(values);
        if (min < minValue) minValue = min;

        return {
            minValue: minValue,
            maxValue: maxValue,
            min: scale(minValue),
            max: scale(maxValue)
        }
    },
    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

        var width = this.props.width || 200;
        var height = this.props.height || 200;

        var accessor = this.props.accessor || identity(this.props.accessorKey);

        var chart = Bar({
            data: this.props.data,
            gutter: this.props.gutter || 10,
            width: width,
            height: height,
            accessor: accessor
        });

        var options = this.props.options || {};
        if (options.axisX === undefined) options.axisX = {};
        if (options.axisY === undefined) options.axisY = {};

        var values = _.map(chart.curves, function (curve) {
            return accessor(curve.item);
        });


        //add right + left
        if (options.margin !== undefined) width += (options.margin.right || 0) + (options.margin.left || 0);
        //add top + bottom
        if (options.margin !== undefined) height += (options.margin.top || 0) + (options.margin.bottom || 0);

        var ranges = {x: {minValue: 0, maxValue: 200, min: 0, max: width}, y: this.getMaxAndMin(values, chart.scale)};

        var axis = {
            x: new Axis(chart.scale, options.axisX, ranges, options.margin, true).axis(),
            y: new Axis(chart.scale, options.axisY, ranges, options.margin, false).axis()
        };
//        var axis = new Axis(chart,options);

        var self = this;
        var lines = chart.curves.map(function (c, i) {
            return (
                <g>
                    <path d={ c.line.path.print() } stroke="none" fill={ this.color(i % 3) }/>
                    {options.axisX.showLabels ?
                        <text  transform={"translate(" + c.line.centroid[0] +  "," +  (axis.y.item.min + 25) + ")rotate(45)"} textAnchor="middle">{c.item.name}</text>
                        :null}
                </g>
            )
        }, this);

        var yTicks = _.map(axis.y.ticks, function (c, i) {
            var label = options.axisY.labelComponent !== undefined? React.cloneElement(options.axisY.labelComponent,{value:c}):c;
            return (
                <g key={ i } transform={"translate(" + axis.x.item.min + "," +  chart.scale(c) + ")"}>
                    {options.axisY.showTicks ? <circle r="2" cx="0" cy="0" stroke="grey" fill="grey"/> : null}
                    {options.axisY.showLabels ?
                        <text transform="translate(-5, 0)" textAnchor="end">{label}</text> : null}
                </g>)
        });

        var transparent = {opacity: 0.5};

        var yGridLines = options.axisY.showLines ? _.map(axis.y.lines, function (c, i) {
            return (<path d={c.print()} style={ transparent } stroke="#3E90F0"  fill="none"/>)
        }) : [];


        //margins
        var y = options.margin !== undefined ? options.margin.top || 0 : 0;
        var x = options.margin !== undefined ? options.margin.left || 0 : 0;

        return (
            <div className="bar">
                <svg width={width} height={height}>
                    <g transform={"translate(" + x + "," + y + ")"}>
                        {yGridLines}
                        {yTicks}
                        {lines}
                        {options.axisX.showAxis ?
                            <path d={axis.x.path.print()} style={ transparent } stroke="#3E90F0" strokeWidth={3}
                                  fill="none"/> : null}
                        {options.axisY.showAxis ?
                            <path d={axis.y.path.print()} style={ transparent } stroke="#3E90F0" strokeWidth={3}
                                  fill="none"/> : null}


                    </g>
                </svg>
            </div>
        )
    }
});

export default BarChart;
