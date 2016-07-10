//@charset UTF-8
Ext.define( 'iAdmin.model.itembase.InputPresentation', {
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
            name: 'inputid',
            type: 'int',
            persist: true,
            critical: true
        }, {
            name: 'presentation',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'presentationdescription',
            type: 'auto'
        }, {
            name: 'acronym',
            type: 'auto'
        }, {
            name: 'measurebase',
            type: 'auto'
        }, {
            name: 'filtertype',
            type: 'auto'
        }
    ]

});