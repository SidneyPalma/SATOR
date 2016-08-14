//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeEdit', {
    extend: 'Ext.window.Window',

    xtype: 'sterilizationtypeedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.store.sterilizationtype.*'
    ],

    constrain: true,

    width: 550,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'sterilizationtype',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Fluxo',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.typeless = Ext.create('Ext.data.Store', {
            fields: [ 'typelesscode', 'typelessname' ],
            data: [
                { typelesscode: 'Q', typelessname: 'Quebra' },
                { typelesscode: 'A', typelessname: 'Altera' }
            ]
        });

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false
                },
                items: [
                    {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'anchor',
                        fieldLabel : 'Fluxo',
                        labelCls: 'sub-title-label',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            allowBlank: false,
                            fieldStyle: { fontSize: '16px;' }
                        },
                        items: [
                            {
                                name: 'name',
                                fieldLabel: 'Nome'
                            }, {
                                name: 'description',
                                fieldLabel: 'Descrição'
                            }, {
                                name: 'isactive',
                                xtype: 'checkboxfield',
                                boxLabel: 'Ativo'
                            }
                        ]
                    }, {
                        xtype: 'form',
                        name: 'stepflaglist',
                        layout: 'anchor',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            fieldStyle: { fontSize: '16px;' }
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'typeid'
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                fieldLabel: 'Tratamento de excessões',
                                labelCls: 'sub-title-label',
                                defaultType: 'textfield',
                                defaults: {
                                    flex: 1,
                                    anchor: '100%',
                                    fieldStyle: { fontSize: '16px;' }
                                },
                                items: [
                                    {
                                        pageSize: 0,
                                        margin: '0 5 0 0',
                                        xtype: 'combobox',
                                        editable: false,
                                        showClear: true,
                                        fieldLabel: 'Áreas com leituras',
                                        name: 'readarea',
                                        valueField: 'id',
                                        displayField: 'name',
                                        store: {
                                            fields: [ 'id', 'typeid', 'name', 'steplevel' ],
                                            data: me.readarea
                                        },
                                        listeners: {
                                            select: 'onSelectReadArea',
                                            showclear: 'onShowClearReadArea'
                                        }
                                    }, {
                                        margin: '0 0 0 5',
                                        useReadColor: true,
                                        name: 'elementname',
                                        fieldLabel: 'Área com exceções'
                                    }
                                ]
                            }, {
                                xtype: 'checkboxgroup',
                                columns: 2,
                                vertical: true,
                                fieldLabel: 'Tipos de exceções',
                                labelCls: 'sub-title-label',
                                items: [
                                    { boxLabel: 'Altera', name: 'flowchoice', inputValue: '1' },
                                    { boxLabel: 'Quebra', name: 'flowbreach', inputValue: '1' }
                                ],
                                listeners: {
                                    change: 'onCheckBoxGroupChange'
                                }
                            }, {
                                height: 210,
                                xtype: 'gridpanel',
                                // hideHeaders: false,
                                store: Ext.create('Ext.data.Store'),
                                cls: 'update-grid',
                                selType: 'cellmodel',
                                plugins: {
                                    clicksToEdit: 1,
                                    ptype: 'cellediting'
                                },
                                columns: [
                                    {
                                        flex: 1,
                                        dataIndex: 'elementname',
                                        renderer: function (value,metadata,record) {
                                            metadata.style = 'color: blue;';
                                            return value;
                                        }
                                    }, {
                                        width: 50,
                                        dataIndex: 'steppriority',
                                        editor: {
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            minValue: 1
                                        }
                                    }, {
                                        width: 120,
                                        dataIndex: 'typelessname',
                                        editor: {
                                            pageSize: 0,
                                            // showClear: true,
                                            editable: false,
                                            hideTrigger: true,
                                            xtype: 'combobox',
                                            store: me.typeless,
                                            valueField: 'typelesscode',
                                            displayField: 'typelessname'
                                            // listeners: {
                                            //     showclear: 'onShowClearReadArea'
                                            // }
                                        }
                                    }
                                ],
                                listeners: {
                                    edit: 'onEditGridReadArea'
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
            iconCls: "fa fa-upload",
            text: 'Salvar',
            showSmartTheme: 'red',
            handler: 'updateView'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});
