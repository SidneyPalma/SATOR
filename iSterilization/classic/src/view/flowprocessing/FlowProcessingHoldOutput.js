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

    width: 850,
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
                        items: [
                            {
                                // hidden: !me.editable,
                                flex: 1,
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    fieldCls: 'smart-field-style-action'
                                    // labelCls: 'smart-field-style-action'
                                },
                                items: [
                                    {
                                        flex: 1,
                                        margin: '10 0 0 0',
                                        useUpperCase: true,
                                        fieldLabel: 'Processos',
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
                                    }
                                ]
                            }, {
                                flex: 1,
                                xtype: 'container'
                            }
                        ]
                    }, {
                        height: 200,
                        margin: '10 0 0 0',
                        xtype: 'gridpanel',
                        cls: 'update-grid',
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
                                dataIndex: 'materialname'
                            }, {
                                width: 180,
                                dataIndex: 'armorylocaldescription',
                                editor: {
                                    xtype: 'comboenum',
                                    name: 'armorylocaldescription',
                                    fieldCls: 'smart-field-style-action',
                                    listeners: {
                                        select: 'onEditMOVIMENTO_OF'
                                    }
                                }
                            }, {
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