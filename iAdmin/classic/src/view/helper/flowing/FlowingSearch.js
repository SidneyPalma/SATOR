//@charset UTF-8
Ext.define( 'iAdmin.view.helper.flowing.FlowingSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'flowingsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.Flowing'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.Flowing'

});
