//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxItemStatus', {
    extend: 'Ext.window.Window',

    xtype: 'materialboxItemstatus',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.box.MaterialBoxController'
    ],

    width: 550,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'materialbox',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Excluir Item do Kit',

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
                    anchor: '100%',
                    allowBlank: false
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'boxitemstatus'
                    }, {
                        useMondaFont: true,
                        xtype: 'textareafield',
                        fieldLabel: 'Observações',
                        name: 'observation',
                        fieldStyle: {
                            color: '#C02942;',
                            fontSize: '14px;'
                        }
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            iconCls: "fa fa-upload",
            text: 'Excluir',
            showSmartTheme: 'red',
            handler: 'updateItem'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});