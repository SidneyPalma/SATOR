//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.MovimentView', {
    extend: 'Ext.form.Panel',

    xtype: 'movimentview',

    requires: [
        'Smart.plugins.*',
        'Ext.panel.Panel',
        'iAdmin.store.moviment.*',
        'iAdmin.view.input.InputSearch',
        'iAdmin.view.moviment.MovimentController'
    ],

    layout: 'border',

    controller: 'moviment',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-stack-overflow",
    showSmartAnimate: true,

    header: {
        title: 'Movimentar insumos',
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
        // afterrender: 'onAfterRenderView'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.moviment.Moviment');

        me.items = [
            {
                flex: 1,
                split: true,
                xtype: 'form',
                region: 'west',
                scrollable: 'y',
                cls: "smart-background-transparent",
                plugins: [
                    'formenter',
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
                    fieldCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Movimento: Entrada'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'displayfield',
                        defaults: {
                            flex: 1,
                            fieldCls: 'sub-title-label'
                        },
                        items: [
                            {
                                fieldLabel: 'Código',
                                name: 'id',
                                value: '0000'
                            }, {
                                fieldLabel: 'Data',
                                name: 'movimentdate',
                                value: '27/06/2016'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'displayfield',
                        defaults: {
                            flex: 1,
                            fieldCls: 'sub-title-label'
                        },
                        items: [
                            {
                                fieldLabel: 'Tipo Movimento',
                                name: 'movimenttype',
                                value: 'Entrada'
                            }, {
                                fieldLabel: 'Tipo Documento',
                                name: 'documenttype',
                                value: '1906549 - NF'
                            }
                        ]
                    }, {
                        allowBlank: false,
                        xtype: 'inputsearch',
                        fieldLabel: 'Insumo',
                        hiddenNameId: 'inputid',
                        name: 'inputname'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            allowBlank: false,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 3,
                                margin: '0 5 0 0',
                                xtype: 'comboenum',
                                fieldLabel: 'Apresentação',
                                name: 'presentationdescription'
                            }, {
                                flex: 2,
                                margin: '0 0 0 5',
                                name: 'quantity',
                                fieldLabel: 'Quantidade',
                                plugins: 'textmask',
                                mask: '0,000',
                                money: true
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 3,
                                margin: '0 5 0 0',
                                name: 'lotpart',
                                fieldLabel: 'Lote'
                            }, {
                                flex: 2,
                                fieldLabel: 'Validade',
                                margin: '0 0 0 5',
                                name: 'datevalidity',
                                allowBlank: true,
                                xtype: 'datefield',
                                plugins: 'textmask'
                            }
                        ]
                    }, {
                        margin: '20 0 0 0',
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'button',
                        defaults: {
                            scale: 'large',
                            showSmartTheme: 'red',
                            style: 'font-size: 20px;'
                        },
                        items: [
                            {
                                flex: 1,
                                iconCls: "fa fa-upload",
                                text: 'Salvar'
                                //handler: 'updateView'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                iconCls: "fa fa-upload",
                                text: 'Imprimir'
                                //handler: 'updateView'
                            }
                        ]
                    }
                ]
            }, {
                flex: 3,
                xtype: 'panel',
                region: 'center',
                focusOnToFront: false,
                deferredRender: false
            }
        ];
    }

});


