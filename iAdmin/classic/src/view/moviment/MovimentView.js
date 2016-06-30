//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.MovimentView', {
    extend: 'Ext.form.Panel',

    xtype: 'movimentview',

    requires: [
        'Smart.plugins.*',
        'Ext.panel.Panel',
        'iAdmin.store.moviment.*',
        'iAdmin.view.input.InputSearch',
        'iAdmin.view.moviment.MovimentItem',
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
        afterrender: 'onAfterRenderView'
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
                        text: 'Movimento'
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
                                name: 'idformat'
                            }, {
                                fieldLabel: 'Data',
                                name: 'movimentdateformat'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'displayfield',
                        defaults: {
                            flex: 1,
                            fieldCls: 'sub-title-label'
                        },
                        items: [
                            {
                                fieldLabel: 'Tipo Movimento',
                                name: 'movimenttypedescription'
                            }, {
                                fieldLabel: 'Tipo Documento',
                                name: 'documenttypedescription'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'card',
                        name: 'moviment',
                        defaults: {
                            layout: 'anchor',
                            defaultType: 'textfield',
                            cls: "smart-background-transparent"
                        },
                        items: [
                            {
                                xtype: 'form',
                                plugins: [
                                    'formenter'
                                ],
                                name: 'movimententer',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        allowBlank: true,
                                        xtype: 'hiddenfield',
                                        name: 'id'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'movimentid'
                                    }, {
                                        allowBlank: false,
                                        xtype: 'inputsearch',
                                        fieldLabel: 'Insumo',
                                        hiddenNameId: 'inputid',
                                        name: 'inputname'
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            allowBlank: false
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
                                                xtype: 'textfield',
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
                                        defaults: {
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                flex: 3,
                                                xtype: 'textfield',
                                                margin: '0 5 0 0',
                                                name: 'lotpart',
                                                fieldLabel: 'Lote'
                                            }, {
                                                flex: 2,
                                                fieldLabel: 'Validade',
                                                margin: '0 0 0 5',
                                                name: 'datevalidity',
                                                allowBlank: false,
                                                xtype: 'datefield',
                                                plugins: 'textmask',
                                                listeners: {
                                                    specialkey: function (field, e, eOpts) {
                                                        if (e.getKey() === e.ENTER) {
                                                            var view = field.up('movimentview'),
                                                                button = view.down('button[name=update]');

                                                            field.blur();
                                                            button.fireEvent('click', button);
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                xtype: 'form',
                                plugins: [
                                    'formenter'
                                ],
                                name: 'movimentleave',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        allowBlank: true,
                                        xtype: 'hiddenfield',
                                        name: 'id'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'movimentid'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'cmeareasid'
                                    }, {
                                        useReadColor: true,
                                        name: 'cmeareasname',
                                        fieldLabel: 'Área CME',
                                        fieldCls: 'smart-field-style-action'
                                    }, {
                                        allowBlank: false,
                                        xtype: 'inputsearch',
                                        fieldLabel: 'Insumo',
                                        hiddenNameId: 'inputid',
                                        name: 'inputname'
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                flex: 2,
                                                margin: '0 5 0 0',
                                                xtype: 'textfield',
                                                name: 'quantity',
                                                fieldLabel: 'Quantidade',
                                                plugins: 'textmask',
                                                mask: '0,000',
                                                money: true
                                            }, {
                                                flex: 3,
                                                margin: '0 0 0 5',
                                                fieldCls: 'sub-title-label',
                                                xtype: 'displayfield',
                                                fieldLabel: 'Apresentação',
                                                name: 'presentationdescription',
                                                value: '...'
                                            }
                                        ]
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaultType: 'displayfield',
                                        defaults: {
                                            fieldCls: 'sub-title-label'
                                        },
                                        items: [
                                            {
                                                flex: 2,
                                                margin: '0 5 0 0',
                                                fieldLabel: 'Validade',
                                                name: 'datevalidity',
                                                value: '...'
                                            }, {
                                                flex: 3,
                                                margin: '0 0 0 5',
                                                name: 'lotpart',
                                                fieldLabel: 'Lote',
                                                value: '...'
                                            }
                                        ]
                                    }
                                ]
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
                                text: 'Salvar',
                                name: 'update',
                                listeners: {
                                    click: 'updateView'
                                }
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
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
                                        iconCls: "fa fa-print",
                                        handler: 'printerView'
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        iconCls: "fa fa-times-circle",
                                        handler: 'changeView',
                                        showSmartTheme: ''
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, {
                flex: 3,
                region: 'center',
                xtype: 'movimentitem',
                focusOnToFront: false,
                deferredRender: false
            }
        ];
    }

});


