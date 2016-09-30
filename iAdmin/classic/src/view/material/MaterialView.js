//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialView', {
    extend: 'Ext.form.Panel',

    xtype: 'materialview',

    requires: [
        'Ext.tab.*',
        'Smart.plugins.*',
        'Ext.panel.Panel',
        'Smart.form.Portrait',
        'Ext.grid.property.Grid',
        'iAdmin.store.itembase.*',
        'iAdmin.view.material.MaterialCycle',
        'iAdmin.view.itembase.ItemBaseLayout',
        'iAdmin.view.material.MaterialTypeFlow',
        'iAdmin.view.material.MaterialController',
        'iAdmin.view.helper.packing.PackingSearch',
        'iAdmin.view.itembase.ItemBaseServiceType',
        'iAdmin.view.person.proprietary.ProprietarySearch',
        'iAdmin.view.helper.manufacturer.ManufacturerSearch',
        'iAdmin.view.sterilizationtype.SterilizationTypeSearch'
        // 'iAdmin.view.helper.materialstatus.MaterialStatusSearch'
    ],

    layout: 'border',

    controller: 'material',
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

        Ext.create('iAdmin.store.itembase.Material');

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
                    allowBlank: false,
                    useLabelBold: true
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Cadastro do Material'
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
                        allowBlank: true,
                        useReadColor: true,
                        fieldLabel: 'Kit ativo',
                        name: 'materialboxname'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'checkboxfield',
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                flex: 1,
                                name: 'isactive',
                                xtype: 'checkboxfield',
                                fieldLabel: 'Status',
                                boxLabel: 'Ativo'
                            }, {
                                flex: 1,
                                name: 'isconsigned',
                                xtype: 'checkboxfield',
                                fieldLabel: 'Tipo',
                                boxLabel: 'Consignado'
                            }, {
                                flex: 1,
                                name: 'cloned',
                                disabled: true,
                                xtype: 'checkboxfield',
                                fieldLabel: 'Duplicado',
                                boxLabel: 'Clone'
                            }
                        ]
                    }
                ],

                dockedItems: [
                    {
                        dock: 'bottom',
                        margin: '10 0 0 0',
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
                                name: 'copymaterial',
                                iconCls: "fa fa-files-o",
                                text: 'Duplicar',
                                handler: 'insertCopy',
                                showSmartTheme: 'blue'
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
                                        flex: 2,
                                        fieldLabel: 'Código de Barra',
                                        name: 'barcode'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        allowBlank: true,
                                        fieldLabel: 'Registro ANVISA',
                                        name: 'registrationanvisa'
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
                                        flex: 2,
                                        allowBlank: true,
                                        fieldLabel: 'Número do Patrimonio',
                                        name: 'patrimonialcode'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        minValue: 1,
                                        xtype: 'numberfield',
                                        fieldLabel: 'Qtde Processos',
                                        name: 'numberproceedings'
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
                                        flex: 2,
                                        margin: '0 5 0 0',
                                        fieldLabel: 'Proprietário',
                                        xtype: 'proprietarysearch',
                                        hiddenNameId: 'proprietaryid',
                                        name: 'proprietaryname'
                                    }, {
                                        flex: 1,
                                        value: '001',
                                        margin: '0 0 0 5',
                                        // useReadColor: true,
                                        fieldLabel: 'Status',
                                        xtype: 'comboenum',
                                        name: 'materialstatusdescription'
                                        // xtype: 'materialstatussearch',
                                        // hiddenNameId: 'materialstatusid',
                                        // name: 'materialstatusname'
                                    }, {
                                        flex: 2,
                                        xtype: 'container'
                                    }
                                ]
                            }, {
                                xtype: 'label',
                                text: 'Características',
                                cls: 'sub-title-label'
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 2,
                                        margin: '0 5 0 0',
                                        fieldLabel: 'Fabricante',
                                        xtype: 'manufacturersearch',
                                        hiddenNameId: 'manufacturerid',
                                        name: 'manufacturername'
                                    }, {
                                        flex: 1,
                                        margin: '0 0 0 5',
                                        xtype: 'datefield',
                                        fieldLabel: 'Data Aquisição',
                                        name: 'dateacquisition',
                                        plugins: 'textmask'
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
                                        flex: 2,
                                        margin: '0 5 0 0',
                                        fieldLabel: 'Embalagem',
                                        xtype: 'packingsearch',
                                        hiddenNameId: 'packingid',
                                        name: 'packingname'
                                    }, {
                                        flex: 1,
                                        margin: '0 0 0 5',
                                        allowBlank: true,
                                        xtype: 'datefield',
                                        fieldLabel: 'Data Descarte',
                                        name: 'datedisposal',
                                        plugins: 'textmask'
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
                                        flex: 2,
                                        margin: '0 5 0 0',
                                        xtype: 'comboenum',
                                        queryFilter: 'M',
                                        fieldLabel: 'Grupo do Item',
                                        name: 'itemgroupdescription'
                                    }, {
                                        flex: 1,
                                        margin: '0 0 0 5',
                                        xtype: 'textfield',
                                        fieldLabel: 'Largura (cm)',
                                        name: 'itemlength',
                                        plugins: 'textmask',
                                        mask: '0,00',
                                        money: true
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
                                        flex: 2,
                                        margin: '0 5 0 0',
                                        xtype: 'comboenum',
                                        fieldLabel: 'Tamanho do Item',
                                        name: 'itemsizedescription'
                                    }, {
                                        flex: 1,
                                        margin: '0 0 0 5',
                                        xtype: 'textfield',
                                        fieldLabel: 'Largura (cm3)',
                                        name: 'itemcubiclength',
                                        plugins: 'textmask',
                                        mask: '0,00',
                                        money: true
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
                        disabled: true,
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
                                columns: 3,
                                cls: 'sub-title-label',
                                margin: '20 20 20 20',
                                style: 'color: blue;',
                                items: [
                                    { boxLabel: 'Fluxo', name: 'extensiontype', inputValue: 0, checked: true },
                                    { boxLabel: 'Ciclo', name: 'extensiontype', inputValue: 1 },
                                    { boxLabel: 'Serviço', name: 'extensiontype', inputValue: 2 }
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
                                        xtype: 'materialtypeflow'
                                    }, {
                                        cls: 'update-grid',
                                        xtype: 'materialcycle'
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


