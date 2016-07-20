//@charset UTF-8
Ext.define( 'iAdmin.view.equipment.EquipmentCMEAreasSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'equipmentcmeareassearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.itembase.Equipment'
    ],

    displayField: 'equipmentname',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.itembase.Equipment'

});
