import React from 'react';
import BindToMixin from 'react-binding';
import {FormattedNumber} from 'react-intl';
import _ from 'underscore';
import {Pie,Tree,SmoothLine,SmoothLineVivus,Radar} from 'react-pathjs-chart';
import treeData from './treeData.js';

var countries = [
    {name: 'Italy', population: 59859996},
    {name: 'Mexico', population: 118395054},
    {name: 'France', population: 65806000},
    {name: 'Argentina', population: 40117096},
    {name: 'Japan', population: 127290000}
];

var pokemon = [
    { hp: 45, attack: 49, defense: 49, sp_attack: 65, sp_defense: 65, speed: 45 },
    { name: "Ivysaur", hp: 60, attack: 62, defense: 63, sp_attack: 80, sp_defense: 80, speed: 60 },
    { name: "Venusaur", hp: 80, attack: 82, defense: 83, sp_attack: 100, sp_defense: 100, speed: 80 },
    { name: "Kakuna", hp: 45, attack: 25, defense: 50, sp_attack: 25, sp_defense: 25, speed: 35 },
    { name: "Charmeleon", hp: 58, attack: 64, defense: 58, sp_attack: 80, sp_defense: 65, speed: 80 },
    { name: "Squirtle", hp: 44, attack: 48, defense: 65, sp_attack: 50, sp_defense: 64, speed: 43 },
    { name: "Blastoise", hp: 79, attack: 83, defense: 100, sp_attack: 85, sp_defense: 105, speed: 78 },
    { name: "Butterfree", hp: 60, attack: 45, defense: 50, sp_attack: 90, sp_defense: 80, speed: 70 }
]

var xs = _.range(-10, 11, 1);

var polynom = function(a,b,c) {return _.map(xs, function (x) {
    return {x: x, y: a * Math.pow(x, 2) + b * x + c}})
};
var mocnina = function(n){return _.map(xs, function (x) {
    return {x: x, y: Math.pow(x, n)}})
};


var Panel =React.createClass({
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.header}</div>
                <div className="panel-body">{this.props.children}</div>
            </div>
        )
    }
});
var CheckBoxInput = React.createClass({
    render(){
        var valueModel = this.props.valueLink;
        var requestChange = function (e) {
            valueModel.value = e.target.checked;
        };

        return (
            <div>
                <input type='checkbox' checked={valueModel.value} onChange={requestChange}/>
                <label>{this.props.label}</label>
            </div>
        )
    }
})
var NumberInput = React.createClass({
    render(){
        var valueModel = this.props.valueLink;
        var requestChange = function (e) {
            valueModel.value = parseInt(e.target.value, 10);
        };
        var label = this.props.label? <label style={{minWidth:60}}>{this.props.label}</label>:null;
        return (
            <div>
                {label}
                <input style={this.props.style} type='number' value={valueModel.value} onChange={requestChange}/>
            </div>
        )
    }
})
var TextInput = React.createClass({
    render(){
        var valueModel = this.props.valueLink;
        var requestChange = function (e) {
            valueModel.value = e.target.value;
        };

        return (
            <div>
                <label>{this.props.label}</label>
                <input style={this.props.style} type='text' value={valueModel.value} onChange={requestChange}/>
            </div>
        )
    }
})
var Margins = React.createClass({
    mixins: [BindToMixin],
    render(){
        return (
            <div>
                <h4>Chart Margin</h4>
                <NumberInput label="top" style={{width:50}} valueLink={this.bindTo(this.props.margin,'top')}/>
                <NumberInput label="right" style={{width:50}} valueLink={this.bindTo(this.props.margin,'right')}/>
                <NumberInput label="bottom" style={{width:50}} valueLink={this.bindTo(this.props.margin,'bottom')}/>
                <NumberInput label="left" style={{width:50}} valueLink={this.bindTo(this.props.margin,'left')}/>
            </div>
        )
    }
});

