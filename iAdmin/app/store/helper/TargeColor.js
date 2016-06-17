//@charset UTF-8
Ext.define( 'iAdmin.store.helper.TargeColor', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.TargeColor',

    storeId: 'targecolor',

    requires: [
        'iAdmin.model.helper.TargeColor'
    ],

    url: '../iAdmin/business/Calls/targecolor.php',

    model: 'iAdmin.model.helper.TargeColor',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});