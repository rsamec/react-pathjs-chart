import React from 'react';
import Colors from '../pallete/Colors.js';
import Animate from '../animate.js';
import _ from 'underscore';

var Pie = require('paths-js/pie');

function cyclic(coll, i) { return coll[i % coll.length]; }
function identity(key) { return function (x) {return x[key];}};
function color(key) { return function (x) {return x[key];}};

var PieChart = React.createClass({
    mixins: [Animate.Mixin],
    getInitialState() {
        return { expanded: [0, 0, 0, 0, 0] };
    },

    translate(p) { return "translate(" + p[0] + "," + p[1] + ")" },

    move(point, perc) {
        return this.translate([point[0] * perc / 3, point[1] * perc / 3]);
    },

    grad(i) { return "grad-" + i },

    fill(i) { return "url(#grad-" + i  +")" },

    color(i) {
        var pallete = this.props.pallete || Colors.mix(this.props.color || '#9ac7f7');
        return Colors.string(cyclic(pallete, i)); },

    lighten(i) {
        var pallete = this.props.pallete || Colors.mix(this.props.color || '#9ac7f7');
        return Colors.string(Colors.lighten(cyclic(pallete, i))); },

    expand(i) {
        var self = this;
        return function() {
            var target = [0, 0, 0, 0, 0];
            target[i] = 1;
            self.animateState({ expanded: target });
        };
    },

    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

        var chart = Pie({
            center: this.props.center || [0,0],
            r: this.props.r || 60,
            R: this.props.R || 140,
            data: this.props.data,
            accessor: this.props.accessor || identity(this.props.accessorKey)
        });
        var self = this;
        var coefficients = this.state.expanded;
        var slices = chart.curves.map(function(c, i) {
            return (
                <g key={ i } transform={ self.move(c.sector.centroid, coefficients[i]) }>
                    <linearGradient id={ self.grad(i) }>
                        <stop stopColor={ self.color(i) } offset="0%"/>
                        <stop stopColor={ self.lighten(i) } offset="100%"/>
                    </linearGradient>
                    <path onClick={ self.expand(i) } d={ c.sector.path.print() } fill={ self.fill(i) } />
                    <text textAnchor="middle" transform={ self.translate(c.sector.centroid) }>{ c.item.name }</text>
                </g>
            )
        });
        var selected = _.find(this.props.data, function(c, i) {
            return coefficients[i] === 1;
        });

        var legendClassName = "legend " + this.props.legendPosition;

        var table = selected ?
            <div className={legendClassName}>
                <h4>{ selected.name }</h4>
                <p><span className="label label-info">{ selected.population }</span></p>
            </div> : null

        var width = 375;
        var height = 400;
        var style = this.props.style;
        if (style !== undefined){
            if (style.width !== undefined) width =style.width;
            if (style.height !== undefined) height=style.height;
        }
        return(
            <div className="pie">
                <svg width={width} height={height}>
                    <g transform="translate(200, 200)">{ slices }</g>
                </svg>
            { table }
            </div>
        )}
});

export default PieChart;
