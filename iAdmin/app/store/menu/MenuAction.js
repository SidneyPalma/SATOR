//@charset UTF-8
Ext.define( 'iAdmin.store.menu.MenuAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MenuAction',

    storeId: 'menuaction',

    requires: [
        'iAdmin.model.menu.MenuAction'
    ],

    url: '../iAdmin/business/Calls/menuaction.php',

    model: 'iAdmin.model.menu.MenuAction'

});