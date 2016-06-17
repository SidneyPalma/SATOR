//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.Equipment', {
    extend: 'iAdmin.model.itembase.ItemBase',

    requires: [
        'iAdmin.model.itembase.ItemBase'
    ],

    classFields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'cmeareasid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'cmeareasname',
            type: 'auto'
        }, {
            name: 'equipmentstatusid',
            type: 'int'
        }, {
            name: 'equipmentstatusname',
            type: 'auto'
        }, {
            name: 'sterilizationflow',
            type: 'int'
        }, {
            name: 'sterilizationname',
            type: 'auto'
        }, {
            name: 'manufactureryear',
            type: 'int'
        }, {
            name: 'capacity',
            type: 'int'
        }, {
            name: 'design',
            type: 'auto'
        }, {
            name: 'serialnumber',
            type: 'auto'
        }, {
            name: 'registrationanvisavalid',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'itembasetype',
            type: 'auto',
            defaultValue: 'E'
        }
    ]

});