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

        var ranges = {x:this.getMaxAndMin(chart,"x"),y:this.getMaxAndMin(chart,"y")};
        var axis = {
            x: new Axis(chart.xscale,options.axisX,ranges,options.margin,true).axis(),
            y: new Axis(chart.yscale,options.axisY,ranges,options.margin,false).axis()
        };

        var transparent = {opacity: 0.5};

        var lines = _.map(chart.curves, function (c, i) {
            return <path d={ c.line.path.print() } stroke={ palette[i] } fill="none"/>
        });
        var areas = _.map(chart.curves, function (c, i) {
            //var transparent = { opacity: 0.5 };
            return <path d={ c.area.path.print() } style={ transparent } stroke="none" fill={ palette[i] }/>
        });

        //var points = _.map(chart.curves[0].item, function (c, i) {
        //    return (
        //    <g key={i} transform={"translate(" + chart.xscale(c.x) + "," +  chart.yscale(c.y) + ")"}>
        //        <circle r="2" cx="0" cy="0" stroke="grey" fill="grey"/>
        //        <text transform="translate(-5, 0)" textAnchor="end">{c}</text>
        //    </g>)
        //});

        //var xOrient = chart.options.axisX.orient || 'bottom';

        var xTicks =_.map(axis.x.ticks, function (c, i) {
             var label = options.axisX.labelComponent !== undefined? React.cloneElement(options.axisX.labelComponent,{value:c}):c;
             return (<g key={ i } transform={"translate(" + chart.xscale(c) + "," +  axis.y.item.min + ")"}>
                    {options.axisX.showTicks ? <circle r="2" cx="0" cy="0" stroke="grey" fill="grey"/> : null}
                    {options.axisX.showLabels ?
                        <text transform="translate(-5, 20)" textAnchor="start">{label}</text> : null}
                </g>)
        });

        //var yOrient = chart.options.axisY.orient || 'bottom';
        //var xSign = yOrient === "top" || yOrient == "left" ? -1:1;
        //var x = sign * 50;
        //var y = sign * 10
        var yTicks = _.map(axis.y.ticks, function (c, i) {
            var label = options.axisY.labelComponent !== undefined? React.cloneElement(options.axisY.labelComponent,{value:c}):c;
            return (
                <g key={ i } transform={"translate(" + axis.x.item.min + "," +  chart.yscale(c) + ")"}>
                    {options.axisY.showTicks ? <circle r="2" cx="0" cy="0" stroke="grey" fill="grey"/> : null}
                    {options.axisY.showLabels ?
                        <text transform="translate(-5, 0)" textAnchor="end">{label}</text> : null}
                </g>)
        });

        var xGridLines = options.axisX.showLines ? _.map(axis.x.lines, function (c, i) {
            return (<path d={c.print()} style={ transparent } stroke="#3E90F0" fill="none"/>)
        }) : [];
        var yGridLines = options.axisY.showLines ? _.map(axis.y.lines, function (c, i) {
            return (<path d={c.print()} style={ transparent } stroke="#3E90F0" fill="none"/>)
        }) : [];
        //
        //var children = [this.state.showAreas ? areas : null,lines,points,xTicks,yTicks,
        //    //options.axisX.showAxis ? <path d={axis.x.path.print()} style={ transparent } stroke="#3E90F0" fill="none"/> : null,
        //    //options.axisX.showAxis ? <path d={axis.y.path.print()} style={ transparent } stroke="#3E90F0" fill="none"/> : null,
        //    xGridLines,yGridLines];
        //
        //children = _.filter(children,function(item){return item !== null});
        //var obj = _.object(_map(_.range(0, children.length),function(e,i){return "key" + i}),children);
        //var fragment = React.addons.createFragment(obj);

        //margins
        var y = options.margin !== undefined?options.margin.top || 0:0;
        var x = options.margin !== undefined?options.margin.left || 0:0;

        return <svg ref="vivus" width={width} height={height}>
            <g transform={"translate(" + x + "," + y + ")"}>
                { this.state.showAreas ? areas : null }
                { lines }
                {options.axisX.showAxis ?
                    <path d={axis.x.path.print()} style={ transparent } stroke="#3E90F0" strokeWidth={3} fill="none"/> : null}
                {options.axisY.showAxis ?
                    <path d={axis.y.path.print()} style={ transparent } stroke="#3E90F0" strokeWidth={3} fill="none"/> : null}
                {xTicks}
                {yTicks}
                {xGridLines}
                {yGridLines}
            </g>
        </svg>
    }
}