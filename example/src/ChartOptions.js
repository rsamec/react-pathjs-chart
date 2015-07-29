import React from 'react';
import Json from 'react-json';
import _ from 'underscore';
import {TabbedArea,TabPane,Button} from 'react-bootstrap';
import {Pie,Tree,SmoothLine,SmoothLineVivus,Radar,Bar,Scatterplot} from 'react-pathjs-chart';

var ChartOptions = React.createClass({
    getInitialState(){
        return {show:true}
    },
    toogleShowData(){
        this.setState({show:!this.state.show});
    },
    render(){
        return (
            <TabbedArea bsStyle="tabs" defaultActiveKey={2}>
                <TabPane eventKey={1} tab='Data'>
                    <div>
                        <div className="row" style={{marginTop:20}}>
                            <div className="col-md-8"><h4>Data template</h4></div>
                            <div className="col-md-4"><Button bsStyle="primary" onClick={this.props.regenerateData}>Regenerate data</Button></div>
                        </div>
                        <hr />
                        <Json value={this.props.template} settings={this.props.settings} onChange={this.props.templateChanged}/>

                        <Button bsStyle="link" onClick={this.toogleShowData}>{this.state.show?"hide":"show"} data json</Button>

                        {this.state.show? <pre style={{width:'100%',height:200}}>{JSON.stringify(this.props.data, null, 2)}</pre>:null}
                    </div>
                </TabPane>
                <TabPane eventKey={2} tab='Options'>
                    <Json value={this.props.options} settings={this.props.settings} onChange={this.props.optionsChanged}/>
                </TabPane>
            </TabbedArea>
        )
    }
})

export class ChartDemo extends React.Component {
    constructor(props,chartType, demo) {
        super(props);

        this.state = {
            dataTemplate: demo.dataTemplate,
            data: demo.generateData(demo.dataTemplate),
            options: demo.options
        }
        this.chartType = chartType;
        this.chartDemo = demo;
        this.generateData = demo.generateData;
    }
    templateChanged(value){
        this.setState({dataTemplate: value})
    }
    optionsChanged(value){
        this.setState({options: value})
    }
    regenerateData(e){
        this.setState({
            data: this.generateData(this.state.dataTemplate),
            finished:false
        });
    }
    render() {
        var tdStyle = {paddingLeft:10,verticalAlign:'top'};
        var chartProps = _.extend({data:this.state.data,options:this.state.options},this.chartDemo.props);
        var chart = React.createElement(this.chartType,chartProps);
        return (
            <table>
                <tr>
                    <td style={tdStyle}>
                        {chart}
                    </td>

                    <td style={tdStyle}>
                        <ChartOptions template={this.state.dataTemplate} templateChanged={this.templateChanged.bind(this)}
                                      data={this.state.data} regenerateData={this.regenerateData.bind(this)}
                                      options={this.state.options} optionsChanged={this.optionsChanged.bind(this)}
                                      settings={this.props.settings}/>
                    </td>
                </tr>
            </table>
        )
    }
}

export default ChartOptions;
