//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingClient', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingclient',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.SearchClient',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    controller: 'flowprocessing',

    width: 300,
    modal: true,
    layout: 'fit',
    header: false,
    resizable: false,
    showAnimate: true,

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
                plugins:'formenter',
                bodyPadding: 10,
                margin: '10 0 0 0',
                layout: 'anchor',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false,
                    fieldCls: 'smart-field-style-action'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'anchor',
                        labelCls: 'title-label',
                        fieldLabel: 'Selecionar origem',
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            allowBlank: false,
                            fieldCls: 'smart-field-style-action'
                        },
                        items: [
                            {
                                xtype: 'searchclient',
                                margin: '10 0 0 0',
                                name: 'clientid',
                                readerBarCode: true,
                                listeners: {
                                    select: function (combo,record) {
                                        var view = combo.up('window'),
                                            rows = record.data;

                                        if( view.doCallBack(rows) ) {
                                            view.close();
                                        }
                                    }
                                },
                                configStoreListeners: {
                                    load: function (store, records, successful, operation, eOpts) {
                                        if (store.getCount() == 1) {
                                            var record = records[0],
                                                combo = me.down('searchclient');
                                            combo.fireEvent('select',combo,record,eOpts);
                                        }
                                    }
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
            text: 'Cancelar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.windowClose();
            }
        }
    ]

});