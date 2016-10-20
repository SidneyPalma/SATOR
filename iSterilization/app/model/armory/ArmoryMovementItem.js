//@charset UTF-8
Ext.define( 'iSterilization.model.armory.ArmoryMovementItem', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'armorymovementid',
            type: 'int'
        }, {
            name: 'flowprocessingstepid',
            type: 'int'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'materialname',
            type: 'auto'
        }, {
            name: 'colorschema',
            type: 'auto'
        }, {
            name: 'colorpallet',
            type: 'auto',
            convert: function (value,record) {
                var colorpallet = '',
                    colorschema = record.get('colorschema') ? record.get('colorschema').split(",") : null,
                    coloritem = '<div style="background: {0}; width: 20px; height: 20px; float: left; border: 2px solid black; border-radius: 50%"></div>';

                Ext.each(colorschema,function (color) {
                    colorpallet += Ext.String.format(coloritem,color);
                });

                return colorpallet;
            }
        }, {
            name: 'armorylocal',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'armorylocaldescription',
            type: 'auto'
        }, {
            name: 'justified',
            type: 'auto'
        }, {
            name: 'outputtype',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'outputtypedescription',
            type: 'auto'
        }, {
            name: 'available',
            type: 'boolean'
        }
    ]

});