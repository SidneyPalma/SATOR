//@charset UTF-8
Ext.define( 'iAdmin.store.profile.ProfileMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.ProfileMenuTree',

    storeId: 'profilemenutree',

    removeRootNode: true,

    requires: [
        'iAdmin.model.profile.ProfileMenuTree'
    ],

    url: '../iAdmin/business/Calls/profilemenu.php',

    model: 'iAdmin.model.profile.ProfileMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});