//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersMenuAccess', {
    extend: 'Ext.window.Window',

    xtype: 'usersmenuaccess',

    requires: [
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.window.Window',
        'Ext.grid.plugin.CellEditing'
    ],

    width: 650,
    modal: true,
    header: false,
    resizable: false,
    showAnimate: true,

    layout: 'anchor',
    controller: 'users',

    listeners: {
        destroy: 'onDestroy'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, rec) {
                return isNaN(rec.data.id);
            };

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'usersid'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'menuid'
                    }, {
                        name: 'name',
                        xtype: 'displayfield',
                        fieldLabel: 'Menu',
                        fieldCls: 'smart-field-style-action'
                    }
                ]
            }, {
                height: 300,
                xtype: 'gridpanel',
                cls: 'update-grid',
                hideHeaders: false,
                headerBorders: false,
                store: 'usersmenuaction',
                columns: [
                    {
                        flex: 1,
                        text: 'Descrição',
                        sortable: false,
                        dataIndex: 'description',
                        renderer: function(val, meta, rec) {
                            var flag = Ext.isNumeric(rec.get('id')) ? 'rgb(17, 160, 43)' : 'rgb(251, 60, 74)',
                                directive = '<span style="font-family: Consolas; color: white; padding: 3px; background: {0};">{1}</span>   {2}';

                            return Ext.String.format(directive, flag, rec.get('directive'), val);
                        }
                    }, {
                        width: 130,
                        sortable: false,
                        align: 'center',
                        text: 'Expira em',
                        dataIndex: 'expireto',
                        xtype: 'datecolumn',
                        editor: {
                            allowBlank: false,
                            xtype: 'datefield',
                            plugins: 'textmask',
                            returnWithMask: true,
							setTextAlign: 'center',
                            fieldCls: 'smart-field-style-action'
                        }
                    }, {
                        width: 50,
                        sortable: false,
                        align: 'center',
                        xtype: 'actioncolumn',
						handler: 'onActionDelete',
						getTip: function(v, meta, rec) {
							if (!isNaN(rec.data.id)) {
								return 'Remover permissão do menu!';
							} else {
								return '';
							}
						},
						getClass: function(v, meta, rec) {
							if (!isNaN(rec.data.id)) {
								return "fa fa-ban action-delete-color";
							} else {
								return "";
							}
						},
						isDisabled: isDisabled
                    }
                ],
                selType: 'cellmodel',
                plugins: {
                    clicksToEdit: 1,
                    ptype: 'cellediting'
                },
                listeners: {
                    edit: 'onEditMenuAction'
                }
            }
        ];

    },

    buttonAlign: 'center',

    buttons: [
        {
            scale: 'medium',
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});