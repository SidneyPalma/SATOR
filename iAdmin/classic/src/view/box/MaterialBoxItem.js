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
    headerBorders: false,

    plugins: ['insertrecordgrid'],

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
                xtype: 'checkcolumn',
                dataIndex: 'isconsigned',
                readOnly: true
            }, {
                width: 80,
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
                        disabled: true,
                        xtype: 'splitter'
                    }, {

                        handler: 'deleteLayout',
                        iconCls: "delete-icon fa fa-minus-circle action-delete-color-font"
                    }
                ]
            }
        ]
    }

});