//@charset UTF-8
Ext.define( 'iAdmin.model.helper.Place', {
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
            name: 'clientid',
            type: 'int'
        }, {
            name: 'clientname',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});