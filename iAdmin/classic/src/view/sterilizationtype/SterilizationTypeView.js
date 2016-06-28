//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeView', {
    extend: 'Ext.form.Panel',

    xtype: 'sterilizationtypeview',

    requires: [
        'Ext.tab.*',
        'Ext.form.Panel',
        'Ext.panel.Panel',
        'Smart.plugins.*',
        'Ext.button.Segmented',
        'Smart.ux.TextMaskCore',
        'Smart.form.field.ComboEnum',
        'iAdmin.model.sterilizationtype.SterilizationType',
        'iAdmin.view.sterilizationtype.SterilizationTypeFlow',
        'iAdmin.view.sterilizationtype.SterilizationTypeSearch',
        'iAdmin.store.sterilizationtype.SterilizationTypeMaterial',
        'iAdmin.view.sterilizationtype.SterilizationTypeController'
    ],

    layout: 'border',

    controller: 'sterilizationtype',
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

        Ext.create('iAdmin.store.sterilizationtype.SterilizationType');
        Ext.create('iAdmin.store.sterilizationtype.SterilizationTypeMaterial');

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
                        text: 'Tipo de Esterilização'
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'graphpaper'
                    }, {
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        name: 'description',
                        fieldLabel: 'Descrição'
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
                                margin: '0 5 0 0',
                                xtype: 'comboenum',
                                fieldLabel: 'Prioridade',
                                name: 'priorityleveldescription'
                            }, {
                                width: 90,
                                margin: '0 5 0 5',
                                hideTrigger: true,
                                name: 'validdays',
                                xtype: 'numberfield',
                                fieldLabel: 'Validade'
                            }, {
                                width: 90,
                                margin: '0 0 0 5',
                                name: 'expireto',
                                xtype: 'datefield',
                                plugins: 'textmask',
                                fieldLabel: 'Expira em'
                            }
                        ]
                    }, {
                        name: 'isactive',
                        xtype: 'checkboxfield',
                        boxLabel: 'Ativo'
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
                        title: 'Fluxo da Esterilização',
                        iconCls: "fa fa-language",
                        xtype: 'sterilizationtypeflow'
                    }, {
                        title: 'Material Envolvido',
                        iconCls: "fa fa-shopping-cart",
                        xtype: 'gridpanel',
                        cls: 'search-grid',
                        store: 'sterilizationtypematerial',
                        rowLines: false,
                        hideHeaders: false,
                        headerBorders: false,
                        columns: [
                            {
                                flex: 2,
                                text: 'Descrição do Material',
                                dataIndex: 'name'
                            }, {
                                width: 1,
                                text: 'Grupo',
                                dataIndex: 'itemgroupdescription'
                            }, {
                                width: 120,
                                align: 'right',
                                text: 'Largura (cm)',
                                dataIndex: 'itemlength',
                                renderer: Smart.maskRenderer('0,00',true)
                            }, {
                                width: 120,
                                align: 'right',
                                text: 'Largura (cm3)',
                                dataIndex: 'itemcubiclength',
                                renderer: Smart.maskRenderer('0,00',true)
                            }, {
                                width: 80,
                                readOnly: true,
                                text: 'Ativo',
                                dataIndex: 'isactive',
                                align: 'center',
                                xtype: 'checkcolumn'
                            }, {
                                width: 100,
                                readOnly: true,
                                text: 'Consignado',
                                dataIndex: 'isconsigned',
                                align: 'center',
                                xtype: 'checkcolumn'
                            }
                        ]
                    }
                ]
            }
        ];
    }

});


