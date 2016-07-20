//@charset UTF-8
Ext.define( 'iAdmin.view.areas.CMEAreasStockList', {
    extend: 'Ext.form.Panel',

    xtype: 'cmeareasstocklist',

    requires: [
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.areas.*',
        'iAdmin.view.helper.areas.CMEAreasController'
    ],

    layout: 'fit',

    controller: 'cmeareas',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Estoques por Área',
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

        Ext.create('iAdmin.store.areas.CMEAreasStock');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'cmeareasstock',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',

                columns: [
                    {
                        flex: 1,
                        text: 'Insumo',
                        dataIndex: 'inputname'
                    }, {
                        flex: 1,
                        text: 'Nome da Área/Equipamento'
                    }, {
                        width: 200,
                        sortable: false,
                        text: 'Apresentação',
                        dataIndex: 'presentationdescription'
                    }, {
                        width: 120,
                        align: 'right',
                        sortable: false,
                        text: 'Estoque',
                        dataIndex: 'lotamount',
                        renderer: Smart.maskRenderer('0,000',true)
                    }, {
                        width: 200,
                        sortable: false,
                        text: 'Lote N#',
                        dataIndex: 'lotpart'
                    }, {
                        width: 100,
                        sortable: false,
                        xtype: 'datecolumn',
                        align: 'center',
                        text: 'Validade',
                        dataIndex: 'datevalidity'
                    }
                ],
                dockedItems: [
                    {
                        xtype:  'panel',
                        layout: 'hbox',
                        bodyStyle: 'padding-bottom: 10px;',
                        items: [
                            {
                                flex: 1,
                                xtype: 'textfield',
                                name: 'search',
                                reference: 'search',
                                showFetch: true
                            // }, {
                            //     xtype: 'splitter'
                            // }, {
                            //     xtype: 'button',
                            //     iconCls: "fa fa-file-o",
                            //     handler: 'insertViewNew',
                            //     tooltip: 'Novo cadastro!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'cmeareasstock',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});