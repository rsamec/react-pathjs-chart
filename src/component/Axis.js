import _ from 'underscore';
var Path = require('paths-js/path');

export default class Axis {
    constructor(scale, options, ranges, margin, x) {
        this.scale = scale;
        this.options = options;
        this.ranges = ranges;
        this.margin = margin;
        this.x = x;
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

    axis() {

        var x = this.x;

        var xAxis = this.ranges.x;
        var yAxis = this.ranges.y;
        var currentAxis = x?xAxis:yAxis;

        var tickInterval = this.options.tickCount || 10;

        var ticks = this.options.tickValues !== undefined? _.map(this.options.tickValues,function(v){return v.value }): Axis.getTickValues(currentAxis, tickInterval);
        var fixed = this.options.zeroAxis?this.scale(0):x?yAxis.min:xAxis.min;

        var start = {x: x?xAxis.min:fixed, y: x?fixed:yAxis.min};
        var end = {x:x?xAxis.max:fixed,y: x?fixed:yAxis.max};

        var margin = this.margin;
        if (margin !== undefined){
            if (x){
                start.x -= margin.left || 0;
                end.x += margin.right || 0;
            }
            else {
                start.y += margin.bottom || 0;
                end.y -= margin.top || 0;
            }
        }

        return {
            item: currentAxis,
            path: Path().moveto(start).lineto(end).closepath(),
            ticks: ticks,
            lines: _.map(ticks, function (c) {
                var lineStart = {x: x ? this.scale(c) : xAxis.min, y: x ? yAxis.min : this.scale(c)};
                return Path().moveto(lineStart).lineto(x ? lineStart.x : xAxis.max, x ? yAxis.max : lineStart.y);
            },this)
        };
    }
}