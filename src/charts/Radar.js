import React from 'react';
var Radar = require('paths-js/radar');

function identity(key) { return function (x) {return x[key];}};
function accessKeys(keys) {
    var a = {};
    for (var i in keys) {
        var key = keys[i];
        a[key] = identity(key);
    }
    return a;
}

var RadarChart = React.createClass({
    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

        var x = this.props.width / 2;
        var y = this.props.height / 2;
        var radius = Math.min(x, y);

        var center = this.props.center || [x,y];

        var keys = Object.keys(this.props.data[0]);
        var chart = Radar({
            center: this.props.center || [x,y],
            r: this.props.r || radius,
            data: this.props.data,
            accessor: this.props.accessor || accessKeys(keys),
            max:this.props.max
        });
        var self = this;

        var curves = chart.curves.map(function(c, i) {
            return (<path key={ i } d={ c.polygon.path.print()} fill={ self.props.fill } />)
        });

        //var rings = chart.rings.map(function(r, i) {
        //    return (<path key={ i } d={ r.path.print() } stroke={ self.props.stroke } />)
        //});
        var length = chart.rings.length;

        var rings = chart.rings.map(function(r, i) {
            if (i !== length - 1) {
                return (<path key={ i } d={ r.path.print() } stroke={ self.props.stroke } />)
            }
        });
        //
        var labels = chart.rings[length -1].path.points().map(function(p, i) {
            return (
                <g>
                    <line x1={p[0]} y1={p[1]} x2={center[0]} y2={center[1]} stroke="gray" />
                    <text textAnchor="middle" fill={self.props.fill} transform={"translate(" + Math.floor( p[0]) + "," + Math.floor( p[1]) + ")"}>{keys[i]}</text>
                </g>
            )
        });

        var width = this.props.width || 200;
        var height = this.props.height || 200;

        return(
            <div className="radar">
                <svg width={width} height={height}>
                    {labels}
                    <g fill="none" stroke="none">
                        { rings }
                        <g opacity="0.6">
                            {curves}
                        </g>
                    </g>
                </svg>
            </div>
        )}
});

export default RadarChart;
