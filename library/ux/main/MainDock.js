Ext.define( 'Smart.ux.main.MainDock', {
	extend: 'Ext.window.Toast',

    requires: [
        'Ext.window.Toast'
    ],

    cls: 'maindock',

	width: 260,
    align: 'tr',
    height: 520,
	layout: 'fit',
    paddingX: 0,
    paddingY: 64,
	bodyPadding: 0,
    alwaysOnTop: true,

    listeners: {
        render: 'onDockRender'
    }

});