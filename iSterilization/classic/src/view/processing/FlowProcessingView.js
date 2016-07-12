//@charset UTF-8
Ext.define( 'iSterilization.view.processing.FlowProcessingView', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessingview',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'Smart.form.Portrait',
        'iSterilization.store.processing.*',
        'iSterilization.view.processing.FlowProcessingInput',
        'iSterilization.view.processing.FlowProcessingMaterial',
        'iSterilization.view.processing.FlowProcessingController'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    controller: 'flowprocessing',
    bodyCls: 'flow-processing',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Processamento de Materiais',
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
        afterrender: 'onFocusSearch'
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
                showSmartTransparent: true,
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            useReadColor: true,
                            cls: 'processing-field',
                            labelCls: 'processing-field-font'
                        },
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'Operador'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Responsável'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Cliente'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Prioridade'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                xtype: 'container',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    useReadColor: true,
                                    anchor: '100%',
                                    cls: 'processing-field',
                                    labelCls: 'processing-field-font'
                                },
                                items: [
                                    {
                                        flex: 1,
                                        fieldLabel: 'Local'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Etapa'
                                    }
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                name: 'search',
                                reference: 'search',
                                fieldLabel: 'Leitura do Item',
                                xtype: 'textfield',
                                cls: 'processing-field',
                                labelCls: 'processing-field-font'
                            }
                        ]
                    }
                ]
            }, {
                xtype: 'splitter'
            }, {
                flex: 1,
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        flex: 1,
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                flex: 1,
                                titleAlign: 'center',
                                title: 'Avisos',
                                xtype: 'panel',
                                iconCls: "fa fa-exclamation-triangle",
                                cls: 'processing-panel-header-flow'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 3,
                                xtype: 'portrait',
                                hideButtons: true
                            }
                        ]
                    }, {
                        xtype: 'splitter'
                    }, {
                        flex: 2,
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                flex: 1,
                                titleAlign: 'center',
                                iconCls: "fa fa-database",
                                title: 'Insumos do Fluxo',
                                xtype: 'flowprocessinginput'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 2,
                                titleAlign: 'center',
                                iconCls: "fa fa-cubes",
                                title: 'Materiais no Processamento',
                                xtype: 'flowprocessingmaterial'
                            }
                        ]
                    }
                ]
            }
        ];
    }

});