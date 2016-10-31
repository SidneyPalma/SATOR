//@charset UTF-8
Ext.define( 'iAdmin.model.box.MaterialBoxTarge', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto',
        'Smart.data.field.ColorPallet'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'colorcode',
            type: 'int'
        }, {
            name: 'colorname',
            type: 'auto'
        }, {
            name: 'materialboxid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'targecolorid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'targeorderby',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'targecolorname',
            type: 'auto'
        }, {
            name: 'colorschema',
            type: 'auto'
        }, {
            name: 'colorpallet',
            type: 'colorpallet'
        }, {
            name: 'numberproceedings',
            type: 'int'
        }, {
            name: 'proprietaryname',
            type: 'auto'
        }, {
            name: 'isconsigned',
            type: 'int'
        }
    ]

});