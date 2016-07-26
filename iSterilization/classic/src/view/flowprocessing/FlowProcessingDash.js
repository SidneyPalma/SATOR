//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingDash', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessingdash',

    requires: [
        'Ext.view.View',
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'Ext.picker.Date',
        'Ext.button.Segmented',
        'iAdmin.view.users.UsersSearch',
        // 'iAdmin.view.material.MaterialSearch',
        // 'iAdmin.view.equipment.EquipmentSearch',
        // 'iAdmin.view.box.MaterialBoxItemSearch',
        // 'iAdmin.view.helper.areas.CMEAreasSearch',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    layout: 'border',

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
        afterrender: 'onAfterRenderView'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

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
                        maxDate: new Date(),
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
                                fieldLabel: 'Kit'
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

                            }, {
                                xtype: 'gridpanel',
                                cls: 'processing-panel-header-flow processing-update-grid',
                                store: Ext.create('Ext.data.Store', {
                                    storeId: 'simpsonsStore',
                                    fields:[ 'name', 'email', 'phone'],
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
                    }
                ]
            }
        ];

    }

});