//@charset UTF-8
Ext.define( 'iAdmin.store.users.UsersMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.UsersMenuTree',

    storeId: 'usersmenutree',

    removeRootNode: true,

    requires: [
        'iAdmin.model.users.UsersMenuTree'
    ],

    url: '../iAdmin/business/Calls/usersmenu.php',

    model: 'iAdmin.model.users.UsersMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});