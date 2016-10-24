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

    width: 850,
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

        Ext.create('iSterilization.store.armory.ArmoryMovementItem');

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
                        xtype: 'textfield',
                        anchor: '50%',
                        useUpperCase: true,
                        inputType: 'password',
                        name: 'search',
                        listeners: {
                            specialkey: function (field, e, eOpts) {
                                if ([e.ENTER].indexOf(e.getKey()) != -1) {
                                    var view = this.up('window');
                                    view.fireEvent('queryreader', field, e, eOpts);
                                }
                            }
                        }
                    }
                ]
            }
        ];
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