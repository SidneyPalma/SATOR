//@charset UTF-8
Ext.define( 'iAdmin.view.equipment.EquipmentView', {
    extend: 'Ext.form.Panel',

    xtype: 'equipmentview',

    requires: [
        'Ext.tab.*',
        'Smart.plugins.*',
        'Ext.panel.Panel',
        'Smart.form.Portrait',
        'Ext.grid.property.Grid',
        'iAdmin.store.itembase.*',
        'iAdmin.view.itembase.ItemBaseLayout',
        'iAdmin.view.equipment.EquipmentController',
        'iAdmin.view.helper.packing.PackingSearch',
        'iAdmin.view.person.proprietary.ProprietarySearch',
        'iAdmin.view.helper.manufacturer.ManufacturerSearch'
        // 'iAdmin.view.helper.materialstatus.MaterialStatusSearch'
    ],

    layout: 'border',

    controller: 'equipment',
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

        Ext.create('iAdmin.store.itembase.Equipment');

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
                        text: 'Cadastro do Equipamento'
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        fieldLabel: 'Equipamento',
                        name: 'name',
                        fieldCls: 'smart-field-style-action'
                    }, {
                        xtype: 'textareafield',
                        fieldLabel: 'Descrição',
                        name: 'description'
                    }, {
                        fieldLabel: 'Descrição no Fluxo',
                        xtype: 'textfield',
                        name: 'sterilizationname'
                    }, {
                    //     xtype: 'radiogroup',
                    //     vertical: true,
                    //     columns: 2,
                    //     items: [
                    //         { boxLabel: 'Ciclo', name: 'extensiontype', inputValue: 0, checked: true },
                    //         { boxLabel: 'Serviço', name: 'extensiontype', inputValue: 1 }
                    //     ],
                    //     listeners: {
                    //         change: 'onChangeExtensionType'
                    //     }
                    // }, {
                    //     height: 150,
                    //     layout: 'card',
                    //     xtype: 'container',
                    //     name: 'containercard',
                    //     items: [
                    //         {
                    //             xtype: 'equipmentcycle'
                    //         }, {
                    //             xtype: 'itembaseservicetype'
                    //         }
                    //     ]
                    // }, {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                name: 'isactive',
                                xtype: 'checkboxfield',
                                fieldLabel: 'Status',
                                boxLabel: 'Ativo'
                            }, {
                                flex: 1,
                                name: 'sterilizationflow',
                                xtype: 'checkboxfield',
                                fieldLabel: 'Fluxo',
                                boxLabel: 'Ativo'
                            // }, {
                            //     flex: 1,
                            //     name: 'validateload',
                            //     xtype: 'checkboxfield',
                            //     fieldLabel: 'Carga',
                            //     boxLabel: 'Valida'
                            }
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
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                disabled: true,
                                name: 'pendent',
                                iconCls: "fa fa-check",
                                text: 'Concluir',
                                handler: 'updateFlux',
                                showSmartTheme: ''
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
                deferredRender: true,
                items: [
                    {
                        tabIndex: 0,
                        iconCls: "fa fa-stack-overflow",
                        bodyPadding: 10,
                        title: 'Complemento',
                        layout: 'anchor',
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
                                        flex: 1,
                                        margin: '0 5 0 0',
                                        fieldLabel: 'Código patrimônio',
                                        xtype: 'numberfield',
                                        name: 'patrimonialcode'
                                    }, {
                                        flex: 1,
                                        allowBlank: true,
                                        margin: '0 5 0 5',
                                        xtype: 'datefield',
                                        plugins: 'textmask',
                                        name: 'registrationanvisavalid',
                                        fieldLabel: 'Validade'
                                    }, {
                                        width: 150,
                                        margin: '0 0 0 5',
                                        xtype: 'datefield',
                                        plugins: 'textmask',
                                        name: 'dateacquisition',
                                        fieldLabel: 'Aquisição'
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 1,
                                        fieldLabel: 'Registro ANVISA',
                                        name: 'registrationanvisa'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Código de Barra',
                                        name: 'barcode'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        width: 150,
                                        allowBlank: true,
                                        name: 'serialnumber',
                                        fieldLabel: 'Número Série'
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 1,
                                        fieldLabel: 'Capacidade (Lt)',
                                        name: 'capacity'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Ano Fabricação',
                                        name: 'manufactureryear'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        allowBlank: true,
                                        width: 150,
                                        name: 'design',
                                        fieldLabel: 'Modelo'
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
                                        flex: 1,
                                        margin: '0 5 0 0',
                                        fieldLabel: 'Fabricante',
                                        xtype: 'manufacturersearch',
                                        hiddenNameId: 'manufacturerid',
                                        name: 'manufacturername'
                                    }, {
                                        flex: 1,
                                        margin: '0 5 0 5',
                                        fieldLabel: 'CME Areas',
                                        xtype: 'cmeareassearch',
                                        hiddenNameId: 'cmeareasid',
                                        name: 'cmeareasname'
                                    }, {
                                        width: 150,
                                        margin: '0 5 0 0',
                                        xtype: 'comboenum',
                                        queryFilter: 'E',
                                        fieldLabel: 'Grupo do Item',
                                        name: 'itemgroupdescription'
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
                                        flex: 1,
                                        margin: '0 5 0 0',
                                        fieldLabel: 'Proprietário',
                                        xtype: 'proprietarysearch',
                                        hiddenNameId: 'proprietaryid',
                                        name: 'proprietaryname'
                                    }, {
                                        flex: 1,
                                        value: '001',
                                        margin: '0 0 0 5',
                                        useReadColor: true,
                                        fieldLabel: 'Status',
                                        xtype: 'comboenum',
                                        name: 'equipmentstatusdescription'
                                        // xtype: 'equipmentstatussearch',
                                        // hiddenNameId: 'equipmentstatusid',
                                        // name: 'equipmentstatusname'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        width: 150,
                                        xtype: 'container'
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
                        title: 'Imagem',
                        xtype: 'panel',
                        layout: 'fit',
                        bodyPadding: 10,
                        items: [
                            {
                                xtype: 'portrait',
                                tableName: 'itembase'
                            }
                        ]
                    }, {
                        tabIndex: 2,
                        disabled: true,
                        title: 'Resultado Layout',
                        iconCls: "fa fa-language",
                        xtype: 'itembaselayout'
                    }, {
                        tabIndex: 3,
                        xtype: 'panel',
                        title: 'Parâmetros de fluxos',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'radiogroup',
                                vertical: true,
                                columns: 2,
                                cls: 'sub-title-label',
                                margin: '20 20 20 20',
                                style: 'color: blue;',
                                items: [
                                    { boxLabel: 'Ciclo', name: 'extensiontype', inputValue: 0, checked: true },
                                    { boxLabel: 'Serviço', name: 'extensiontype', inputValue: 1 }
                                ],
                                listeners: {
                                    change: 'onChangeExtensionType'
                                }
                            }, {
                                flex: 1,
                                layout: 'card',
                                xtype: 'container',
                                name: 'containercard',
                                items: [
                                    {
                                        cls: 'update-grid',
                                        xtype: 'equipmentcycle'
                                    }, {
                                        cls: 'update-grid',
                                        xtype: 'itembaseservicetype'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }

});