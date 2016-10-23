//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_ENCERRAR_MOVIMENTO', {
    extend: 'Ext.window.Window',
    
    xtype: 'call_SATOR_ENCERRAR_MOVIMENTO',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
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
                plugins:'formenter',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    useUpperCase: true,
                    fieldCls: 'smart-field-style-action'
                    // labelCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Encerrar movimento'
                    }, {
                        margin: '20 0 20 0',
                        xtype: 'fieldcontainer',
                        defaultType: 'textfield',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Usuários',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                allowBlank: false,
                                fieldLabel: 'Encerrado por',
                                name: 'closedby',
                                useReadColor: true,
                                fieldLabel: 'Usuário (operador)'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                allowBlank: false,
                                fieldLabel: 'Transportado por',
                                name: 'transportedby'
                            }
                        ]
                    }, {
                        hidden: true,
                        name: 'boxseal',
                        xtype: 'fieldcontainer',
                        defaultType: 'textfield',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Lacre',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items :[
                            {
                                fieldLabel: 'Lacre #1',
                                name: 'boxsealone'
                            }, {
                                fieldLabel: 'Lacre #2',
                                name: 'boxsealtwo'
                            }
                        ]
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