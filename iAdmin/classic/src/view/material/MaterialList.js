//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialList', {
    extend: 'Ext.form.Panel',

    xtype: 'materiallist',

    requires: [
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.itembase.*',
        'iAdmin.view.box.MaterialBoxSearch',
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
                cls: 'update-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        width: 150,
                        sortable: false,
                        text: 'Código',
                        dataIndex: 'barcode'
                    }, {
                        flex: 1,
                        text: 'Nome do Material',
                        dataIndex: 'name'
                    }, {
                        width: 180,
                        text: 'Kit',
                        dataIndex: 'materialboxname'
                    }, {
                        width: 120,
                        text: 'Grupo',
                        dataIndex: 'itemgroupdescription'
                    }, {
                        width: 120,
                        text: 'Status',
                        dataIndex: 'materialstatusname'
                    }, {
                        width: 120,
                        text: 'Embalagem',
                        dataIndex: 'packingname'
                    }, {
                        width: 100,
                        text: 'Ativo',
                        align: 'center',
                        xtype: 'actioncolumn',
                        items: [
                            {
                                getClass: function(value, metaData, record, rowIndex, colIndex, store) {
                                    return parseInt(record.get('isactive')) == 1 ? "fa fa-check-circle action-checked-color-font" : '';
                                }
                            }
                        ]
                    }, {
                        width: 40,
                        align: 'center',
                        xtype: 'actioncolumn',
                        handler: 'onViewEdit',
                        iconCls: "fa fa-info-circle action-select-color-font",
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
                                showFetch: true,
                                margin: '0 10 0 0'
                            }, {
                                width: 250,
                                showClear: true,
                                xtype: 'materialboxsearch',
                                listeners: {
                                    showclear: 'showClear',
                                    select: 'onSelectMaterialBox'
                                }
                            }, {
                                margin: '0 0 0 10',
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