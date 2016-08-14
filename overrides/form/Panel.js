//@charset UTF-8
Ext.define( 'Ext.overrides.form.Panel', {
    override: 'Ext.form.Panel',

    initComponent: function () {
        var me = this;
        
        if(me.showSmartTransparent === true) {
            me.bodyStyle = Ext.apply({backgroundColor: 'transparent'},me.bodyStyle);
        }

        me.callParent(arguments);

        me.onBefore( 'beforeaction', me.fnBeforeAction, me);
    },

    fnBeforeAction: function ( basic, action, eOpts ) {
        var params = action.params;

        try {
            var rows = Ext.decode(params.rows);
            if(rows.id.indexOf('SMART_') != -1) {
                rows.id = (rows.id.indexOf('SMART_') == -1) ? rows.id : '';
                action.params.rows = Ext.encode(rows);
            }
        }
        catch(err) {
        }
    }

});