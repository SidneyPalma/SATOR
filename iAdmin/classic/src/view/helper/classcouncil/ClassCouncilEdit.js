//@charset UTF-8
Ext.define( 'iAdmin.view.helper.classcouncil.ClassCouncilEdit', {
    extend: 'Ext.window.Window',

    xtype: 'classcounciledit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.form.field.ComboEnum',
		'iAdmin.model.helper.ClassCouncil',
		'iAdmin.view.helper.classcouncil.ClassCouncilSearch',
        'iAdmin.view.helper.classcouncil.ClassCouncilController'
    ],

    constrain: true,

    width: 450,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'classcouncil',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Conselho de Classe',

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
                        text: 'Conselho'
                    }, {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            allowBlank: false
                        },
                        items: [
                            {
                                flex: 3,
                                margin: '0 5 0 0',
                                fieldLabel: 'Sigla',
                                xtype: 'textfield',
                                name: 'acronym'
                            }, {
                                flex: 2,
                                margin: '0 0 0 5',
                                fieldLabel: 'CNES',
                                xtype: 'textfield',
                                name: 'cnes'
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
                    xtype: 'classcouncilsearch',
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