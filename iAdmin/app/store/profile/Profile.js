//@charset UTF-8
Ext.define( 'iAdmin.store.profile.Profile', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Profile',

    storeId: 'profile',

    requires: [
        'iAdmin.model.profile.Profile'
    ],

    url: '../iAdmin/business/Calls/profile.php',

    model: 'iAdmin.model.profile.Profile',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});