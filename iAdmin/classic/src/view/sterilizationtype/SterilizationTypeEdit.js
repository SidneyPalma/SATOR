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

    width: 450,
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
                                xtype: 'fieldcontainer',
                                layout: 'anchor',
                                fieldLabel: 'Tratamento de excessões',
                                labelCls: 'sub-title-label',
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%',
                                    fieldStyle: { fontSize: '16px;' }
                                },
                                items: [
                                    {
                                        pageSize: 0,
                                        xtype: 'combobox',
                                        editable: false,
                                        showClear: true,
                                        fieldLabel: 'Áreas com Leitura',
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
                                        xtype: 'hiddenfield',
                                        name: 'typeid'
                                    }, {
                                        useReadColor: true,
                                        name: 'elementname',
                                        fieldLabel: 'Área com Exceções'
                                    }, {
                                        xtype: 'checkboxgroup',
                                        columns: 2,
                                        vertical: true,
                                        items: [
                                            { boxLabel: 'Fluxo alternativo', name: 'flowchoice', inputValue: '1' },
                                            { boxLabel: 'Quebra de fluxo', name: 'flowbreach', inputValue: '1' }
                                        ],
                                        listeners: {
                                            change: 'onCheckBoxGroupChange'
                                        }
                                    }
                                ]
                            }, {
                                height: 110,
                                xtype: 'gridpanel',
                                store: Ext.create('Ext.data.Store'),
                                cls: 'update-grid',
                                selType: 'cellmodel',
                                plugins: {
                                    clicksToEdit: 1,
                                    ptype: 'cellediting'
                                },
                                columns: [
                                    {
                                        dataIndex: 'elementname',
                                        flex: 1,
                                        renderer: function (value,metadata,record) {
                                            metadata.style = 'color: blue;';
                                            return value;
                                        }
                                    }, {
                                        dataIndex: 'steppriority',
                                        width: 100,
                                        editor: {
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            minValue: 1
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
