//@charset UTF-8
Ext.define( 'iAdmin.store.areas.CMEAreas', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.CMEAreas',

    storeId: 'cmeareas',

    requires: [
        'iAdmin.model.areas.CMEAreas'
    ],

    url: '../iAdmin/business/Calls/cmeareas.php',

    model: 'iAdmin.model.areas.CMEAreas',

    config: {
        extraParams: {
            params: Ext.encode(['name','description']),
            fields: Ext.encode(['id','name','description'])
        }
    }

});