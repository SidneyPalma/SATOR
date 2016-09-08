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
            type: 'int'
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
            name: 'dateto',
            type: 'auto'
        }, {
            name: 'timeof',
            type: 'auto'
        }, {
            name: 'clientname',
            type: 'auto'
        }, {
            name: 'originplace',
            type: 'auto'
        }, {
            name: 'targetplace',
            type: 'auto'
        }, {
            name: 'authorizedby',
            type: 'auto'
        }, {
            name: 'sterilizationtypename',
            type: 'auto'
        }, {
            name: 'version',
            type: 'int'
        }, {
            name: 'steptype',
            type: 'auto'
        }, {
            name: 'items',
            type: 'int'
        }
    ]

});