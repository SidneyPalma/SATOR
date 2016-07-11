//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleEdit', {
    extend: 'Ext.window.Window',

    xtype: 'moduleedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.Portrait',
        'iAdmin.store.module.*',
        'Ext.layout.container.HBox',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.module.ModuleSearch',
        'iAdmin.view.module.ModuleController'
    ],

    constrain: true,

    width: 550,
    resizable: false,
    showAnimate: true,
    layout: 'anchor',
    controller: 'module',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar modulo',

    defaults: {
        anchor: '100%'
    },

    listeners: {
        show: 'onLoadTree'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.module.Module');
        Ext.create('iAdmin.store.module.ModuleMenu');
        Ext.create('iAdmin.store.module.ModuleMenuTree');

        me.items = [
            {
                height: 261,
                xtype: 'form',
                bodyPadding: 10,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        flex: 3,
                        xtype: 'panel',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%',
                            allowBlank: false
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'id'
                            }, {
                                xtype: 'label',
                                cls: 'sub-title-label',
                                text: 'Módulo'
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                defaults: {
                                    allowBlank: false
                                },
                                items: [
                                    {
                                        flex: 1,
                                        name: 'name',
                                        useReadColor: true,
                                        xtype: 'textfield',
                                        fieldLabel: 'Nome'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        name: 'legalname',
                                        xtype: 'textfield',
                                        fieldLabel: 'Nome Legal'
                                    }
                                ]
                            }, {
                                useMondaFont: true,
                                xtype: 'textareafield',
                                fieldLabel: 'Observações',
                                name: 'observation',
                                fieldStyle: {
                                    color: '#C02942;',
                                    fontSize: '14px;'
                                }
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
                                        xtype: 'displayfield',
                                        name: 'modulebuild'
                                    }
                                ]
                            }
                        ]
                    }, {
                        xtype: 'splitter'
                    }, {
                        flex: 1,
                        height: 200,
                        xtype: 'portrait',
                        tableName: 'module'
                    }
                ]
            }, {
                xtype: 'label',
                margin: '0 0 0 10',
                cls: 'sub-title-label',
                text: 'Menus'
            }, {
                xtype: 'modulemenu',
                height: 380
            }
        ]
    },

    dockedItems: [
        {
            xtype: 'panel',
            layout: 'hbox',
            bodyPadding: 10,
            bodyStyle: 'background-color: rgba(208, 208, 208, .5);',
            items: [
                {
                    flex: 1,
                    xtype: 'modulesearch',
                    name: 'search',
                    listeners: {
                        select: 'onSelectRecord'
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'segmentedbutton',
                    allowMultiple: true,
                    defaults: {
                        disabled: true,
                        showSmartTheme: 'red'
                    },
                    items: [
                        {
                            disabled: true,
                            iconCls: "fa fa-upload",
                            handler: 'updateView',
                            showSmartTheme: ''
                        }, {
                            iconCls: "fa fa-plus-circle",
                            text: 'Menu',
                            actionType: 'atMn',
                            handler: 'showInsertMenu'
                        }, {
                            iconCls: "fa fa-plus-circle",
                            text: 'Grupo',
                            actionType: 'atGr',
                            handler: 'showInsertMenu'
                        }
                    ]
                }
            ]
        }
    ]

});
