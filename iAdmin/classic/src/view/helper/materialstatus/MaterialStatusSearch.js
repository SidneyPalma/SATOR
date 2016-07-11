//@charset UTF-8
Ext.define( 'iAdmin.view.helper.materialstatus.MaterialStatusSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'materialstatussearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.MaterialStatus'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.helper.MaterialStatus'

});
