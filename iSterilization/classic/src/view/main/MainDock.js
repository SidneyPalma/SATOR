//@charset UTF-8
Ext.define( 'iSterilization.view.main.MainDock', {
    extend: 'Smart.ux.main.MainDock',

    xtype: 'maindock',

    requires: [
        'Smart.ux.main.MainDock',
		'iAdmin.store.module.ModuleMenuDock',
		'iSterilization.view.main.MainController'
    ],

    controller: 'main',

	initComponent: function () {
		var me = this;

		Ext.create('iAdmin.store.module.ModuleMenuDock');

		me.callParent();
	},

    items: [
        {
			xtype: 'tabpanel',
			items: [
				{
					iconCls: "fa fa-bars",
					title: "Ajustes",
					xtype: "gridpanel",
					store: "modulemenudock",
					listeners: {
						itemclick: "onViewEditShow"
					},
					columns: [
						{
							flex: 1,
							dataIndex: 'name',
							renderer: function (value,meta,rec) {
								var glyph = rec.get('glyph'),
									description = rec.get('description'),
									complements = '<div style="float: left; font-size: 20px; width: 30px; color: rgb(33, 150, 243);">' +
													'<i class="{0}"></i>' +
												  '</div>' +
												  '<div style="width: 100%;">' +
													'<div style="font-size: 18px;">{1}</div>' +
													'<div>{2}</div>' +
												  '</div>';

								return Ext.String.format(complements,glyph,value,description);
							}
						}
					]
				}, {
					title: 'Notas',
					iconCls: "fa fa-comments"
				}
			]
        }
    ]	

});