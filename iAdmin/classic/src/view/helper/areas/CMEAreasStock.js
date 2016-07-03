//@charset UTF-8
Ext.define( 'iAdmin.view.areas.CMEAreasStock', {
    extend: 'Ext.grid.Panel',

    xtype: 'cmeareasstock',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.areas.*',
        'Ext.grid.plugin.CellEditing'
    ],

    rowLines: false,
    columnLines: false,
    headerBorders: false,

    // selType: 'cellmodel',
    //
    // plugins: {
    //     clicksToEdit: 1,
    //     ptype: 'cellediting'
    // },
    //
    // listeners: {
    //     edit: 'onEditTypeFlow'
    // },

    store: 'cmeareasstock',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.areas.CMEAreasStock');

        me.columns = [
            {
                width: 200,
                sortable: false,
                text: 'Apresentação',
                dataIndex: 'presentationdescription'
            }, {
                width: 120,
                align: 'right',
                sortable: false,
                text: 'Estoque',
                dataIndex: 'lotamount',
                renderer: Smart.maskRenderer('0,000',true)
            }, {
                width: 100,
                sortable: false,
                xtype: 'datecolumn',
                align: 'center',
                text: 'Validade',
                dataIndex: 'datevalidity'
            }, {
                width: 200,
                sortable: false,
                text: 'Lote N#',
                dataIndex: 'lotpart'
            }
        ];
    }

});