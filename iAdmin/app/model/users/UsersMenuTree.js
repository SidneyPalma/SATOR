//@charset UTF-8
Ext.define( 'iAdmin.model.users.UsersMenuTree', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'parentid',
            type: 'int'
        }, {
            name: 'usersid',
            type: 'int'
        }, {
            name: 'usersmenuid',
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
            name: 'menutype',
            type: 'auto'
        }, {
            name: 'orderby',
            type: 'auto'
        }
    ]

});