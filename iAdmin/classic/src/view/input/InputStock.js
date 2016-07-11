//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputStock', {
    extend: 'Ext.grid.Panel',

    xtype: 'inputstock',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*'
    ],

    hideHeaders: false,
    headerBorders: false,

    cls: 'list-grid',

    selType: 'cellmodel',

    store: 'inputstock',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.itembase.InputStock');

        me.columns = [
            {
                flex: 1,
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