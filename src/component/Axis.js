import _ from 'underscore';
var Path = require('paths-js/path');

export default class Axis {
    constructor(chart, options) {

        chart.options = options;

        var axis = this.getAxis(chart);
        this.x= axis.x;
        this.y = axis.y;
    }

    static getMaxAndMin(chart, key) {
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

    //static calcStepSize(range, targetSteps)
    //{
    //    // calculate an initial guess at step size
    //    var tempStep = range / targetSteps;
    //
    //    // get the magnitude of the step size
    //    var mag = Math.floor(Math.log(tempStep) /  Math.log(10));
    //    var magPow = Math.pow(10, mag);
    //
    //    // calculate most significant digit of the new step size
    //    var magMsd = Math.round(tempStep / magPow + 0.5);
    //
    //    // promote the MSD to either 1, 2, or 5
    //    if (magMsd > 5.0)
    //        magMsd = 10.0;
    //    else if (magMsd > 2.0)
    //        magMsd = 5.0;
    //    else if (magMsd > 1.0)
    //        magMsd = 2.0;
    //
    //    return magMsd * magPow;
    //}

    static getTickValues(axis, tickCount) {
        var tickStep = Math.round((axis.maxValue - axis.minValue) / tickCount, 0);
        return _.range(axis.minValue, axis.maxValue + 1,tickStep);
    }

    getAxis(chart) {

        var xAxis = Axis.getMaxAndMin(chart, "x");
        var yAxis = Axis.getMaxAndMin(chart, "y");

        var xTickInterval = chart.options.axisX.tickCount || 10;
        var yTickInterval = chart.options.axisY.tickCount || 10;

        var xTicks = chart.options.axisX.tickValues !== undefined? _.map(chart.options.axisX.tickValues,function(v){return v.value }): Axis.getTickValues(xAxis, xTickInterval);
        var yTicks = chart.options.axisY.tickValues !== undefined? _.map(chart.options.axisY.tickValues,function(v){return v.value }): Axis.getTickValues(yAxis, yTickInterval);

        var fixedX = chart.options.axisY.zeroAxis?chart.xscale(0):xAxis.min;
        var fixedY = chart.options.axisX.zeroAxis?chart.yscale(0):yAxis.min;

        var xStart = {x: xAxis.min, y: fixedY};
        var yStart = {x: fixedX, y: yAxis.min};
        var xEnd = {x:xAxis.max,y: fixedY};
        var yEnd = {x:fixedX,y: yAxis.max};

        var margin = chart.options.margin;
        if (margin !== undefined){
            yEnd.y -= margin.top || 0;
            xEnd.x += margin.right || 0;
            yStart.y += margin.bottom || 0;
            xStart.x -= margin.left || 0;
        }

        return {
            x: {
                item:xAxis,
                path: Path().moveto(xStart).lineto(xEnd).closepath(),
                ticks: xTicks,
                lines: _.map(xTicks, function (c) {
                    var lineStart = {x: chart.xscale(c), y: yAxis.min};
                    return Path().moveto(lineStart).lineto(lineStart.x, yAxis.max);
                })
            },
            y: {
                item:yAxis,
                path: Path().moveto(yStart).lineto(yEnd).closepath(),
                ticks: yTicks,
                lines: _.map(yTicks, function (c) {
                    var lineStart = {x: xAxis.min, y: chart.yscale(c)};
                    return Path().moveto(lineStart).lineto(xAxis.max, lineStart.y);
                })
            }
        };
    }
}