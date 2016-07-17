//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeEdit', {
    extend: 'Ext.window.Window',

    xtype: 'sterilizationtypeedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iAdmin.store.sterilizationtype.*'
    ],

    constrain: true,

    width: 450,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'sterilizationtype',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Fluxo',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false
                },
                items: [
                    {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                    //     allowBlank: true,
                    //     xtype: 'hiddenfield',
                    //     name: 'graphpaper'
                    // }, {
                        useReadColor: true,
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        xtype: 'textareafield',
                        name: 'description',
                        fieldLabel: 'Descrição'
                    }, {
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
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});
