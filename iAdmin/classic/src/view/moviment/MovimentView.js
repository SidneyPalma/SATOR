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
        'iAdmin.view.moviment.InputEnterSearch',
        'iAdmin.view.moviment.MovimentController',
        'iAdmin.view.moviment.InputPresentationSearch'
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
                                        xtype: 'inputentersearch',
                                        fieldLabel: 'Insumo',
                                        hiddenNameId: 'inputid',
                                        name: 'inputname',
                                        listeners: {
                                            showclear: 'onShowClearEnter',
                                            select: 'onInputEnterSelect'
                                        }
                                    }, {
                                        xtype: 'container',
                                        layout: 'anchor',
                                        defaults: {
                                            anchor: '100%',
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                xtype: 'inputpresentationsearch',
                                                fieldLabel: 'Apresentação',
                                                hiddenNameId: 'presentation',
                                                name: 'presentationdescription',
                                                listeners: {
                                                    beforequery: 'onBeforeQueryInputPresentation'
                                                }
                                            }, {
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
                                        xtype: 'hiddenfield',
                                        name: 'presentation'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'datevalidity'
                                    }, {
                                        xtype: 'hiddenfield',
                                        name: 'lotpart'
                                    }, {
                                        useReadColor: true,
                                        name: 'cmeareasname',
                                        fieldLabel: 'Área CME',
                                        fieldCls: 'smart-field-style-action'
                                    }, {
                                        allowBlank: false,
                                        xtype: 'inputleavesearch',
                                        fieldLabel: 'Insumo',
                                        hiddenNameId: 'inputid',
                                        name: 'inputname',
                                        listeners: {
                                            showclear: 'onShowClearLeave',
                                            select: 'onInputLeaveSelect'
                                        }
                                    }, {
                                        xtype: 'container',
                                        layout: 'anchor',
                                        defaults: {
                                            anchor: '100%',
                                            allowBlank: false
                                        },
                                        items: [
                                            {
                                                xtype: 'numberfield',
                                                name: 'quantity',
                                                fieldLabel: 'Quantidade',
                                                plugins: 'textmask',
                                                mask: '0,000',
                                                money: true
                                            }, {
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
                                                name: 'clonedatevalidity',
                                                value: '...'
                                            }, {
                                                flex: 3,
                                                margin: '0 0 0 5',
                                                name: 'clonelotpart',
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
                        name: 'tools',
                        layout: 'hbox',
                        defaultType: 'button',
                        defaults: {
                            scale: 'large',
                            showSmartTheme: 'red',
                            style: 'font-size: 20px;'
                        },
                        items: [
                            {
                                flex: 2,
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
                                iconCls: "fa fa-print",
                                handler: 'printerView'
                            }, {
                                flex: 1,
                                name: 'change',
                                iconCls: "fa fa-times-circle",
                                handler: 'changeView',
                                showSmartTheme: ''
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


