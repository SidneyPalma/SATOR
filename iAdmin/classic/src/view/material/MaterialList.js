//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialList', {
    extend: 'Ext.form.Panel',

    xtype: 'materiallist',

    requires: [
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*',
        'iAdmin.view.material.MaterialController'
    ],

    layout: 'fit',

    controller: 'material',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Materiais',
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

        Ext.create('iAdmin.store.itembase.Material');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'material',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome do Material',
                        dataIndex: 'name'
                    }, {
                        flex: 2,
                        text: 'Descrição',
                        dataIndex: 'description'
                    }, {
                        readOnly: true,
                        text: 'Ativo',
                        dataIndex: 'isactive',
                        align: 'center',
                        width: 100,
                        xtype: 'checkcolumn'
                    }, {
                        width: 90,
                        text: 'Ações',
                        align: 'center',
                        xtype: 'actioncolumn',
                        items: [
                            {
                                handler: 'onViewEdit',
                                iconCls: "fa fa-pencil action-update-color",
                                tooltip: 'Editar cadastro!'
                            }
                        ]
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
                        store: 'material',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});