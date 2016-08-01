//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingMaterial', {
    extend: 'Ext.grid.Panel',

    xtype: 'flowprocessingmaterial',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*'
    ],

    cls: 'processing-panel-header-flow processing-update-grid',

    store: Ext.create('Ext.data.Store', {
        fields:[ 'name', 'phone'],
        data: [
            { name: 'Lisa', phone: '555-111-1224' },
            { name: 'Bart', phone: '555-222-1234' },
            { name: 'Homer', phone: '555-222-1244' },
            { name: 'Marge', phone: '555-222-1254' }
        ]
    }),

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    dockedItems: [
        {
            margin: '0 0 6 0',
            xtype: 'label',
            cls: 'processing-field-font',
            text: 'Materiais'
        }
    ],

    buildItems: function () {
        var me = this;

        me.columns = [
            {
                width: 40,
                renderer: function (value,metaData,record) {
                    return '<div style="border: 2px solid rgb(237, 138, 0); border-radius: 50%; width: 100%; height: 100%; padding: 10px; background: rgb(251, 228, 0);"></div>';
                }
            }, {
                text: 'Name',
                dataIndex: 'name',
                flex: 1
            }, {
                text: 'Phone',
                dataIndex: 'phone',
                width: 180
            }
        ];
    }

});