//@charset UTF-8
Ext.define( 'Ext.overrides.data.Connection', {
    override: 'Ext.data.Connection',

    constructor: function () {
        var me = this;
        me.callParent(arguments);
        me.onAfter( 'requestcomplete', me.fnRequestComplete, me);
    },

    fnRequestComplete: function ( conn , response , options , eOpts ) {
        var result = Ext.decode(response.responseText);

        if((response.status == 200) && (result.text == 1)) {
            window.location.reload();
        }
    }

});