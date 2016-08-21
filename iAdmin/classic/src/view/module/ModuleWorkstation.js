//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleWorkstation', {
    extend: 'Ext.window.Window',

    xtype: 'moduleworkstation',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'iAdmin.view.helper.areas.AreasSearch'
    ],

    width: 500,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'module',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Estação de Trabalho',

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
                    useReadColor: true
                },
                items: [
                    {
                        pageSize: 10,
                        fieldLabel: 'Área',
                        xtype: 'areassearch',
                        hiddenNameId: 'areasid',
                        fieldCls: 'smart-field-style-action',
                        name: 'areasname',
                        listeners: {
                            select: 'onSelectArea',
                            beforequery: 'onBeforeQueryArea'
                        }
                    }, {
                        xtype: 'hiddenfield',
                        name: 'workstation'
                    }, {
                        fieldLabel: 'Servidor de impressão',
                        xtype: 'textfield',
                        name: 'printlocate',
                        fieldCls: 'smart-field-style-action'
                    }
                ]
            }
        ]
    },

    buttonAlign: 'center',

    buttons: [
        {
            scale: 'medium',
            text: 'Desfazer',
            handler: 'deleteWorkstation'
        }, {
            scale: 'medium',
            text: 'Salvar',
            showSmartTheme: 'red',
            handler: 'updateWorkstation'
        }, {
            scale: 'medium',
            text: 'Fechar',
            showSmartTheme: 'red',
            handler: 'closedView'
        }
    ]

});
