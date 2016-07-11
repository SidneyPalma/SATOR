//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleMenuEdit', {
    extend: 'Ext.window.Window',

    xtype: 'modulemenuedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.Portrait',
        'Smart.plugins.TextMask',
        'Ext.layout.container.HBox',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.module.ModuleMenuSearch',
        'iAdmin.view.module.ModuleController',
        'iAdmin.view.module.ModuleMenuGroupSearch'
    ],

    width: 350,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'module',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    actionType: 'atMn',

    title: 'Criar menu',

    listeners: {
        destroy: 'onLoadTree'
    },

    initComponent: function () {
        var me = this;

        me.buildItems();
        me.callParent();
        me.setTitle('Editar ' + (me.actionType == 'atMn' ? 'menu' : 'grupo'));
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'sub-title-label',
                        text: 'Estrutura'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        allowBlank: false,
                        xtype: 'hiddenfield',
                        name: 'moduleid'
                    }, {
                        name: 'name',
                        hiddenNameId: 'parentid',
                        xtype: 'modulemenugroupsearch',
                        pageSize: 0,
                        showClear: true,
                        editable: ( me.actionType == 'atGr'),
                        allowBlank: ( me.actionType == 'atMn' ),
                        listeners: {
                            beforequery: 'onBeforeQuery'
                        }
                    }, {
                        name: 'menuname',
                        hiddenNameId: 'menuid',
                        xtype: 'modulemenusearch',
                        pageSize: 0,
                        showClear: true,
                        editable: ( me.actionType == 'atMn'),
                        allowBlank: ( me.actionType == 'atGr' ),
                        useReadColor: ( me.actionType == 'atGr' ),
                        listeners: {
                            beforequery: 'onBeforeQuery'
                        }
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                allowBlank: false,
                                anchor: '30%',
                                name: 'orderby',
                                xtype: 'numberfield',
                                fieldLabel: 'Posição',
                                minValue: 0,
                                maxValue: 99,
                                hideTrigger: true,
                                plugins: 'textmask',
                                mask: '0.00',
                                money: true
                            }, {
                                flex: 3,
                                margin: '0 0 0 10',
                                fieldLabel: 'Ícone',
                                name: 'glyph',
                                xtype: 'combobox',
                                pageSize: 0,
                                showClear: true,
                                editable: false,
                                allowBlank: ( me.actionType == 'atMn' ),
                                useReadColor: ( me.actionType == 'atMn' ),
                                valueField: 'glyph',
                                displayField: 'glyphdescription',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    fields: ['glyph', 'glyphdescription'],
                                    data: [
                                        ['fa fa-random', 'fa fa-random'],
                                        ['fa fa-comment', 'fa fa-comment'],
                                        ['fa fa-retweet', 'fa fa-retweet'],
                                        ['fa fa-list-alt', 'fa fa-list-alt'],
                                        ['fa fa-puzzle-piece', 'fa fa-puzzle-piece'],
                                        ['fa fa-shopping-cart', 'fa fa-shopping-cart']
                                    ]
                                })
                            }
                        ]
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            scale: 'medium',
            iconCls: "fa fa-upload",
            text: 'Salvar',
            showSmartTheme: 'red',
            handler: 'updateModuleMenu'
        }, {
            scale: 'medium',
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: 'closedView'
        }
    ]

});
