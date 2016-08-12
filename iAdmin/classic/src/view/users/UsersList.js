//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersList', {
    extend: 'Ext.panel.Panel',

    xtype: 'userslist',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.users.Users'
    ],

    //frame: true,
    layout: 'fit',

    controller: 'users',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar usuários',
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

        Ext.create('iAdmin.store.users.Users');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'users',
                hideHeaders: false,
                headerBorders: false,
                cls: 'update-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome completo',
                        dataIndex: 'fullname'
                    }, {
                        flex: 1,
                        text: 'Usuário',
                        dataIndex: 'username'
                    }, {
                        flex: 1,
                        text: 'Email',
                        dataIndex: 'mainmail'
                    }, {
                        text: 'Nasceu',
                        dataIndex: 'birthdate',
                        align: 'center',
                        width: 100,
                        xtype: 'datecolumn'
                    }, {
                        xtype:'actioncolumn',
                        width: 40,
                        align: 'center',
                        iconCls: "fa fa-info-circle action-select-color-font",
                        tooltip: 'Editar cadastro de usuários!',
                        handler: 'onViewEdit'
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
                                tooltip: 'Novo cadastro de usuários!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'users',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});