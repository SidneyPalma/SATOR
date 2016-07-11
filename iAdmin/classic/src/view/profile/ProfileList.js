//@charset UTF-8
Ext.define( 'iAdmin.view.profile.ProfileList', {
    extend: 'Ext.panel.Panel',

    xtype: 'profilelist',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.profile.*',
        'iAdmin.view.profile.ProfileController'
    ],

    layout: 'fit',

    controller: 'profile',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Perfis de Acesso',
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

        Ext.create('iAdmin.store.profile.Profile');
        Ext.create('iAdmin.store.profile.ProfileMenuTree');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'profile',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome do Perfil',
                        dataIndex: 'name'
                    }, {
                        readOnly: true,
                        text: 'Ativo',
                        dataIndex: 'isactive',
                        align: 'center',
                        width: 100,
                        xtype: 'checkcolumn'
                    }, {
                        width: 110,
                        text: 'Ações',
                        align: 'center',
                        xtype: 'actioncolumn',
                        items: [
                            {
                                handler: 'onProfileUpdate',
                                iconCls: "fa fa-pencil action-update-color",
                                tooltip: 'Editar cadastro de Perfis!'
                            }, {
                                disabled: true,
                                xtype: 'splitter'
                            }, {
                                handler: 'onProfileUpdateMenuTree',
                                iconCls: "fa fa-bars action-select-color",
                                tooltip: 'Editar menus do perfil!'
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
                                tooltip: 'Novo cadastro de Perfil!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'profile',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});