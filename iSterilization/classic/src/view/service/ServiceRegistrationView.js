//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceRegistrationView', {
    extend: 'Ext.form.Panel',

    xtype: 'serviceregistrationview',

    requires: [
        'Ext.tab.*',
        'Ext.panel.Panel',
        'Smart.plugins.SmartRegion',
        'Ext.grid.plugin.RowEditing',
        'iSterilization.store.service.*',
        'iAdmin.view.itembase.ItemBaseSearch',
        'iAdmin.view.helper.areas.CMEAreasSearch',
        'iSterilization.view.service.ServiceRegistrationController',
        'iSterilization.view.service.ServiceRegistrationResult'
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
                        showClear: false,
                        useReadColor: true,
                        fieldLabel: 'Item',
                        xtype: 'itembasesearch',
                        hiddenNameId: 'itembaseid',
                        name: 'itembasename',
                        fieldCls: 'smart-field-style-action',
                        listeners: {
                            select: 'selectItemBase'
                        }
                    }, {
                        showClear: false,
                        fieldLabel: 'Área CME',
                        xtype: 'cmeareassearch',
                        hiddenNameId: 'cmeareasid',
                        name: 'cmeareasname'
                    }, {
                        xtype: 'comboenum',
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
                        title: 'Resultado',
                        iconCls: "fa fa-language",
                        xtype: 'serviceregistrationresult'
                    }
                ]
            }
        ];
    }

});