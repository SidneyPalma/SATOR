//@charset UTF-8
Ext.define( 'iAdmin.store.users.UsersProfile', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UsersProfile',

    storeId: 'usersprofile',

    requires: [
        'iAdmin.model.users.UsersProfile'
    ],

    url: '../iAdmin/business/Calls/usersprofile.php',

    model: 'iAdmin.model.users.UsersProfile',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});