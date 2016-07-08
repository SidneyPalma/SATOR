//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseField', {
    extend: 'Ext.window.Window',

    xtype: 'itembasefield',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'iAdmin.view.itembase.ItemBaseController'
    ],

    layout: 'fit',

    width: 400,
    modal: true,
    resizable: false,
    showAnimate: true,
    alwaysOnTop: true,
    controller: 'itembase',

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
                                flex: 1,
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
                                        { id: 'combobox', name: 'combobox' },
                                        { id: 'textfield', name: 'textfield' },
                                        { id: 'datefield', name: 'datefield' },
                                        { id: 'numberfield', name: 'numberfield' }
                                    ]
                                }
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'Valor Default',
                                name: 'defaultValue'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Máscara',
                                name: 'mask'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'numberfield',
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'Mínimo',
                                name: 'minValue',
                                value: 0
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Máximo',
                                name: 'maxValue',
                                value: 0
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Posição',
                                name: 'showOrder',
                                value: 0
                            }
                        ]
                    }, {
                        fieldLabel: 'Valor Referência',
                        name: 'referenceValue'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Complementos',
                        defaultType: 'checkboxfield',
                        labelCls: 'sub-title-label',
                        items: [
                            {
                                flex: 1,
                                boxLabel  : 'É decimal',
                                name      : 'money',
                                checked   : false
                            }, {
                                flex: 1,
                                boxLabel  : 'Permite vazio',
                                name      : 'allowBlank',
                                checked   : true
                            }, {
                                flex: 1,
                                boxLabel  : 'Somente leitura',
                                name      : 'readOnly',
                                checked   : false
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