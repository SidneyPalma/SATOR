//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxView', {
    extend: 'Ext.form.Panel',

    xtype: 'materialboxview',

    requires: [
        'Ext.tab.*',
        'Smart.plugins.*',
        'Ext.panel.Panel',
        'Smart.form.Portrait',
        'iAdmin.store.box.*',
        'iAdmin.view.box.MaterialBoxItem',
        'iAdmin.view.box.MaterialBoxTarge',
        'iAdmin.view.box.MaterialBoxController',
        'iAdmin.view.helper.packing.PackingSearch',
        'iAdmin.view.helper.targe.TargeColorSearch',
        'iAdmin.view.box.MaterialBoxTargeColorSearch'
    ],

    layout: 'border',

    controller: 'materialbox',
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
                        text: 'Cadastro do Kit'
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'statusbox',
                        value: '000'
                    }, {
                        fieldLabel: 'Nome',
                        name: 'name',
                        fieldCls: 'smart-field-style-action'
                    }, {
                        xtype: 'textareafield',
                        fieldLabel: 'Restrições',
                        name: 'restriction'
                    }, {
                        fieldLabel: 'Códido de Barras',
                        name: 'barcode'
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
                                xtype: 'comboenum',
                                fieldLabel: 'Tamanho',
                                name: 'itemsizedescription'
                            }, {
                                flex: 1,
                                margin: '0 0 0 5',
                                fieldLabel: 'Embalagem',
                                name: 'packingname',
                                hiddenNameId: 'packingid',
                                xtype: 'packingsearch'
                            }
                        ]
                    }, {
                        xtype: 'label',
                        cls: 'sub-title-label',
                        text: 'Esquema de cores'
                    }, {
                        height: 128,
                        margin: '10 0 0 0',
                        xtype: 'materialboxtarge'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                allowBlank: false,
                                useReadColor: true,
                                fieldLabel: 'Status',
                                xtype: 'displayfield',
                                name: 'statusboxdescription',
                                value: 'Novo Cadastro'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                name: 'requirepatient',
                                xtype: 'checkboxfield',
                                fieldLabel: 'Prontuário',
                                boxLabel: 'Obrigatório'
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
                deferredRender: false,
                items: [
                    {
                        iconCls: "fa fa-language",
                        title: 'Materiais do Kit',
                        xtype: 'materialboxitem'
                    }
                ]
            }
        ];
    }

});