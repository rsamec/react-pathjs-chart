import _ from 'underscore';

//import Pie from './charts/Pie.js';
//import Tree from './charts/Tree.js';
//import Radar from './charts/Radar.js';
//import Bar from './charts/Bar.js';
//import SmoothLine from './charts/SmoothLine.js';
//import StockLine from './charts/StockLine.js';
//import Scatterplot from './charts/Scatterplot.js';

//export default {
//    Pie:Pie,
//    Tree:Tree,
//    SmoothLine:SmoothLine,
//    StockLine:StockLine,
//    Radar:Radar,
//    Bar:Bar,
//    Scatterplot:Scatterplot
//};

import SmoothLineVivus from './charts/SmoothLineVivus.js';
import StockLineVivus from './charts/StockLineVivus.js';
import BarVivus from './charts/BarVivus.js';
import PieVivus from './charts/PieVivus.js';
import RadarVivus from './charts/RadarVivus.js';
import TreeVivus from './charts/TreeVivus.js';
import ScatterplotVivus from './charts/ScatterplotVivus.js';

// form: true
// make objects not extensible,
// fields not removable
// and inputs always visible
var settings = {
    form: true,
    fields: {
        data:{type:'bindingEditor'},
        color:{type:'colorPicker'},
        fill:{type:'colorPicker'},
        stroke:{type:'colorPicker'},
        legendPosition: {type: 'select', settings: {options: ['topLeft','topRight','bottomLeft','bottomRight']}},
        label:{type:'fontEditor'},
        animate:{
            fields:{type:{type:'select',  settings: {options: ['delayed','async','oneByOne']}}}}
        ,
        axisY: {
            fields: {
                orient: {type: 'select', settings: {options: ['left', 'right']}},
                tickValues: {type: 'tickValues'},
                label:{type:'fontEditor'}
            }
        },
        axisX: {
            fields: {
                orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                tickValues: {type: 'tickValues'},
                label: {type:'fontEditor'}
            }
        }
    }
};

export default {
    Pie:_.extend(PieVivus, {
        metaData: {
            props:  {
                data:{},
                accessorKey:'',
                options: {
                    margin: {top: 20, left: 20, right: 20, bottom: 20},
                    width: 600,
                    height: 600,
                    color: '#2980B9',
                    r: 100,
                    R: 200,
                    legendPosition: 'topLeft',
                    animate: {
                        type: 'oneByOne',
                        duration: 200,
                        fillTransition: 3
                    },
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        bold: true,
                        fill: '#ECF0F1'
                    }
                }
            },
            settings:settings
        }
    }),
    Tree:_.extend(TreeVivus, {
        metaData: {
            props: {
                data:{},
                options: {
                    margin: {top: 20, left: 50, right: 80, bottom: 20},
                    width: 600,
                    height: 600,
                    fill: "#2980B9",
                    stroke: "#3E90F0",
                    r: 5,
                    animate: {
                        type: 'oneByOne',
                        duration: 200,
                        fillTransition: 3
                    },
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        bold: true,
                        fill: '#34495E'
                    }
                }
            },
            settings:settings
        }
    }),
    SmoothLine:_.extend(SmoothLineVivus, {
        metaData: {
            props: {
                data:{},
                xKey:'',
                yKey:'',
                options: {
                    width: 600,
                    height: 600,
                    color: '#2980B9',
                    margin: {top: 40, left: 60, bottom: 50, right: 20},
                    animate: {
                        type: 'delayed',
                        duration: 200
                    },
                    axisX: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'bottom',
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    },
                    axisY: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'left',
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    }
                }
            },
            settings:settings
        }
    }),
    StockLine:_.extend(StockLineVivus, {
        metaData: {
            props: {
                data:{},
                xKey:'',
                yKey:'',
                options: {
                    width: 600,
                    height: 600,
                    color: '#2980B9',
                    margin: {top: 40, left: 60, bottom: 50, right: 20},
                    animate: {
                        type: 'delayed',
                        duration: 200
                    },
                    axisX: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'bottom',
                        tickValues: [],
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    },
                    axisY: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'left',
                        tickValues: [],
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    }
                }
            },
            settings:settings
        }
    }),
    Radar:_.extend(RadarVivus, {
        metaData: {
            props: {
                data:{},
                options: {
                    width: 600,
                    height: 600,
                    margin: {top: 20, left: 20, right: 20, bottom: 20},
                    r: 300,
                    max: 150,
                    fill: "#2980B9",
                    stroke: "#2980B9",
                    animate: {
                        type: 'oneByOne',
                        duration: 200
                    },
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        bold: true,
                        color: '#34495E'
                    }
                }
            },
            settings:settings
        }
    }),
    Bar:_.extend(BarVivus, {
        metaData: {
            props:{
                data:{},
                accessorKey:'',
                options: {
                    width: 600,
                    height: 600,
                    margin: {top: 20, left: 20, bottom: 50, right: 20},
                    color: '#2980B9',
                    gutter: 20,
                    animate: {
                        type: 'oneByOne',
                        duration: 200,
                        fillTransition: 3
                    },
                    axisX: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'bottom',
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    },
                    axisY: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'left',
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    }
                }
            },
            settings:settings
        }
    }),
    Scatterplot:_.extend(ScatterplotVivus, {
        metaData: {
            props: {
                data:{},
                xKey:'',
                yKey:'',
                options: {
                    width: 600,
                    height: 600,
                    margin: {top: 40, left: 60, bottom: 30, right: 30},
                    fill: "#2980B9",
                    stroke: "#3E90F0",
                    animate: {
                        type: 'delayed',
                        duration: 200
                    },
                    label: {
                        fontFamily: 'Arial',
                        fontSize: 14,
                        bold: true,
                        color: '#34495E'
                    },
                    axisX: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'bottom',
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    },
                    axisY: {
                        showAxis: true,
                        showLines: true,
                        showLabels: true,
                        showTicks: true,
                        zeroAxis: false,
                        orient: 'left',
                        label: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            bold: true,
                            color: '#34495E'
                        }
                    }
                }
            },
            settings:settings
        }
    })
};
