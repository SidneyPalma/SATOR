//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputLayoutField', {
    extend: 'Ext.window.Window',

    xtype: 'inputlayoutfield',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'iAdmin.view.input.InputController'
    ],

    layout: 'fit',

    width: 550,
    modal: true,
    resizable: false,
    showAnimate: true,
    alwaysOnTop: true,
    controller: 'input',

    title: 'Criando campos',

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
                layout: 'anchor',
                bodyPadding: 10,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'fieldCls',
                        value: "smart-field-style-action"
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        fieldLabel : 'Estrutura',
                        labelCls: 'sub-title-label',
                        items: [
                            {
                                flex: 2,
                                allowBlank: false,
                                margin: '0 5 0 0',
                                fieldLabel: 'Nome do Campo',
                                name: 'name',
                                useReadColor: false
                            }, {
                                flex: 1,
                                margin: '0 0 0 5',
                                pageSize: 0,
                                name: 'xtype',
                                editable: false,
                                allowBlank: false,
                                xtype: 'combobox',
                                fieldLabel: 'Tipo',
                                valueField: 'id',
                                displayField: 'name',
                                store: {
                                    data: [
                                        { id: 'textfield', name: 'textfield' },
                                        { id: 'datefield', name: 'datefield' }
                                    ]
                                }
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 2,
                                xtype: 'textfield',
                                fieldLabel: 'Valor Default',
                                name: 'defaultValue'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                xtype: 'numberfield',
                                fieldLabel: 'Posição',
                                name: 'showOrder',
                                value: 0,
                                minValue: 0
                            }
                        ]
                    }, {
                        fieldLabel: 'Valor Referência',
                        name: 'referenceValue'
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
            showSmartTheme: 'red',
            handler: 'updateSource'
        }, {
            scope: this,
            scale: 'medium',
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});