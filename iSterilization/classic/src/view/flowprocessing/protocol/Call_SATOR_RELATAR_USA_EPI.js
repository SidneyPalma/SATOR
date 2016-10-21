//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_RELATAR_USA_EPI', {
    extend: 'Ext.window.Window',
    
    xtype: 'call_SATOR_RELATAR_USA_EPI',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    controller: 'flowprocessing',

    width: 450,
    modal: true,
    layout: 'fit',
    header: false,
    resizable: false,
    showAnimate: true,

    doCallBack: Ext.emptyFn,

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
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    useUpperCase: true,
                    fieldCls: 'smart-field-style-action',
                    labelCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Encerrar movimento'
                    }, {
                        margin: '20 0 0 0',
                        fieldLabel: 'Transportado por',
                        name: 'transportedby'
                    }, {
                        fieldLabel: 'Número do lacre',
                        name: 'boxseal'
                    }, {
                        xtype: 'checkboxfield',
                        fieldLabel: 'Embalagem lacrada',
                        name: 'hasbox'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            scale: 'medium',
            name: 'confirm',
            text: 'Confirmar',
            showSmartTheme: 'green',
            handler: function (btn) {
                btn.up('window').doCallBack();
            }
        }, {
            scale: 'medium',
            text: 'Cancelar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});