//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'userssearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.users.Users'
    ],

    displayField: 'username',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.users.Users'

});
