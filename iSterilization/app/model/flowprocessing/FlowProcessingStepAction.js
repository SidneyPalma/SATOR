//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingStepAction', {
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
            name: 'flowprocessingid',
            type: 'int'
        }, {
            name: 'flowstepaction',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean'
        }, {
            name: 'username',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'patientname',
            type: 'auto'
        }, {
            name: 'dateof',
            type: 'auto'
        }, {
            name: 'timeof',
            type: 'auto'
        }
    ]

});