//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'inputsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.input.Input'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.input.Input'

});
