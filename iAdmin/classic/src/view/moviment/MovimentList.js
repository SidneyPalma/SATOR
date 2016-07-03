//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.MovimentList', {
    extend: 'Ext.form.Panel',

    xtype: 'movimentlist',

    requires: [
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.moviment.*',
        'iAdmin.view.moviment.MovimentController'
    ],

    layout: 'fit',

    controller: 'moviment',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Movimentação',
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
        afterrender: 'onFocusSearch'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iAdmin.store.moviment.Moviment');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'moviment',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },

                columnsRenderer: function (value, metaData, record) {

                    metaData.style = record.get('movimentstatus') == 'E' ? '' : 'color: red;'

                    return value;
                },

                columns: [
                    {
                        width: 120,
                        text: 'Código',
                        align: 'center',
                        dataIndex: 'id',
                        renderer: function (value, metaData, record) {
                            metaData.style = record.get('movimentstatus') == 'E' ? '' : 'color: red;';
                            return Ext.String.leftPad(value, 6, '0');
                        }
                    }, {
                        text: 'Data',
                        dataIndex: 'movimentdate',
                        align: 'center',
                        width: 100,
                        xtype: 'datecolumn'
                    }, {
                        flex: 1,
                        text: 'Tipo de Movimento',
                        dataIndex: 'movimenttypedescription'
                    }, {
                        flex: 1,
                        text: 'Tipo de Documento',
                        dataIndex: 'documenttypedescription'
                    }, {
                        width: 120,
                        text: 'Documento',
                        dataIndex: 'documentnumber'
                    }, {
                        width: 120,
                        text: 'Status',
                        dataIndex: 'movimentstatusdescription'
                    }, {
                        width: 120,
                        text: 'Usuário',
                        dataIndex: 'username'
                    }, {
                        width: 80,
                        align: 'center',
                        xtype: 'actioncolumn',
                        items: [
                            {
                                handler: 'windupView',
                                getTip: function(v, meta, rec) {
                                    var movimentstatus = rec.data.movimentstatus;
                                    return movimentstatus == 'F' ? 'Encerrar lançamentos!' : "";
                                },
                                getClass: function(v, meta, rec) {
                                    var movimentstatus = rec.data.movimentstatus;
                                    return movimentstatus == 'F' ? "fa fa-check-circle-o action-select-color" : "";
                                },
                                isDisabled: function (view, rowIdx, colIdx, item, rec) {
                                    return rec.data.movimentstatus != 'F';
                                }
                            }, {
                                width: 5,
                                disabled: true,
                                xtype: 'splitter'
                            }, {
                                handler: 'onViewEdit',
                                iconCls: "fa fa-pencil action-update-color",
                                tooltip: 'Editar cadastro!'
                            }
                        ]
                    }
                ],
                dockedItems: [
                    {
                        xtype:  'panel',
                        layout: 'hbox',
                        bodyStyle: 'padding-bottom: 10px;',
                        items: [
                            {
                                flex: 1,
                                xtype: 'textfield',
                                name: 'search',
                                reference: 'search',
                                showFetch: true
                            }, {
                                width: 120,
                                showClear: true,
                                margin: '0 10 0 10',
                                xtype: 'comboenum',
                                name: 'movimentstatusdescription',
                                listeners: {
                                    showclear: 'showClear',
                                    select: 'selectResultState'
                                }
                            }, {
                                xtype: 'button',
                                iconCls: "fa fa-file-o",
                                handler: 'insertViewNew',
                                tooltip: 'Novo cadastro!'
                            }
                        ]
                    }, {
                        xtype: 'pagingtoolbar',
                        store: 'moviment',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});