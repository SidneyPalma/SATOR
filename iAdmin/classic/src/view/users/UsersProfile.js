//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersProfile', {
    extend: 'Ext.grid.Panel',

    xtype: 'usersprofile',

    requires: [
        'Ext.tree.*',
        'Ext.grid.column.*'
    ],

    store: 'usersprofile',

    hideHeaders: false,
    multiSelect: false,
    headerBorders: false,
    cls: 'update-grid',


    selType: 'cellmodel',
    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },
    listeners: {
        edit: 'onEditMenuAction'
    },

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        me.columns = [
            {
                text: 'Descrição do perfil',
                dataIndex: 'name',
                flex: 1
            }, {
                text: 'Expira em',
                dataIndex: 'expireto',
                align: 'center',
                width: 120,
                xtype: 'datecolumn',
                editor: {
                    allowBlank: false,
                    xtype: 'datefield',
                    plugins: 'textmask',
                    returnWithMask: true,
                    setTextAlign: 'center'
                }
            }, {
                width: 100,
                text: 'Ações',
                align: 'center',
                xtype: 'actioncolumn',
                handler: 'onActionDeleteProfile',
                isDisabled: function (view, rowIdx, colIdx, item, record) {
                    return !record.data.expireto;
                },
                getTip: function(v, meta, rec) {
                    if (rec.data.expireto) {
                        return 'Remover permissões de menu!';
                    } else {
                        return '';
                    }
                },
                getClass: function(v, meta, rec) {
                    if (rec.data.expireto) {
                        return "fa fa-minus-circle action-delete-color-font";
                    } else {
                        return "";
                    }
                }
            }
        ];

    }

});