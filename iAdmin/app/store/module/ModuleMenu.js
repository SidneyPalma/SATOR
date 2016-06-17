//@charset UTF-8
Ext.define( 'iAdmin.store.module.ModuleMenu', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ModuleMenu',

    requires: [
        'iAdmin.model.module.ModuleMenu'
    ],

    storeId: 'modulemenu',

    url: '../iAdmin/business/Calls/modulemenu.php',

    model: 'iAdmin.model.module.ModuleMenu',

    config: {
        extraParams: {
            params: Ext.encode(['name'])
        }
    }

});