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

    timeoutInterval: (1000 * 10),

    selectHold: function() {
        var me = this;

        me.timeoutID = window.setInterval(function () {
            me.updateHold();
        }, me.timeoutInterval);
    },

    deselectHold: function () {
        var me = this;
        window.clearInterval(me.timeoutID);
    },

    updateHold: function () {
        var me = this,
            storeHold = me.down('gridpanel[name=releasesHold]').getStore(),
            storeType = me.down('gridpanel[name=releasesType]').getStore();

        Ext.Ajax.request({
            scope: me,
            url: storeHold.getUrl(),
            params: storeHold.getExtraParams(),
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    return false;
                }

                storeHold.removeAll();

                if(result.rows) {
                    storeHold.loadData(result.rows);
                }
            }
        });

        Ext.Ajax.request({
            scope: me,
            url: storeType.getUrl(),
            params: storeType.getExtraParams(),
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    return false;
                }

                storeType.removeAll();

                if(result.rows) {
                    storeType.loadData(result.rows);
                }
            }
        });
    },

    initComponent: function () {
        var me = this;

        me.buildItems();
        me.callParent();

        me.onAfter('destroy', me.deselectHold, me);
        me.onAfter('afterrender', me.selectHold, me);
    },

    buildItems: function () {
        var me = this;

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
                        flex: 5,
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
                                margin: '10 0 0 0',
                                xtype: 'container',
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
                            }, {
                                height: 50,
                                columns: 2,
                                vertical: false,
                                xtype: 'radiogroup',
                                fieldLabel: 'Consulta',
                                cls: 'flowprocessinghold',
                                labelCls: 'processing-field-font',
                                items: [
                                    { boxLabel: 'Movimentação', name: 'rb', inputValue: '1', checked: true },
                                    { boxLabel: 'Rastreabilidade', name: 'rb', inputValue: '2' }
                                ]
                            }, {
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
                                flex: 1,
                                margin: '10 0 0 0',
                                xtype: 'gridpanel',
                                rowLines: true,
                                name: 'releasesHold',
                                cls: 'flowprocessinghold',
                                bodyStyle: 'background:transparent;',

                                url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

                                params: {
                                    action: 'select',
                                    method: 'selectHold',
                                    areasid: Smart.workstation.areasid
                                },

                                fields: [
                                    {
                                        name: 'id',
                                        type: 'int'
                                    }, {
                                        name: 'barcode',
                                        type: 'auto'
                                    }, {
                                        name: 'materialname',
                                        type: 'auto'
                                    }, {
                                        name: 'clientname',
                                        type: 'auto'
                                    }
                                ],

                                columns: [
                                    {
                                    //     width: 80,
                                    //     height: 60,
                                    //     renderer: function (value,metaData,record) {
                                    //         var url = '../iSterilization/business/Calls/armorymovement.php',
                                    //             img =  '<div style="margin-top: 6px;"><img src="{0}?action=select&method=renderCode&barCode={1}" id="SATOR-{2}" /></div>';
                                    //         console.info(url);
                                    //         return Ext.String.format(img,url,record.get('barcode'),record.get('id'));
                                    //     }
                                    // }, {
                                        flex: 1,
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
                            }, {
                                margin: '10 0 0 0',
                                xtype: 'gridpanel',
                                name: 'releasesType',
                                // cls: 'search-grid flowprocessinghold',
                                cls: 'flowprocessinghold',
                                bodyStyle: 'background:transparent;',

                                url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

                                params: {
                                    action: 'select',
                                    method: 'releasesTypeA',
                                    areasid: Smart.workstation.areasid
                                },

                                fields: [
                                    {
                                        name: 'id',
                                        type: 'int'
                                    }, {
                                        name: 'areasid',
                                        type: 'int'
                                    }, {
                                        name: 'areasname',
                                        type: 'auto'
                                    }, {
                                        name: 'movementuser',
                                        type: 'auto'
                                    }, {
                                        name: 'movementdate',
                                        type: 'auto'
                                    }, {
                                        name: 'movementtype',
                                        type: 'auto'
                                    }, {
                                        name: 'movementtypedescription',
                                        type: 'auto'
                                    }, {
                                        name: 'releasestype',
                                        type: 'auto'
                                    }, {
                                        name: 'releasestypedescription',
                                        type: 'auto'
                                    }, {
                                        name: 'item',
                                        type: 'int'
                                    }
                                ],

                                columns: [
                                    {
                                        flex: 1,
                                        renderer: function (value,metaData,record) {
                                            var item = record.get('item'),
                                                releasestype = record.get('releasestypedescription'),
                                                movementuser = record.get('movementuser'),
                                                strRow =    '<div style="font-weight: 700; font-size: 16px; line-height: 24px;">' +
                                                                '<div>{0}: {1} (itens)</div><div>{2}</div>' +
                                                            '</div>';
                                            return Ext.String.format(strRow,releasestype,item,movementuser);
                                        }
                                    }, {
                                        width: 100,
                                        align: 'center',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        items: [
                                            {
                                                handler: 'getReleasesType',
                                                iconCls: "fa fa-info-circle action-select-color-font",
                                                tooltip: 'Carregar movimento!'
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                handler: 'setReleasesType',
                                                iconCls: "fa fa-minus-circle action-delete-color-font",
                                                tooltip: 'Descartar movimento!'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }

});