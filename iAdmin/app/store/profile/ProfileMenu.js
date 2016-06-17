//@charset UTF-8
Ext.define( 'iAdmin.store.profile.ProfileMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ProfileMenu',

    storeId: 'profilemenu',

    requires: [
        'iAdmin.model.profile.ProfileMenu'
    ],

    url: '../iAdmin/business/Calls/profilemenu.php',

    model: 'iAdmin.model.profile.ProfileMenu'

});