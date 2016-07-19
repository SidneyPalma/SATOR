//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceRegistrationList', {
    extend: 'Ext.form.Panel',

    xtype: 'serviceregistrationlist',

    requires: [
        'Ext.grid.Panel',
        'Ext.panel.Panel',
        'Ext.grid.column.*',
        'iSterilization.store.service.*'
    ],

    layout: 'fit',

    controller: 'serviceregistration',
    cls: 'panel-frame panel-frame-tpTree',
    iconCls: "fa fa-users",
    showSmartAnimate: true,

    header: {
        title: 'Listar Registros de Serviços',
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

        Ext.create('iSterilization.store.service.ServiceRegistration');

        me.items = [
            {
                xtype: 'gridpanel',
                store: 'serviceregistration',
                hideHeaders: false,
                headerBorders: false,
                cls: 'search-grid',
                listeners: {
                    itemdblclick: 'onViewEdit'
                },
                columns: [
                    {
                        width: 250,
                        text: 'Nome do item',
                        dataIndex: 'itembasename'
                    }, {
                        flex: 1,
                        text: 'Descrição',
                        dataIndex: 'description'
                    }, {
                        width: 250,
                        text: 'Tipo de Serviço',
                        dataIndex: 'servicetypedescription'
                    }, {
                        width: 100,
                        text: 'Área CME',
                        dataIndex: 'cmeareasname'
                    }, {
                        width: 200,
                        text: 'Status',
                        dataIndex: 'resultstatedescription',
                        renderer: function (value,metaData,record) {
                            var resultstate = record.get('resultstate');
                            metaData.style = resultstate == 'P' ? 'color: green; font-weight: bold;' : '';
                            return value;
                        }
                    }, {
                        width: 100,
                        text: 'Aprovado',
                        dataIndex: 'enduptime',
                        align: 'center',
                        xtype: 'datecolumn'
                    }, {
                        width: 140,
                        text: 'Ações',
                        align: 'center',
                        xtype: 'actioncolumn',
                        items: [
                            {
                                handler: 'onViewEdit',
                                iconCls: "fa fa-pencil action-update-color",
                                tooltip: 'Editar lançamento!'
                            }, {
                                disabled: true,
                                xtype: 'splitter'
                            }, {
                                handler: 'onViewUpdate',
                                iconCls: "fa fa-thumbs-up action-select-color",
                                tooltip: 'Aprovar lançamento!'
                            }, {
                                disabled: true,
                                xtype: 'splitter'
                            }, {
                                handler: 'onViewDelete',
                                iconCls: "fa fa-trash action-delete-color",
                                tooltip: 'Descartar lançamento!'
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
								width: 200,
								showClear: true,
								margin: '0 10 0 10',
								xtype: 'comboenum',
								name: 'resultstatedescription',
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
                        store: 'serviceregistration',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ];
    }

});