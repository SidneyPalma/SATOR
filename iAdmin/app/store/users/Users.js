//@charset UTF-8
Ext.define( 'iAdmin.store.users.Users', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Users',

    storeId: 'users',

    requires: [
        'iAdmin.model.users.Users'
    ],

    url: '../iAdmin/business/Calls/users.php',

    model: 'iAdmin.model.users.Users',

    config: {
        extraParams: {
            params: Ext.encode(['username','fullname'])
        }
    }

});