//@charset UTF-8
Ext.define( 'iAdmin.store.profile.ProfileMenuAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ProfileMenuAction',

    storeId: 'profilemenuaction',

    requires: [
        'iAdmin.model.profile.ProfileMenuAction'
    ],

    url: '../iAdmin/business/Calls/profilemenuaction.php',

    model: 'iAdmin.model.profile.ProfileMenuAction',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }
    
});