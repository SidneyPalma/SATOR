//@charset UTF-8
Ext.define( 'iAdmin.view.person.proprietary.ProprietarySearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'proprietarysearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.person.Proprietary'
    ],

    displayField: 'name',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.person.Proprietary'

});
