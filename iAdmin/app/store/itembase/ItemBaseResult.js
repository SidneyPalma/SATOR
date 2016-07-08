//@charset UTF-8
Ext.define( 'iAdmin.store.itembase.ItemBaseResult', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ItemBaseResult',

    storeId: 'itembaseresult',

    url: '../iAdmin/business/Calls/itembase.php',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'itembaseid',
            type: 'int'
        }, {
            name: 'showorder',
            type: 'int'
        }, {
            name: 'fieldtext',
            type: 'auto'
        }, {
            name: 'fieldname',
            type: 'auto'
        }, {
            name: 'datavalue',
            type: 'auto'
        }, {
            name: 'reference',
            type: 'auto'
        }, {
            name: 'formfield',
            type: 'auto'
        }, {
            name: 'datafield',
            type: 'auto'
        }
    ],

    config: {
        extraParams: {
            action: 'select',
            method: 'selectData'
        }
    }

});