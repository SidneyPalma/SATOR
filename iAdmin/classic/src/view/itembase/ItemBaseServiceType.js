//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseServiceType', {
    extend: 'Ext.grid.Panel',

    xtype: 'itembaseservicetype',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*'
    ],

    store: 'itembaseservicetype',

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        Ext.create('iAdmin.store.itembase.ItemBaseServiceType');

        me.columns = [
            {
                flex: 1,
                dataIndex: 'servicetypedescription'
            }, {
                width: 50,
                align: 'center',
                dataIndex: 'isactive',
                xtype: 'checkcolumn',
                listeners: {
                    checkchange: 'onItemChange'
                }
            }
        ];
    }

});