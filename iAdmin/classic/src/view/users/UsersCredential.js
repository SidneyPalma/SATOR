//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersCredential', {
    extend: 'Ext.form.Panel',

    xtype: 'userscredential',

    requires: [
        'Ext.form.Panel'
    ],

    layout: 'anchor',

    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        anchor: '100%'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'component',
                height: 200,
                html: [
                    '<div>OlaMundo</div>',
                    '<div>Cruel</div>'
                ]
            }, {
                fieldLabel: 'Login'
            }, {
                fieldLabel: 'Senha'
            }
        ]
    }

});