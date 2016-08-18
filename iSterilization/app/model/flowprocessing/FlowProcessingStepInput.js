//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingStepInput', {
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
            name: 'inputpresentationd',
            type: 'int'
        }, {
            name: 'ischecked',
            type: 'boolean'
        }, {
            name: 'presentation',
            type: 'auto'
        }, {
            name: 'quantity',
            type: 'auto'
        }, {
            name: 'datevalidity',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'lotpart',
            type: 'auto'
        }
    ]

});