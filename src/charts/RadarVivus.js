import React from 'react';
import Vivus from 'vivus';
import RadarChart from './Radar.js';

export default class RadarVivusChart extends RadarChart {
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