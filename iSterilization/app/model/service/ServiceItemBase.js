//@charset UTF-8
Ext.define( 'iSterilization.model.service.ServiceItemBase', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'itembaseid',
            type: 'int'
        }, {
            name: 'itembasename',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'manufacturerid',
            type: 'int'
        }, {
            name: 'manufacturername',
            type: 'auto'
        }, {
            name: 'itembasetype',
            type: 'auto'
        }, {
            name: 'registrationanvisa',
            type: 'auto'
        }, {
            name: 'cmeareasid',
            type: 'int'
        }, {
            name: 'cmeareasname',
            type: 'auto'
        }
    ]

});