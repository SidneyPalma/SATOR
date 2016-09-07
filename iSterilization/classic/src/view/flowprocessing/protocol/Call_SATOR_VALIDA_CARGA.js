//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_VALIDA_CARGA', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_VALIDA_CARGA',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.SearchCycle',
        'iSterilization.view.flowprocessing.SearchEquipment',
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
                plugins:'formenter',
                bodyPadding: 10,
                layout: 'anchor',
                margin: '10 0 0 0',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    fieldCls: 'smart-field-style-action'
                    // labelCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Validar Carga'
                    }, {
                        margin: '20 0 0 0',
                        showClear: true,
                        useUpperCase: true,
                        fieldLabel: 'Equipamento',
                        xtype: 'searchequipment',
                        hiddenNameId: 'equipmentid',
                        name: 'equipmentname',
                        listeners: {
                            select: 'onSelectEquipment',
                            showclear: 'onShowClearEquipment',
                            beforequery: 'onBeforeQueryEquipment'
                        }
                    }, {
                        useReadColor: true,
                        fieldLabel: 'Ciclo',
                        hiddenNameId: 'equipmentcycleid',
                        xtype: 'searchcycle',
                        listeners: {
                            select: 'onSelectCycle',
                            showclear: 'onShowClearCycle',
                            beforequery: 'onBeforeQueryCycle'
                        }
                    }, {
                        height: 250,
                        xtype: 'gridpanel',
                        cls: 'update-grid',

                        url: '../iSterilization/business/Calls/flowprocessing.php',

                        params: {
                            action: 'select',
                            method: 'selectCycle'
                        },

                        fields: [
                            {
                                name: 'id',
                                type: 'int'
                            }, {
                                name: 'elementname',
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
                                handler: 'setAuthorize',
                                getTip: function(v, meta, rec) {
                                    return rec.data.haspending ? 'Cancelar ação!' : 'Autorizar quebra de fluxo!';
                                },
                                getClass: function(v, meta, rec) {
                                    return rec.data.haspending ? "fa fa-thumbs-up action-insert-color-font" : "fa fa-hand-paper-o action-delete-color-font";
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
            showSmartTheme: 'green'
            // listeners: {
            //     click: 'relatarUsaEPI'
            // }
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