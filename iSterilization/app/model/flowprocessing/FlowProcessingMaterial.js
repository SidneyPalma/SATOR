//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingMaterial', {
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
            name: 'flowprocessingstepid',
            type: 'int'
        }, {
            name: 'materialid',
            type: 'int'
        }, {
            name: 'materialname',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'unconformities',
            type: 'auto'
        }, {
            name: 'unconformitiesdescription',
            type: 'auto'
        }, {
            name: 'dateof',
            type: 'auto',
            serializeType: 'date'
        }
    ]

});