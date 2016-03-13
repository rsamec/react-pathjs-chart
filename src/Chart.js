import _ from 'underscore';

//import Pie from './charts/Pie.js';
//import Tree from './charts/Tree.js';
//import Radar from './charts/Radar.js';
//import Bar from './charts/Bar.js';
//import SmoothLine from './charts/SmoothLine.js';
//import StockLine from './charts/StockLine.js';
//import Scatterplot from './charts/Scatterplot.js';

import SmoothLine from './charts/SmoothLineVivus.js';
import StockLine from './charts/StockLineVivus.js';
import Bar from './charts/BarVivus.js';
import Pie from './charts/PieVivus.js';
import Radar from './charts/RadarVivus.js';
import Tree from './charts/TreeVivus.js';
import Scatterplot from './charts/ScatterplotVivus.js';

// form: true
// make objects not extensible,
// fields not removable
// and inputs always visible
var settings = {
    form: true,
    fields: {
        data:{type:'bindingEditor'},
        options: {
            fields: {
                width:{type:'number'},
                height:{type:'number'},
                margin:{type:'boxSizeEditor'},
                r:{type:'number'},
                R:{type:'number'},
                gutter:{type:'number'},
                color: {type: 'colorPicker'},
                fill: {type: 'colorPicker'},
                stroke: {type: 'colorPicker'},
                legendPosition: {
                    type: 'select',
                    settings: {options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']}
                },
                label: {type: 'fontEditor'},
                animate: {
                    fields: {
                        type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                        duration:{type:'number'},
                        fillTransition:{type:'number'}
                    }
                }
                ,
                axisY: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['left', 'right']}},
                        tickValues: {type: 'tickValues'},
                        label: {type: 'fontEditor'},
                        showAxis: {type:'boolean'},
                        showLines: {type:'boolean'},
                        showLabels: {type:'boolean'},
                        showTicks: {type:'boolean'},
                        zeroAxis: {type:'boolean'}
                    }
                },
                axisX: {
                    fields: {
                        orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                        tickValues: {type: 'tickValues'},
                        label: {type: 'fontEditor'},
                        showAxis: {type:'boolean'},
                        showLines: {type:'boolean'},
                        showLabels: {type:'boolean'},
                        showTicks: {type:'boolean'},
                        zeroAxis: {type:'boolean'}
                    }
                }
            }
        }
    }
};

export default {
    Pie:_.extend(Pie, {
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
                        color: '#ECF0F1'
                    }
                }
            },
            settings:settings
        }
    }),
    Tree:_.extend(Tree, {
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
    SmoothLine:_.extend(SmoothLine, {
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
                        duration: 200,
                        fillTransition:3
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
    StockLine:_.extend(StockLine, {
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
                        duration: 200,
                        fillTransition:3
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
    Radar:_.extend(Radar, {
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
                        duration: 200,
                        fillTransition:3
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
    Bar:_.extend(Bar, {
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
    Scatterplot:_.extend(Scatterplot, {
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
                        duration: 200,
                        fillTransition:3
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
