//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceRegistrationResult', {
    extend: 'Ext.grid.Panel',

    xtype: 'serviceregistrationresult',

    listeners: {
		edit: 'updateValues',
        beforeedit: 'updateAccept'
    },

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'Ext.grid.plugin.CellEditing',
    ],

    columnLines: false,
    hideHeaders: false,
    headerBorders: false,

    cls: 'update-grid',

    selType: 'cellmodel',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    store: Ext.create('Smart.data.StoreBase', {

        url: '../iSterilization/business/Calls/serviceregistration.php',

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
                width: 150,
                text: 'Campo',
                sortable: false,
                dataIndex: 'fieldtext',
                renderer: function (value,metaData,record) {
                    metaData.style = 'background: rgb(232, 237, 252); font-weight: bold;';
                    return value;
                }
            }, {
                flex: 1,
                sortable: false,
                text: 'Resultado',
                dataIndex: 'datavalue',
                getEditor: function(record) {
                    var fields = Ext.decode(record.get('formfield'));
                    return Ext.create('Ext.grid.CellEditor', {
                        field: Ext.widget(fields.xtype, fields)
                    });
                }
            }, {
                flex: 1,
                sortable: false,
                text: 'Valor Referencia',
                dataIndex: 'reference'
            // }, {
            //     width: 45,
            //     sortable: false,
            //     align: 'center',
            //     xtype: 'actioncolumn',
            //     items: [
            //         {
            //             handler: 'updateLayout',
            //             iconCls: "update-icon fa fa-check-circle action-update-color-font",
            //             isDisabled: function(view, rowIndex, colIndex, item, record) {
            //                 var datafield = record.get('datafield');
            //                 return (datafield == '');
            //             }
            //         }, {
            //             handler: 'deleteLayout',
            //             iconCls: "delete-icon fa fa-minus-circle action-delete-color-font",
            //             isDisabled: function(view, rowIndex, colIndex, item, record) {
            //                 var datafield = record.get('datafield');
            //                 return (datafield == '');
            //             }
            //         }
            //     ]
            }
        ];
    }

});