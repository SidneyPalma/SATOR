//@charset UTF-8
Ext.define( 'iAdmin.model.person.Proprietary', {
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
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'contactsphone',
            type: 'auto'
        }, {
            name: 'contactperson',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'int'
        }
    ]

});