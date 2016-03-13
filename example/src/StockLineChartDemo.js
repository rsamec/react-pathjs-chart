import React from 'react';
import {StockLine} from 'react-pathjs-chart';
import genie from 'genie'
import ChartDemo from './ChartDemo.js';
import _ from 'lodash';

export class StockLineDemo {
    get dataTemplate() {
       return {
           data: {
               min: 30,
               max: 80,
               template: {
                   title: {
                       pattern: 'brState'
                   },
                   a: {
                       min: 10000,
                       max: 100000,
                       places: 0
                   },
                   b: {
                       min: 50000,
                       max: 200000,
                       places: 0
                   },
                   c: {
                       min: 100000,
                       max: 300000,
                       places: 0
                   }
               }
           }
       }
    }
    get options() {
        return {
            width:600,
            height:600,
            color:'#2980B9',
            margin: {top: 40, left: 60, bottom: 50, right: 20},
            animate:{
                type:'delayed',
                duration:200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                tickValues:[],
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
                tickValues:[],
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
        return {xKey:"x",yKey:"y"}
    }
    generateData(dataTemplate){
        var clone = _.cloneDeep(dataTemplate);
        clone.data.template.index = function () {
            return index++;
        };
        var index = 0;
        var data = genie(clone).data;
        var map = function(item){return {x:item.index,y:item[this]}};
        return [_.map(data,map,'a'),_.map(data,map,'b'),_.map(data,map,'c')];
    }
}

export default class StockLineChartDemo extends ChartDemo {
    constructor(props) {
        super(props, StockLine, new StockLineDemo());
    }
};