//@charset UTF-8
Ext.define( 'iAdmin.model.box.MaterialBox', {
    extend: 'Ext.data.Model',

    requires: [
        'Smart.data.identifier.Auto'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'restriction',
            type: 'auto'
        }, {
            name: 'itemsize',
            type: 'auto'
        }, {
            name: 'itemsizedescription',
            type: 'auto'
        }, {
            name: 'statusbox',
            type: 'auto'
        }, {
            name: 'statusboxdescription',
            type: 'auto'
        }, {
            name: 'packingid',
            type: 'int'
        }, {
            name: 'packingname',
            type: 'auto'
        }, {
            name: 'requirepatient',
            type: 'int'
        }
    ]

});