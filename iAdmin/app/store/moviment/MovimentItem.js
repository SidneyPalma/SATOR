//@charset UTF-8
Ext.define( 'iAdmin.store.moviment.MovimentItem', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.MovimentItem',

    storeId: 'movimentitem',

    requires: [
        'iAdmin.model.moviment.MovimentItem'
    ],

    url: '../iAdmin/business/Calls/movimentitem.php',

    model: 'iAdmin.model.moviment.MovimentItem',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});