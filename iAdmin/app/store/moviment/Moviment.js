//@charset UTF-8
Ext.define( 'iAdmin.store.moviment.Moviment', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Moviment',

    storeId: 'moviment',

    requires: [
        'iAdmin.model.moviment.Moviment'
    ],

    url: '../iAdmin/business/Calls/moviment.php',

    model: 'iAdmin.model.moviment.Moviment',

    config: {
        extraParams: {
            params: Ext.encode(['username','movimentdate'])
        }
    }

});