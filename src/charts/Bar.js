import React from 'react';
import Colors from '../pallete/Colors.js';
import _ from 'underscore';
import Options from '../component/Options.js';

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

export default class BarChart extends  React.Component
{
    constructor(props){
        super(props);
        this.state = {finished: true};
    }
    color(i) {
        var pallete = this.props.pallete || Colors.mix(this.props.options.color || '#9ac7f7');
        return Colors.string(cyclic(pallete, i));
    }
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
    }
    //componentWillReceiveProps(nextProps) {
    //    if (this.props.data !== nextProps.data) this.setState({ finished:false});
    //}
    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

        var options = new Options(this.props);
        var accessor = this.props.accessor || identity(this.props.accessorKey);

        var chart = Bar({
            data: this.props.data,
            gutter: this.props.options.gutter || 10,
            width: options.chartWidth,
            height: options.chartHeight,
            accessor: accessor
        });

        var values = _.map(chart.curves, function (curve) {
            return accessor(curve.item);
        });

        var chartArea = {x: {minValue: 0, maxValue: 200, min: 0, max: options.chartWidth}, y: this.getMaxAndMin(values, chart.scale)};

        var sec = options.animate.fillTransition || 0;
        var fillOpacityStyle = {fillOpacity:this.state.finished?1:0,transition: this.state.finished?'fill-opacity ' + sec + 's':''};

        var textStyle = _.clone(options.axisX.label);
        if (textStyle !== undefined) textStyle.fontWeight =textStyle.fontWeight?'bold':'normal';

        var lines = chart.curves.map(function (c, i) {
            var color = this.color(i % 3);
            var stroke = Colors.darkenColor(color);
            return (
                <g>
                    <path d={ c.line.path.print() } style={fillOpacityStyle} stroke={stroke} fill={ color }/>
                    {options.axisX.showLabels ?
                        <text style={textStyle} transform={"translate(" + c.line.centroid[0] +  "," +  (chartArea.y.min + 25) + ")rotate(45)"} textAnchor="middle">{c.item.name}</text>
                        :null}
                </g>
            )
        }, this);

        return (<svg  ref="vivus" width={options.width} height={options.height}>
                    <g transform={"translate(" + options.margin.left + "," + options.margin.top + ")"}>
                        <Axis scale ={chart.scale} options={options.axisY} chartArea={chartArea} />
                        {lines}
                    </g>
                </svg>)
    }
};
