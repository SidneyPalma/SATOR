//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingStep', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessingstep',

    requires: [
        'iSterilization.store.flowprocessing.*',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    layout: 'border',

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
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingAction');

        me.items = [
            {
                region: 'north',
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
                region: 'center',
                margin: '5 0 0 0',
                xtype: 'dataview',
                trackOver: true,
                autoScroll: true,
                multiSelect: false,
                name: 'flowprocessingaction',
                store: 'flowprocessingaction',
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
                    // select: 'onFlowStepSelect',
                    itemdblclick: 'onFlowStepAction'
                },
                emptyText: '<h4 style="text-align: center; line-height: 40px;" class="insert-record">Nenhum processo na etapa...</h4>',
            }
        ];
    }

});