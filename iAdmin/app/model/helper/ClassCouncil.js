//@charset UTF-8
Ext.define( 'iAdmin.model.helper.ClassCouncil', {
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
            name: 'cnes',
            type: 'auto'
        }, {
            name: 'acronym',
            type: 'auto'
        }
    ]

});