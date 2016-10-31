//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxTarge', {
    extend: 'Ext.grid.Panel',

    xtype: 'materialboxtarge',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.box.*',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.view.box.MaterialBoxTargeColorSearch',
        'iAdmin.view.sterilizationtype.SterilizationTypeSearch'
    ],

    rowLines: false,

    selType: 'cellmodel',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    listeners: {
        edit: 'onEditTargeColor'
    },

    cls: 'update-grid',

    store: 'materialboxtarge',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.box.MaterialBoxTarge');

        me.columns = [
            {
                width: 50,
                dataIndex: 'colorpallet'
            }, {
                flex: 1,
                dataIndex: 'targecolorname',
                editor: {
                    pageSize: 0,
                    allowBlank: false,
                    xtype: 'materialboxtargecolorsearch',
                    listeners: {
                        showclear: 'onShowClearTargeColor'
                    }
                }
            }
        ];
    }

});