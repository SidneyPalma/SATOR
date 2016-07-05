//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialBoxItemSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'materialboxitemsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.box.MaterialBoxItemSearch'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.box.MaterialBoxItemSearch'

});
