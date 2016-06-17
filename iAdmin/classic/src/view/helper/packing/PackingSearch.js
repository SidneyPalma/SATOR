//@charset UTF-8
Ext.define( 'iAdmin.view.helper.packing.PackingSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'packingsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.Packing'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.Packing'

});
