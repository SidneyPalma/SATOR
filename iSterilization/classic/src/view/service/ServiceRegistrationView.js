//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceRegistrationView', {
    extend: 'Ext.form.Panel',

    xtype: 'serviceregistrationview',

    requires: [
        'Ext.tab.*',
        'Ext.panel.Panel',
        'Smart.plugins.*',
        'Ext.grid.plugin.RowEditing',
        'iSterilization.store.service.*',
        'iSterilization.view.service.ServiceRegistrationResult',
        'iSterilization.view.service.ServiceRegistrationController'
    ],

    controller: 'serviceregistration',

    layout: 'border',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-stack-overflow",
    showSmartAnimate: true,

    header: {
        title: 'Registro de Serviços',
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

        Ext.create('iSterilization.store.service.ServiceRegistration');

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
                        text: 'Cadastro do Serviço'
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'resultvalue'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'resultfield'
                    }, {
                        useReadColor: true,
                        fieldLabel: 'Item',
                        name: 'itembasename',
                        fieldCls: 'smart-field-style-action'
                        // listeners: {
                        //     select: 'selectItemBase'
                        // }
                    }, {
                        allowBlank: true,
                        useReadColor: true,
                        fieldLabel: 'Área CME',
                        name: 'cmeareasname'
                    }, {
                        useReadColor: true,
                        fieldLabel: 'Tipo de Serviço',
                        name: 'servicetypedescription'
                    }, {
                        fieldLabel: 'Descrição',
                        name: 'description'
                    }, {
                        xtype: 'textareafield',
                        fieldLabel: 'Observações',
                        name: 'observation'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'displayfield',
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'Inicio',
                                name: 'begintimeusername'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Termino',
                                name: 'enduptimeusername'
                            }
                        ]
                    }, {
                        fieldLabel: 'Status',
                        xtype: 'displayfield',
                        name: 'resultstatedescription'
                    }, {
                        margin: '20 0 0 0',
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'button',
                        defaults: {
                            scale: 'large',
                            showSmartTheme: 'red',
                            style: 'font-size: 20px;'
                        },
                        items: [
                            {
                                flex: 2,
                                iconCls: "fa fa-upload",
                                text: 'Salvar',
                                name: 'update',
                                listeners: {
                                    click: 'updateView'
                                }
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                iconCls: "fa fa-print",
                                handler: 'printerView'
                            }, {
                                flex: 1,
                                name: 'pendent',
                                iconCls: "fa fa-times-circle",
                                handler: 'updateFlux',
                                showSmartTheme: ''
                            //     flex: 1,
                            //     iconCls: "fa fa-upload",
                            //     text: 'Salvar',
                            //     handler: 'updateView'
                            // }, {
                            //     xtype: 'splitter'
                            // }, {
                            //     flex: 1,
                            //     iconCls: "fa fa-file-o",
                            //     text: 'Novo',
                            //     handler: 'insertView'
                            // }, {
                            //     xtype: 'splitter'
                            // }, {
                            //     flex: 1,
                            //     disabled: true,
                            //     name: 'pendent',
								// iconCls: "fa fa-check",
                            //     text: 'Concluir',
								// handler: 'updateFlux',
                            //     showSmartTheme: ''
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
                        title: 'Resultado',
                        iconCls: "fa fa-language",
                        xtype: 'serviceregistrationresult'
                    }
                ]
            }
        ];
    }

});