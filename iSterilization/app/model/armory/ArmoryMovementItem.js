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
            type: 'colorpallet'
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
            name: 'regresstype',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'regresstypedescription',
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