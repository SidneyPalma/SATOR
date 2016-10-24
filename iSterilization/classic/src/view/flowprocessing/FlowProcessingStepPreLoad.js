//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingStepPreLoad', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingsteppreload',

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

    doCallBack: Ext.emptyFn,

    // listeners: {
    //     queryreader: 'onSelectHoldItem'
    // },

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
                        text: 'Preparar Leituras'
                    }, {
                        xtype: 'hiddenfield',
                        name: 'clientid'
                    }, {
                        margin: '20 0 0 0',
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            useUpperCase: true,
                            fieldCls: 'smart-field-style-action',
                            labelCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                flex: 1,
                                name: 'searchmaterial',
                                inputType: 'password',
                                fieldLabel: 'Consultar material',
                                listeners: {
                                    specialkey: function (field, e, eOpts) {
                                        if ([e.ENTER].indexOf(e.getKey()) != -1) {
                                            var view = this.up('window');
                                            view.fireEvent('queryreader', field, e, eOpts);
                                        }
                                    }
                                }
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                useReadColor: true,
                                fieldLabel: 'Cliente',
                                name: 'clientname'
                            }
                        ]
                    }, {
                        height: 350,
                        rowLines: true,
                        margin: '10 0 0 0',
                        xtype: 'gridpanel',
                        cls: 'update-grid',
                        url: '../iSterilization/business/Calls/Heart/HeartFlowProcessing.php',
                        params: {
                            action: 'select',
                            method: 'selectHold',
                            areasid: Smart.workstation.areasid
                        },

                        fields: [
                            {
                                name: 'id',
                                type: 'int'
                            }, {
                                name: 'barcode',
                                type: 'auto'
                            }, {
                                name: 'materialname',
                                type: 'auto'
                            }, {
                                name: 'clientname',
                                type: 'auto'
                            }
                        ],

                        columns: [
                            {
                                //     width: 80,
                                //     height: 60,
                                //     renderer: function (value,metaData,record) {
                                //         var url = '../iSterilization/business/Calls/armorymovement.php',
                                //             img =  '<div style="margin-top: 6px;"><img src="{0}?action=select&method=renderCode&barCode={1}" id="SATOR-{2}" /></div>';
                                //         return Ext.String.format(img,url,record.get('barcode'),record.get('id'));
                                //     }
                                // }, {
                                flex: 1,
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
        ];
    },

    buttonAlign: 'center',

    buttons: [
        {
            scale: 'medium',
            text: 'Confirmar',
            showSmartTheme: 'blue'
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