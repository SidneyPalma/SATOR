//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingStepPreLoad', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingsteppreload',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Ext.grid.column.*',
        'Ext.grid.plugin.CellEditing',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 950,
    modal: true,
    header: false,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'flowprocessing',
    cls: 'panel-frame',
    iconCls: "fa fa-file-archive-o",

    doCallBack: Ext.emptyFn,

    listeners: {
        queryreader: 'onLoadDoQuery'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    storeFields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'version',
            type: 'auto'
        }, {
            name: 'barcode',
            type: 'auto'
        }, {
            name: 'colorschema',
            type: 'auto'
        }, {
            name: 'colorpallet',
            type: 'colorpallet'
        }, {
            name: 'materialname',
            type: 'auto'
        }, {
            name: 'items',
            type: 'int'
        }, {
            name: 'materialid',
            type: 'int'
        }, {
            name: 'materialboxid',
            type: 'int'
        }, {
            name: 'sterilizationtypeid',
            type: 'int'
        }, {
            name: 'clientid',
            type: 'int'
        }, {
            name: 'clientname',
            type: 'auto'
        }, {
            name: 'clienttype',
            type: 'auto'
        }, {
            name: 'sterilizationtypename',
            type: 'auto'
        }, {
            name: 'prioritylevel',
            type: 'auto'
        }, {
            name: 'areavailable',
            type: 'int'
        }, {
            name: 'patientname',
            type: 'auto'
        }, {
            name: 'surgicalwarning',
            type: 'auto'
        }
    ],

    buildItems: function () {
        var me = this;

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                margin: '10 0 0 0',
                layout: 'anchor',
                plugins:'formenter',
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
                        text: 'Preparar Leituras'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'clientid'
                    }, {
                        margin: '20 0 0 0',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            useUpperCase: true,
                            fieldCls: 'smart-field-style-action',
                            labelCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                name: 'searchmaterial',
                                inputType: 'password',
                                fieldLabel: 'Consultar material',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.ENTER].indexOf(e.getKey()) != -1) {
                                            var view = this.up('window');
                                            view.fireEvent('queryreader', field, e, eOpts);
                                        }
                                        e.stopEvent();
                                    }
                                }
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                xtype: 'displayfield',
                                fieldLabel: 'Cliente',
                                name: 'clientname'
                            }
                        ]
                    }, {
                        height: 350,
                        margin: '10 0 0 0',
                        xtype: 'gridpanel',
                        cls: 'update-grid',
                        hideHeaders: false,
                        headerBorders: false,

                        store: Ext.create('Ext.data.Store', {
                            fields: me.storeFields,
                            data: []
                        }),

                        columns: [
                            {
                                xtype: 'rownumberer'
                            }, {
                                flex: 1,
                                sortable: false,
                                dataIndex: 'materialname',
                                text: 'Material / kit'
                            }, {
                                width: 100,
                                sortable: false,
                                text: 'Schema',
                                dataIndex: 'colorpallet'
                            }, {
                                width: 70,
                                sortable: false,
                                text: 'Itens',
                                dataIndex: 'items'
                            }, {
                                width: 180,
                                sortable: false,
                                text: 'Fluxo',
                                dataIndex: 'sterilizationtypename'
                            }, {
                                sortable: false,
                                width: 40,
                                align: 'center',
                                xtype: 'actioncolumn',
                                items: [
                                    {
                                        handler: 'delReleasesItem',
                                        iconCls: "fa fa-minus-circle action-delete-color-font",
                                        tooltip: 'Descartar lançamento!'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    },

    buttonAlign: 'center',

    buttons: [
        {
            scale: 'medium',
            text: 'Cancelar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});