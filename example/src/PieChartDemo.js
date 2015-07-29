import React from 'react';
import {Pie,Tree,SmoothLine,SmoothLineVivus,Radar,Bar,Scatterplot} from 'react-pathjs-chart';
import genie from 'genie'
import {ChartDemo} from './ChartOptions.js';

export class PieDemo {
    get dataTemplate() {
        return {
            data: {
                min: 5,
                max: 5,
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
            legendPosition: 'topLeft'
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
