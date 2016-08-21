//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_INFORMAR_INSUMOS', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_INFORMAR_INSUMOS',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.SearchInput',
        'iSterilization.view.flowprocessing.SearchElement',
        'iSterilization.view.flowprocessing.FlowProcessingInput',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 450,
    modal: true,
    layout: 'fit',
    header: false,
    resizable: false,
    showAnimate: true,

    controller: 'flowprocessing',

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
                plugins:'formenter',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    fieldCls: 'smart-field-style-action',
                    labelCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Lançar Insumos'
                    }, {
                        style: 'margin-top: 20px',
                        pageSize: 0,
                        fieldLabel: 'Equipamento / Sub-Area',
                        xtype: 'searchelement',
                        hiddenNameId: 'flowprocessingstepid',
                        listeners: {
                            showclear: 'onShowClearSearchElement',
                            beforequery: 'onBeforeSearchElement',
                            select: 'onSelectSearchElement'
                        }
                    }, {
                        pageSize: 0,
                        hideTrigger: true,
                        xtype: 'searchinput',
                        fieldLabel: 'Insumo',
                        hiddenNameId: 'inputpresentationid',
                        listeners: {
                            beforequery: 'onBeforeSearchInput',
                            select: 'onSelectSearchInput'
                        }
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            useReadColor: true,
                            fieldCls: 'smart-field-style-action',
                            labelCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'presentation'
                            }, {
                                flex: 3,
                                xtype: 'textfield',
                                name: 'presentationdescription',
                                fieldLabel: 'Apresentação'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 2,
                                minValue: 0,
                                hideTrigger: true,
                                xtype: 'numberfield',
                                name: 'quantity',
                                fieldLabel: 'Quantidade',
                                plugins: 'textmask',
                                mask: '0,000',
                                money: true,
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                            var view = field.up('window'),
                                                button = view.down('button[name=confirm]');

                                            button.fireEvent('click', button);
                                        }
                                    }
                                }
                            }
                        ]
                    }, {

                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '10 0 0 0',
                        defaults: {
                            useReadColor: true,
                            fieldCls: 'smart-field-style-action',
                            labelCls: 'smart-field-style-action'
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
                    }, {
                        height: 300,
                        hasDelete: true,
                        xtype: 'flowprocessinginput'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            scale: 'medium',
            name: 'confirm',
            text: 'Confirmar',
            showSmartTheme: 'green',
            listeners: {
                click: 'informarInsumo'
            }
        }, {
            scale: 'medium',
            text: 'Cancelar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});