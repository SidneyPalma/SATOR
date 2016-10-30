//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_CONSULTAR_MATERIAL', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_CONSULTAR_MATERIAL',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 850,
    modal: true,
    layout: 'fit',
    header: false,
    resizable: false,
    showAnimate: true,

    controller: 'flowprocessing',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    showData: function (record) {
        var view = this,
            portrait = view.down('portrait'),
            searchmaterial = view.down('searchmaterial'),
            materialdetail = view.down('container[name=materialdetail]'),
            materialmessage = view.down('container[name=materialmessage]');

        if (!record) {
            portrait.beFileData();
            materialdetail.update('');
            materialmessage.update('');
            portrait.update('<div style="position: absolute; padding: 10px 0 0 10px;">...</div>');
            return false;
        }

        materialdetail.update(record.data);
        searchmaterial.getTrigger('clear').show();
        portrait.beFileData(record.get('filetype'));
        portrait.update(Ext.String.format('<div style="position: absolute; padding: 10px 0 0 10px;">{0}</div>', record.get('colorpallet')));

        Ext.Ajax.request({
            scope: view,
            url: record.store.getUrl(),
            params: {
                action: 'select',
                method: 'getAvailableForProcessing',
                query: record.get('barcode')
            },
            callback: function (options, success, response) {
                var result = Ext.decode(response.responseText);

                if(!success || !result.success) {
                    Smart.Msg.showToast(result.text,'error');
                    return false;
                }
                materialmessage.update(result.rows[0]);
            }
        });
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
                    allowBlank: true,
                    fieldCls: 'smart-field-style-action',
                    labelCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'title-label',
                        text: 'Consultar Material'
                    }, {
                        margin: '20 0 0 0',
                        name: 'materialname',
                        xtype: 'searchmaterial',
                        hiddenNameId: 'materialid',
                        configStoreListeners: {
                            load: function (store, records, successful, operation, eOpts) {
                                var searchmaterial = me.down('searchmaterial');
                                if (store.getCount() == 1) {
                                    var record = store.getAt(0);
                                    searchmaterial.setRawValue(record.get('name'));
                                    searchmaterial.fireEvent('select',searchmaterial, record, eOpts);
                                }
                                if (store.getCount() >= 2) {
                                    searchmaterial.expand();
                                }
                                if (store.getCount() == 0) {
                                    me.showData();
                                }
                            }
                        },
                        listeners: {
                            showclear: function (combo) {
                                var view = combo.up('window');
                                combo.reset();
                                view.showData();
                            },
                            select: function (combo,record,eOpts) {
                                var view = combo.up('window');
                                view.showData(record);
                            }
                        }
                    }, {
                        height: 20,
                        xtype: 'container'
                    }, {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 3,
                                height: 300,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                xtype: 'container',
                                items: [
                                    {
                                        flex: 1,
                                        xtype: 'container',
                                        name: 'materialdetail',
                                        tpl: [
                                            '<div class="movement consulta">',
                                                '<div class="movement-title"><b>{name}</b></div>',
                                                '<div class="movement-title"><b>Kit:</b> {materialboxname} <b>{materialboxitems}</b></div>',
                                                '<div class="movement-title"><b>Status:</b> {materialstatusdescription}</div>',
                                                '<div><b>Código de Barras: {barcode}</b></div>',
                                                '<div><b>Grupo:</b> {itemgroupdescription}</div>',
                                                '<div><b>Embalagem:</b> {packingname}</div>',
                                                '<div><b style="color: red;">Proprietario:</b> {proprietaryname}</div>',
                                            '</div>'
                                        ]
                                    }, {
                                        height: 70,
                                        xtype: 'container',
                                        name: 'materialmessage',
                                        tpl: [
                                            '<div class="movement consulta">',
                                                '<div class="movement-title"><b>Localização:</b></div>',
                                                '<div><b style="color: red;">{message}</b></div>',
                                            '</div>'
                                        ]
                                    }
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 2,
                                height: 300,
                                hideButtons: true,
                                xtype: 'portrait'
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