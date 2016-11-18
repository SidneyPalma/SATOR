//@charset UTF-8
Ext.define( 'Smart.data.StoreBase', {
    extend: 'Ext.data.Store',

    pageSize: 10,

    requires: [
        'Smart.data.proxy.AjaxBase'
    ],

    proxy: {
        type: 'ajaxbase'
    },

    constructor: function (config) {
        var me = this;

        me.callParent();
        me.getProxy().setUrl((config) ? config.url : me.url);
        me.getProxy().setApiUrl();

        me.onBefore( 'write', me.fnWrite, me);
        me.onBefore( 'beforeload', me.fnBeforeLoad, me);
    },

    fnBeforeLoad: function (store, operation, eOpts) {
        var me = store;
        me.removeAll();
        me.getProxy().setExtraParams(me.getExtraParams());
    },

    fnWrite: function (store, operation, eOpts) {
        var result = operation.getResultSet();

        return result.getSuccess();
    }

});