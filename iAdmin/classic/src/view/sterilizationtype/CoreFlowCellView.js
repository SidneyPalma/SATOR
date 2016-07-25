//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.CoreFlowCellView', {
    extend: 'Ext.window.Window',

    xtype: 'coreflowcellview',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'iAdmin.store.sterilizationtype.*',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.input.InputPresentationSearch',
        'iSterilization.view.service.ServiceTypeSearch',
        'iAdmin.view.sterilizationtype.SterilizationTypeController'
    ],

    width: 450,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'sterilizationtype',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Etapa',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.sterilizationtype.SterilizationTypeFlag');

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
                        xtype: 'hiddenfield',
                        name: 'type'
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel : 'Etapa',
                        labelCls: 'sub-title-label',
                        defaultType: 'textfield',
                        defaults: {
                            useReadColor: true,
                            fieldStyle: { fontSize: '16px;' }
                        },
                        items: [
                            {
                                flex: 4,
                                name: 'name',
                                fieldLabel: 'Nome'
                            }, {
                                flex: 1,
                                margin: '0 0 0 10',
                                name: 'steplevel',
                                fieldLabel: 'Nível'
                            }
                        ]
                    }, {
                        useMondaFont: true,
                        xtype: 'textareafield',
                        fieldLabel: 'Descrição',
                        name: 'description',
                        useReadColor: true,
                        fieldStyle: {
                            fontSize: '16px;'
                        }
                    }, {
                        height: 350,
                        xtype: 'tabpanel',
                        items: [
                            {
                                title: 'Parametros',
                                xtype: 'form',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        pageSize: 0,
                                        hiddenNameId: 'inputpresentationid',
                                        fieldLabel: 'Teste Ativação Insumo Obrigatório',
                                        xtype: 'inputpresentationsearch'
                                    }, {
                                        pageSize: 0,
                                        showClear: true,
                                        hiddenNameId: 'servicetypeequipment',
                                        fieldLabel: 'Teste Indicador Obrigatório',
                                        xtype: 'servicetypesearch',
                                        listeners: {
                                            beforequery: 'onBeforeQueryService'
                                        }
                                    }, {
                                        pageSize: 0,
                                        showClear: true,
                                        hiddenNameId: 'servicetypeareas',
                                        fieldLabel: 'Registrar Temperatura/Umidade da Área',
                                        xtype: 'servicetypesearch',
                                        listeners: {
                                            beforequery: 'onBeforeQueryService'
                                        }
                                    }, {
                                        xtype: 'comboenum',
                                        hiddenNameId: 'tagprinter',
                                        fieldLabel: 'Libera Impressão de Etiqueta',
                                        name: 'tagprinterdescription'
                                    }
                                ]
                            }, {
                                title: 'Gerais',
                                xtype: 'gridpanel',
                                store: 'sterilizationtypeflag',
                                rowLines: false,
                                hideHeaders: true,
                                headerBorders: false,
                                columns: [
                                    {
                                        width: 30,
                                        align: 'center',
                                        dataIndex: 'isactive',
                                        xtype: 'checkcolumn'
                                    }, {
                                        flex: 1,
                                        text: 'Configurações',
                                        dataIndex: 'description'
                                    }
                                ]
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
            text: 'Salvar',
            iconCls: "fa fa-upload",
            showSmartTheme: 'red',
            handler: 'updateCell'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});