//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxItem', {
    extend: 'Ext.grid.Panel',

    xtype: 'materialboxitem',

    requires: [
        'Smart.plugins.*',
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.box.*'
    ],

    cls: 'update-grid',

    rowLines: false,
    hideHeaders: false,
    insertRecord: true,
    headerBorders: false,

    listeners: {
        insertrecord: 'insertLayout',
        deleterecord: 'deleteLayout'
    },

    store: 'materialboxitem',

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        Ext.create('iAdmin.store.box.MaterialBoxItem');

        me.columns = [
            {
                width: 150,
                sortable: false,
                text: 'Código',
                dataIndex: 'barcode'
            }, {
                flex: 1,
                sortable: false,
                text: 'Material',
                dataIndex: 'materialname'
            }, {
                width: 200,
                sortable: false,
                text: 'Proprietário',
                dataIndex: 'proprietaryname'
            }, {
                width: 100,
                sortable: false,
                align: 'center',
                text: 'Processos',
                dataIndex: 'numberproceedings'
            }, {
                width: 100,
                sortable: false,
                align: 'center',
                text: 'Consignado',
                renderer: function (value, meta, rec) {
                    return parseInt(rec.get('isconsigned')) ? '<div class="icon-s24"><i class="fa fa-check-circle action-checked-color-font"></i></div>' : '';
                }
            }, {
                align: 'center',
                width: 100,
                xtype: 'actioncolumn',
                items: [
                    {
                        width: 40,
                        align: 'center',
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
                        xtype: 'splitter'
                    }, {
                        width: 40,
                        align: 'center',
                        handler: 'deleteLayout',
                        iconCls: "delete-icon fa fa-minus-circle action-delete-color-font"
                    }
                ]
            }
        ]
    },

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: 'materialboxitem',
            dock: 'bottom',
            displayInfo: true
        }
    ]

});