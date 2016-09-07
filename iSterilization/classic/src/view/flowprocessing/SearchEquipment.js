//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchEquipment', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchequipment',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'equipmentname',

    pageSize: 0,
    editable: false,
    showClear: true,

    url: '../iSterilization/business/Calls/flowprocessing.php',

    params: {
        action: 'select',
        method: 'selectEquipment'
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'equipmentname',
            type: 'auto'
        }
    ]

});