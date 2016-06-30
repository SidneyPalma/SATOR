//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.MovimentNew', {
    extend: 'Ext.window.Window',

    xtype: 'movimentnew',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.helper.areas.CMEAreasSearch',
        'iAdmin.view.moviment.MovimentController'
    ],

    width: 550,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'moviment',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Novo Movimento',

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
                plugins: [
                    'formenter'
                ],
                defaults: { anchor: '100%' },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        columns: 2,
                        vertical: false,
                        xtype: 'radiogroup',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Tipo de Movimento',
                        items: [
                            { boxLabel: 'Entrada', name: 'movimenttype', inputValue: 'E', checked: true },
                            { boxLabel: 'Saída', name: 'movimenttype', inputValue: 'S' }
                        ],
                        listeners: {
                            change: 'onMovimentTypeChange'
                        }
                    }, {
                        disabled: true,
                        allowBlank: false,
                        name: 'cmeareasname',
                        hiddenNameId: 'cmeareasid',
                        fieldLabel: 'Área CME',
                        xtype: 'cmeareassearch'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 3,
                                showClear: true,
                                queryFilter: 'E',
                                margin: '0 5 0 0',
                                xtype: 'comboenum',
                                fieldLabel: 'Tipo de documento',
                                name: 'documenttypedescription'
                            }, {
                                flex: 2,
                                fieldLabel: 'Numero',
                                margin: '0 5 0 5',
                                name: 'documentnumber',
                                xtype: 'textfield'
                            }, {
                                flex: 2,
                                fieldLabel: 'Data',
                                margin: '0 0 0 5',
                                name: 'datevalidity',
                                xtype: 'datefield',
                                plugins: 'textmask'
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
            iconCls: "fa fa-upload",
            text: 'Confirmar',
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