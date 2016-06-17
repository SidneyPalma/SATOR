//@charset UTF-8
Ext.define( 'iAdmin.view.helper.instrumentator.InstrumentatorEdit', {
    extend: 'Ext.window.Window',

    xtype: 'instrumentatoredit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.form.field.ComboEnum',
		'iAdmin.model.helper.Instrumentator',
		'iAdmin.view.helper.instrumentator.InstrumentatorSearch',
        'iAdmin.view.helper.instrumentator.InstrumentatorController'
    ],

    constrain: true,

    width: 450,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'instrumentator',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Instrumentador',

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
                        text: 'Instrumentador'
                    }, {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        name: 'isactive',
                        xtype: 'checkboxfield',
                        fieldLabel: 'Status',
                        boxLabel: 'Ativo'
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
                    xtype: 'instrumentatorsearch',
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