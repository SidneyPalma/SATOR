//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.Material', {
    extend: 'iAdmin.model.itembase.ItemBase',

    requires: [
        'iAdmin.model.itembase.ItemBase'
    ],

    classFields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'materialstatusid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'materialstatusname',
            type: 'auto'
        }, {
            name: 'packingid',
            type: 'int'
        }, {
            name: 'packingname',
            type: 'auto'
        }, {
            name: 'numberproceedings',
            type: 'int'
        }, {
            name: 'datedisposal',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'itembasetype',
            type: 'auto',
            defaultValue: 'M'
        }, {
            name: 'isconsigned',
            type: 'int'
        }, {
            name: 'itemgroup',
            type: 'auto'
        }, {
            name: 'itemgroupdescription',
            type: 'auto'
        }, {
            name: 'itemsize',
            type: 'auto'
        }, {
            name: 'itemsizedescription',
            type: 'auto'
        }, {
            name: 'itemlength',
            type: 'auto'
        }, {
            name: 'itemcubiclength',
            type: 'auto'
        }, {
            name: 'materialboxname',
            type: 'auto'
        }
    ]

});