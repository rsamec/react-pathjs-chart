import React from 'react';
import _ from 'underscore';

var Tree = require('paths-js/tree');

function children(x) {
    if(x.collapsed) {
        return []
    }
    else {
        return x.children || []
    }
}
export default class TreeChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {finished:true};
    }
    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

        var options = this.props.options || {};
        var width = options.width || 400;
        var height = options.height || 400;

        var that = this;


        var tree = Tree({
            data: this.props.data,
            children: children,
            width: width - 150,
            height: height - 100
        });

        var curves = _.map(tree.curves,function (c) {
            return <path d={ c.connector.path.print() } fill="none" stroke={options.stroke} />
        });

        var fillOpacityStyle = {fillOpacity:this.state.finished?1:0};
        var nodes = _.map(tree.nodes,function (n) {
            var position = "translate(" + n.point[0] + "," + n.point[1] + ")";

            function toggle() {
                n.item.collapsed = !n.item.collapsed;
                that.forceUpdate();
            };

            if (children(n.item).length > 0) {
                var text = <text transform="translate(-10,0)" textAnchor="end">{ n.item.name }</text>;
            } else {
                var text = <text transform="translate(10,0)" textAnchor="start">{ n.item.name }</text>;
            }

            return (
                <g transform={ position }>
                    <circle style={fillOpacityStyle}    fill={options.fill} stroke={options.stroke} r="5" cx="0" cy="0" onClick={ toggle }/>
                    { text }
                </g>
            )
        });

        return (
            <svg ref="vivus"  width={width} height={height}>
                <g transform="translate(80, 10)">
                    { curves }
                    { nodes }
                </g>
            </svg>
        )
    }
}
