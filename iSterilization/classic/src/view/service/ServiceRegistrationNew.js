//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceRegistrationNew', {
    extend: 'Ext.window.Window',

    xtype: 'serviceregistrationnew',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum',
        'iSterilization.view.service.ServiceItemBaseSearch',
        'iSterilization.view.service.ServiceRegistrationController'
    ],

    width: 550,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'serviceregistration',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Novo Serviço',

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
                plugins: [
                    'formenter'
                ],
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    allowBlank: false
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        columns: 3,
                        vertical: false,
                        xtype: 'radiogroup',
                        labelCls: 'sub-title-label',
                        fieldLabel: 'Tipo de Registro',
                        items: [
                            { boxLabel: 'Insumo', name: 'registrationtype', inputValue: 'I', checked: true },
                            { boxLabel: 'Material', name: 'registrationtype', inputValue: 'M' },
                            { boxLabel: 'Equipamento', name: 'registrationtype', inputValue: 'E' }
                        ],
                        listeners: {
                            change: 'onRegistrationTypeChange'
                        }
                    }, {
                        name: 'itembasename',
                        hiddenNameId: 'itembaseid',
                        fieldLabel: 'Item',
                        xtype: 'serviceitembasesearch',
                        fieldCls: 'smart-field-style-action',
                        listeners: {
                            select: 'onSelectServiceRegistration',
                            beforequery: 'onBeforeQueryServiceRegistration'
                        }
                    }, {
                        allowBlank: true,
                        xtype: 'hiddenfield',
                        name: 'cmeareasid'
                    }, {
                        allowBlank: true,
                        useReadColor: true,
                        fieldLabel: 'Área CME',
                        name: 'cmeareasname',
                        fieldCls: 'smart-field-style-action'
                    }, {
                        showClear: true,
                        xtype: 'comboenum',
                        fieldLabel: 'Tipo de Serviço',
                        name: 'servicetypedescription',
                        fieldCls: 'smart-field-style-action'
                    }, {
                        fieldLabel: 'Descrição',
                        name: 'description'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            iconCls: "fa fa-upload",
            text: 'Confirmar',
            showSmartTheme: 'red',
            handler: 'insertView'
        }, {
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]

});