import React from 'react';
import {Pie} from 'react-pathjs-chart';
import genie from 'genie'
import ChartDemo from './ChartDemo.js';

export class PieDemo {
    get dataTemplate() {
        return {
            data: {
                min: 2,
                max: 10,
                template: {
                    name: {
                        pattern: 'brState'
                    },
                    population: {
                        min: 10000,
                        max: 10000000
                    }
                }
            }
        }
    }
    get options() {
        return {
            margin: {top: 20, left: 20, right: 20, bottom: 20},
            width: 600,
            height: 600,
            color: '#2980B9',
            r: 100,
            R: 200,
            legendPosition: 'topLeft',
            animate:{
                type:'oneByOne',
                duration:200,
                fillTransition:3
            },
            label:{
                fontFamily:'Arial',
                fontSize:14,
                fontWeight:true,
                color:'#ECF0F1'
            }
        }
    }
    get props(){
        return {accessorKey:"population"}
    }
    generateData(dataTemplate){
        return genie(dataTemplate).data;
    }
}

export default class PieChartDemo extends ChartDemo {
    constructor(props) {
        super(props, Pie, new PieDemo());
    }
};
