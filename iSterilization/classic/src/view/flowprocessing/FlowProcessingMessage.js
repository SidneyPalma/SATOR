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
                    var iconTxt = '',
                        iconCls = [
                            'x-message-box-info','x-message-box-error',
                            'x-message-box-warning','x-message-box-question'
                        ],
                        iconMsg = '<div class="{0}" style="float: left; width: 30px; height: 30px; font-size: 28px; color: {1};"></div>';

                    switch(record.get('readercode')) {
                        case '001':
                            iconTxt = Ext.String.format(iconMsg,iconCls[0],'blue');
                            break;
                        case '002':
                            iconTxt = Ext.String.format(iconMsg,iconCls[1],'red');
                            break;
                        case '003':
                            iconTxt = Ext.String.format(iconMsg,iconCls[2],'yellow');
                            break;
                        default:
                            iconTxt = Ext.String.format(iconMsg,iconCls[3],'green');
                    }

                    return iconTxt;

                }
            }, {
                dataIndex: 'readertext',
                flex: 1
            }
        ];
    }

});