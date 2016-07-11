//@charset UTF-8
Ext.define( 'iAdmin.store.helper.ClassCouncil', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ClassCouncil',

    storeId: 'classcouncil',

    requires: [
        'iAdmin.model.helper.ClassCouncil'
    ],

    url: '../iAdmin/business/Calls/classcouncil.php',

    model: 'iAdmin.model.helper.ClassCouncil',

    config: {
        extraParams: {
            params: Ext.encode(['name','cnes','acronym'])
        }
    }

});