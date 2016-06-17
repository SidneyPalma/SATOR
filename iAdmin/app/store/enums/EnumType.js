//@charset UTF-8
Ext.define( 'iAdmin.store.enums.EnumType', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.EnumType',

    storeId: 'enumtype',

    requires: [
        'iAdmin.model.enums.EnumType'
    ],

    url: '../iAdmin/business/Calls/enumtype.php',

    model: 'iAdmin.model.enums.EnumType'

});