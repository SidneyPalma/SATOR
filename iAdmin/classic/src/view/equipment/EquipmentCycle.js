//@charset UTF-8
Ext.define( 'iAdmin.view.equipment.EquipmentCycle', {
    extend: 'Ext.grid.Panel',

    xtype: 'equipmentcycle',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*',
        'Ext.grid.plugin.CellEditing'
    ],

    // plugins: {
    //     clicksToEdit: 1,
    //     ptype: 'cellediting'
    // },
    //
    // selType: 'cellmodel',
    //
    // plugins: {
    //     clicksToEdit: 1,
    //     ptype: 'cellediting'
    // },

    // listeners: {
    //     edit: 'onEditTypeFlow'
    // },

    store: 'equipmentcycle',

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        Ext.create('iAdmin.store.itembase.EquipmentCycle');

        me.columns = [
            {
                flex: 1,
                dataIndex: 'cyclename'
            }, {
                width: 50,
                dataIndex: 'isactive',
                align: 'center',
                xtype: 'checkcolumn'
            }
        ];
    }

});