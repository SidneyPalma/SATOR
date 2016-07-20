//@charset UTF-8
Ext.define( 'iAdmin.store.areas.CMEAreasStock', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.CMEAreasStock',

    storeId: 'cmeareasstock',

    requires: [
        'iAdmin.model.areas.CMEAreasStock'
    ],

    url: '../iAdmin/business/Calls/cmeareasstock.php',

    model: 'iAdmin.model.areas.CMEAreasStock'

});