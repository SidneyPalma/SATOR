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

    // listeners: {
    //     queryreader: 'onArmoryOfQuery'
    // },

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
                                flex: 1,
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
                                                useUpperCase: true,
                                                inputType: 'password',
                                                name: 'search',
                                                listeners: {
                                                    specialkey: function (field, e, eOpts) {
                                                        if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                                            var view = this.up('window');
                                                            view.fireEvent('queryreader', field, e, eOpts);
                                                        }
                                                    }
                                                }
                                            }, {
                                                useReadColor: true,
                                                fieldLabel: 'Material/Kit',
                                                name: 'materialname'
                                            }, {
                                                useReadColor: true,
                                                fieldLabel: 'Transportador',
                                                name: 'transportedby'
                                            }, {
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'Engradado lacrado',
                                                boxLabel: 'Possui',
                                                name: 'hasbox'
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                margin: '10 0 0 10',
                                flex: 1,
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
                                        layout: 'hbox',
                                        fieldLabel: 'Documento',
                                        defaultType: 'textfield',
                                        defaults: {
                                            useReadColor: true,
                                            fieldCls: 'smart-field-style-action'
                                        },
                                        items: [
                                            {
                                                xtype: 'hiddenfield',
                                                name: 'id'
                                            }, {
                                                xtype: 'hiddenfield',
                                                name: 'areasid'
                                            }, {
                                                flex: 1,
                                                name: 'clientname'
                                            }, {
                                                xtype: 'splitter'
                                            }, {
                                                flex: 1,
                                                name: 'movementtypedescription'
                                            }
                                        ]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Destino',
                                        name: 'groupdocument',
                                        tpl: [
                                            '<div style="font-size: 14px; ">',
                                                '<div style="line-height: 28px"><b>Data:</b> {movementdate}</div>',
                                                '<div style="line-height: 28px; font-size: 20px;">Procedimento</div>',
                                                '<div style="line-height: 28px"><b>Data:</b> {dateof} {timeof}</div>',
                                                '<div style="line-height: 28px"><b>Status:</b> {releasestypedescription}</div>',
                                                '<div style="line-height: 28px">{patientname}</div>',
                                                '<div style="line-height: 28px">{flowing}</div>',
                                            '</div>'
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, {
                        height: 250,
                        margin: '10 0 0 0',
                        xtype: 'gridpanel',
                        cls: 'update-grid',
                        hideHeaders: false,
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
                                flex: 1,
                                dataIndex: 'materialname',
                                text: 'Material / kit'
                            }, {
                                width: 120,
                                text: 'Saída',
                                dataIndex: 'outputtypedescription',
                                editor: {
                                    xtype: 'comboenum',
                                    name: 'outputtypedescription',
                                    fieldCls: 'smart-field-style-action'
                                    //listeners: {
                                    //    select: 'onEditMOVIMENTO_OF'
                                    //}
                                }
                            }, {
                                text: 'Ações',
                                hidden: !me.editable,
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