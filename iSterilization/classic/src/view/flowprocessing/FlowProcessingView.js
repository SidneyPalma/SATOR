//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingView', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessingview',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'Smart.form.Portrait',
        'iSterilization.store.flowprocessing.*',
        'iSterilization.view.flowprocessing.FlowProcessingInput',
        'iSterilization.view.flowprocessing.FlowProcessingMaterial',
        'iSterilization.view.flowprocessing.FlowProcessingController'
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
                        margin: '10 0 0 0',
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
                                flex: 3,
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
                                        fieldLabel: 'Operador',
                                        value: 'sator.etimba'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Cliente',
                                        value: 'Centro Cirúrgico'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Fluxo',
                                        value: 'Vapor Saturado (134°c)'
                                    }
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Prioridade',
                                value: 'Normal'
                            }
                        ]
                    }, {
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
                                flex: 3,
                                margin: '10 0 0 0',
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
                                        flex: 2,
                                        name: 'search',
                                        showClear: true,
                                        fieldLabel: 'Leitura do Item',
                                        useReadColor: false,
                                        xtype: 'textfield',
                                        cls: 'processing-field',
                                        labelCls: 'processing-field-font'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Local',
                                        value: 'Recepção Expurgo'
                                    }
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                margin: '10 0 0 0',
                                flex: 1,
                                fieldLabel: 'Equipamento',
                                value: '. . .'
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
                        flex: 3,
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                flex: 2,
                                titleAlign: 'center',
                                iconCls: "fa fa-cubes",
                                title: 'Materiais',
                                xtype: 'flowprocessingmaterial'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    cls: 'processing-panel-header-flow'
                                },
                                items: [
                                    {
                                        flex: 3,
                                        titleAlign: 'center',
                                        title: 'Material selecionado',
                                        iconCls: "fa fa-exclamation-triangle",
                                        xtype: 'portrait',
                                        hideButtons: true
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 2,
                                        titleAlign: 'center',
                                        title: 'Avisos',
                                        xtype: 'panel',
                                        iconCls: "fa fa-exclamation-triangle"
                                    }
                                ]
                            }
                        ]
                    }, {
                        xtype: 'splitter'
                    }, {
                        flex: 1,
                        titleAlign: 'center',
                        iconCls: "fa fa-database",
                        title: 'Insumos',
                        xtype: 'flowprocessinginput'
                    }
                ]
            }
        ];
    }

});