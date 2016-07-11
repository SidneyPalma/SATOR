//@charset UTF-8
Ext.define( 'iAdmin.store.sterilizationtype.SterilizationTypeMaterial', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.SterilizationTypeMaterial',

    storeId: 'sterilizationtypematerial',

    url: '../iAdmin/business/Calls/sterilizationtype.php',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean'
        }, {
            name: 'isconsigned',
            type: 'boolean'
        }, {
            name: 'itemlength',
            type: 'auto'
        }, {
            name: 'itemcubiclength',
            type: 'auto'
        }, {
            name: 'sterilizationtypeid',
            type: 'auto'

        }, {
            name: 'itemgroupdescription',
            type: 'auto'
        }
    ]

});