//@charset UTF-8
Ext.define( 'iAdmin.view.person.entity.EntityEdit', {
    extend: 'Ext.window.Window',

    xtype: 'entityedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.form.field.ComboEnum',
		'iAdmin.model.person.Entity',
        'iAdmin.view.person.entity.EntitySearch',
        'iAdmin.view.person.entity.EntityController',
        'iAdmin.view.person.collaborator.CollaboratorSearch'
    ],

    constrain: true,

    width: 550,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    cls: 'panel-frame',
    controller: 'entity',
    iconCls: "fa fa-pencil",

    title: 'Editar Entidade',

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
                        text: 'Entidade'
                    }, {
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        name: 'legalname',
                        fieldLabel: 'Razão Social'
                    }, {
                        fieldLabel: 'Responsável CME',
                        xtype: 'collaboratorsearch',
                        hiddenNameId: 'collaboratorid',
                        name: 'collaboratorname'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 1,
                                fieldLabel: 'CNPJ',
                                name: 'cnpjnumber'
                            }, {
                                xtype: 'splitter'
                            }, {
                                flex: 1,
                                fieldLabel: 'CNES',
                                name: 'cnesnumber'
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
                    xtype: 'entitysearch',
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