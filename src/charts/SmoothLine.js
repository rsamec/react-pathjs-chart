import LineChart from './Line.js';

var SmoothLine = require('paths-js/smooth-line');

export default class SmoothLineChart extends LineChart {
    constructor(props) {
        super(props, SmoothLine);
    }
}