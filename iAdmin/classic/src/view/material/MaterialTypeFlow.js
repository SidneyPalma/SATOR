//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialTypeFlow', {
    extend: 'Ext.grid.Panel',

    xtype: 'materialtypeflow',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*',
        'Ext.grid.plugin.CellEditing',
		'iAdmin.view.sterilizationtype.SterilizationTypeSearch'
    ],

    selType: 'cellmodel',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    listeners: {
        edit: 'onEditTypeFlow'
    },

    store: 'materialtypeflow',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.itembase.MaterialTypeFlow');

        me.columns = [
            {
                width: 100,
                dataIndex: 'priorityleveldescription',
                renderer: function (value,metaData,record) {
                    metaData.style = 'font-weight: bold;';
                    return value;
                }
            }, {
                flex: 1,
                dataIndex: 'sterilizationtypename',
                editor: {
                    showClear: false,
                    allowBlank: false,
                    xtype: 'sterilizationtypesearch'
                },
                renderer: function (value,metaData,record) {
                    metaData.style = 'color: blue;';
                    return value;
                }
            }
        ];
    }

});