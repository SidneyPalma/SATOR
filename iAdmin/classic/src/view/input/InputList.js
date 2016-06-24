//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputList', {
    extend: 'Ext.form.Panel',

    xtype: 'inputlist',

    requires: [
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.input.*',
        'iAdmin.view.input.InputController'
    ],

    layout: 'fit',

    controller: 'input',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Insumos',
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

        Ext.create('iAdmin.store.input.Input');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'input',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome do Insumo',
                        dataIndex: 'name'
                    }, {
                        width: 180,
                        text: 'Fabricante',
                        dataIndex: 'manufacturername'
                    }, {
                        width: 140,
                        text: 'Fornecedor',
                        dataIndex: 'providername'
                    }, {
                        width: 120,
                        text: 'Unidade',
                        dataIndex: 'unitmeasurementname'
                    }, {
                        width: 100,
                        text: 'Ativo',
                        readOnly: true,
                        dataIndex: 'isactive',
                        align: 'center',
                        xtype: 'checkcolumn'
                    }, {
                        width: 40,
                        align: 'center',
                        xtype: 'actioncolumn',
                        handler: 'onViewEdit',
                        iconCls: "fa fa-pencil action-update-color",
                        tooltip: 'Editar cadastro!'
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
                            }, {
                                xtype: 'splitter'
                            }, {
                                xtype: 'button',
                                iconCls: "fa fa-file-o",
                                handler: 'insertViewNew',
                                tooltip: 'Novo cadastro!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'input',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});