//@charset UTF-8
Ext.define( 'iAdmin.store.users.UsersMenuAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UsersMenuAction',

    storeId: 'usersmenuaction',

    requires: [
        'iAdmin.model.users.UsersMenuAction'
    ],

    url: '../iAdmin/business/Calls/usersmenuaction.php',

    model: 'iAdmin.model.users.UsersMenuAction',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});