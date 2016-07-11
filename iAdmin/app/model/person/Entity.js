//@charset UTF-8
Ext.define( 'iAdmin.model.person.Entity', {
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
            name: 'legalname',
            type: 'auto'
        }, {
            name: 'collaboratorid',
            type: 'int'
        }, {
            name: 'collaboratorname',
            type: 'auto'
        }, {
            name: 'cnpjnumber',
            type: 'auto'
        }, {
            name: 'cnesnumber',
            type: 'auto'
        }, {
            name: 'cmesponsor',
            type: 'auto'
        }
    ]

});