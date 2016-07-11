//@charset UTF-8
Ext.define( 'Smart.ux.login.LoginInvite', {
    extend: 'Ext.form.Panel',

    xtype: 'logininvite',

    layout: 'anchor',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.VTypes',
        'Smart.plugins.FormEnter'
    ],

    defaults: {
        anchor: '100%'
    },

    plugins:'formenter',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'label',
                text: 'Convite ...',
                style: {
                    fontSize: '46px;',
                    display: 'table-cell;',
                    textAlign: 'center;',
                    lineHeight: '50px;'
                }
            }, {
                height: 20,
                xtype: 'container'
            }, {
                xtype: 'fieldcontainer',
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    fieldCls: 'smart-field-style-login'
                },
                items: [
                    {
                        name: 'username',
                        fieldLabel: 'Nome do usuário'
                    }, {
                        name: 'invitate',
                        fieldLabel: 'Convite',
                        inputType: 'password'
                    }, {
                        name: 'password',
                        vtype: 'alphanum',
                        inputType: 'password',
                        fieldLabel: 'Senha',
                        listeners: {
                            specialkey: function (field, e, eOpts) {
                                if (e.getKey() === e.ENTER) {
                                    var button = field.up('form').down('button');
                                    button.fireEvent('click', button);
                                }
                            }
                        }
                    }
                ]
            }
        ];
    },

    dockedItems: [
        {
            xtype: 'panel',
            dock: 'bottom',
            layout: 'anchor',
            bodyStyle: 'padding-top: 20px;',
            style: {
                borderTop: 'dotted 1px #cecece'
            },
            defaultType: 'button',
            defaults: {
                anchor: '100%',
                scale: 'large'
            },
            items: [
                {
                    xtype: 'container'
                }, {
                    text: 'Enviar',
                    formBind: true,
                    showSmartTheme: 'green',
                    listeners: {
                        click: 'onInviteSend'
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'label',
                    text: 'Esqueci minha senha!',
                    listeners: {
                        click: 'onForgotGoView'
                    },
                    style: {
                        cursor: 'pointer;',
                        textDecoration: 'underline;'
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'label',
                    text: 'Login de acesso!',
                    listeners: {
                        click: 'onComeInGoView'
                    },
                    style: {
                        cursor: 'pointer;',
                        textDecoration: 'underline;'
                    }
                }
            ]
        }
    ]

});