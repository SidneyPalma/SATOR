//@charset UTF-8
Ext.define( 'iAdmin.view.equipment.EquipmentSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'equipmentsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.itembase.Equipment'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.itembase.Equipment'

});
