//@charset UTF-8
Ext.define( 'iAdmin.view.helper.targe.TargeColorSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'targecolorsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.TargeColor'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.TargeColor'

});
