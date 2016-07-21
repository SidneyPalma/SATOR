//@charset UTF-8
Ext.define( 'iAdmin.view.equipment.EquipmentCMEAreasSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'equipmentcmeareassearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.itembase.Equipment'
    ],

    displayValue: 'equipmentid',
    displayField: 'equipmentname',

    showClear: true,

    url: '../iAdmin/business/Calls/equipment.php',

    params: {
        query: null,
        cmeareasid: null,
        action: 'select',
        method: 'selectArea'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'equipmentid',
            type: 'int'
        }, {
            name: 'equipmentname',
            type: 'auto'
        }
    ]

});
