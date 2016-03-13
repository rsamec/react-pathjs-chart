import React from 'react';
import ReactDOM from 'react-dom';
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
    componentWillReceiveProps(nextProps){
        if (nextProps.replay !== this.props.replay) this.setState({finished:false});
    }
    componentDidMount() {
        this.run();
    }
    componentDidUpdate(prevProps,prevState){
        if (!this.state.finished) this.run()
    }
    run(){
        if (this.refs.vivus === undefined) return;
        var animate = this.props.options && this.props.options.animate || {};

        new Vivus(ReactDOM.findDOMNode(this.refs.vivus), {
            type: animate.type || 'delayed',
            duration: animate.duration || 'delayed',
            start: 'autostart',
            selfDestroy: true
        }, this.finish.bind(this));
    }
    finish() {
        this.setState({ finished: true });
    }
}