var TickValues = React.createClass({
    mixins: [BindToMixin],
    render(){
        var bindToArray = this.bindArrayTo(this.props.axis, 'tickValues');
        var add = function () {
            bindToArray.add({value: 0})
        };
        var remove = function (item) {
            bindToArray.remove(item)
        };
        var clear = function(){
            this.bindTo(this.props.axis,'tickValues').value = undefined;///bindToArray.value = undefined;
           // _.each(bindToArray.items,function(item){bindToArray.remove(item.value)});
        }.bind(this);
        return (<div>
            <input type='button' value="add" onClick={add}/>
            <input type='button' value="clear" onClick={clear}/>
            <table>
                <tr>
                    {bindToArray.items.map(function (item, index) {

                        return (
                            <td>
                                <NumberInput style={{width:30,display:'inline'}} key={index} valueLink={this.bindTo(item,'value')}/>
                             </td>)
                    }, this)}
                </tr>
            </table>
        </div>);
    }
});
var AxisOptions = React.createClass({
    mixins: [BindToMixin],
    render(){
        return (
            <div>
                <h4>{this.props.name}</h4>

                <CheckBoxInput label="zero axis" valueLink={this.bindTo(this.props.axis,'zeroAxis')}/>
                <CheckBoxInput label="show axis" valueLink={this.bindTo(this.props.axis,'showAxis')}/>
                <CheckBoxInput label="show lines" valueLink={this.bindTo(this.props.axis,'showLines')}/>
                <CheckBoxInput label="show labels" valueLink={this.bindTo(this.props.axis,'showLabels')}/>
                <CheckBoxInput label="show ticks" valueLink={this.bindTo(this.props.axis,'showTicks')}/>
                <NumberInput label="tick number: " style={{width:50}} valueLink={this.bindTo(this.props.axis,'tickCount')}/>
                <label>custom tick values</label>
                <TickValues axis={this.props.axis}/>
            </div>);
    }
});


var App = React.createClass({
    mixins: [BindToMixin],
    getInitialState() {
        var defaultAxis = {showAxis: true, showLines: true, showLabels: true, showTicks:true,zeroAxis:true};
        return {
            data: {
                n:3,
                options: {
                    margin: {top:20, left: 60, bottom: 50,right:20},
                    axisX: _.clone(defaultAxis),
                    axisY: _.extend(defaultAxis,{labelComponent: <FormattedNumber value={1000} style="currency" currency="USD"/>})
                }
            }
        };
    },
    render() {
        var binding = this.bindToState('data', 'options');
        var data = [mocnina(this.state.data.n)];

        return (<div>
                <Panel header="SmoothLine">
                    <table>
                        <tr>
                            <td> <NumberInput label="exponent:" style={{width:50}} valueLink={this.bindToState('data','n')}/></td>
                        </tr>
                        <tr>
                            <td>
                                <SmoothLineVivus data={data} xKey="x" yKey="y" width={600} height={600}
                                                 options={this.state.data.options}/>
                            </td>

                            <td style={{paddingLeft:10}}>
                                <Margins margin={this.bindTo(binding,'margin')}/>
                                <AxisOptions name="Axis X" axis={this.bindTo(binding,'axisX')}/>
                                <AxisOptions name="Axis Y" axis={this.bindTo(binding,'axisY')}/>
                            </td>
                        </tr>
                    </table>
                </Panel>
                <Panel header="Pie">
                    <Pie data={ countries } color="#fc6433" legendPosition='topLeft' accessorKey="population"/>
                </Panel>
                <Panel header="Tree">
                    <Tree data={treeData}/>
                </Panel>
                <Panel header="Radar">
                    <Radar data={[pokemon[0]]} fill="#fc6433" stroke="#fc1413" width={300} height={300} r={100} max={100} center={[150,150]}  />
                </Panel>
            </div>
        )
    }
});

React.render(<App />, document.getElementById('app'));
