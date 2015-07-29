import React from 'react';
import Vivus from 'vivus';
import BarChart from './Bar.js';

export default class BarVivusChart extends BarChart {
    constructor(props){
        super(props);
        this.state = { finished: false };
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