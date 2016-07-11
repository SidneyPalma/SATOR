//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.MaterialTypeFlow', {
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
            name: 'materialid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'sterilizationtypeid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'sterilizationtypename',
            type: 'auto'
        }, {
            name: 'prioritylevel',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'priorityleveldescription',
            type: 'auto'
        }
    ]

});