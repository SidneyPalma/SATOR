//@charset UTF-8
Ext.define( 'iAdmin.store.moviment.InputEnterSearch', {
    extend: 'Smart.data.StoreBase',

    storeId: 'inputentersearch',

    alias: 'store.InputEnterSearch',

    fields: [
        'id',
        'name',
        'hasbatch',
        'hasstock',
        'manufacturername'
    ],

    url: '../iAdmin/business/Calls/moviment.php',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectInputEnter'
        }
    }

});