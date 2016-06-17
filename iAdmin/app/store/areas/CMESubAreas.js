//@charset UTF-8
Ext.define( 'iAdmin.store.areas.CMESubAreas', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.CMESubAreas',

    storeId: 'cmesubareas',

    requires: [
        'iAdmin.model.areas.CMESubAreas'
    ],

    url: '../iAdmin/business/Calls/cmesubareas.php',

    model: 'iAdmin.model.areas.CMESubAreas',

    config: {
        extraParams: {
            params: Ext.encode(['name','description']),
            fields: Ext.encode(['id','name','description'])
        }
    }

});