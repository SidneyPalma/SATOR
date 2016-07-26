//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingOpen', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingopen',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.helper.place.PlaceSearch',
        'iAdmin.view.person.client.ClientSearch',
        'iAdmin.view.helper.flowing.FlowingSearch',
        'iAdmin.view.helper.instrumentator.InstrumentatorSearch'
    ],

    width: 650,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'flowprocessing',
    cls: 'panel-frame',
    iconCls: "fa fa-file-archive-o",

    title: 'Iniciar Nova Leitura',

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
                    allowBlank: false,
                    fieldCls: 'smart-field-style-action'
                },
                items: [
                    {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'sterilizationtypeid'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Identificação',
                        defaultType: 'textfield',
                        defaults: {
                            flex: 1,
                            allowBlank: false,
                            useReadColor: true
                            // fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                margin: '0 5 0 0',
                                fieldLabel: 'Usuário (operador)'
                            }, {
                                margin: '0 5 0 5',
                                fieldLabel: 'Estação (área CME)'
                            }, {
                                pageSize: 0,
                                margin: '0 0 0 5',
                                useReadColor: false,
                                fieldLabel: 'Origem (cliente)',
                                xtype: 'clientsearch'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Leitura',
                        defaultType: 'textfield',
                        defaults: {
                            flex: 1,
                            allowBlank: false
                            // fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                margin: '0 5 0 0',
                                fieldLabel: 'Material'
                            }, {
                                margin: '0 0 0 5',
                                useReadColor: true,
                                fieldLabel: 'Fluxo e prioridade'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'anchor',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Cirurgia',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            // disabled: true,
                            allowBlank: false
                            // fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    flex: 1,
                                    allowBlank: false
                                    // fieldCls: 'smart-field-style-action'
                                },
                                items: [
                                    {
                                        margin: '0 5 0 0',
                                        fieldLabel: 'Local (sala)',
                                        xtype: 'placesearch'
                                    }, {
                                        margin: '0 5 0 5',
                                        fieldLabel: 'Circulante',
                                        xtype: 'flowingsearch'
                                    }, {
                                        margin: '0 0 0 5',
                                        fieldLabel: 'Instrumentador',
                                        xtype: 'instrumentatorsearch'
                                    }
                                ]
                            }, {
                                fieldLabel: 'Paciente'
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
            text: 'Confirmar',
            showSmartTheme: 'red',
            handler: 'insertView'
        }, {
            scale: 'medium',
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});