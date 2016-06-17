//@charset UTF-8
Ext.define( 'iAdmin.model.module.ModuleMenuTree', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'parentid',
            type: 'int'
        }, {
            name: 'text',
            type: 'auto'
        }, {
            name: 'router',
            type: 'auto'
        }, {
            name: 'glyph',
            type: 'auto'
        }, {
            name: 'leaf',
            type: 'boolean'
        }, {
            name: 'iconCls',
            type: 'auto',
            convert: function (value,record) {
                return record.get('glyph');
            }
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'menutype',
            type: 'auto'
        }, {
            name: 'directive',
            type: 'auto'
        }, {
            name: 'orderby',
            type: 'auto'
        }
    ]

});