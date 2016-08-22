//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingStepInputTree', {
    extend: 'Ext.data.TreeModel',

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
            name: 'parentid',
            type: 'int'
        }, {
            name: 'flowprocessingstepid',
            type: 'int'
        }, {
            name: 'inputpresentationid',
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
        }, {
            name: 'leaf',
            type: 'boolean'
        }
    ]

});