//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_MOVIMENTO_TO', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_MOVIMENTO_TO',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Ext.grid.column.*',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.view.person.client.ClientSearch',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 500,
    modal: true,
    header: false,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'flowprocessing',
    cls: 'panel-frame',
    iconCls: "fa fa-file-archive-o",

    title: 'Movimento',

    editable: true,

    doCallBack: Ext.emptyFn,

    listeners: {
        queryreader: 'onArmoryOfQuery'
    },

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    onSelectClient: function (combo,record,eOpts) {
        var me = combo.up('window'),
            position = me.setPosition(),
            innerHeigh = window.innerHeight,
            clienttype = record.get('clienttype'),
            surgicalroom = me.down('textfield[name=surgicalroom]');

        me.down('fieldcontainer[name=group_01]').hide();
        me.down('fieldcontainer[name=group_02]').hide();
        me.down('fieldcontainer[name=group_03]').hide();

        surgicalroom.reset();
        surgicalroom.setReadColor(true);

        if (clienttype == '004') {
            surgicalroom.focus(false, 200);
            surgicalroom.setReadColor(false);
            me.down('fieldcontainer[name=group_01]').show();
            me.down('fieldcontainer[name=group_02]').show();
            me.down('fieldcontainer[name=group_03]').show();
        }

        me.setPosition(position[0],(innerHeigh/2)-(me.getHeight()/2));
    },

    showClearClient: function (field, eOpts) {
        var me = field.up('window'),
            position = me.setPosition(),
            innerHeigh = window.innerHeight,
            surgicalroom = me.down('textfield[name=surgicalroom]');

        surgicalroom.reset();
        surgicalroom.setReadColor(true);

        me.down('fieldcontainer[name=group_01]').hide();
        me.down('fieldcontainer[name=group_02]').hide();
        me.down('fieldcontainer[name=group_03]').hide();
        
        me.setPosition(position[0],(innerHeigh/2)-(me.getHeight()/2));
    },

    buildItems: function () {
        var me = this;

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
                                flex: 1,
                                name: 'areasname'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                name: 'movementtypedescription'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            useReadColor: true,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                name: 'movementuser'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                name: 'releasestypedescription'
                            }
                        ]
                    }, {
                        margin: '10 0 10 0',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Destino',
                        defaultType: 'textfield',
                        defaults: {
                            flex: 1,
                            hideTrigger: true,
                            allowBlank: false,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                pageSize: 0,
                                margin: '0 5 0 0',
                                fieldLabel: 'Cliente',
                                xtype: 'clientsearch',
                                name: 'clientname',
                                hiddenNameId: 'clientid',
                                listeners: {
                                    select: me.onSelectClient,
                                    showclear: me.showClearClient,
                                    beforedeselect: 'showClearClient'
                                }
                            }, {
                                allowBlank: true,
                                margin: '0 0 0 5',
                                useReadColor: true,
                                fieldLabel: 'Sala',
                                name: 'surgicalroom'
                            }
                        ]
                    }, {
                        hidden: true,
                        name: 'group_01',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            flex: 1,
                            hideTrigger: true,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'surgicalwarning'
                            }, {
                                pageSize: 10,
                                useReadColor: true,
                                fieldLabel: 'Aviso Cirurgia',
                                name: 'patientname',
                                xtype: 'searchpatient',
                                hiddenNameId: 'surgicalwarning',
                                listeners: {
                                    select: 'onSelectPatient'
                                }
                            }
                        ]
                    }, {
                        hidden: true,
                        name: 'group_02',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            useReadColor: true,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'Circulante',
                                name: 'flowing'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Instrumentador',
                                name: 'instrumentator'
                            }
                        ]
                    }, {
                        hidden: true,
                        name: 'group_03',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            flex: 1,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                useReadColor: true,
                                fieldLabel: 'Procedimento',
                                name: 'surgical'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            useReadColor: true,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'Data',
                                name: 'dateof'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Hora',
                                name: 'timeof'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'Transportado por',
                                name: 'transportedby'
                            }
                        ]
                    }
                ]
            }
        ]
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