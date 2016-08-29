//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.protocol.Call_SATOR_RELATAR_EXCEPTION', {
    extend: 'Ext.window.Window',

    xtype: 'call_SATOR_RELATAR_EXCEPTION',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'iSterilization.view.flowprocessing.FlowProcessingController'
    ],

    width: 300,
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
                        text: 'Exceções'
                    }, {
                        height: 20,
                        xtype: 'container'
                    }, {
                        xtype: 'label',
                        style: 'color: blue;',
                        text: 'Áreas com leituras',
                        cls: 'sub-title-label'
                    }, {
                        height: 160,
                        margin: '10 0 0 0',
                        cls: 'update-grid',
                        xtype: 'gridpanel',
                        store: Ext.create('Ext.data.Store'),
                        columns: [
                            {
                                flex: 1,
                                sortable: false,
                                dataIndex: 'name'
                            }
                        ],
                        listeners: {
                            select: 'onSelectExceptionArea'
                        }
                    }, {
                        margin: '20 0 10 0',
                        xtype: 'radiogroup',
                        columns: 1,
                        vertical: true,
                        labelStyle: 'color: blue;',
                        fieldLabel: 'Tipo de exceção',
                        labelCls: 'sub-title-label',
                        items: [
                            { boxLabel: 'Altera', name: 'flowexception', inputValue: 1 },
                            { boxLabel: 'Quebra', name: 'flowexception', inputValue: 2 }
                        ],
                        listeners: {
                            change: 'onChangeTypeException'
                        }
                    }, {
                        xtype: 'label',
                        style: 'color: blue;',
                        text: 'Áreas com exceções',
                        cls: 'sub-title-label'
                    }, {
                        margin: '5 0 0 0',
                        useReadColor: true,
                        name: 'elementname',
                        pageSize: 0,
                        xtype: 'combobox',
                        editable: false,
                        valueField: 'id',
                        displayField: 'elementname',
                        store: { data: [] },
                        listeners: {
                            select: 'onSelectElementName'
                        }
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
                click: 'relatarExceptionDo'
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