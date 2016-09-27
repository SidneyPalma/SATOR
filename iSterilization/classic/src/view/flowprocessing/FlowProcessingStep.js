//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingStep', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessingstep',

    requires: [
        'Smart.util.IonSound',
        'iSterilization.store.flowprocessing.*',
        'iSterilization.view.flowprocessing.FlowProcessingDataView',
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
        queryreader: 'onQueryReaderView',
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
                if(me.isVisible()) {
                    me.searchToogle();
                }
            }
        });
    },

    searchToogle: function () {
        var me = this,
            search = me.down('textfield[name=search]');

        if(!search.isVisible()) {
            search.show(false,function () {
                search.focus(false,200);
                me.down('label[name=labelitem]').setText('Consultar');
            });
        } else {
            if(search.getValue().length != 0) {
                search.reset();
            } else  {
                search.hide();
                me.down('label[name=labelitem]').setText('Detalhes');
            }
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
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepInput');
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepAction');
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepMaterial');
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepInputTree');

        me.items = [
            {
                flex: 1,
                margin: '10 0 0 0',
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
                                xtype: 'label',
                                cls: 'processing-field-font',
                                text: 'Estação de Trabalho Não Configurada',
                                name: 'labelareas'
                            }, {
                                flex: 1,
                                xtype: 'flowprocessingdataview',
                                listeners: {
                                    select: 'onFlowStepSelect',
                                    deselect: 'onFlowStepDeSelect',
                                    itemdblclick: 'onFlowStepAction',
                                    removerecord: 'onFlowStepRemove'
                                }
                            }
                        ]
                    }, {
                        flex: 2,
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'label',
                                cls: 'processing-field-font',
                                text: 'Consultar',
                                name: 'labelitem'
                            }, {
                                hidden: true,
                                name: 'search',
                                showClear: true,
                                xtype: 'textfield',
                                useUpperCase: true,
                                useReadColor: false,
                                inputType: 'password',
                                cls: 'processing-field',
                                labelCls: 'processing-field-font',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        var view = field.up('flowprocessingstep');
                                        if ([e.ENTER].indexOf(e.getKey()) != -1) {
                                            view.fireEvent('queryreader', field, e, eOpts);
                                        }
                                    }
                                }
                            }, {
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
                                    beforeedit: function (e) { return false; },
                                    itemkeydown: function ( tableView, td, cellIndex, record, e, eOpts ) {
                                        if(e.keyCode == 27) {
                                            tableView.up('flowprocessingstep').searchToogle();
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }, {
                height: 150,
                xtype: 'dataview',
                trackOver: true,
                autoScroll: true,
                multiSelect: false,
                name: 'flowprocessingsteptask',
                
                url: '../iSterilization/business/Calls/flowprocessingstepaction.php',

                params: {
                    action: 'select',
                    method: 'actionTask'
                },

                fields: [ 'taskcode', 'taskname', 'taskrows' ],

                itemSelector: 'div.thumb-wrap',
                tpl: [
                    '<tpl for=".">',
                        '<div style="margin-bottom: 10px;" class="thumb-wrap">',
                            '<div class="thumb-task-{taskcode}">',
                                '<a class="authorize">{taskrows}</a>',
                            '</div>',
                            '<span><a style="font-size: 14px;">{taskname}</a></span>',
                        '</div>',
                    '</tpl>'
                ],
                listeners: {
                    render: function () {
                        this.getStore().load();
                    },
                    itemdblclick: 'onFlowTaskAction'
                }
            }
        ];
    }

});