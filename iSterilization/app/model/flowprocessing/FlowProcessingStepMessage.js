//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingStepMessage', {
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
            name: 'readercode',
            type: 'auto'
        }, {
            name: 'readertext',
            type: 'auto'
        }, {
            name: 'readershow',
            type: 'auto'
        }, {
            name: 'readerdate',
            type: 'auto'
        }
    ]

});