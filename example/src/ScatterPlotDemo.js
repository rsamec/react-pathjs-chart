import React from 'react';
import {Pie,Tree,SmoothLine,SmoothLineVivus,Radar,Bar,Scatterplot} from 'react-pathjs-chart';
import genie from 'genie'
import {ChartDemo} from './ChartOptions.js';
import _ from 'underscore';

_.mixin(require('underscore.deepclone'));

class PlotDemo {
    get dataTemplate() {
        return {
            data: {
                min: 50,
                max: 70,
                template: {
                    title: {
                        pattern: 'brState'
                    },
                    rating: {
                        min: 0,
                        max: 10,
                        places: 2
                    }
                }
            }
        }
    }
    get options() {
        return {
            width: 600,
            height: 600,
            margin: {top: 40, left: 60, bottom: 30, right: 30},
            fill: "#2980B9",
            stroke: "#3E90F0",
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom'
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left'
            }
        }
    }
    get props(){
        return {xKey:"episode",yKey:"rating"}
    }

    generateData(dataTemplate){
        var clone = _.deepClone(dataTemplate);
        clone.data.template.episode = function () {
            return index++;
        };
        var index = 0;
        return [genie(clone).data];
    }
}

export default class ScatterPlotDemo extends ChartDemo {
    constructor(props) {
        super(props, Scatterplot, new PlotDemo());
    }
    //render(){
    //    var options = _.deepClone(this.state.options);
    //    options.axisY.labelComponent =
    //        <FormattedNumber value={1000} style="decimal" minimumFractionDigits={2} maximumFractionDigits={2}
    //                         currency="USD"/>;
    //    var tdStyle = {paddingLeft:10,verticalAlign:'top'};
    //    return (
    //        <table>
    //            <tr>
    //                <td style={tdStyle}>
    //                    <Scatterplot data={this.state.data} xKey="episode" yKey="rating" options={options}/>
    //                </td>
    //
    //                <td style={tdStyle}>
    //                    <ChartOptions template={this.state.dataTemplate} templateChanged={this.templateChanged.bind(this)}
    //                                  data={this.state.data} regenerateData={this.regenerateData.bind(this)}
    //                                  options={this.state.options} optionsChanged={this.optionsChanged.bind(this)}
    //                                  settings={this.props.settings}/>
    //                </td>
    //            </tr>
    //        </table>
    //    )
    //}
};
