import React from 'react';
import {Pie,Tree,SmoothLine,Radar,Bar,Scatterplot} from 'react-pathjs-chart';
import genie from 'genie'
import {ChartDemo} from './ChartOptions.js';
import _ from 'underscore';


export class SmoothLineDemo {
    get dataTemplate() {
        return {
            n:3,
            a: 1,
            b: 0,
            c: 0
        }
    }
    get options() {
        return {
            width:600,
            height:600,
            color:'#2980B9',
            margin: {top: 40, left: 60, bottom: 50, right: 20},
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom'
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left'
            }
        }
    }
    get props(){
        return {xKey:"x",yKey:"y"}
    }
    generateData(dataTemplate){
        var xs = _.range(-10, 11, 1);
        var nPolynom = function (n, a, b, c) {
            return _.map(xs, function (x) {
                return {x: x, y: a * Math.pow(x, n) + b * x + c}
            })
        };
        return [nPolynom(dataTemplate.n,dataTemplate.a,dataTemplate.b,dataTemplate.c),nPolynom(dataTemplate.n -1,dataTemplate.a,dataTemplate.b,dataTemplate.c)]
    }
}

export default class SmoothLineChartDemo extends ChartDemo {
    constructor(props) {
        super(props, SmoothLine, new SmoothLineDemo());
    }
};