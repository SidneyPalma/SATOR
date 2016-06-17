//@charset UTF-8
Ext.define( 'iAdmin.store.users.UsersMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.UsersMenu',

    storeId: 'usersmenu',

    requires: [
        'iAdmin.model.users.UsersMenu'
    ],

    url: '../iAdmin/business/Calls/usersmenu.php',

    model: 'iAdmin.model.users.UsersMenu',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});