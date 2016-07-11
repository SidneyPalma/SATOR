//@charset UTF-8
Ext.define( 'iAdmin.view.person.collaborator.CollaboratorEdit', {
    extend: 'Ext.window.Window',

    xtype: 'collaboratoredit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.plugins.TextMask',
        'Smart.form.field.ComboEnum',
        'iAdmin.view.users.UsersSearch',
        'iAdmin.model.person.Collaborator',
        'iAdmin.view.helper.classcouncil.ClassCouncilSearch',
        'iAdmin.view.person.collaborator.CollaboratorSearch',
        'iAdmin.view.person.collaborator.CollaboratorController'
    ],

    constrain: true,

    width: 650,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    cls: 'panel-frame',
    controller: 'collaborator',
    iconCls: "fa fa-pencil",

    title: 'Editar Colaborador',

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
                        text: 'Colaborador'
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
                                margin: '0 5 0 0',
                                name: 'name',
                                fieldLabel: 'Nome'
                            }, {
                                width: 150,
                                margin: '0 0 0 5',
                                fieldLabel: 'Login',
                                xtype: 'userssearch',
                                hiddenNameId: 'usersid',
                                name: 'username'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'datefield',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 1,
                                margin: '0 5 0 0',
                                fieldLabel: 'Data Admissão',
                                name: 'dateadmission',
                                plugins: 'textmask'
                            }, {
                                flex: 1,
                                margin: '0 5 0 5',
                                allowBlank: true,
                                fieldLabel: 'Data Demissão',
                                name: 'dateresignation',
                                plugins: 'textmask'
                            }, {
                                width: 150,
                                xtype: 'textfield',
                                margin: '0 0 0 5',
                                name: 'registration',
                                fieldLabel: 'Matrícula'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        items: [
                            {
                                flex: 1,
                                margin: '0 5 0 0',
                                fieldLabel: 'Conselho de Classe',
                                xtype: 'classcouncilsearch',
                                hiddenNameId: 'classcouncilid',
                                name: 'classcouncilname'
                            }, {
                                width: 170,
                                margin: '0 5 0 5',
                                xtype: 'comboenum',
                                fieldLabel: 'UF',
                                name: 'federationunitdescription'
                            }, {
                                width: 150,
                                margin: '0 0 0 5',
                                name: 'classcouncilcode',
                                fieldLabel: 'Código Conselho'
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
                    xtype: 'collaboratorsearch',
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