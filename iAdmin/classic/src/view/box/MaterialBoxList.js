//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxList', {
    extend: 'Ext.form.Panel',

    xtype: 'materialboxlist',

    requires: [
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.box.*',
        'iAdmin.view.box.MaterialBoxController'
    ],

    layout: 'fit',

    controller: 'materialbox',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Kits de Materiais',
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

        Ext.create('iAdmin.store.box.MaterialBox');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'materialbox',
                hideHeaders: false,
                headerBorders: false,
                cls: 'update-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome do Kit',
                        dataIndex: 'name'
                    }, {
                        width: 150,
                        text: 'Schema',
                        dataIndex: 'colorpallet'
                    }, {
                        width: 120,
                        text: 'Itens',
                        dataIndex: 'materialboxitems'
                    }, {
                        width: 180,
                        text: 'Código de Barras',
                        dataIndex: 'barcode'
                    }, {
                        text: 'Status',
                        dataIndex: 'statusboxdescription',
                        width: 180
                    }, {
                        width: 90,
                        text: 'Ações',
                        align: 'center',
                        xtype: 'actioncolumn',
                        handler: 'onViewEdit',
                        tooltip: 'Editar cadastro!',
                        iconCls: "fa fa-info-circle action-select-color-font"
                    }
                ],
                dockedItems: [
                    {
                        xtype:  'panel',
                        layout: 'hbox',
                        bodyStyle: 'padding-bottom: 10px;',
                        defaults: {
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                xtype: 'textfield',
                                name: 'search',
                                reference: 'search',
                                showFetch: true
                            }, {
                                xtype: 'splitter'
                            }, {
                                height: 38,
                                xtype: 'button',
                                iconCls: "fa fa-file-o",
                                handler: 'insertViewNew',
                                tooltip: 'Novo cadastro!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'materialbox',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});