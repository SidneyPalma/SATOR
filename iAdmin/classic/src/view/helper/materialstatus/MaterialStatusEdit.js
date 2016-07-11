//@charset UTF-8
Ext.define( 'iAdmin.view.helper.materialstatus.MaterialStatusEdit', {
    extend: 'Ext.window.Window',

    xtype: 'materialstatusedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.form.field.ComboEnum',
		'iAdmin.model.helper.MaterialStatus',
		'iAdmin.view.helper.materialstatus.MaterialStatusSearch',
        'iAdmin.view.helper.materialstatus.MaterialStatusController'
    ],

    constrain: true,

    width: 450,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'materialstatus',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Material Status',

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
                        text: 'Material Status'
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
                    xtype: 'materialstatussearch',
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