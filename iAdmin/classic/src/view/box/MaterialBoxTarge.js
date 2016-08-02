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
                width: 60,
                dataIndex: 'colorname',
                renderer: function (value,metaData,record) {
                    metaData.style = 'font-weight: bold;';
                    return value;
                }
            }, {
                width: 40,
                renderer: function (value,metaData,record) {
                    var fieldColor = '<div style="border-radius: 50%; width: 100%; height: 100%; padding: 10px; background: #{0};"></div>';
                    return Ext.String.format(fieldColor,record.get('colorschema'));
                }
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