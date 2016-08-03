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

    listeners: {
        afterrender: 'onAfterRenderView',
        startreader: 'onStartReaderView'
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
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'materialboxid'
                    }, {
                        margin: '10 0 0 0',
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
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
                                        fieldLabel: 'Cliente',
                                        name: 'clientname'
                                    }
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
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
                                        fieldLabel: 'Prioridade',
                                        name: 'priorityleveldescription'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Fluxo',
                                        name: 'sterilizationtypename'
                                    }
                                ]
                            }
                        ]
                    }, {
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
                                flex: 1,
                                name: 'search',
                                showClear: true,
                                useUpperCase: true,
                                useReadColor: false,
                                fieldLabel: 'Leitura',
                                cls: 'processing-field',
                                labelCls: 'processing-field-font',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                            var view = field.up('flowprocessingview');
                                            view.fireEvent('startreader', field, e, eOpts);
                                            e.stopEvent();
                                        }
                                    }
                                }
                            }, {
                                xtype: 'splitter'
                            }, {
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
                                        fieldLabel: 'Local',
                                        name: 'areasname'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        fieldLabel: 'Equipamento',
                                        name: 'equipmentname'
                                    }
                                ]
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
                                        flex: 1,
                                        dockedItems: [
                                            {
                                                margin: '0 0 6 0',
                                                xtype: 'label',
                                                cls: 'processing-field-font',
                                                text: 'Imagem'
                                            }
                                        ],
                                        hideButtons: true,
                                        xtype: 'portrait',
                                        cls: 'processing-panel-header-flow'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        xtype: 'flowprocessinginput'
                                    }
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 2,
                                xtype: 'flowprocessingmessage'
                            }
                        ]
                    }
                ]
            }
        ];
    }

});