//@charset UTF-8
Ext.define( 'iAdmin.view.helper.place.PlaceEdit', {
    extend: 'Ext.window.Window',

    xtype: 'placeedit',

    requires: [
        'Ext.form.Panel',
        'Ext.window.Window',
        'Ext.button.Segmented',
        'Smart.form.field.ComboEnum',
		'iAdmin.model.helper.Place',
		'iAdmin.view.helper.place.PlaceSearch',
        'iAdmin.view.helper.place.PlaceController'
    ],

    constrain: true,

    width: 450,
    resizable: false,
    showAnimate: true,
    layout: 'fit',
    controller: 'place',
    cls: 'panel-frame',
    iconCls: "fa fa-pencil",

    title: 'Editar Local',

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
                        text: 'Local'
                    }, {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        name: 'name',
                        fieldLabel: 'Nome'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Descrição',
                        name: 'description'
                    }, {
                        fieldLabel: 'Cliente',
                        xtype: 'clientsearch',
                        hiddenNameId: 'clientid',
                        name: 'clientname'
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
                    xtype: 'placesearch',
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