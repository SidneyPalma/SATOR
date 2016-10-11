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
            name: 'armorylocal',
            type: 'auto'
        }
    ]

});