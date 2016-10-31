//@charset UTF-8
Ext.define( 'Smart.data.field.ColorPallet', {
    extend: 'Ext.data.field.Field',

    requires: [
        'Smart.util.*',
        'Ext.data.field.Field'
    ],

    alias: 'data.field.colorpallet',

    alternateClassName: 'Ext.data.ColorPallet',

    valueH: 25,
    valueW: 25,

    convert: function (value, record) {
        var me = this,
            colorpallet = '',
            colorschema = record.get('colorschema') ? record.get('colorschema').split(",") : null,
            schema = '<div style="{0}"></div>',
            stripe = 'width: ' + me.valueW + 'px; height: ' + me.valueH + 'px; float: left; border: 2px solid black; border-radius: 50%;' +
                     'background: repeating-linear-gradient(-90deg, {0}, {1} 2px, {2} 2px, {3} 7px);';

        var item = Ext.String.format(schema,stripe);

        Ext.each(colorschema, function (data) {
            console.info(data);
            if(data.length != 0) {
                var colorstripe = data.split("|");
                colorpallet += Ext.String.format(item, colorstripe[1],colorstripe[1],colorstripe[0],colorstripe[0]);
            }
        });

        return colorpallet;
    }

});