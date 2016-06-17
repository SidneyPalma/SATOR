//@charset UTF-8
Ext.define( 'iAdmin.model.helper.StepSterilization', {
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
            name: 'name',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'cmeareasid',
            type: 'int'
        }, {
            name: 'cmeareasname',
            type: 'auto'
        }, {
            name: 'equipmentid',
            type: 'int'
        }, {
            name: 'equipmentname',
            type: 'auto'
        }, {
            name: 'sterilizationtypeid',
            type: 'int'
        }, {
            name: 'sterilizationtypename',
            type: 'auto'
        }, {
            name: 'timecycleprocess',
            type: 'int'
        }, {
            name: 'labelpreparation',
            type: 'auto'
        }, {
            name: 'stepflaglist',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});