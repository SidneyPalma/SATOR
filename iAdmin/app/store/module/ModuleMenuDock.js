//@charset UTF-8
Ext.define( 'iAdmin.store.module.ModuleMenuDock', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ModuleMenuDock',

    requires: [
        'iAdmin.model.module.ModuleMenu'
    ],

    storeId: 'modulemenudock',

    url: '../iAdmin/business/Calls/modulemenu.php',

    model: 'iAdmin.model.module.ModuleMenu',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectDock'
        }
    }

});