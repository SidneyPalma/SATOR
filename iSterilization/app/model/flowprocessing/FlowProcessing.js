//@charset UTF-8
Ext.define( 'iSterilization.model.flowprocessing.FlowProcessing', {
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
            name: 'sterilizationtypeid',
            type: 'int'
        }, {
            name: 'materialboxid',
            type: 'int'
        }, {
            name: 'dateof',
            type: 'auto'
        }, {
            name: 'dateto',
            type: 'auto'
        }, {
            name: 'username',
            type: 'auto'
        }, {
            name: 'prioritylevel',
            type: 'auto'
        }
    ]

});