//@charset UTF-8
Ext.define( 'iAdmin.view.profile.ProfileEdit', {
    extend: 'Ext.window.Window',

    xtype: 'profileedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.profile.ProfileController'
    ],

    width: 450,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'profile',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Perfil',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, rec) {
                return isNaN(rec.data.id);
            };

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
                                margin: '0 5 0 0',
                                flex: 1,
                                xtype: 'textfield',
                                name: 'name',
                                fieldLabel: 'Nome'
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
                        flex: 1,
                        name: 'isactive',
                        xtype: 'checkboxfield',
                        boxLabel: 'Ativo'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            iconCls: "fa fa-upload",
            text: 'Salvar',
            showSmartTheme: 'red',
            handler: 'updateView'
        }, {
            iconCls: "fa fa-file-o",
            text: 'Novo',
            showSmartTheme: 'red',
            handler: 'insertView'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});