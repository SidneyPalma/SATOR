//@charset UTF-8
Ext.define( 'Ext.overrides.form.field.Picker', {
    override: 'Ext.form.field.Picker',

    initComponent: function () {
        var me = this;

        this.callParent();

        me.on({
            itemclick: { fn: 'fnItemClick', scope: me }
        });
    },

    fnItemClick: function(e, t) {
        console.info( e, t);
    }

});