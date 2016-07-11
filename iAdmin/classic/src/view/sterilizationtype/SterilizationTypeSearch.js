//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'sterilizationtypesearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.sterilizationtype.SterilizationType'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.sterilizationtype.SterilizationType'

});
