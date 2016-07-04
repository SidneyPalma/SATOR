//@charset UTF-8
Ext.define( 'iAdmin.model.sterilizationtype.SterilizationTypeInput', {
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
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'inputid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'inputname',
            type: 'auto'
        }, {
            name: 'inputnamepresentation',
            type: 'auto',
            convert: function location(value, record){
                return record.get('inputname') + ' (' + record.get('presentationdescription') + ')';
            }
        }, {
            name: 'presentation',
            type: 'auto'
        }, {
            name: 'presentationdescription',
            type: 'auto'
        }
    ]

});