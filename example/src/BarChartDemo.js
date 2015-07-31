import React from 'react';
import {Bar} from 'react-pathjs-chart';
import genie from 'genie'
import ChartDemo from './ChartDemo.js';

export class BarDemo {
    get dataTemplate() {
        return {
            apples: {
                min: 4,
                max: 5,
                template: {
                    v: {
                        min: 10,
                        max: 50
                    },
                    name: {
                        format: 'apple'
                    }
                }
            },
            bananas: {
                min: 4,
                max: 5,
                template: {
                    v: {
                        min: 30,
                        max: 70
                    },
                    name: {
                        format: 'banana'
                    }
                }
            },
            grapes: {
                min: 4,
                max: 5,
                template: {
                    v: {
                        min: 10,
                        max: 30
                    },
                    name: {
                        format: 'grape'
                    }
                }
            }
        }
    }
    get options() {
        return {
            width:600,
            height:600,
            margin: {top: 20, left: 20, bottom: 50, right: 20},
            color:'#2980B9',
            gutter:20,
            animate:{
                type:'oneByOne',
                duration:200,
                fillTransition:3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label:{
                    fontFamily:'Arial',
                    fontSize:14,
                    fontWeight:true,
                    fill:'#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label:{
                    fontFamily:'Arial',
                    fontSize:14,
                    fontWeight:true,
                    fill:'#34495E'
                }
            }
        }
    }
    get props(){
        return {accessorKey:"v"}
    }
    generateData(dataTemplate){
        var bars = genie(dataTemplate);
        return [bars.apples, bars.bananas, bars.grapes];
    }
}

export default class BarChartDemo extends ChartDemo {
    constructor(props) {
        super(props, Bar, new BarDemo());
    }
};