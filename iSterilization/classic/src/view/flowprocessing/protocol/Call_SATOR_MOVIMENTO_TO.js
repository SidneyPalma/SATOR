//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_MOVIMENTO_TO', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_MOVIMENTO_TO',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Ext.grid.column.*',
        'Smart.plugins.TextMask',
        'Smart.form.field.ComboEnum',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.view.person.client.ClientSearch',
        'iSterilization.view.flowprocessing.SearchPatient',
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
            dateof = me.down('datefield'),
            clienttype = record.get('clienttype'),
            surgicalroom = me.down('textfield[name=surgicalroom]');

        me.showSurgical(false);

        me.down('fieldcontainer[name=group_01]').hide();
        me.down('fieldcontainer[name=group_02]').hide();
        me.down('fieldcontainer[name=group_03]').hide();

        if (clienttype == '004') {
            me.showSurgical(true);
            surgicalroom.focus(false, 200);
            me.down('fieldcontainer[name=group_01]').show();
            me.down('fieldcontainer[name=group_02]').show();
            me.down('fieldcontainer[name=group_03]').show();
        }

        if (clienttype != '004') {
            dateof.focus(false, 200);
        }

        me.updPosition();
    },

    showSurgical: function (value) {
        var me = this,
            dateof = me.down('datefield'),
            timeof = me.down('timefield'),
            searchpatient = me.down('searchpatient'),
            flowing = me.down('textfield[name=flowing]'),
            surgical = me.down('textfield[name=surgical]'),
            surgicalroom = me.down('textfield[name=surgicalroom]'),
            instrumentator = me.down('textfield[name=instrumentator]');

        dateof.reset();
        timeof.reset();

        flowing.reset();
        flowing.setReadColor(!value);

        surgical.reset();
        surgical.setReadColor(!value);

        surgicalroom.reset();
        surgicalroom.setReadColor(!value);

        searchpatient.reset();
        searchpatient.setReadColor(!value);

        instrumentator.reset();
        instrumentator.setReadColor(!value);
    },

    showClearClient: function (field, eOpts) {
        var me = field.up('window'),
            surgicalroom = me.down('textfield[name=surgicalroom]');

        surgicalroom.reset();
        surgicalroom.setReadColor(true);

        me.down('fieldcontainer[name=group_01]').hide();
        me.down('fieldcontainer[name=group_02]').hide();
        me.down('fieldcontainer[name=group_03]').hide();

        me.updPosition();
    },

    buildItems: function () {
        var me = this;

        Ext.create('iSterilization.store.armory.ArmoryMovementOutput');
        
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
                                name: 'areasname'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                xtype: 'comboenum',
                                name: 'movementtypedescription',
                                hiddenNameId: 'movementtype'
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
                                xtype: 'comboenum',
                                name: 'releasestypedescription',
                                hiddenNameId: 'releasestype'
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
                                pageSize: 0,
                                useReadColor: true,
                                fieldLabel: 'Aviso Cirurgia',
                                name: 'patientname',
                                xtype: 'searchpatient',
                                hiddenNameId: 'surgicalwarning'
                            }
                        ]
                    }, {
                        hidden: true,
                        name: 'group_02',
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
                        hidden: true,
                        name: 'group_03',
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
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            allowBlank: false,
                            // useReadColor: true,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                xtype: 'datefield',
                                fieldLabel: 'Data',
                                plugins: 'textmask',
                                name: 'dateof'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                xtype: 'timefield',
                                fieldLabel: 'Hora',
                                plugins: 'textmask',
                                name: 'timeof'
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
            name: 'confirm',
            text: 'Confirmar',
            showSmartTheme: 'green',
            listeners: {
                click: 'setMovementOutput'
            }
        }, {
            scale: 'medium',
            text: 'Cancelar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});