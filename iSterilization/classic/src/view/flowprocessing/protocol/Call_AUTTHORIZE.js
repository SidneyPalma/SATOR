//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_AUTTHORIZE', {
    extend: 'Ext.window.Window',

    xtype: 'call_AUTTHORIZE',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
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
                        text: 'Processos pendentes'
                    }, {
                        height: 20,
                        xtype: 'container'
                    }, {
                        xtype: 'label',
                        text: 'Exceções',
                        cls: 'sub-title-label'
                    }, {
                        height: 400,
                        margin: '10 0 0 0',
                        cls: 'update-grid',
                        xtype: 'gridpanel',
                        url: '../iSterilization/business/Calls/flowprocessingstepaction.php',

                        params: {
                            action: 'select',
                            method: 'actionStep'
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
                                name: 'flowstepaction',
                                type: 'auto'
                            }, {
                                name: 'isactive',
                                type: 'int'
                            }, {
                                name: 'dateof',
                                type: 'auto'
                            }, {
                                name: 'clientname',
                                type: 'auto'
                            }, {
                                name: 'timeof',
                                type: 'auto'
                            }, {
                                name: 'elementname',
                                type: 'auto'
                            }, {
                                name: 'originplace',
                                type: 'auto'
                            }
                        ],
                        columns: [
                            {
                                flex: 1,
                                sortable: false,
                                dataIndex: 'elementname'
                            }, {
                                width: 60,
                                align: 'center',
                                xtype: 'actioncolumn',
                                iconCls: "fa fa-check-circle action-checked-color-font"
                                // width: 120,
                                // xtype: 'widgetcolumn',
                                // widget: {
                                //     scale: 'medium',
                                //     xtype: 'button',
                                //     text: 'Autorizar',
                                //     showSmartTheme: 'blue'
                                // }
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
                click: 'setUnconformities'
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