//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_PREPARA_LOTE_AVULSO', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_PREPARA_LOTE_AVULSO',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 350,
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
                // plugins:'formenter',
                bodyPadding: 10,
                layout: 'anchor',
                margin: '10 0 0 0',
                defaults: {
                    anchor: '100%',
                    fieldCls: 'smart-field-style-action'
                    // labelCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Prepara lote avulso'
                    }, {
                        margin: '20 0 0 0',
                        fieldLabel: 'Consulta',
                        xtype: 'textfield',
                        useUpperCase: true,
                        name: 'materialboxname',
                        listeners: {
                            specialkey: 'onReaderMaterialBoxLote'
                        }
                    }, {
                        height: 300,
                        xtype: 'gridpanel',
                        cls: 'update-grid',

                        // url: '../iSterilization/business/Calls/flowprocessing.php',
                        url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

                        params: {
                            action: 'select',
                            method: 'selectStep'
                        },

                        fields: [
                            {
                                name: 'id',
                                type: 'int'
                            }, {
                                name: 'barcode',
                                type: 'auto'
                            }, {
                                name: 'flowprocessingstepid',
                                type: 'int'
                            }, {
                                name: 'materialname',
                                type: 'auto'
                            }
                        ],

                        columns: [
                            {
                                dataIndex: 'materialname',
                                flex: 1
                            }, {
                                width: 60,
                                align: 'center',
                                sortable: false,
                                dataIndex: 'haspending',
                                xtype: 'actioncolumn',
                                handler: 'setDeleteChargeItem',
                                getTip: function(v, meta, rec) {
                                    return 'Remover material do menu!';
                                },
                                getClass: function(v, meta, rec) {
                                    return "fa fa-minus-circle action-delete-color-font";
                                }
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
            name: 'confirm',
            text: 'Confirmar',
            showSmartTheme: 'green',
            listeners: {
                click: 'setValidaCargaAreas'
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