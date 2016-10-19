//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingHoldOutput', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingholdoutput',

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
        queryreader: 'onSelectHoldItem'
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
                        text: 'Movimento'
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
                                        fieldLabel: 'Lançamentos',
                                        defaultType: 'textfield',
                                        defaults: {
                                            anchor: '100%',
                                            fieldCls: 'smart-field-style-action'
                                        },
                                        items: [
                                            {
                                                xtype: 'hiddenfield',
                                                name: 'id'
                                            }, {
                                                useUpperCase: true,
                                                inputType: 'password',
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
                                                xtype: 'displayfield',
                                                fieldLabel: 'Material/Kit',
                                                name: 'materialname',
                                                value: '...'
                                            }, {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Transportador',
                                                name: 'transportedby',
                                                value: '...'
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
                                        margin: '10 0 10 0',
                                        xtype: 'fieldcontainer',
                                        name: 'groupdocument',
                                        tpl: [
                                            '<div>',
                                                '<div class="movement movement-title">Documento</div>',
                                                '<div class="movement movement-title">{clientname}</div>',
                                                '<div class="movement movement-title">{movementtypedescription}</div>',
                                                '<div class="movement"><b>Status:</b> {movementdate} - {releasestypedescription}</div>',
                                                '<div class="movement movement-title">Procedimento</div>',
                                                '<div class="movement"><b>Data:</b> {dateof} {timeof}</div>',
                                                '<div class="movement">{surgicalwarning} {patientname}</div>',
                                                '<div class="movement">{flowing} - {place}</div>',
                                                '<div class="movement">{instrumentator}</div>',
                                            '</div>'
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, {
                        height: 350,
                        margin: '10 0 0 0',
                        xtype: 'gridpanel',
                        cls: 'update-grid',
                        hideHeaders: false,
                        headerBorders: false,
                        store: 'armorymovementitem',

                        selType: 'cellmodel',

                        plugins: {
                            ptype: 'cellediting',
                            clicksToEdit: 1
                        },

                        // listeners: {
                        //     beforeedit: 'onBeforeEditMOVIMENTO_OF'
                        // },

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
                                width: 180,
                                sortable: false,
                                text: 'Saída',
                                dataIndex: 'outputtypedescription',
                                editor: {
                                    xtype: 'comboenum',
                                    name: 'outputtypedescription',
                                    fieldCls: 'smart-field-style-action',
                                    listeners: {
                                       select: 'onEditMOVIMENTO_TO'
                                    }
                                }
                            }, {
                                sortable: false,
                                text: 'Ações',
                                hidden: !me.editable,
                                width: 80,
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