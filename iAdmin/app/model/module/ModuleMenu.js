//@charset UTF-8
Ext.define( 'iAdmin.model.module.ModuleMenu', {
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
            name: 'parentid',
            type: 'int'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'moduleid',
            type: 'int',
            critical: true
        }, {
            name: 'menuid',
            type: 'int'
        }, {
            name: 'orderby',
            type: 'auto'
        }
    ]

});