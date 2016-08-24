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
			xtype: 'panel',
			scrollable: 'y',
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
									complements = '<div style="float: left; font-size: 20px; width: 30px; color: rgb(194, 52, 92);">' +
										'<i class="{0}"></i>' +
										'</div>' +
										'<div style="width: 100%;">' +
										'<div style="font-size: 18px;">{1}</div>' +
										'<div>{2}</div>' +
										'</div>';

								return Ext.String.format(complements,glyph,value,description);
							}
						}
					],
					dockedItems: [
						{
							xtype:  'panel',
							layout: 'anchor',
							bodyStyle: 'background-color: rgb(246, 246, 246);',
							cls: 'maindock-header',
							defaults: {
								anchor: '100%'
							},
							items: [
								{
									xtype: 'component',
									html: [
										'<div style="padding-left: 10px;">',
										'<h3>',
										'<i class="fa fa-comments-o" style="font-size: 18px; padding-right: 5px;"></i>',
										'Cadastros Auxiliares',
										'</h3>',
										'</div>'
									]
								}, {
									cls: 'search',
									name: 'search',
									xtype: 'textfield',
									showClear: true,
									emptyText: 'Pesquisar',
									listeners: {
										change: 'storeField'
									}
								}
							]
						}
					]
				}
			]
		}
	]

});