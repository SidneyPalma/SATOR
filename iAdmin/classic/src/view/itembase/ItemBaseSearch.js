//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'itembasesearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.itembase.ItemBase'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.itembase.ItemBase'

});
