import React from 'react';
import _ from 'underscore';

var Stock  = require('paths-js/stock');
var Axis = require('../component/Axis');

var Path = require('paths-js/path');

export default class Scatterplot extends React.Component {
    constructor(props) {
        super(props);

    }
    getMaxAndMin(chart, key,scale) {
        var maxValue;
        var minValue;
        _.each(chart.curves, function (serie) {
            var values = _.map(serie.item, function (item) {
                return item[key]
            });

            var max = _.max(values);
            if (maxValue === undefined || max > maxValue) maxValue = max;
            var min = _.min(values);
            if (minValue === undefined || min < minValue) minValue = min;
        });
        return {
            minValue: minValue,
            maxValue: maxValue,
            min:scale(minValue),
            max:scale(maxValue)
        }
    }
    onEnter(index,event) {
        this.props.data[0][index].selected = true;
        this.setState({data: this.props.data});
    }
    onLeave(index,event){
        this.props.data[0][index].selected = false;
        this.setState({data:this.props.data});
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
        var chart = Stock({
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
            x:this.getMaxAndMin(chart,this.props.xKey,chart.xscale),
            y:this.getMaxAndMin(chart,this.props.yKey,chart.yscale),
            margin:options.margin
        };

        var transparent = {opacity: 0.5};

        var points = _.map(chart.curves, function (c, i) {
            return _.map(c.line.path.points(),function(p,j) {
                var item = c.item[j];
                return (<g transform={"translate(" + p[0] + "," + p[1] + ")"}>
                    <circle r="5" cx="0" cy="0" stroke="blue" fill="white" onMouseEnter={this.onEnter.bind(this,j)} onMouseLeave={this.onLeave.bind(this,j)}/>
                    {item.selected?<text transform="translate(15, 5)" text-anchor="start">{item.title}</text>:null}
                </g>)
            },this)
        },this);

        //margins
        var y = options.margin !== undefined?options.margin.top || 0:0;
        var x = options.margin !== undefined?options.margin.left || 0:0;

        return <svg ref="vivus" width={width} height={height}>
            <g transform={"translate(" + x + "," + y + ")"}>
                { points }
                <Axis scale ={chart.xscale} options={options.axisX} chartArea={chartArea} />
                <Axis scale ={chart.yscale} options={options.axisY} chartArea={chartArea} />
            </g>
        </svg>
    }
}