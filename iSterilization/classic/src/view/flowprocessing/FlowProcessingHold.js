//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingHold', {
    extend: 'Ext.form.Panel',

    xtype: 'flowprocessinghold',

    requires: [
        'Smart.util.IonSound',
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
        title: 'Movimentar Arsenal',
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
        queryreader: 'onHoldDoQuery',
        afterrender: 'onAfterRenderHold'
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

        // me.onAfter('destroy', me.deselectStep, me);
        // me.onAfter('afterrender', me.selectStep, me);
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSterilization.store.flowprocessing.FlowProcessing');
        // Ext.create('iSterilization.store.flowprocessing.FlowProcessingStep');
        // Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepInput');
        Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepAction');
        // Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepMaterial');
        // Ext.create('iSterilization.store.flowprocessing.FlowProcessingStepInputTree');

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
                        flex: 4,
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
                                xtype: 'gridpanel',
                                rowLines: true,
                                // cls: 'flowprocessinghold',
                                // bodyStyle: 'background:transparent;',
                                //
                                // url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',
                                //
                                // params: {
                                //     action: 'select',
                                //     method: 'selectCycle'
                                // },
                                //
                                // fields: [
                                //     {
                                //         name: 'id',
                                //         type: 'int'
                                //     }, {
                                //         name: 'barcode',
                                //         type: 'auto'
                                //     }, {
                                //         name: 'flowprocessingstepid',
                                //         type: 'int'
                                //     }, {
                                //         name: 'materialname',
                                //         type: 'auto'
                                //     }
                                // ],
                                // columns: [
                                //     {
                                //         dataIndex: 'materialname',
                                //         flex: 1
                                //     }, {
                                //         width: 60,
                                //         align: 'center',
                                //         sortable: false,
                                //         dataIndex: 'haspending',
                                //         xtype: 'actioncolumn',
                                //         handler: 'setDeleteChargeItem',
                                //         getTip: function(v, meta, rec) {
                                //             return 'Remover material do menu!';
                                //         },
                                //         getClass: function(v, meta, rec) {
                                //             return "fa fa-minus-circle action-delete-color-font";
                                //         }
                                //     }
                                // ]

                                cls: 'flowprocessinghold',
                                bodyStyle: 'background:transparent;',
                                store: 'flowprocessingstepaction',
                                columns: [
                                    {
                                        width: 80,
                                        height: 60,
                                        renderer: function (value,metaData,record) {
                                            var url = record.store.getUrl(),
                                                img =  '<div style="margin-top: 6px;"><img src="{0}?action=select&method=renderCode&barCode={1}" id="SATOR-{2}" /></div>';
                                            return Ext.String.format(img,url,record.get('barcode'),record.get('id'));
                                        }
                                    }, {
                                        flex: 1,
                                        dataIndex: 'materialname',
                                        renderer: function (value,metaData,record) {
                                            var barcode = record.get('barcode'),
                                                clientname = record.get('clientname'),
                                                materialname = record.get('materialname'),
                                                strRow =    '<div style="font-weight: 700; font-size: 16px; line-height: 24px;">' +
                                                    '<div>{0}</div><div>{1}</div><div>{2}</div>' +
                                                    '</div>';
                                            return Ext.String.format(strRow,clientname,materialname,barcode);
                                        }
                                    }
                                ]
                            }
                        ]
                    }, {
                        flex: 1,
                        xtype: 'container'
                    }, {
                        width: 350,
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'label',
                                cls: 'processing-field-font',
                                text: 'Aguardando ...',
                                name: 'labelitem'
                            }, {
                                xtype: 'gridpanel',
                                rowLines: true,
                                cls: 'flowprocessinghold',
                                bodyStyle: 'background:transparent;',
                                store: 'flowprocessingstepaction',
                                columns: [
                                    {
                                        width: 80,
                                        height: 60,
                                        renderer: function (value,metaData,record) {
                                            var url = record.store.getUrl(),
                                                img =  '<div style="margin-top: 6px;"><img src="{0}?action=select&method=renderCode&barCode={1}" id="SATOR-{2}" /></div>';
                                            return Ext.String.format(img,url,record.get('barcode'),record.get('id'));
                                        }
                                    }, {
                                        flex: 1,
                                        dataIndex: 'materialname',
                                        renderer: function (value,metaData,record) {
                                            var barcode = record.get('barcode'),
                                                clientname = record.get('clientname'),
                                                materialname = record.get('materialname'),
                                                strRow =    '<div style="font-weight: 700; font-size: 16px; line-height: 24px;">' +
                                                                '<div>{0}</div><div>{1}</div><div>{2}</div>' +
                                                            '</div>';
                                            return Ext.String.format(strRow,clientname,materialname,barcode);
                                        }
                                    }
                                ]
                            // }, {
                            //     xtype: 'pagingtoolbar',
                            //     store: 'flowprocessingstepaction',
                            //     dock: 'bottom',
                            //     displayInfo: true
                            // .x-toolbar-default {
                            //     padding: 6px 0 6px 8px;
                            //     /* border-style: solid; */
                            //     border-color: #d0d0d0;
                            //     border-width: 1px;
                            //     background-image: none;
                            //     /* background-color: #fff; */
                            // }
                            }
                        ]
                    }
                ]
            }, {
                // height: 150,
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                    //     xtype: 'radiogroup',
                    //     fieldLabel: 'Tipo de Consulta',
                    //     columns: 3,
                    //     vertical: false,
                    //     items: [
                    //         { boxLabel: 'Item 1', name: 'rb', inputValue: '1', checked: true },
                    //         { boxLabel: 'Item 2', name: 'rb', inputValue: '2' },
                    //         { boxLabel: 'Item 3', name: 'rb', inputValue: '3' }
                    //     ]
                    // }, {
                        // flex: 1,
                        flex: 4,
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
                                var view = field.up('flowprocessinghold');
                                if ([e.ENTER].indexOf(e.getKey()) != -1) {
                                    view.fireEvent('queryreader', field, e, eOpts);
                                }
                            }
                        }
                    }, {
                        // xtype: 'splitter'
                        flex: 1,
                        xtype: 'container'
                    }, {
                        width: 350,
                        margin: '5 0 0 0',
                        xtype: 'segmentedbutton',
                        allowMultiple: true,
                        defaults: {
                            height: 39,
                            scale: 'medium',
                            showSmartTheme: 'green'
                        },
                        items: [
                            {
                                text: 'Segment Item 2',
                                tooltip: 'My custom tooltip'
                            }, {
                                text: 'Segment Item 3'
                            }
                        ]
                    }
                ]
            }
        ];
    }

});