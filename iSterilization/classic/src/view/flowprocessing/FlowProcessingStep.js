//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingStep', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessingstep',

    requires: [
        'iSterilization.store.flowprocessing.*',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    defaults: {
        width: '100%'
    },

    controller: 'flowprocessing',
    bodyCls: 'flow-processing',
    cls: 'panel-frame panel-frame-tpTree',

    iconCls: "fa fa-smile-o",
    showSmartAnimate: true,

    header: {
        title: 'Processos e Ações',
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
        selectaction: 'onSelectAction',
        afterrender: 'onAfterRenderStep'
    },

    bodyStyle: 'padding: 10px',

    timeoutInterval: (6000 * 10),

    selectStep: function() {
        var me = this;

        me.timeoutID = window.setInterval(function () {
            me.fireEvent('selectaction',me);
        }, me.timeoutInterval);

        Ext.create('Ext.util.KeyNav', Ext.getDoc(), {
            scope: me,
            esc: function () {
                me.searchToogle();
            }
        });
    },

    searchToogle: function () {
        var me = this,
            search = me.down('textfield[name=search]');

        if(!search.isVisible()) {
            search.show(false,function () {
                search.focus(false,200);
            });
        } else {
            search.hide();
        }
    },

    deselectStep: function () {
        var me = this;
        window.clearInterval(me.timeoutID);
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();

        me.onAfter('destroy', me.deselectStep, me);
        me.onAfter('afterrender', me.selectStep, me);
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSterilization.store.flowprocessing.FlowProcessing');
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStep');
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepAction');

        me.items = [
            {
                xtype: 'container',
                margin: '10 0 0 0',
                layout: 'anchor',
                items: [
                    {
                        anchor: '100%',
                        xtype: 'label',
                        cls: 'processing-field-font',
                        text: 'Estação de Trabalho Não Configurada',
                        name: 'labelareas'
                    }
                ]
            }, {
                flex: 1,
                margin: '5 0 0 0',
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        flex: 3,
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                flex: 1,
                                xtype: 'dataview',
                                trackOver: true,
                                autoScroll: true,
                                multiSelect: false,
                                name: 'flowprocessingstepaction',
                                store: 'flowprocessingstepaction',
                                itemSelector: 'div.thumb-wrap',
                                tpl: [
                                    '<tpl for=".">',
                                    '<div style="margin-bottom: 10px;" class="thumb-wrap">',
                                    '<div class="thumb-action-{flowstepaction}"></div>',
                                    '<span>',
                                    '<a style="font-size: 14px;">{flowstepactiondescription}</a>',
                                    '</span>',
                                    '</div>',
                                    '</tpl>'
                                ],
                                listeners: {
                                    select: 'onFlowStepSelect',
                                    deselect: 'onFlowStepDeSelect',
                                    itemdblclick: 'onFlowStepAction'
                                },
                                emptyText: '<h4 style="text-align: center; line-height: 40px;" class="insert-record">Nenhum processo na etapa...</h4>',
                            }, {
                                xtype: 'splitter'
                            }, {
                                hidden: true,
                                name: 'search',
                                showClear: true,
                                xtype: 'textfield',
                                useUpperCase: true,
                                useReadColor: false,
                                fieldLabel: 'Consultar',
                                cls: 'processing-field',
                                labelCls: 'processing-field-font'
                            }, {
                                height: 150,
                                xtype: 'dataview',
                                trackOver: true,
                                autoScroll: true,
                                multiSelect: false,
                                name: 'flowprocessingsteptask',
                                store: {
                                    fields: [ 'taskcode', 'taskname' ],
                                    data: [
                                        { taskcode: '001', taskname: 'Consultar Material' },
                                        { taskcode: '002', taskname: 'Consultar Insumos' }
                                    ]
                                },
                                itemSelector: 'div.thumb-wrap',
                                tpl: [
                                    '<tpl for=".">',
                                    '<div style="margin-bottom: 10px;" class="thumb-wrap">',
                                    '<div class="thumb-task-{taskcode}"></div>',
                                    '<span>',
                                    '<a style="font-size: 14px;">{taskname}</a>',
                                    '</span>',
                                    '</div>',
                                    '</tpl>'
                                ]
                            }
                        ]
                    }, {
                        xtype: 'splitter'
                    }, {
                        flex: 2,
                        source: {},
                        autoHeight: true,
                        columnLines: false,
                        xtype: 'propertygrid',
                        defaults: { readOnly: true },
                        disableSelection: true,
                        cls: 'flowprocessingstep',
                        frame: false,
                        border: false,
                        bodyStyle: 'background:transparent;',
                        listeners: {
                            'beforeedit': function (e) { return false; },
                            'itemkeydown': function ( tableView, td, cellIndex, record, e, eOpts ) {
                                if(e.keyCode == 27) {
                                    tableView.up('flowprocessingstep').searchToogle();
                                }
                            }
                        }
                    }
                ]
            }
        ];
    }

});