//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeFlow', {
    extend: 'Ext.form.Panel',

    xtype: 'sterilizationtypeflow',

    requires: [
        'Ext.form.Panel',
        'Smart.util.CoreFlow',
        'Ext.button.Segmented'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function () {
        var me = this;

        me.buildItems();
        me.callParent();
    },

    buildItems: function ( ) {
        var me = this;

        me.items = [
            {
                width: 300,
                xtype: 'panel',
                html: [
                    '<div class="stencil-container"></div>'
                ]
            }, {
                flex: 1,
                xtype: 'form',
                html: [
                    '<div class="paper-container"></div>'
                ],
                dockedItems: [
                    {
                        width: 60,
                        dock: 'right',
                        xtype: 'segmentedbutton',
                        vertical: true,
                        allowToggle: false,
                        defaults: {
                            scale: 'large',
                            showSmartTheme: 'blue',
                            style: 'font-size: 24px;'
                        },
                        items: [
                            {
                                iconCls: "fa fa-sitemap",
                                showSmartTheme: 'red',
                                handler: 'updateViewFlow'
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
        ];
    },

    listeners: {
        afterlayout: 'onAfterLayout',
        graphchanged: 'onGraphChanged',
        annotateshow: 'onAnnotateShow',
        linkdblclick: 'onLinkDblClick',
        stepdblclick: 'onStepDblClick',
        targetchange: 'onTargetChange',
        dropcellview: 'onDropCellView'
    }

});