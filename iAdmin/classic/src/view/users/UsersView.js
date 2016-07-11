//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersView', {
    extend: 'Ext.panel.Panel',

    xtype: 'usersview',

    requires: [
        'Ext.tab.*',
        'Ext.panel.Panel',
        'Smart.form.Portrait',
        'iAdmin.store.users.*',
        'Smart.plugins.SmartRegion'
    ],

    layout: 'border',

    controller: 'users',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Manutenção do cadastro',
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
        afterrender: 'onAfterRenderView'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.users.UsersMenu');
        Ext.create('iAdmin.store.users.UsersProfile');
        Ext.create('iAdmin.store.users.UsersMenuTree');
        Ext.create('iAdmin.store.users.UsersMenuAction');

        me.items = [
            {
                flex: 1,
                split: true,
                xtype: 'form',
                region: 'west',
                scrollable: 'y',
                cls: "smart-background-transparent",
                plugins: [
                    'smartregion'
                ],
                responsiveConfig: {
                    'width >= 200': {
                        region: 'west',
                        flex: 1
                    }
                },
                smartregionConfig: {
                    source: 'west',
                    target: 'north',
                    width: 200,
                    flex: 3
                },
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    useLabelBold: true
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Cadastro do Usuário'
                    }, {
                        xtype: 'container',
                        margin: '20 0 0 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                flex: 1,
                                xtype: 'container'
                            }, {
                                flex: 2,
                                height: 200,
                                xtype: 'portrait',
                                tableName: 'users'
                            }, {
                                flex: 1,
                                xtype: 'container'
                            }
                        ]
                    }, {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        anchor: '50%',
                        useReadColor: false,
                        fieldLabel: 'Usuário',
                        name: 'username'
                    }, {
                        fieldLabel: 'Nome completo',
                        name: 'fullname'
                    }, {
                        vtype: 'email',
                        name: 'mainmail',
                        fieldLabel: 'E-mail principal'
                    }, {
                        anchor: '50%',
                        name: 'birthdate',
                        xtype: 'datefield',
                        plugins: 'textmask',
                        fieldLabel: 'Nascimento'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                name: 'isactive',
                                xtype: 'checkboxfield',
                                boxLabel: 'Ativo'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                name: 'notifyuser',
                                xtype: 'checkboxfield',
                                boxLabel: 'Recebe notificações'
                            }
                        ]
                    }, {
                        margin: '20 0 0 0',
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'button',
                        defaults: {
                            scale: 'large',
                            showSmartTheme: 'red'
                        },
                        items: [
                            {
                                flex: 1,
                                iconCls: "fa fa-upload",
                                text: 'Salvar',
                                handler: 'updateView'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                iconCls: "fa fa-file-o",
                                text: 'Novo',
                                handler: 'insertView'
                            }
                        ]
                    }
                ]
            }, {
                flex: 3,
                plain: true,
                region: 'center',
                xtype: 'tabpanel',
                focusOnToFront: false,
                deferredRender: false,
                items: [
                    {
                        tabIndex: 0,
                        xtype: 'usersmenu',
                        cls: 'list-grid',
                        iconCls: "fa fa-list-ol",
                        title: 'Menus de Acesso'
                    }, {
                        tabIndex: 1,
                        xtype: 'usersprofile',
                        cls: 'list-grid',
                        iconCls: "fa fa-th-list",
                        title: 'Grupo de Acesso'
                    }
                ],
                listeners: {
                    tabchange: 'onTabChange'
                }
            }
        ];
    }

});


