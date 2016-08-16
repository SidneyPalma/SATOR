//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingMessage', {
    extend: 'Ext.grid.Panel',

    xtype: 'flowprocessingmessage',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*'
    ],

    cls: 'processing-panel-header-flow processing-update-grid',

    store: 'flowprocessingstepmessage',

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
            text: 'Avisos'
        }
    ],

    buildItems: function () {
        var me = this;

        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepMessage');

        me.columns = [
            {
                width: 40,
                renderer: function (value,metaData,record) {
                    var showCls = record.get('readershow'),
                        iconCls = {
                            info: ['x-message-box-info','rgb(15, 58, 208)'],
                            error: ['x-message-box-error','rgb(192, 41, 66)'],
                            warning: ['x-message-box-warning','rgb(237, 213, 0)'],
                            question: ['x-message-box-question','rgb(38, 153, 23)']
                        },
                        iconMsg = '<div class="{0}" style="float: left; width: 26px; font-size: 24px; color: {1};"></div>';

                    return Ext.String.format(iconMsg,iconCls[showCls][0],iconCls[showCls][1]);
                }
            }, {
                dataIndex: 'readertext',
                flex: 1
            }
        ];
    }

});