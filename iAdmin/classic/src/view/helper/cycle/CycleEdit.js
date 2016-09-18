//@charset UTF-8
Ext.define( 'iAdmin.view.helper.cycle.CycleEdit', {
    extend: 'Ext.window.Window',

    xtype: 'cycleedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'iAdmin.model.helper.Cycle',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.helper.cycle.CycleSearch',
        'iAdmin.view.helper.cycle.CycleController'
    ],

    constrain: true,

    width: 550,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    cls: 'panel-frame',
    controller: 'cycle',
    iconCls: "fa fa-pencil",

    title: 'Editar Ciclo',

    listeners: {
        show: 'onViewShow'
    },

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
                        xtype: 'label',
                        cls: 'sub-title-label',
                        text: 'Ciclo'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 2,
                                margin: '0 5 0 0',
                                name: 'name',
                                fieldLabel: 'Nome'
                            }, {
                                flex: 1,
                                margin: '0 0 0 5',
                                name: 'barcode',
                                fieldLabel: 'Código de Barra'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 2,
                                margin: '0 5 0 0',
                                xtype: 'container',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 1,
                                        name: 'duration',
                                        fieldLabel: 'Duração',
                                        plugins: 'textmask',
                                        mask: 'Min #0,00',
                                        money: true
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        name: 'temperature',
                                        fieldLabel: 'Temperatura',
                                        plugins: 'textmask',
                                        mask: 'ºC #0,00',
                                        money: true
                                    }
                                ]
                            }, {
                                flex: 1,
                                margin: '0 0 0 5',
                                name: 'timetoopen',
                                fieldLabel: 'Abertura',
                                plugins: 'textmask',
                                mask: 'Min #0,00',
                                money: true
                            }
                        ]
                    }, {
                        xtype: 'textareafield',
                        name: 'description',
                        fieldLabel: 'Descrição'
                    }, {
                        name: 'isactive',
                        xtype: 'checkboxfield',
                        fieldLabel: 'Status',
                        boxLabel: 'Ativo'
                    }
                ]
            }
        ]
    },

    dockedItems: [
        {
            xtype: 'panel',
            layout: 'hbox',
            bodyPadding: 10,
            bodyStyle: 'background-color: rgba(208, 208, 208, .5);',
            items: [
                {
                    flex: 1,
                    xtype: 'cyclesearch',
                    name: 'search',
                    listeners: {
                        select: 'onSelectRecord'
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'segmentedbutton',
                    allowMultiple: true,
                    items: [
                        {
                            iconCls: "fa fa-upload",
                            handler: 'updateView'
                        }, {
                            iconCls: "fa fa-file",
                            handler: 'insertView'
                        }
                    ]
                }
            ]
        }
    ]

});