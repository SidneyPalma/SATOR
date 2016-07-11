//@charset UTF-8
Ext.define( 'iAdmin.view.profile.ProfileMenuEdit', {
    extend: 'Ext.window.Window',

    xtype: 'profilemenuedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.profile.ProfileMenu',
        'iAdmin.view.profile.ProfileController'
    ],

    width: 950,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'profile',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Menus do Perfil',

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

        Ext.create('iAdmin.store.profile.ProfileMenu');

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
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel : 'Perfil',
                        labelCls: 'sub-title-label',
                        items: [
                            {
                                flex: 1,
                                margin: '0 5 0 0',
                                name: 'name',
                                xtype: 'textfield',
                                useReadColor: true,
                                fieldLabel: 'Nome'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'anchor',
                        name: 'menutree',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'sub-title-label',
                                text: 'Menus do Perfil'
                            }, {
                                xtype: 'profilemenu',
                                name: 'profilemenu',
                                height: 380
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
            scope: this,
            scale: 'large',
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});