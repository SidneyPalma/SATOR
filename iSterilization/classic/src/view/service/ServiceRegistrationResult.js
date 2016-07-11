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
        'Ext.grid.plugin.CellEditing'
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
                width: 250,
                text: 'Campo',
                sortable: false,
                dataIndex: 'fieldtext',
                renderer: function (value,metaData) {
                    metaData.style = 'background: rgba(239, 235, 223, .4);';
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
                dataIndex: 'reference',
                renderer: function (value,metaData) {
                    metaData.style = 'background: rgba(239, 235, 223, .4);';
                    return value;
                }
            }
        ];
    }

});