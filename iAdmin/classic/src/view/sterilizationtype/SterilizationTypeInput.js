//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeInput', {
    extend: 'Ext.grid.Panel',

    xtype: 'sterilizationtypeinput',

    requires: [
        'Smart.plugins.*',
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.areas.*'
    ],

    cls: 'update-grid',

    rowLines: false,
    columnLines: false,

    plugins: ['insertrecordgrid'],

    listeners: {
        insertrecord: 'insertLayout',
        deleterecord: 'deleteLayout'
    },

    store: 'sterilizationtypeinput',

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        Ext.create('iAdmin.store.sterilizationtype.SterilizationTypeInput');

        me.columns = [
            {
                flex: 1,
                text: 'Nome',
                dataIndex: 'inputnamepresentation'
            }, {
                width: 50,
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
                        handler: 'deleteLayout',
                        iconCls: "delete-icon fa fa-minus-circle action-delete-color-font"
                    }
                ]
            }
        ];
    }

});