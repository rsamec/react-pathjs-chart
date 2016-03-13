import React from 'react';
import Json from 'react-json-fork';
import _ from 'lodash';
import {Tabs as TabbedArea,Tab as TabPane,Button} from 'react-bootstrap';
import {FormattedNumber} from 'react-intl';

import PropertyEditor from 'react-property-editor';

export default class ChartDemo extends React.Component {
    constructor(props, chartType, demo) {
        super(props);

        this.state = {
            show: false,
            dataTemplate: demo.dataTemplate,
            data: demo.generateData(demo.dataTemplate),
            options: chartType.defaultProps.options,
            settings:chartType.metaData.settings.fields.options
        }
        this.chartType = chartType;
        this.chartDemo = demo;
        this.generateData = demo.generateData;
    }

    templateChanged(value) {
        this.setState({dataTemplate: value})
    }

    optionsChanged(value) {
        this.setState({options: value.props})
    }

    regenerate(e) {
        this.setState({data: this.generateData(this.state.dataTemplate)});
    }

    replay(e) {
        this.setState({replay: !this.state.replay})
    }

    toogleShowData() {
        this.setState({show: !this.state.show});
    }

    render() {
        var tdStyle = {paddingLeft: 10, paddingTop: 10, verticalAlign: 'top'};
        var options = _.cloneDeep(this.state.options) || {};
        if (options.axisX !== undefined) options.axisX.labelComponent =
            <FormattedNumber value={0} style="decimal" maximumFractionDigits={2} tagName="tspan" />;
        if (options.axisY !== undefined) options.axisY.labelComponent =
            <FormattedNumber value={0} style="decimal" maximumFractionDigits={2} tagName="tspan" />;
        //
        var chartProps = _.extend({
            data: this.state.data,
            options: options,
            replay: this.state.replay
        }, this.chartDemo.props);
        var chart = React.createElement(this.chartType, chartProps);
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-9"></div>
                        <div className="col-md-1"><Button bsStyle="primary"
                                                          onClick={this.replay.bind(this)}>replay</Button></div>
                        <div className="col-md-2"><Button bsStyle="primary" onClick={this.regenerate.bind(this)}>regenerate</Button>
                        </div>
                    </div>
                    {chart}
                </div>
                <div className="col-md-4">

                    <TabbedArea bsStyle="tabs" defaultActiveKey={2}>
                        <TabPane eventKey={1} title='Data'>
                            <div>
                                {
                                <Json value={this.state.dataTemplate} settings={this.props.settings}
                                      onChange={this.templateChanged.bind(this)}/>
                                }

                                <Button bsStyle="link" onClick={this.toogleShowData.bind(this)}>{this.state.show ? "hide" : "show"} data json</Button>

                                {this.state.show ? <pre style={{width:'100%',height:200}}>{JSON.stringify(this.state.data, null, 2)}</pre> : null}
                            </div>
                        </TabPane>
                        <TabPane eventKey={2} title='Options'>
                            <PropertyEditor value={{props:this.state.options}} settings={this.state.settings}
                                  onChange={this.optionsChanged.bind(this)}/>
                        </TabPane>
                    </TabbedArea>
                </div>
            </div>
        )
    }
}