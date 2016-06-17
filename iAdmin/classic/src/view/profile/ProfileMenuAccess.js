//@charset UTF-8
Ext.define( 'iAdmin.view.profile.ProfileMenuAccess', {
    extend: 'Ext.form.Panel',

    xtype: 'profilemenuaccess',

    controller: 'profile',

    requires: [
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.view.profile.ProfileController'
    ],

    cls: 'panel-frame',

    hidden: true,
    floating: true,
    bodyPadding: 10,
    layout: 'anchor',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'label',
                cls: 'sub-title-label',
                text: 'Ações'
            }, {
                height: 300,
                xtype: 'gridpanel',
                cls: 'update-grid',
                hideHeaders: false,
                headerBorders: false,
                store: 'profilemenuaction',
                columns: [
                    {
                        flex: 1,
                        text: 'Diretivas',
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
                            setTextAlign: 'center'
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
                        isDisabled: function (view, rowIdx, colIdx, item, rec) {
                            return isNaN(rec.data.id);
                        }
                    }
                ],
                selType: 'cellmodel',
                plugins: {
                    clicksToEdit: 1,
                    ptype: 'cellediting'
                },
                listeners: {
                    edit: 'onEditMenuAction',
                    cellkeydown: 'onCellKeyDown'
                }
            }
        ];

    }

});