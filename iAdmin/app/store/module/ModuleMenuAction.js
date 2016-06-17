//@charset UTF-8
Ext.define( 'iAdmin.store.module.ModuleMenuAction', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ModuleMenuAction',

    storeId: 'modulemenuaction',

    requires: [
        'iAdmin.model.module.ModuleMenu'
    ],

    url: '../iAdmin/business/Calls/modulemenu.php',

    model: 'iAdmin.model.module.ModuleMenu'

});