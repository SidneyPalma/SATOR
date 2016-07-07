//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseResult', {
    extend: 'Ext.grid.Panel',

    xtype: 'itembaseresult',

    requires: [
        'Ext.grid.Panel',
        'Smart.plugins.*',
        'Ext.grid.column.*'
    ],

    rowLines: false,
    columnLines: false,
    hideHeaders: false,
    headerBorders: false,

    cls: 'update-grid',

    selType: 'cellmodel',

    plugins: ['insertrecordgrid'],

    store: Ext.create('Smart.data.StoreBase', {

        url: '../iAdmin/business/Calls/itembase.php',

        fields: [
            {
                name: 'id',
                type: 'int'
            }, {
                name: 'fieldname',
                type: 'auto'
            }, {
                name: 'datavalue',
                type: 'auto'
            }, {
                name: 'formfield',
                type: 'auto'
            }, {
                name: 'reference',
                type: 'auto'
            }
        ]
    }),

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.columns = [
            {
                width: 120,
                text: 'Campo',
                sortable: false,
                dataIndex: 'fieldname'
            }, {
                flex: 1,
                sortable: false,
                text: 'Resultado',
                dataIndex: 'datavalue'
            }, {
                width: 250,
                sortable: false,
                text: 'Valor Referencia',
                dataIndex: 'reference'
            }, {
                width: 70,
                sortable: false,
                align: 'center',
                xtype: 'actioncolumn',
                items: [
                    {
                        handler: 'insertLayout',
                        getClass: function(value, metaData, record, rowIndex, colIndex, store) {
                            var c = store.getCount();
                            return ( rowIndex == c-1 && c != 0 ) ? "insert-icon fa fa-plus-circle action-insert-color-font" : "";
                        },
                        isDisabled: function(view, rowIndex, colIndex, item, record) {
                            var c = view.store.getCount();
                            return !( rowIndex == c-1 && c != 0 );
                        }
                    }, {
                        handler: 'updateLayout',
                        iconCls: "update-icon fa fa-check-circle action-update-color-font"
                    }, {
                        handler: 'deleteLayout',
                        iconCls: "delete-icon fa fa-minus-circle action-delete-color-font"
                    }
                ]
            }
        ];
    }

});