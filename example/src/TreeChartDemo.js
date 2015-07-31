import React from 'react';
import {Tree} from 'react-pathjs-chart';
import genie from 'genie'
import ChartDemo from './ChartDemo.js';

export class TreeDemo {
    get dataTemplate() {
        var leafTemplate = {
            min: 1,
            max: 5,
            template: {
                name: {
                    pattern: 'lastName'
                }
            }
        };
        return {
            name: {
                format: 'Root'
            },
            children: {
                min: 3,
                max: 6,
                template: {
                    name: {pattern: 'brState'},
                    children: leafTemplate
                }
            }
        }
    }
    get options() {
        return {
            margin: {top: 20, left: 50, right: 80, bottom: 20},
            width:600,
            height:600,
            fill: "#2980B9",
            stroke: "#3E90F0",
            r:5,
            animate:{
                type:'oneByOne',
                duration:200,
                fillTransition:3
            },
            label:{
                fontFamily:'Arial',
                fontSize:14,
                fontWeight:true,
                fill:'#34495E'
            }
        }
    }
    get props(){
        return {}
    }
    generateData(dataTemplate){
        return genie(dataTemplate);
    }
}

export default class TreeChartDemo extends ChartDemo {
    constructor(props) {
        super(props, Tree, new TreeDemo());
    }
};