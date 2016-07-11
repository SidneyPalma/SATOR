//@charset UTF-8
Ext.define( 'iAdmin.view.areas.CMEAreasDeposit', {
    extend: 'Ext.grid.Panel',

    xtype: 'cmeareasdeposit',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.areas.*',
        'Ext.grid.plugin.CellEditing'
    ],

    rowLines: false,
    columnLines: false,
    headerBorders: false,

    selType: 'cellmodel',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    listeners: {
        edit: 'onEditTypeFlow'
    },

    store: 'cmeareasdeposit',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.areas.CMEAreasDeposit');

        me.columns = [
            {
                flex: 1,
                text: 'Nome',
                dataIndex: 'name',
                editor: {
                    allowBlank: false,
                    xtype: 'textfield',
                    emptyText: 'Nome do deposito'
                }
            }, {
                width: 200,
                dataIndex: 'barcode',
                editor: {
                    allowBlank: false,
                    xtype: 'textfield',
                    emptyText: 'Código de barras'
                }
            }
        ];
    }

});