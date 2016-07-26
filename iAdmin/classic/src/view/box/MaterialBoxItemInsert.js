//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxItemInsert', {
    extend: 'Ext.window.Window',

    xtype: 'materialboxiteminsert',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'iAdmin.view.input.InputSearch',
        'iAdmin.view.box.MaterialBoxItemSearch',
        'iAdmin.view.box.MaterialBoxController'
    ],

    width: 350,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'materialbox',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Lançar Material',

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
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'materialboxid'
                    }, {
                        fieldLabel: 'Material',
                        xtype: 'materialboxitemsearch',
                        hiddenNameId: 'materialid',
                        listeners: {
                            beforequery: 'onBeforeQuery'
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
            text: 'Confirmar',
            showSmartTheme: 'red',
            handler: 'updateInput'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});