//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_ALLOW_DENY', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_ALLOW_DENY',

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

    listeners: {
        setoptiondialog: 'setOptionDialog'
    },

    dialogType: 'EPI',

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
                        text: 'Uso de EPI'
                    }, {
                        margin: '20 0 0 0',
                        useUpperCase: true,
                        fieldLabel: 'Confirma Sim/Não?',
                        xtype: 'textfield',
                        name: 'satorprotocol',
                        inputType: 'password',
                        listeners: {
                            specialkey: function (field, e, eOpts) {
                                if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                    var value = field.getValue(),
                                        win = field.up('window');

                                    if (!value || value.length == 0 || ['SATOR_SIM', 'SATOR_NAO'].indexOf(value) == -1) {
                                        return false;
                                    }

                                    win.fireEvent('setoptiondialog',win,field,eOpts);
                                }
                            }
                        }
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
        //     showSmartTheme: 'green'
        //     // listeners: {
        //     //     click: 'relatarUsaEPI'
        //     // }
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