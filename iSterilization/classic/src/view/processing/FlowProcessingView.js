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

    // listeners: {
    //     afterrender: 'onFocusSearch'
    // },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'container',
                height: 190,
                showSmartTransparent: true,
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            useReadColor: true,
                            anchor: '100%',
                            cls: 'siemens-field',
                            labelCls: 'field-font'
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
                                    cls: 'siemens-field',
                                    labelCls: 'field-font'
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
                                fieldLabel: 'Leitura do Item',
                                xtype: 'textfield',
                                cls: 'siemens-field',
                                labelCls: 'field-font'
                            }
                        ]
                    }
                ]
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
                        xtype: 'portrait',
                        hideButtons: true
                    }, {
                        xtype: 'splitter'
                    }, {
                        flex: 2,
                        xtype: 'container',
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                flex: 1,
                                titleAlign: 'center',
                                title: 'Insumos do Fluxo',
                                cls: 'panel-frame panel-header-flow update-grid',
                                xtype: 'gridpanel',
                                store: Ext.create('Ext.data.Store', {
                                    fields:[ 'name', 'email', 'phone'],
                                    data: [
                                        { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
                                        { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
                                        { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
                                        { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
                                    ]
                                }),
                                columns: [
                                    { text: 'Email', dataIndex: 'email', flex: 1 }
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 2,
                                titleAlign: 'center',
                                cls: 'panel-frame panel-header-flow update-grid',
                                title: 'Itens no Processamento',
                                xtype: 'gridpanel',
                                store: Ext.create('Ext.data.Store', {
                                    fields:[ 'name', 'email', 'phone'],
                                    data: [
                                        { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
                                        { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
                                        { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
                                        { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
                                    ]
                                }),
                                columns: [
                                    { text: 'Name', dataIndex: 'name', flex: 1 },
                                    { text: 'Phone', dataIndex: 'phone', width: 150 }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }

});