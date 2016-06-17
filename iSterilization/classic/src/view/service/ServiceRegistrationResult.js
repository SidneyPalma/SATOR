//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceRegistrationResult', {
    extend: 'Ext.grid.property.Grid',

    xtype: 'serviceregistrationresult',

    requires: [
        'Ext.grid.property.Grid'
    ],

    cls: 'update-grid',

    rowLines: false,
    columnLines: false,

    listeners: {
		edit: 'updateValues',
        beforeedit: 'updateAccept'
    },

    fnBeforeRender: function (view, eOpts) {
        var me = this;
        me.columns[0].width = 170;
        //me.columns[1].renderer = me.rendererField
    }

});