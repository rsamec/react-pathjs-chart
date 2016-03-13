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


Pie.defaultProps = {
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
}
Tree.defaultProps =   {

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
}
SmoothLine.defaultProps = {

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
}
StockLine.defaultProps =   {
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
}
Radar.defaultProps =    {
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
}

Bar.defaultProps ={
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
}

Scatterplot.defaultProps= {
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
}

export default {
    Pie:_.extend(Pie, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    accessorKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            r: {type: 'number'},
                            R: {type: 'number'},
                            color: {type: 'colorPicker'},
                            legendPosition: {
                                type: 'select',
                                settings: {options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']}
                            },
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Tree:_.extend(Tree, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            r: {type: 'number'},
                            fill: {type: 'colorPicker'},
                            stroke: {type: 'colorPicker'},
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    SmoothLine:_.extend(SmoothLine, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    xKey:{type:'string'},
                    yKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            color: {type: 'colorPicker'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                            ,
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    StockLine:_.extend(StockLine, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    xKey:{type:'string'},
                    yKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            color: {type: 'colorPicker'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            },
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Radar:_.extend(Radar, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            r: {type: 'number'},
                            max: {type: 'number'},
                            fill: {type: 'colorPicker'},
                            stroke: {type: 'colorPicker'},
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Bar:_.extend(Bar, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    accessorKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            gutter: {type: 'number'},
                            color: {type: 'colorPicker'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            },
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Scatterplot:_.extend(Scatterplot, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    xKey:{type:'string'},
                    yKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            fill: {type: 'colorPicker'},
                            stroke: {type: 'colorPicker'},
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                            ,
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};
