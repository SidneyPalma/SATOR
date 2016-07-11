//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'materialsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.itembase.Material'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.itembase.Material'

});
