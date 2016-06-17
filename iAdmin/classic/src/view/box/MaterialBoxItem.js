//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxItem', {
    extend: 'Ext.grid.Panel',

    xtype: 'materialboxitem',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.box.*',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.store.box.MaterialBoxItem',
        'iAdmin.view.material.MaterialSearch'
    ],

    rowLines: false,

    selType: 'cellmodel',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    listeners: {
        edit: 'onEditBoxItem'
    },

    store: 'materialboxitem',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.box.MaterialBoxItem');

        me.columns = [
            {
                flex: 1,
                dataIndex: 'materialname',
                editor: {
                    showClear: false,
                    allowBlank: false,
                    xtype: 'materialsearch'
                },
                renderer: function (value, metaData, record) {
                    metaData.style = Ext.isNumeric(record.get('id')) != true ? 'text-align: center; font-weight: bold; color: red;' : '';
                    return value;
                }
            }
        ];
    }

});