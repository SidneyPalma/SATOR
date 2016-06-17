//@charset UTF-8
Ext.define( 'iAdmin.view.helper.equipmentstatus.EquipmentStatusSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'equipmentstatussearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.EquipmentStatus'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.EquipmentStatus'

});
