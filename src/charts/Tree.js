import React from 'react';
import _ from 'underscore';
import Options from '../component/Options.js';
import fontAdapt from '../fontAdapter.js';

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

        var options = new Options(this.props);
        var that = this;


        var tree = Tree({
            data: this.props.data,
            children: children,
            width: options.chartWidth,
            height: options.chartHeight
        });

        var curves = _.map(tree.curves,function (c) {
            return <path d={ c.connector.path.print() } fill="none" stroke={options.stroke} />
        });

        var sec = options.animate.fillTransition || 0;
        var fillOpacityStyle = {fillOpacity:this.state.finished?1:0,transition: this.state.finished?'fill-opacity ' + sec + 's':''};

        var textStyle = fontAdapt(options.label);

        var r = options.r || 5;
        var nodes = _.map(tree.nodes,function (n,index) {
            var position = "translate(" + n.point[0] + "," + n.point[1] + ")";

            function toggle() {
                n.item.collapsed = !n.item.collapsed;
                that.forceUpdate();
            };

            if (children(n.item).length > 0) {
                var text = <text style={textStyle} transform="translate(-10,0)" textAnchor="end">{ n.item.name }</text>;
            } else {
                var text = <text  style={textStyle} transform="translate(10,0)" textAnchor="start">{ n.item.name }</text>;
            }

            return (
                <g transform={ position }>
                    <circle key={"tree_" + index} style={fillOpacityStyle} fill={options.fill} stroke={options.stroke} r={r} cx="0" cy="0" onClick={ toggle }/>
                    { text }
                </g>
            )
        });

        return (
            <svg ref="vivus"  width={options.width} height={options.height}>
                <g transform={"translate(" + options.margin.left + "," + options.margin.top + ")"}>
                    { curves }
                    { nodes }
                </g>
            </svg>
        )
    }
}
