//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingUser', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessinguser',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 300,
    modal: true,
    layout: 'fit',
    header: false,
    resizable: false,
    showAnimate: true,

    controller: 'flowprocessing',

    listeners: {
        selectusercode: 'onSelectUserCode'
    },

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
                plugins:'formenter',
                bodyPadding: 10,
                margin: '10 0 0 0',
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    fieldCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'anchor',
                        labelCls: 'title-label',
                        fieldLabel: 'Operador',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            allowBlank: false,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'id'
                            }, {
                                xtype: 'hiddenfield',
                                name: 'username'
                            }, {
                                name: 'usercode',
                                inputType: 'password',
                                fieldLabel: 'Identificação',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                            var win = field.up('window');
                                            win.fireEvent('selectusercode',win,field,eOpts);
                                        }
                                    }
                                }
                            }, {
                                name: 'password',
                                vtype: 'alphanum',
                                inputType: 'password',
                                fieldLabel: 'Senha',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                            var win = field.up('window'),
                                                button = win.down('button');
                                            button.fireEvent('click', button);
                                        }
                                    }
                                }
                            }, {
                                name: 'fullname',
                                useReadColor: true,
                                fieldLabel: 'Nome'
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
            text: 'Confirmar',
            showSmartTheme: 'green',
            listeners: {
                click: 'selectUserFlow'
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