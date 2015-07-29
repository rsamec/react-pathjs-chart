import React from 'react';
import BindToMixin from 'react-binding';
import _ from 'underscore';
import Json from 'react-json';
import genie from 'genie'
import ColorPicker from 'react-simple-colorpicker';

import SmoothLineChartDemo from './SmoothLineChartDemo.js';
import StockLineChartDemo from './StockLineChartDemo.js';
import ScatterPlotDemo from './ScatterPlotDemo.js';
import BarChartDemo from './BarChartDemo.js';
import PieChartDemo from './PieChartDemo.js';
import TreeChartDemo from './TreeChartDemo.js';
import RadarChartDemo from './RadarChartDemo.js';

var patternsOptions = [
'firstName',
'lastName',
'fullName',
'zipCode',
'zipCode5',
'zipCode9',
'city',
'streetName',
'streetAddress',
'secondaryAddress',
'brState',
'brStateAbbr',
'ukCounty',
'ukCountry',
'usState',
'usStateAbbr',
'latitude',
'longitude',
'phoneNumber',
'email',
'userName',
'domainName',
'domainWord',
'ipAddress',
'companyName',
'companySuffix',
'sentence',
'paragraph'];

var colors = {
    "turquoise"     : "#1ABC9C",
    "green-sea"     : "#16A085",
    "emerald"       : "#2ECC71",
    "nephritis"     : "#27AE60",
    "peter-river"   : "#3498DB",
    "belize-hole"   : "#2980B9",
    "amethyst"      : "#9B59B6",
    "wisteria"      : "#8E44AD",
    "wet-asphalt"   : "#34495E",
    "midnight-blue" : "#2C3E50",
    "sun-flower"    : "#F1C40F",
    "orange"        : "#F39C12",
    "carrot"        : "#E67E22",
    "pumpkin"       : "#D35400",
    "alizarin"      : "#E74C3C",
    "pomegranate"   : "#C0392B",
    "clouds"        : "#ECF0F1",
    "silver"        : "#BDC3C7",
    "concrete"      : "#95A5A6",
    "asbestos"      : "#7F8C8D"
};

// Create the custom field type component
var ColorPickerWrapper = React.createClass({

    render: function () {
        var opts = this.props.settings.options || [];
        return (<select value={this.props.value}  onChange={this.handleChange}>
            {opts.map(function(opt,index){
                    return React.DOM.option({value:opt.value},opt.label);
                })
            }
         </select>)
    },
    handleChange: function (e) {
        this.props.onUpdated(e.target.value);
    }
});

Json.registerType('colorPicker',ColorPickerWrapper);


// form: true
// make objects not extensible,
// fields not removable
// and inputs always visible
var settings = {
    form: true,
    fields: {
        color:{type:'colorPicker',settings:{options:_.map(colors,function(key,value){return {value:key,label:value};})}},
        fill:{type:'colorPicker',settings:{options:_.map(colors,function(key,value){return {value:key,label:value};})}},
        stroke:{type:'colorPicker',settings:{options:_.map(colors,function(key,value){return {value:key,label:value};})}},
        legendPosition: {type: 'select', settings: {options: ['topLeft','topRight','bottomLeft','bottomRight']}},
        axisY: {
            fields: {orient: {type: 'select', settings: {options: ['left','right']}}}
        },
        axisX: {
            fields: {orient: {type: 'select', settings: {options: ['top','bottom']}}}
        },
        data:{
            fields:{
                template:{
                    fields:{
                        title:{
                            fields:{
                                pattern:{ type:'select', settings:{options:patternsOptions}}
                            }
                        },
                        name:{
                            fields:{
                                pattern:{ type:'select', settings:{options:patternsOptions}}
                            }
                        }
                    }
                }
            }
        },
        children:{
            fields:{
                template:{
                    fields:{
                        name:{
                            fields:{
                                pattern:{ type:'select', settings:{options:patternsOptions}}
                            }
                        },
                        children:{
                            fields: {
                                template: {
                                    fields: {
                                        name: {
                                            fields: {
                                                pattern: {type: 'select', settings: {options: patternsOptions}}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

var Panel = React.createClass({
    getInitialState(){
        return {expanded: this.props.defaultExpanded}
    },
    toogleExpanded(){
        this.setState({expanded: !this.state.expanded});
    },
    render(){
        var className = this.state.expanded ? "glyphicon-chevron-up" : "glyphicon-chevron-down";
        className = "glyphicon " + className;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading" onClick={this.toogleExpanded}>
                    <div className="row">
                        <div className="col-md-11">{this.props.header}</div>
                        <div className="col-md-1"><span className={className}></span></div>
                    </div>
                </div>
                {this.state.expanded ? <div className="panel-body">{this.props.children}</div> : null}
            </div>
        )
    }
});
var App = React.createClass({
    mixins: [BindToMixin],
    //getInitialState() {
    //    //labelComponent: <FormattedNumber value={1000} style="currency" currency="USD"/>
    //
    //},

    render() {
        return (<div>

                <Panel header="Stock line chart" defaultExpanded={true}>
                    <StockLineChartDemo settings={settings}/>
                </Panel>
                <Panel header="Smooth line chart" defaultExpanded={true}>
                    <SmoothLineChartDemo settings={settings}/>
                </Panel>
                <Panel header="Scatter plot chart" defaultExpanded={true}>
                    <ScatterPlotDemo settings={settings}/>
                </Panel>
                <Panel header="Bar chart" defaultExpanded={true}>
                    <BarChartDemo settings={settings}/>
                </Panel>
                <Panel header="Pie chart" defaultExpanded={true}>
                    <PieChartDemo settings={settings}/>
                </Panel>
                <Panel header="Tree chart" defaultExpanded={true}>
                    <TreeChartDemo settings={settings}/>
                </Panel>
                <Panel header="Radar chart" defaultExpanded={true}>
                    <RadarChartDemo settings={settings}/>
                </Panel>

            </div>
        )
    }
});

React.render(<App />, document.getElementById('app'));
