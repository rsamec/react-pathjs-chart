import React from 'react';
import _ from 'underscore';
import Vivus from 'vivus';
import SmoothLineChart from './SmoothLine.js';

var SmoothLine = require('paths-js/smooth-line');

export default class SmoothLineVivusChart extends SmoothLineChart {
    constructor(props){
        super(props);
        this.state = { showAreas: false };
    }
    componentDidMount() {
        new Vivus(this.refs.vivus.getDOMNode(), {
            type: 'delayed',
            duration: 200,
            start: 'autostart',
            selfDestroy: true
        }, this.addAreas.bind(this));
    }
    addAreas() {
        this.setState({ showAreas: true });
    }
}