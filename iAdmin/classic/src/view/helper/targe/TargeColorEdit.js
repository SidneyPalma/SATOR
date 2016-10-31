//@charset UTF-8
Ext.define( 'iAdmin.view.helper.targe.TargeColorEdit', {
    extend: 'Ext.window.Window',

    xtype: 'targecoloredit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.form.field.ComboEnum',
        'iAdmin.model.helper.TargeColor',
		'iAdmin.view.helper.targe.TargeColorSearch',
        'iAdmin.view.helper.targe.TargeColorController'
    ],

    constrain: true,

    width: 550,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    cls: 'panel-frame',
    controller: 'targecolor',
    iconCls: "fa fa-pencil",

    title: 'Editar Cor',

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
                        name: 'id',
                        allowBlank: true
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Seleção de cor',
                        labelCls: 'smart-field-style-action',
                        layout: 'anchor',
                        defaults: {
                            flex: 1,
                            anchor: '100%',
                            allowBlank: false
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'name',
                                fieldLabel: 'Nome'
                            }
                        ]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Paleta',
                        labelCls: 'smart-field-style-action',
                        layout: 'hbox',
                        defaults: {
                            flex: 1,
                            allowBlank: false,
                            useUpperCase: true
                        },
                        items: [
                            {
                                margin: '0 5 0 0',
                                fieldLabel: 'Fundo',
                                name: 'colorschema',
                                xtype: 'colorfield'
                            }, {
                                margin: '0 0 0 5',
                                fieldLabel: 'Linha',
                                name: 'colorstripe',
                                xtype: 'colorfield'
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
                    xtype: 'targecolorsearch',
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