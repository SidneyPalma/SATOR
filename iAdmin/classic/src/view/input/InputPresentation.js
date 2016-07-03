//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputPresentation', {
    extend: 'Ext.grid.Panel',

    xtype: 'inputpresentation',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.input.*',
        'Ext.grid.plugin.CellEditing'
    ],

    hideHeaders: false,
    headerBorders: false,

    cls: 'list-grid',

    selType: 'cellmodel',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    listeners: {
        edit: 'onEditTypeFlow'
    },

    store: 'inputpresentation',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.input.InputPresentation');

        me.columns = [
            {
                flex: 1,
                sortable: false,
                text: 'Apresentação',
                dataIndex: 'presentationdescription',
                renderer: function (value,metaData,record) {
                    metaData.style = 'color: blue;';
                    return value;
                }
            }, {
                width: 50,
                text: 'Sigla',
                sortable: false,
                dataIndex: 'acronym',
                editor: {
                    allowBlank: false,
                    xtype: 'textfield',
                    maxLength: 3,
                    fieldCls: 'smart-field-style-action'
                }
            }, {
                width: 100,
                align: 'right',
                sortable: false,
                text: 'Base',
                dataIndex: 'measurebase',
                renderer: Smart.maskRenderer('0,000',true),
                editor: {
                    allowBlank: false,
                    xtype: 'textfield',
                    plugins: 'textmask',
                    mask: '0,000',
                    money: true,
                    fieldCls: 'smart-field-style-action'
                }
            }
        ];
    }

});