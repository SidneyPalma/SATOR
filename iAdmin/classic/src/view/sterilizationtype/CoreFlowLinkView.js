//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.CoreFlowLinkView', {
    extend: 'Ext.window.Window',

    xtype: 'coreflowlinkview',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.sterilizationtype.SterilizationTypeController'
    ],

    width: 450,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'sterilizationtype',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Link',

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
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel : 'Link',
                        labelCls: 'sub-title-label',
                        items: [
                            {
                                flex: 2,
                                xtype: 'textfield',
                                name: 'label',
                                fieldLabel: 'Rótulo'
                            }, {
                                flex: 1,
                                minValue: 0,
                                maxValue: 20,
                                margin: '0 0 0 10',
                                xtype: 'numberfield',
                                name: 'steppriority',
                                fieldLabel: 'Prioridade',
                                hideTrigger: true
                            }
                        ]
                    }, {
                        xtype: 'checkboxfield',
                        boxLabel  : 'Linha seguimentada',
                        name      : 'dashedline'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            iconCls: "fa fa-upload",
            text: 'Salvar',
            showSmartTheme: 'red',
            handler: 'updateLink'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});