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
            name: 'armorylocal',
            type: 'auto'
        }, {
            name: 'armorylocaldescription',
            type: 'auto'
        }, {
            name: 'justified',
            type: 'auto'
        }, {
            name: 'outputtype',
            type: 'auto'
        }, {
            name: 'outputtypedescription',
            type: 'auto'
        }
    ]

});