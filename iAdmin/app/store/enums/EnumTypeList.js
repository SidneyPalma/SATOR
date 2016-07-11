//@charset UTF-8
Ext.define( 'iAdmin.store.enums.EnumTypeList', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.EnumTypeList',

    storeId: 'enumtypelist',

    requires: [
        'iAdmin.model.enums.EnumTypeList'
    ],

    url: '../iAdmin/business/Calls/enumtypelist.php',

    model: 'iAdmin.model.enums.EnumTypeList'

});