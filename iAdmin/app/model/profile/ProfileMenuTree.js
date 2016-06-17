//@charset UTF-8
Ext.define( 'iAdmin.model.profile.ProfileMenuTree', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'parentid',
            type: 'int'
        }, {
            name: 'profileid',
            type: 'int'
        }, {
            name: 'profilemenuid',
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
            name: 'directive',
            type: 'auto'
        }
    ]

});