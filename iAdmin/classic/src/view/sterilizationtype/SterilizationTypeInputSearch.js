//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeInputSearch', {
    extend: 'Ext.window.Window',

    xtype: 'sterilizationtypeinputsearch',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'iAdmin.view.input.InputPresentationSearch',
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

    title: 'Lançar Insumo',

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
                        name: 'presentation'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'acronym'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'sterilizationtypeid'
                    }, {
                        fieldLabel: 'Insumo',
                        xtype: 'inputpresentationsearch',
                        hiddenNameId: 'inputpresentationid',
                        listeners: {
                            select: 'selectInput'
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