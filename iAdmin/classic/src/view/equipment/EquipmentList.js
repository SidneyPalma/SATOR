//@charset UTF-8
Ext.define( 'iAdmin.view.equipment.EquipmentList', {
    extend: 'Ext.form.Panel',

    xtype: 'equipmentlist',

    requires: [
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*',
        'iAdmin.view.equipment.EquipmentController'
    ],

    layout: 'fit',

    controller: 'equipment',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Equipamentos',
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

        Ext.create('iAdmin.store.itembase.Equipment');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'equipment',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome do Equipamento',
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
                        store: 'equipment',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});