//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessingStep', {
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
            name: 'flowprocessingid',
            type: 'int'
        }, {
            name: 'steplevel',
            type: 'int'
        }, {
            name: 'elementtype',
            type: 'auto'
        }, {
            name: 'elementname',
            type: 'auto'
        }, {
            name: 'stepflaglist',
            type: 'auto'
        }, {
            name: 'stepsettings',
            type: 'auto'
        }, {
            name: 'areasid',
            type: 'int'
        }, {
            name: 'equipmentid',
            type: 'int'
        }, {
            name: 'steppriority',
            type: 'int'
        }, {
            name: 'source',
            type: 'int'
        }, {
            name: 'target',
            type: 'int'
        }, {
            name: 'useppe',
            type: 'int'
        }, {
            name: 'flowstepstatus',
            type: 'auto'
        }, {
            name: 'flowstepstatusdescription',
            type: 'auto'
        }, {
            name: 'sterilizationtypename',
            type: 'auto'
        }, {
            name: 'sterilizationtypeversion',
            type: 'auto',
            convert: function (value, record) {
                return record.get('sterilizationtypename') + ' v.' + record.get('version');
            }
        }
    ]

});