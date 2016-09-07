//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingChargeItem', {
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
            name: 'flowprocessingchargeid',
            type: 'int'
        }, {
            name: 'flowprocessingstepid',
            type: 'int'
        }
    ]

});