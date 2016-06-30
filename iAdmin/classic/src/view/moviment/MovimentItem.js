//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.MovimentItem', {
    extend: 'Ext.grid.Panel',

    xtype: 'movimentitem',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.moviment.*'
    ],

    hideHeaders: false,
    headerBorders: false,

    cls: 'list-grid',

    selType: 'cellmodel',

    store: 'movimentitem',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.moviment.MovimentItem');

        me.columns = [
            {
                flex: 1,
                text: 'Insumo',
                sortable: false,
                dataIndex: 'inputname'
            }, {
                width: 180,
                sortable: false,
                text: 'Apresentação',
                dataIndex: 'presentationdescription'
            }, {
                width: 60,
                text: 'Sigla',
                sortable: false,
                dataIndex: 'acronym'
            }, {
                width: 120,
                align: 'right',
                sortable: false,
                text: 'Quantidade',
                dataIndex: 'quantity',
                renderer: Smart.maskRenderer('0,000',true)
            }, {
                width: 100,
                sortable: false,
                xtype: 'datecolumn',
                align: 'center',
                text: 'Validade',
                dataIndex: 'datevalidity'
            }, {
                width: 100,
                sortable: false,
                text: 'Lote N#',
                dataIndex: 'lotpart'
            }
        ];
    },

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: 'movimentitem',
            dock: 'bottom',
            displayInfo: true
        }
    ]

});