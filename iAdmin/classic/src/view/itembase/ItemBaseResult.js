//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseResult', {
    extend: 'Ext.grid.Panel',

    xtype: 'itembaseresult',

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
                width: 150,
                sortable: false,
                text: 'Lote N#',
                dataIndex: 'lotpart'
            }, {
                width: 80,
                align: 'center',
                name: 'action-record',
                xtype: 'actioncolumn',
                items: [
                    {
                        handler: 'onUpdateItem',
                        getTip: function(v, meta, rec) {
                            var isactive = parseInt(rec.data.isactive);
                            return (isactive == 0) ? "Confirmar lançamento!" : "";
                        },
                        getClass: function(v, meta, rec) {
                            var isactive = parseInt(rec.data.isactive);
                            return (isactive == 0) ? "fa fa-check-circle action-select-color" : "";
                        },
                        isDisabled: function (view, rowIdx, colIdx, item, rec) {
                            var isactive = parseInt(rec.data.isactive);
                            return (isactive == 1);
                        }
                    }, {
                        width: 5,
                        disabled: true,
                        xtype: 'splitter'
                    }, {
                        handler: 'onDeleteItem',
                        iconCls: "fa fa-times-circle action-delete-color",
                        tooltip: 'Excluir lançamento!'
                    }
                ]
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