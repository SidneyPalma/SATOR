//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_INFORMAR_INSUMOS', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_INFORMAR_INSUMOS',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iAdmin.view.input.InputSearch',
        'iAdmin.view.input.InputPresentationSearch',
        'iSterilization.view.flowprocessing.FlowProcessingInput',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 400,
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
                        pageSize: 0,
                        margin: '20 0 0 0',
                        fieldLabel: 'Equipamento / Sub-Area',
                        xtype: 'searchelement',
                        listeners: {
                            beforequery: 'onBeforeSearchElement',
                            select: function () {
                                var me = this,
                                    button = me.up('window').down('button[name=confirm]');
                                button.fireEvent('click', button);
                            }
                        }
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            allowBlank: false,
                            fieldCls: 'smart-field-style-action',
                            labelCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 3,
                                pageSize: 0,
                                margin: '0 5 0 0',
                                xtype: 'inputpresentationsearch',
                                fieldLabel: 'Insumo',
                                hiddenNameId: 'presentation',
                                name: 'presentationdescription'
                                // listeners: {
                                //     beforequery: 'onBeforeQueryInputPresentation'
                                // }
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
                        height: 300,
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
                // click: 'relatarUsaEPI'
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