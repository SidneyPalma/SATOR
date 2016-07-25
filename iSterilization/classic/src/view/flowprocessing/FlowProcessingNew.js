//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.FlowProcessingNew', {
    extend: 'Ext.window.Window',

    xtype: 'flowprocessingnew',

    requires: [
        'Ext.form.Panel',
        'Smart.plugins.*',
        'Ext.window.Window',
        'Smart.form.field.ComboEnum'
    ],

    width: 550,
    modal: true,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'flowprocessing',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Iniciar Nova Leitura',

    initComponent: function () {
        var me = this;
        me.buildItems();
        me.callParent();
    },

    buildItems: function () {
        var me = this;


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