//@charset UTF-8
Ext.define( 'iAdmin.view.helper.equipmentstatus.EquipmentStatusEdit', {
    extend: 'Ext.window.Window',

    xtype: 'equipmentstatusedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.form.field.ComboEnum',
		'iAdmin.model.helper.EquipmentStatus',
		'iAdmin.view.helper.equipmentstatus.EquipmentStatusSearch',
        'iAdmin.view.helper.equipmentstatus.EquipmentStatusController'
    ],

    constrain: true,

    width: 450,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'equipmentstatus',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Equipamento Status',

	listeners: {
		show: 'onViewShow'
	},
	
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
                    allowBlank: false
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    }, {
                        xtype: 'label',
                        cls: 'sub-title-label',
                        text: 'Equipamento Status'
                    }, {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {

                                flex: 2,
                                name: 'blocks',
                                xtype: 'checkboxfield',
                                fieldLabel: 'Fluxo',
                                boxLabel: 'Bloqueia'
                            }, {
                                flex: 4,
                                name: 'isactive',
                                xtype: 'checkboxfield',
                                fieldLabel: 'Status',
                                boxLabel: 'Ativo'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    dockedItems: [
        {
            xtype: 'panel',
            layout: 'hbox',
            bodyPadding: 10,
            bodyStyle: 'background-color: rgba(208, 208, 208, .5);',
            items: [
                {
                    flex: 1,
                    xtype: 'equipmentstatussearch',
                    name: 'search',
					listeners: {
						select: 'onSelectRecord'
					}
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'segmentedbutton',
                    allowMultiple: true,
                    items: [
                        {
                            iconCls: "fa fa-upload",
                            handler: 'updateView'
                        }, {
                            iconCls: "fa fa-file",
                            handler: 'insertView'
                        }
                    ]
                }
            ]
        }
    ]

});