import React from 'react';
import Vivus from 'vivus';
import PieChart from './Pie.js';

export default class PieVivusChart extends PieChart {
    constructor(props){
        super(props);
        this.state = {
            expanded:this.defaultRange,
            finished: false
        };
    }
    componentDidMount() {
        new Vivus(this.refs.vivus.getDOMNode(), {
            type: 'delayed',
            duration: 200,
            start: 'autostart',
            selfDestroy: true
        }, this.finish.bind(this));

    }
    finish() {
        this.setState({ finished: true });
    }
}