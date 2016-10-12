//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_MOVIMENTO_OF', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_MOVIMENTO_OF',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 550,
    modal: true,
    header: false,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'flowprocessing',
    cls: 'panel-frame',
    iconCls: "fa fa-file-archive-o",

    title: 'Movimento',

    doCallBack: Ext.emptyFn,

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
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
                            useReadColor: true
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
                            }, {
                                width: 150,
                                xtype: 'container'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            useReadColor: true
                        },
                        items: [
                            {
                                flex: 1,
                                name: 'movementuser'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                name: 'movementdateformat'
                            }, {
                                width: 150,
                                xtype: 'container'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            fieldCls: 'smart-field-style-action',
                            labelCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                margin: '20 0 0 0',
                                useUpperCase: true,
                                fieldLabel: 'Aguardando',
                                name: 'search',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.TAB,e.ENTER].indexOf(e.getKey()) != -1) {
                                            var me = this,
                                                button = me.up('window').down('button[name=confirm]');
                                            button.fireEvent('click', button);
                                        }
                                    }
                                }
                            }, {
                                width: 150,
                                xtype: 'container'
                            }
                        ]
                    }, {
                        height: 350,
                        margin: '10 0 0 0',
                        xtype: 'gridpanel',
                        cls: 'flowprocessinghold',
                        store: 'armorymovementitem',
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
            showSmartTheme: 'green'
            // listeners: {
            //     click: 'relatarUsaEPI'
            // }
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