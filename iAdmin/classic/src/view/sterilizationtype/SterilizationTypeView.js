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
        'iAdmin.view.sterilizationtype.SterilizationTypeController'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    controller: 'sterilizationtype',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-stack-overflow",
    showSmartAnimate: true,

    header: {
        title: 'Tipo de Esterilização',
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

        me.items = [
            {
                split: true,
                xtype: 'form',
                layout: 'anchor',
                cls: "smart-background-transparent",
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false
                },
                items: [
                    {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'graphpaper'
                    }
                ]
            }, {
                flex: 1,
                xtype: 'form',
                name: 'sterilizationtypeflow',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        width: 400,
                        xtype: 'container',
                        html: [
                            '<div class="stencil-container"></div>'
                        ]
                    }, {
                        flex: 1,
                        xtype: 'form',
                        html: [
                            '<div class="paper-container"><span id="paper-container-span" class="isactive-of">Descrição do Fluxo</span></div>'
                        ],
                        dockedItems: [
                            {
                                width: 50,
                                dock: 'right',
                                xtype: 'segmentedbutton',
                                vertical: true,
                                allowToggle: false,
                                style: 'padding-top: 5px;',
                                defaults: {
                                    scale: 'large',
                                    showSmartTheme: 'green',
                                    style: 'font-size: 24px;'
                                },
                                items: [
                                    {
                                        iconCls: "fa fa-upload",
                                        showSmartTheme: 'red',
                                        handler: 'updateFlow'
                                    }, {
                                        iconCls: "fa fa-pencil-square-o",
                                        showSmartTheme: 'red',
                                        handler: 'updateEdit'
                                    // }, {
                                    //     iconCls: "fa fa-sitemap",
                                    //     showSmartTheme: 'blue',
                                    //     handler: 'updateFlux'
                                    }, {
                                        iconCls: "fa fa-reply",
                                        handler: 'commandManagerUndo'
                                    }, {
                                        iconCls: "fa fa-share",
                                        handler: 'commandManagerRedo'
                                    }, {
                                        iconCls: "fa fa-level-down",
                                        handler: 'elementToBack'
                                    }, {
                                        iconCls: "fa fa-level-up",
                                        handler: 'elementToFront'
                                    }, {
                                        iconCls: "fa fa-search-plus",
                                        handler: 'paperScrollerZoomIn'
                                    }, {
                                        iconCls: "fa fa-search-minus",
                                        handler: 'paperScrollerZoomOut'
                                    }, {
                                        iconCls: "fa fa-arrows-alt",
                                        handler: 'paperScrollerZoomFit'
                                    }, {
                                        iconCls: "fa fa-share-alt",
                                        handler: 'updateFlowRules'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                listeners: {
                    afterlayout: 'onAfterLayout'
                }
            }
        ];
    }

});

