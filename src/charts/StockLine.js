import LineChart from './Line.js';

var StockLine = require('paths-js/stock');

export default class StockLineChart extends LineChart {
    constructor(props) {
        super(props, StockLine);
    }
}