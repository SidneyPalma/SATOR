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

    width: 650,
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
                        text: 'Consultar Material'
                    }, {
                        margin: '20 0 0 0',
                        fieldLabel: 'Material',
                        xtype: 'searchmaterial',
                        hiddenNameId: 'materialid',
                        name: 'materialname',
                        listeners: {
                            showclear: function (combo) {
                                var view = combo.up('window'),
                                    portrait = view.down('portrait'),
                                    materialdetail = view.down('form[name=materialdetail]');

                                materialdetail.update({
                                    'Grupo:': '',
                                    'Status:':'',
                                    'Kit:':'',
                                    'Embalagem:':'',
                                    'Proprietario': ''
                                });
                                if(portrait) {
                                    portrait.beFileData();
                                }
                            },
                            select: function (combo,record,eOpts) {
                                var view = combo.up('window'),
                                    portrait = view.down('portrait'),
                                    materialdetail = view.down('form[name=materialdetail]');

                                materialdetail.update(record.data);

                                if(portrait) {
                                    portrait.beFileData(record.get('filetype'));
                                }
                            }
                        }
                    }, {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                flex: 1,
                                height: 200,
                                layout: 'anchor',
                                xtype: 'form',
                                name: 'materialdetail',
                                tpl: [
                                    '<div style="font-size: 16px; font-family: Monda;">',
                                        '<p><b>Grupo:</b> {itemgroupdescription}</p>',
                                        '<p><b>Status:</b> {materialstatusdescription}</p>',
                                        '<p><b>Kit:</b> {materialboxname}</p>',
                                        '<p><b>Embalagem:</b> {packingname}</p>',
                                        '<p><b style="color: red;">Proprietario:</b> {proprietaryname}</p>',
                                        '<p><b style="color: blue; font-size: 22px;">Código de Barras:</b> {barcode}</p>',
                                    '</div>'
                                ]
                            }, {
                                xtype: 'splitter'
                            }, {
                                height: 200,
                                margin: '20 0 0 0',
                                flex: 1,
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