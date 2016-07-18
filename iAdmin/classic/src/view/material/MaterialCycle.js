//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialCycle', {
    extend: 'Ext.grid.Panel',

    xtype: 'materialcycle',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*',
        'Ext.grid.plugin.CellEditing'
    ],

    store: 'materialcycle',

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        Ext.create('iAdmin.store.itembase.MaterialCycle');

        me.columns = [
            {
                flex: 1,
                dataIndex: 'cyclename'
            }, {
                width: 50,
                align: 'center',
                dataIndex: 'isactive',
                xtype: 'checkcolumn',
                listeners: {
                    checkchange: 'onCycleChange'
                }
            }
        ];
    }

});