//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseLayout', {
    extend: 'Ext.grid.Panel',

    xtype: 'itembaselayout',

    requires: [
        'Ext.grid.Panel',
        'Smart.plugins.*',
        'Ext.grid.column.*'
    ],

    columnLines: false,
    hideHeaders: false,
    insertRecord: true,
    headerBorders: false,

    cls: 'update-grid',

    listeners: {
        insertrecord: 'insertLayout',
        updaterecord: 'updateLayout',
        deleterecord: 'deleteLayout'
    },

    initComponent: function () {
        var me = this;
        me.buildStore();
        me.buildItems();
        me.callParent();
    },

    buildStore: function () {
        var me = this;

        me.store = Ext.create('Smart.data.StoreBase', {

            url: '../iAdmin/business/Calls/itembase.php',

            fields: [
                {
                    name: 'id',
                    type: 'int'
                }, {
                    name: 'showorder',
                    type: 'auto'
                }, {
                    name: 'fieldtext',
                    type: 'auto'
                }, {
                    name: 'fieldname',
                    type: 'auto'
                }, {
                    name: 'datavalue',
                    type: 'auto'
                }, {
                    name: 'reference',
                    type: 'auto'
                }, {
                    name: 'formfield',
                    type: 'auto'
                }, {
                    name: 'datafield',
                    type: 'auto'
                }
            ]
        });

    },

    buildItems: function () {
        var me = this;

        me.columns = [
            {
                width: 70,
                text: '##',
                align: 'center',
                sortable: false,
                dataIndex: 'showorder'
            }, {
                width: 200,
                text: 'Campo',
                sortable: false,
                dataIndex: 'fieldtext'
            }, {
                flex: 1,
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
                        iconCls: "update-icon fa fa-check-circle action-update-color-font",
                        isDisabled: function(view, rowIndex, colIndex, item, record) {
                            var datafield = record.get('datafield');
                            return (datafield == '');
                        }
                    }, {
                        handler: 'deleteLayout',
                        iconCls: "delete-icon fa fa-minus-circle action-delete-color-font",
                        isDisabled: function(view, rowIndex, colIndex, item, record) {
                            var datafield = record.get('datafield');
                            return (datafield == '');
                        }
                    }
                ]
            }
        ];
    }

});