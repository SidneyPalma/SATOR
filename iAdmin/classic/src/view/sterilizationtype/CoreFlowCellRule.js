//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.CoreFlowCellRule', {
    extend: 'Ext.window.Window',

    xtype: 'coreflowcellrule',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.grid.column.*',
        'Smart.form.field.ComboEnum',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.view.sterilizationtype.SterilizationTypeController'
    ],

    width: 350,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'sterilizationtype',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Rules',

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
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Elemento',
                        labelCls: 'sub-title-label',
                        items: [
                            {
                                flex: 1,
                                name: 'basicstep',
                                xtype: 'combobox',
                                fieldLabel: 'Cadastro',
                                forceSelection: true,
                                editable: false,
                                pageSize: 0,
                                store: [
                                    ["basic.Area", "CMEArea"],
                                    ["basic.SubArea", "CMESubArea"],
                                    ["basic.Equipment", "Equipamento"]
                                ],
                                listeners: {
                                    select: 'onSelectBasicStep'
                                }
                            }
                        ]
                    }, {
                        xtype: 'radiogroup',
                        columns: 2,
                        items: [
                            {
                                boxLabel: 'Source',
                                name: 'basicrule',
                                inputValue: 'source',
                                checked: true
                            }, {
                                boxLabel: 'Target',
                                name: 'basicrule',
                                inputValue: 'target'
                            }
                        ],
                        listeners: {
                            change: 'onSelectBasicStep'
                        }
                    }, {
                        xtype: 'label',
                        text: 'Associações',
                        cls: 'sub-title-label'
                    }, {
                        height: 250,
                        xtype: 'gridpanel',
                        store: Ext.create('Smart.data.StoreBase', {

                            url: '../iAdmin/business/Calls/sterilizationtype.php',

                            fields: [
                                {
                                    name: 'basicstep',
                                    type: 'auto'
                                }, {
                                    name: 'basicstepdescription',
                                    type: 'auto'
                                }, {
                                    name: 'basicsteplinks',
                                    type: 'auto'
                                }
                            ]
                        }),
                        rowLines: false,
                        hideHeaders: true,
                        headerBorders: false,
                        columns: [
                            {
                                flex: 1,
                                dataIndex: 'basicstepdescription'
                            }, {
                                width: 80,
                                dataIndex: 'basicsteplinks',
                                editor: {
                                    xtype: 'numberfield',
                                    minValue: 0,
                                    maxValue: 9,
                                    hideTrigger: true
                                }
                                // getEditor: function(record) {
                                //     var basicstep = record.get('basicstep');
                                //
                                //     if(basicstep == "multiLinks") {
                                //         return Ext.create('Ext.grid.CellEditor', {
                                //             field: Ext.widget('checkboxfield')
                                //         });
                                //     } else {
                                //         return Ext.create('Ext.grid.CellEditor', {
                                //             field: Ext.widget('numberfield', {
                                //                 minValue: 0,
                                //                 maxValue: 9,
                                //                 hideTrigger: true
                                //             })
                                //         });
                                //     }
                                // }
                            }
                        ],
                        selType: 'cellmodel',
                        plugins: {
                            clicksToEdit: 1,
                            ptype: 'cellediting'
                        },
                        listeners: {
                            edit: 'onRulesEdit'
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
            text: 'Restaurar padrão',
            showSmartTheme: 'red',
            handler: 'standardRule'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});