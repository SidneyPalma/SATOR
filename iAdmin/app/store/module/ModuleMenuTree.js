//@charset UTF-8
Ext.define( 'iAdmin.store.module.ModuleMenuTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.ModuleMenuTree',

    storeId: 'modulemenutree',

    requires: [
        'iAdmin.model.module.ModuleMenuTree'
    ],

    removeRootNode: true,

    url: '../iAdmin/business/Calls/modulemenu.php',

    model: 'iAdmin.model.module.ModuleMenuTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});