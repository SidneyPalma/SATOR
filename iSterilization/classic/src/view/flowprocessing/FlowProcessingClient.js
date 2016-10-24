//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingClient', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingclient',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    controller: 'flowprocessing',

    width: 300,
    modal: true,
    layout: 'fit',
    header: false,
    resizable: false,
    showAnimate: true,

     listeners: {
         queryreader: 'getSelectClient'
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
                        fieldLabel: 'Selecionar origem',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            allowBlank: false,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                margin: '10 0 0 0',
                                name: 'clientid',
                                useUpperCase: true,
                                inputType: 'password',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                            var win = field.up('window');
                                            win.fireEvent('queryreader',win,field,eOpts);
                                        }
                                    }
                                }
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
            text: 'Cancelar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});