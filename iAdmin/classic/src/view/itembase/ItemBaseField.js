//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseField', {
    extend: 'Ext.window.Window',

    xtype: 'itembasefield',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window'
    ],

    layout: 'fit',

    grid: null,
    width: 400,
    modal: true,
    resizable: false,
    showAnimate: true,
    alwaysOnTop: true,

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
                                name: 'type',
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
                        fieldLabel: 'Valor Default',
                        name: 'defaultValue'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'Valor Referência',
                                name: 'referenceValue'
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
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Complementos',
                        defaultType: 'checkboxfield',
                        labelCls: 'sub-title-label',
                        items: [
                            {
                                flex: 1,
                                boxLabel  : 'Money',
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
            scope: this,
            scale: 'medium',
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }, {
            scale: 'medium',
            text: 'Confirmar',
            showSmartTheme: 'red',
            handler: function (btn) {
                var view = btn.up('window'),
                    grid = view.grid,
                    form = view.down('form'),
                    source = grid.getSource(),
                    values = form.getValues();

                if(form.isValid()) {
                    grid.fireEvent('updatesource', grid, source, values, {});
                    view.close();
                }
            }
        }
    ]

});