//@charset UTF-8
Ext.define( 'iSterilization.model.armory.ArmoryStock', {
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
            name: 'armorymovementitemid',
            type: 'int'
        }, {
            name: 'armorystatus',
            type: 'auto'
        }
    ]

});