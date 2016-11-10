//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.Material', {
    extend: 'iAdmin.model.itembase.ItemBase',

    requires: [
        'iAdmin.model.itembase.ItemBase',
        'Smart.data.field.ColorPallet'
    ],

    classFields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'materialstatus',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'materialstatusdescription',
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
            name: 'itemsize',
            type: 'auto'
        }, {
            name: 'itemsizedescription',
            type: 'auto'
        }, {
            name: 'armorylocal',
            type: 'auto'
        }, {
            name: 'armorylocaldescription',
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
        }, {
            name: 'cloned',
            type: 'boolean'
        }, {
            name: 'clonedate',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'cloneusername',
            type: 'auto'
        }
    ]

});