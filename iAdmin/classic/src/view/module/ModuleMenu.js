//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleMenu', {
    extend: 'Ext.tree.Panel',

    xtype: 'modulemenu',

    controller: 'module',

    requires: [
        'Ext.tree.*',
        'Ext.grid.column.*',
        'Smart.TextMaskCore',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.view.module.ModuleController'
    ],

    cls: 'update-grid',

    store: 'modulemenutree',

    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    hideHeaders: false,
    singleExpand: true,
    headerBorders: false,
    reserveScrollbar: false,

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

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
                        handler: 'showUpdateMenu',
                        iconCls: "fa fa-pencil action-update-color",
                        tooltip: 'Editar'
                    }, {
                        disabled: true,
                        xtype: 'splitter'
                    }, {
                        handler: 'showDeleteMenu',
                        iconCls: "fa fa-ban action-delete-color",
                        tooltip: 'Remover'
                    }
                ]
            }
        ];
    },
    selType: 'cellmodel',
    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting',
        pluginId: 'pluginmodule'
    }

});