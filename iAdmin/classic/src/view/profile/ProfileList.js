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
                cls: 'update-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        flex: 1,
                        text: 'Nome do Perfil',
                        dataIndex: 'name'
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
                        width: 100,
                        text: 'Ações',
                        align: 'center',
                        xtype: 'actioncolumn',
                        items: [
                            {
                                handler: 'onProfileUpdate',
                                iconCls: "fa fa-info-circle action-select-color-font",
                                tooltip: 'Editar cadastro de Perfis!'
                            }, {
                                disabled: true,
                                xtype: 'splitter'
                            }, {
                                handler: 'onProfileUpdateMenuTree',
                                iconCls: "fa fa-share-alt action-update-color-font",
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