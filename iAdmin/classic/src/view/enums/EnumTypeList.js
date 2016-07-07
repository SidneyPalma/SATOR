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
                cls: 'search-grid',
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
                        width: 40,
                        align: 'center',
                        renderer: function (value, meta, rec) {
                            return parseInt(rec.get('reserved')) ? '<div style="color: red; font-size: 20px;"><i class="fa fa-lock"></i></div>' : '';
                        }
                    }, {
                        xtype:'actioncolumn',
                        width: 50,
                        align: 'center',
                        handler: 'updateRecord',
                        iconCls: "fa fa-pencil action-update-color",
                        tooltip: 'Editar cadastro de enumeradores!'
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