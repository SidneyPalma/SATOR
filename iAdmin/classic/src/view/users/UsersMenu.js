//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersMenu', {
    extend: 'Ext.tree.Panel',

    xtype: 'usersmenu',

    requires: [
        'Ext.tree.*',
        'Ext.grid.column.*'
    ],

    store: 'usersmenutree',

    useArrows: true,
    rootVisible: false,
    hideHeaders: false,
    multiSelect: false,
    singleExpand: true,
    headerBorders: false,
    reserveScrollbar: false,

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, record) {
                return !record.data.leaf;
            },
            isDisabledDelete = function (view, rowIdx, colIdx, item, record) {
                return !record.data.usersmenuid;
            };

        me.columns = [
            {
                flex: 1,
                dataIndex: 'text',
                sortable: false,
                xtype: 'treecolumn',
                text: 'Descrição do menu'
            }, {
                width: 70,
                sortable: false,
                dataIndex: 'menutype'
            }, {
                width: 80,
                align: 'right',
                sortable: false,
                dataIndex: 'orderby',
                renderer: Smart.maskRenderer('0.00',true)
            }, {
                text: 'Ações',
                width: 90,
                sortable: false,
                xtype: 'actioncolumn',
                align: 'center',
                items: [
                    {
                        handler: 'onActionUpdateTree',
                        isDisabled: isDisabled,
                        getTip: function(v, meta, rec) {
                            if (rec.data.leaf) {
                                return 'Editar permissões de menu!';
                            } else {
                                return '';
                            }
                        },
                        getClass: function(v, meta, rec) {
                            if (rec.data.leaf) {
                                return "fa fa-pencil action-update-color";
                            } else {
                                return "";
                            }
                        }
                    }, {
                        disabled: true,
                        xtype: 'splitter'
                    }, {
                        handler: 'onActionDeleteTree',
                        isDisabled: isDisabledDelete,
                        getTip: function(v, meta, rec) {
                            if (rec.data.usersmenuid) {
                                return 'Remover permissões de menu!';
                            } else {
                                return '';
                            }
                        },
                        getClass: function(v, meta, rec) {
                            if (rec.data.usersmenuid) {
                                return "fa fa-ban action-delete-color";
                            } else {
                                return "";
                            }
                        }
                    }
                ]
            }
        ];

    }

});