import React from 'react';
import {Pie,Tree,SmoothLine} from 'react-pathjs-chart';
import treeData from './treeData.js';
import stock from './stockData.js';

import _ from 'underscore';

var parseDate = function(str) {
	var split = str.split(' ');
	var month = split[0];
	var year = split[1];
	var months = {
		Jan: 0,
		Feb: 1,
		Mar: 2,
		Apr: 3,
		May: 4,
		Jun: 5,
		Jul: 6,
		Aug: 7,
		Sep: 8,
		Oct: 9,
		Nov: 10,
		Dec: 11
	};
	var m = months[month];
	var d = new Date();
	d.setMonth(m);
	d.setYear(parseInt(year, 10) - 1900);
	return d.getTime();
};

var mapData = function(items){return _.map(items,function(item) {return {"value":item.value, "date":parseDate(item.date)}})};
var stockData = [mapData(stock.AAPL), mapData(stock.AMZN), mapData(stock.IBM)];
var App = React.createClass({
	getInitialState() {
		return {data: {}};
	},
	render() {
		var countries = [
			{name: 'Italy', population: 59859996},
			{name: 'Mexico', population: 118395054},
			{name: 'France', population: 65806000},
			{name: 'Argentina', population: 40117096},
			{name: 'Japan', population: 127290000}
		];

		return (<div>
			<Pie data={ countries } color='#9ac7f7' r={ 60 } R={ 140 } accessorKey="population"  />
			<Tree data={treeData} />
			<SmoothLine data={stockData} xKey="date" yKey="value" />
		</div>)
	}

});

React.render(<App />, document.getElementById('app'));
