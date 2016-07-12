//@charset UTF-8
Ext.define( 'iSterilization.view.processing.FlowProcessingInput', {
    extend: 'Ext.grid.Panel',

    xtype: 'flowprocessinginput',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*'
    ],

    cls: 'processing-panel-header-flow processing-update-grid',

    store: Ext.create('Ext.data.Store', {
        fields:['email'],
        data: [
            { email: 'lisa@simpsons.com' },
            { email: 'bart@simpsons.com' },
            { email: 'homer@simpsons.com' },
            { email: 'marge@simpsons.com' }
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
                width: 40,
                renderer: function (value,metaData,record) {
                    return '<div style="border: 2px solid rgb(105, 112, 194); width: 100%; height: 100%; padding: 10px; background: rgb(0, 190, 237);"></div>';
                }
            }, {
                text: 'Email',
                dataIndex: 'email',
                flex: 1
            }
        ];
    }

});