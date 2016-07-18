//@charset UTF-8
Ext.define( 'iAdmin.model.areas.EquipmentCycle', {
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
            name: 'equipmentid',
            type: 'int'
        }, {
            name: 'cycleid',
            type: 'int'
        }
    ]

});