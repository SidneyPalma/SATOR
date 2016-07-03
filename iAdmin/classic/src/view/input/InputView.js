//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputView', {
    extend: 'Ext.form.Panel',

    xtype: 'inputview',

    requires: [
        'Ext.tab.*',
        'Smart.plugins.*',
        'Ext.panel.Panel',
        'Smart.form.Portrait',
        'iAdmin.store.input.*',
        'iAdmin.view.input.InputStock',
        'iAdmin.view.input.InputController',
        'iAdmin.view.input.InputPresentation',
        'iAdmin.view.helper.provider.ProviderSearch',
        'iAdmin.view.helper.manufacturer.ManufacturerSearch',
        'iAdmin.view.helper.unitmeasurement.UnitMeasurementSearch'
    ],

    layout: 'border',

    controller: 'input',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-stack-overflow",
    showSmartAnimate: true,

    header: {
        title: 'Manutenção do cadastro',
        defaultType: 'button',
        defaults: {
            showSmartTheme: 'header'
        },
        items: [
            {
                handler: 'onHistoryBack',
                iconCls: "fa fa-arrow-left"
            }, {
                width: 5,
                xtype: 'splitter'
            }, {
                handler: 'onDestroyView',
                iconCls: "fa fa-times"
            }
        ]
    },

    listeners: {
        afterrender: 'onAfterRenderView'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.input.Input');

        me.items = [
            {
                flex: 1,
                split: true,
                xtype: 'form',
                region: 'west',
                scrollable: 'y',
                cls: "smart-background-transparent",
                plugins: [
                    'smartregion'
                ],
                responsiveConfig: {
                    'width >= 200': {
                        region: 'west',
                        flex: 1
                    }
                },
                smartregionConfig: {
                    source: 'west',
                    target: 'north',
                    width: 200,
                    flex: 3
                },
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Cadastro do Insumo'
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        fieldLabel: 'Nome',
                        name: 'name',
                        fieldCls: 'smart-field-style-action'
                    }, {
                        xtype: 'textareafield',
                        fieldLabel: 'Descrição',
                        name: 'description'
                    }, {
                        xtype: 'label',
                        cls: 'sub-title-label',
                        text: 'Seleções'
                    }, {
                        columns: 1,
                        vertical: true,
                        xtype: 'checkboxgroup',
                        items: [
                            { boxLabel: 'Teste obrigatório', name: 'reactive' },
                            { boxLabel: 'Possui estoque', name: 'hasstock'},
                            { boxLabel: 'Possui lote', name: 'hasbatch'},
                            { boxLabel: 'Ativo', name: 'isactive' }
                        ]
                    }, {
                        margin: '20 0 0 0',
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'button',
                        defaults: {
                            scale: 'large',
                            showSmartTheme: 'red'
                        },
                        items: [
                            {
                                flex: 1,
                                iconCls: "fa fa-upload",
                                text: 'Salvar',
                                handler: 'updateView'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                iconCls: "fa fa-file-o",
                                text: 'Novo',
                                handler: 'insertView'
                            }
                        ]
                    }
                ]
            }, {
                flex: 3,
                plain: true,
                region: 'center',
                xtype: 'tabpanel',
                focusOnToFront: false,
                deferredRender: false,
                items: [
                    {
                        tabIndex: 0,
                        iconCls: "fa fa-stack-overflow",
                        bodyPadding: 10,
                        title: 'Complemento',
                        layout: 'anchor',
                        scrollable: 'y',
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Estrutura',
                                labelCls: 'sub-title-label',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 3,
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        defaults: {
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                flex: 1,
                                                fieldLabel: 'Código de Barra',
                                                name: 'barcode'
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                allowBlank: true,
                                                fieldLabel: 'Registro ANVISA',
                                                name: 'codeanvisa'
                                            }
                                        ]
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 3,
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                flex: 1,
                                                margin: '0 5 0 0',
                                                fieldLabel: 'Fornecedor',
                                                xtype: 'providersearch',
                                                hiddenNameId: 'providerid',
                                                name: 'providername'
                                            }, {
                                                flex: 1,
                                                margin: '0 0 0 5',
                                                fieldLabel: 'Fabricante',
                                                xtype: 'manufacturersearch',
                                                hiddenNameId: 'manufacturerid',
                                                name: 'manufacturername'
                                            }
                                        ]
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                fieldLabel: 'Estoque',
                                labelCls: 'sub-title-label',
                                items: [
                                    {
                                        flex: 3,
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            allowBlank: false
                                        },
                                        defaultType: 'textfield',
                                        items: [
                                            {
                                                flex: 1,
                                                fieldLabel: 'Mínimo',
                                                name: 'minstock',
                                                plugins: 'textmask',
                                                mask: '0,000',
                                                money: true
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                fieldLabel: 'Máximo',
                                                name: 'maxstock',
                                                plugins: 'textmask',
                                                mask: '0,000',
                                                money: true
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                fieldLabel: 'Reposição',
                                                name: 'resetpoint',
                                                plugins: 'textmask',
                                                mask: '0,000',
                                                money: true
                                            }
                                        ]
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        flex: 3,
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaultType: 'numberfield',
                                        defaults: {
                                            minValue: 1,
                                            allowBlank: false,
                                            hideTrigger: true
                                        },
                                        items: [
                                            {
                                                flex: 1,
                                                margin: '0 5 0 0',
                                                fieldLabel: 'Validade',
                                                name: 'validityactivation'
                                            }, {
                                                flex: 1,
                                                margin: '0 5 0 5',
                                                fieldLabel: 'Entrega',
                                                name: 'deadline'
                                            }, {
                                                flex: 1,
                                                margin: '0 0 0 5',
                                                xtype: 'comboenum',
                                                fieldLabel: 'Apresentação',
                                                name: 'presentationdescription'
                                            }
                                        ]
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                fieldLabel: 'Filtros',
                                labelCls: 'sub-title-label',
                                items: [
                                    {
                                        flex: 3,
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                flex: 2,
                                                margin: '0 5 0 0',
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'Apresentações',
                                                boxLabel  : 'Somente em uso',
                                                name: 'onlyusefilter',
                                                checked: true,
                                                listeners: {
                                                    change: 'onlyUseFilter'
                                                }
                                            }, {
                                                flex: 1,
                                                margin: '0 0 0 5',
                                                fieldLabel: 'Unidades',
                                                xtype: 'textfield',
                                                name: 'onlyusefilter',
                                                listeners: {
                                                    change: 'storeField'
                                                }
                                            }
                                        ]
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                fieldLabel: 'Apresentações',
                                labelCls: 'sub-title-label',
                                items: [
                                    {
                                        flex: 3,
                                        height: 200,
                                        margin: '10 0 0 0',
                                        xtype: 'inputpresentation'
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }
                        ]
                    }, {
                        tabIndex: 1,
                        iconCls: "fa fa-picture-o",
                        title: 'Estoque',
                        xtype: 'inputstock'
                    }, {
                        tabIndex: 2,
                        iconCls: "fa fa-picture-o",
                        title: 'Imagem',
                        xtype: 'panel',
                        layout: 'fit',
                        bodyPadding: 10,
                        items: [
                            {
                                xtype: 'portrait',
                                tableName: 'input'
                            }
                        ]
                    }
                ]
            }
        ];
    }

});


