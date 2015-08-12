import _ from 'underscore';

export default function fontAdapt(fontProps) {

    var style = {};
    if (fontProps === undefined) return style;
    style = _.omit(fontProps,['color','bold','italic','underline']);
    if (fontProps.color) style['fill'] = fontProps.color;
    if (fontProps.bold) style['fontWeight'] = 'bold';
    if (fontProps.italic) style['fontStyle'] = 'italic';
    if (fontProps.underline) style['borderBottom'] = '1px dashed #999';
    return style;
}