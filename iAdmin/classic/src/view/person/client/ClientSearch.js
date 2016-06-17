//@charset UTF-8
Ext.define( 'iAdmin.view.person.client.ClientSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'clientsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.person.Client'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.person.Client'

});
