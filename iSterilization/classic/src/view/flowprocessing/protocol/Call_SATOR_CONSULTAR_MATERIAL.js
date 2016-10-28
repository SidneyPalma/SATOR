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
            materialdetail = view.down('form[name=materialdetail]');

        if (!record) {
            portrait.beFileData();
            materialdetail.update('');
            portrait.update('<div style="position: absolute; padding: 10px 0 0 10px;">...</div>');
            return false;
        }

        materialdetail.update(record.data);
        portrait.beFileData(record.get('filetype'));
        portrait.update(Ext.String.format('<div style="position: absolute; padding: 10px 0 0 10px;">{0}</div>', record.get('colorpallet')));
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
                        readerBarCode: true,
                        name: 'materialname',
                        xtype: 'searchmaterial',
                        hiddenNameId: 'materialid',
                        configStoreListeners: {
                            load: function (store, records, successful, operation, eOpts) {
                                // var searchmaterial = me.down('searchmaterial');
                                // if (store.getCount() == 1) {
                                //     var record = store.getAt(0);
                                //     searchmaterial.fireEvent('select',searchmaterial, record, eOpts);
                                // }
                                // if (store.getCount() >= 2) {
                                //     searchmaterial.expand();
                                // }
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
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 3,
                                height: 250,
                                layout: 'anchor',
                                xtype: 'form',
                                name: 'materialdetail',
                                tpl: [
                                    '<div class="movement consulta" style="margin-top: 20px;">',
                                        '<div class="movement-title"><b>{name}</b></div>',
                                        '<div class="movement-title"><b>Kit:</b> {materialboxname} <b>{materialboxitems}</b></div>',
                                        '<div class="movement-title"><b>Status:</b> {materialstatusdescription}</div>',
                                        '<div><b>Código de Barras: {barcode}</b></div>',
                                        '<div><b>Grupo:</b> {itemgroupdescription}</div>',
                                        '<div><b>Embalagem:</b> {packingname}</div>',
                                        '<div><b style="color: red;">Proprietario:</b> {proprietaryname}</div>',
                                        '<div><b>Rastreabilidade:</b></div>',
                                        '<div>{message}</div>',
                                    '</div>'
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 2,
                                height: 300,
                                margin: '16 0 0 0',
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