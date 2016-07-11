//@charset UTF-8
Ext.define( 'iAdmin.store.helper.Place', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.Place',

    storeId: 'place',

    requires: [
        'iAdmin.model.helper.Place'
    ],

    url: '../iAdmin/business/Calls/place.php',

    model: 'iAdmin.model.helper.Place',

    config: {
        extraParams: {
            params: Ext.encode(['name','description'])
        }
    }

});