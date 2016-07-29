//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingDash', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessingdash',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'Ext.picker.Date',
        'Ext.grid.column.*',
        'Ext.button.Segmented',
        'iSterilization.store.flowprocessing.*',
        // 'iAdmin.view.material.MaterialSearch',
        // 'iAdmin.view.equipment.EquipmentSearch',
        // 'iAdmin.view.box.MaterialBoxItemSearch',
        // 'iAdmin.view.helper.areas.CMEAreasSearch',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    layout: 'border',

    // layout: {
    //     type: 'hbox'
    //     // align: 'stretch'
    // },

    controller: 'flowprocessing',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-smile-o",
    showSmartAnimate: true,

    header: {
        title: 'Rastrear Leituras',
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
        // keydown: 'onKeyDownDash',
        afterrender: 'onAfterRenderDash'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSterilization.store.flowprocessing.FlowProcessing');

        me.items = [
            {
                split: true,
                width: 320,
                region: 'west',
                xtype: 'panel',
                scrollable: 'y',
                cls: "smart-background-transparent",
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Leituras do Dia'
                    }, {
                        margin: '10 0 0 0',
                        startDay: 0,
                        border: false,
                        cls: 'sator',
                        xtype: 'datepicker',
                        listeners: {
                            select: 'selectDatePicker'
                        }
                    }, {
                        xtype: 'segmentedbutton',
                        vertical: true,
                        allowToggle: false,
                        defaults: {
                            height: 44,
                            scale: 'large',
                            iconAlign: 'left',
                            textAlign: 'center',
                            showSmartTheme: 'green'
                        },
                        items: [
                            {
                                text: 'Iniciar Nova Leitura',
                                handler: 'flowProcessingOpen'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        margin: '10 0 0 0',
                        layout: 'anchor',
                        fieldLabel: 'Filtros',
                        labelCls: 'sub-title-label',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                            {
                                fieldLabel: 'Kit',
                                name: 'materialbox'
                                // xtype: 'materialboxitemsearch'
                            }, {
                                fieldLabel: 'Área/Sub-Area'
                                // xtype: 'cmeareassearch'
                            }, {
                                fieldLabel: 'Material'
                                // xtype: 'materialsearch'
                            }, {
                                fieldLabel: 'Equipamento'
                                // xtype: 'equipmentsearch'
                                // }, {
                                //     fieldLabel: 'Usuário',
                                //     xtype: 'userssearch'
                            }
                        ]
                    }
                ]
            }, {
                // flex: 1,
                region: 'center',
                xtype: 'container',
                layout: {
                    type: 'vbox'
                },
                defaults: {
                    width: '100%'
                },
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                xtype: 'label',
                                cls: 'title-label title-label-bold',
                                text: '...',
                                name: 'labelperiod'
                            }, {
                                width: 150,
                                pageSize: 0,
                                xtype: 'combobox',
                                editable: false,
                                name: 'traceability',
                                displayField: 'traceability_name',
                                valueField: 'traceability_type',
                                store: {
                                    fields: [ 'traceability_type','traceability_name' ],
                                    data: [
                                        { traceability_type: 0, traceability_name: 'Processos' },
                                        { traceability_type: 1, traceability_name: 'Registros' }
                                    ]
                                },
                                listeners: {
                                    select: 'selectTraceability'
                                }
                            }
                        ]
                    }, {
                        flex: 1,
                        xtype: 'container',
                        margin: '10 0 0 0',
                        layout: 'card',
                        name: 'traceability',
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        flex: 1,
                                        xtype: 'panel',
                                        layout: {
                                            type: 'vbox'
                                        },
                                        defaults: {
                                            width: '100%'
                                        },
                                        items: [
                                            {
                                                flex: 1,
                                                xtype: 'dataview',
                                                trackOver: true,
                                                autoScroll: true,
                                                multiSelect: false,
                                                name: 'flowprocessing',
                                                store: 'flowprocessing',
                                                itemSelector: 'div.thumb-wrap',
                                                tpl: [
                                                    '<tpl for=".">',
                                                    '<div style="margin-bottom: 10px;" class="thumb-wrap">',
                                                    '<div class="thumb-flow"></div>',
                                                    '<span><a style="font-size: 14px;">{sterilizationtypename}</a></span>',
                                                    '</div>',
                                                    '</tpl>'
                                                ],
                                                listeners: {
                                                    render: function (view, eOpts) {
                                                        view.tip = Ext.create('Ext.tip.ToolTip', {
                                                            minWidth: 300,
                                                            maxWidth: 500,
                                                            showDelay: 800,
                                                            dismissDelay: 0,
                                                            target: view.el,
                                                            trackMouse: true,
                                                            delegate: view.itemSelector,
                                                            renderTo: Ext.getBody(),
                                                            listeners: {
                                                                beforeshow: function updateTipBody(tip) {
                                                                    var rec = view.getRecord(tip.triggerElement),
                                                                        username = rec.get('username'),
                                                                        patientname = rec.get('patientname'),
                                                                        surgicalwarning = rec.get('surgicalwarning'),
                                                                        dateof = Ext.util.Format.date(rec.get('dateof'),'d/m/Y'),
                                                                        stringL1 = '<div>Paciente: {0} - {1}</div>',
                                                                        stringL2 = '<div>Abertura: {0} - {1}</div>';

                                                                    stringL2 = Ext.String.format(stringL2, dateof, username);
                                                                    stringL1 = Ext.String.format(stringL1, surgicalwarning, patientname);

                                                                    tip.update((patientname) ? (stringL2 + stringL1) : stringL2);
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            }, {
                                                xtype: 'gridpanel',
                                                cls: 'processing-panel-header-flow processing-update-grid',
                                                store: Ext.create('Ext.data.Store', {
                                                    fields: [ 'name', 'email', 'phone' ],
                                                    data: [
                                                        { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
                                                        { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
                                                        { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
                                                        { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
                                                    ]
                                                }),
                                                columns: [
                                                    { text: 'Name', dataIndex: 'name' },
                                                    { text: 'Email', dataIndex: 'email', flex: 1 }
                                                ]
                                            }
                                        ]
                                    }, {
                                        xtype: 'splitter'
                                    }, {
                                        flex: 1,
                                        xtype: 'panel'
                                    }
                                ]
                            }, {

                            }
                        ]
                    }
                ]
            }
        ];

    }

});