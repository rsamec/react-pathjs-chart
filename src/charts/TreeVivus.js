import React from 'react';
import Vivus from 'vivus';
import TreeChart from './Tree.js';

export default class TreeVivusChart extends TreeChart {
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