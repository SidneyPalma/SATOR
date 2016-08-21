//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingMessage', {
    extend: 'Ext.grid.Panel',

    xtype: 'flowprocessingmessage',

    // border: true,

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
                flex: 1,
                dataIndex: 'readertext',
                renderer: function (value,metaData,record) {
                    var msgStyle = (record.get('readertext').indexOf('MSG_') != -1) ? 'font-weight: bold;' : '';

                    switch(record.get('readertext')) {
                        case 'SATOR_INICIAR_LEITURA':
                            msgStyle += ' font-weight: bold; color: red; background: #FBF4F9;';
                            break;
                        case 'SATOR_ENCERRAR_LEITURA':
                            msgStyle += ' font-weight: bold; color: red; background: #EBE1C0;';
                            break;
                    }

                    metaData.style = msgStyle;

                    return value;
                }
            }, {
                width: 120,
                align: 'center',
                dataIndex: 'readerdate',
                renderer: function (value,metaData,record) {
                    var msgStyle = '';

                    switch(record.get('readertext')) {
                        case 'SATOR_INICIAR_LEITURA':
                            msgStyle += ' font-weight: bold; color: red; background: #FBF4F9;';
                            break;
                        case 'SATOR_ENCERRAR_LEITURA':
                            msgStyle += ' font-weight: bold; color: red; background: #EBE1C0;';
                            break;
                    }

                    metaData.style = msgStyle;

                    return Ext.Date.format(new Date(value), 'H:i d/m');
                }
            }
        ];
    }

});