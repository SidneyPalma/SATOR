//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'materialboxsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.box.MaterialBox'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.box.MaterialBox'

});
