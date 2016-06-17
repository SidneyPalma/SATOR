//@charset UTF-8
Ext.define( 'iAdmin.view.person.proprietary.ProprietaryEdit', {
    extend: 'Ext.window.Window',

    xtype: 'proprietaryedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.plugins.TextMask',
        'Smart.form.field.ComboEnum',
		'iAdmin.model.person.Proprietary',
        'iAdmin.view.person.proprietary.ProprietarySearch',
        'iAdmin.view.person.proprietary.ProprietaryController'
    ],

    constrain: true,

    width: 450,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    cls: 'panel-frame',
    controller: 'proprietary',
    iconCls: "fa fa-pencil",

    title: 'Editar Proprietário',

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
                        xtype: 'label',
                        cls: 'sub-title-label',
                        text: 'Proprietário'
                    }, {
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        name: 'contactperson',
                        fieldLabel: 'Pessoa contato'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            flex: 1,
                            allowBlank: false
                        },
                        items: [
                            {
                                margin: '0 5 0 0',
                                name: 'contactsphone',
                                fieldLabel: 'Fone para contato'
                            }, {
                                margin: '0 0 0 5',
                                fieldLabel: 'Código de barra',
                                name: 'barcode'
                            }
                        ]
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
                    xtype: 'proprietarysearch',
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