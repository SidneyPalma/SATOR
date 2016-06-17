//@charset UTF-8
Ext.define( 'iAdmin.model.profile.Profile', {
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
            name: 'observation',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});