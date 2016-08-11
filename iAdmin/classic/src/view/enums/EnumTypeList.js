//@charset UTF-8
Ext.define( 'iAdmin.view.enums.EnumTypeList', {
    extend: 'Ext.panel.Panel',

    xtype: 'enumtypelist',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.enums.EnumType'
    ],

    layout: 'fit',

    controller: 'enumtype',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Enumeradores',
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

        Ext.create('iAdmin.store.enums.EnumType');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'enumtype',
                hideHeaders: false,
                headerBorders: false,
                cls: 'update-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        text: 'Descrição',
                        dataIndex: 'description',
                        flex: 1
                    }, {
                        text: 'Nome',
                        dataIndex: 'name',
                        width: 250
                    }, {
                        width: 100,
                        align: 'center',
                        xtype: 'actioncolumn',
                        items: [
                            {
                                width: 40,
                                getClass: function(value, metaData, record, rowIndex, colIndex, store) {
                                    return parseInt(record.get('reserved')) == 1 ? "fa fa-cog action-checked-color-font" : '';
                                }
                            }, {
                                xtype: 'splitter'
                            }, {
                                width: 40,
                                handler: 'onViewEdit',
                                tooltip: 'Editar cadastro de enumeradores!',
                                iconCls: "fa fa-info-circle action-select-color-font"
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
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'enumtype',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});