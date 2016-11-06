//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingHoldSearch', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingholdsearch',

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

    editable: true,

    doCallBack: Ext.emptyFn,

    listeners: {
        queryreader: 'onSearchMoviment'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSterilization.store.armory.ArmoryMovementItem');

        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                margin: '10 0 0 0',
                layout: 'anchor',
                // plugins:'formenter',
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
                        text: 'Consultar movimentos'
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            fieldCls: 'smart-field-style-action',
                            labelCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                margin: '10 10 0 0',
                                flex: 3,
                                xtype: 'container',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    allowBlank: false,
                                    fieldCls: 'smart-field-style-action',
                                    labelCls: 'smart-field-style-action'
                                },
                                items: [
                                    {
                                        margin: '10 0 10 0',
                                        xtype: 'fieldcontainer',
                                        layout: 'anchor',
                                        fieldLabel: 'Pesquisa',
                                        defaultType: 'textfield',
                                        defaults: {
                                            anchor: '100%',
                                            fieldCls: 'smart-field-style-action'
                                        },
                                        items: [
                                            {
                                                useUpperCase: true,
                                                name: 'search',
                                                listeners: {
                                                    specialkey: function (field, e, eOpts) {
                                                        if ([e.ENTER].indexOf(e.getKey()) != -1) {
                                                            var view = this.up('window');
                                                            view.fireEvent('queryreader', field, e, eOpts);
                                                        }
                                                    }
                                                }
                                            }, {
                                                columns: 5,
                                                vertical: false,
                                                xtype: 'radiogroup',
                                                items: [
                                                    { boxLabel: 'Todos', name: 'movementtype', inputValue: '000', checked: true },
                                                    { boxLabel: 'Entradas', name: 'movementtype', inputValue: '001' },
                                                    { boxLabel: 'Saídas', name: 'movementtype', inputValue: '002' },
                                                    { boxLabel: 'Retornos', name: 'movementtype', inputValue: '003' },
                                                    { boxLabel: 'Estornos', name: 'movementtype', inputValue: '004' }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                margin: '10 0 0 10',
                                flex: 2,
                                xtype: 'container',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    allowBlank: false,
                                    fieldCls: 'smart-field-style-action',
                                    labelCls: 'smart-field-style-action'
                                },
                                items: [
                                    {
                                        margin: '0 0 10 0',
                                        xtype: 'fieldcontainer',
                                        name: 'groupdocument',
                                        tpl: [
                                            '<div class="movement">',
                                            '<div class="movement-title" style="padding-bottom: 10px;">{movementtypedescription} {movementdate}</div>',
                                            '<div class="movement-title">{clientname}</div>',
                                            '<div><b>{releasestypedescription}</b></div>',
                                            '<div class="movement-title">Procedimento</div>',
                                            '<div><b>{surgical}</b></div>',
                                            '<div><b>{surgicalwarning} {patientname}</b></div>',
                                            '<div>{dateof} {timeof} {surgicalroom}</div>',
                                            '</div>'
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, {
                        height: 350,
                        xtype: 'gridpanel',
                        cls: 'update-grid',
                        hideHeaders: false,
                        headerBorders: false,

                        url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',

                        params: {
                            action: 'select',
                            method: 'selectInQuery'
                        },

                        fields: [
                            {
                                name: 'id',
                                type: 'int'
                            }, {
                                name: 'barcode',
                                type: 'auto'
                            }, {
                                name: 'movementdate',
                                type: 'date'
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
                                name: 'movementuser',
                                type: 'auto'
                            }, {
                                name: 'items',
                                type: 'auto'
                            }
                        ],
                        
                        columns: [
                            {
                                xtype: 'rownumberer'
                            }, {
                                flex: 1,
                                sortable: false,
                                dataIndex: 'barcode',
                                text: 'Código'
                            }, {
                                width: 60,
                                text: 'Itens',
                                sortable: false,
                                dataIndex: 'items'
                            }, {
                                width: 120,
                                text: 'Data',
                                sortable: false,
                                dataIndex: 'movementdate'
                            }, {
                                width: 180,
                                sortable: false,
                                text: 'Tipo',
                                dataIndex: 'movementtypedescription'
                            }, {
                                width: 220,
                                sortable: false,
                                text: 'Status',
                                dataIndex: 'releasestypedescription'
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