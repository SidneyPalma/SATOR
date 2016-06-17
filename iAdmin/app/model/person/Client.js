//@charset UTF-8
Ext.define( 'iAdmin.model.person.Client', {
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
            name: 'code',
            type: 'int'
        }, {
            name: 'clienttype',
            type: 'auto'
        }, {
            name: 'clienttypedescription',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});