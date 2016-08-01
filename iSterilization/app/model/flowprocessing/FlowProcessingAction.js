//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingAction', {
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
            name: 'flowstepaction',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean'
        }
    ]

});