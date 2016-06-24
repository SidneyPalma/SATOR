//@charset UTF-8
Ext.define( 'iAdmin.view.areas.CMESubAreasDeposit', {
    extend: 'Ext.grid.Panel',

    xtype: 'cmesubareasdeposit',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.areas.*',
        'Ext.grid.plugin.CellEditing'
    ],

    // cls: 'update-grid',

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

    store: 'cmesubareasdeposit',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.areas.CMESubAreasDeposit');

        me.columns = [
            {
            //     width: 40,
            //     align: 'center',
            //     dataIndex: 'isactive',
            //     xtype: 'checkcolumn'
            // }, {
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