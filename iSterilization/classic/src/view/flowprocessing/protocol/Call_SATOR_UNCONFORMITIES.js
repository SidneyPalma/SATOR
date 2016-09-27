//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_UNCONFORMITIES', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_UNCONFORMITIES',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    controller: 'flowprocessing',

    width: 800,
    modal: true,
    layout: 'fit',
    header: false,
    resizable: false,
    showAnimate: true,

    overCls: 'header-hide',

    doCallBack: Ext.emptyFn,

    listeners: {
        startreaderunconformities: 'onStartReaderUnconformities'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                margin: '10 0 0 0',
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    fieldCls: 'smart-field-style-action',
                    labelCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Inconformidades'
                    }, {
                        height: 400,
                        editable: true,
                        margin: '20 0 0 0',
                        xtype: 'flowprocessingmaterial'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
        //     scale: 'medium',
        //     name: 'confirm',
        //     text: 'Confirmar',
        //     showSmartTheme: 'green',
        //     listeners: {
        //         click: 'setUnconformities'
        //     }
        // }, {
            scale: 'medium',
            text: 'Cancelar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});