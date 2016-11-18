//@charset UTF-8
Ext.define( 'Ext.overrides.data.Store', {
    override: 'Ext.data.Store',

    autoLoad: false,

    config: {
        url: null,
        urlRoute: null,
        extraParams: {
            query: '',
            rows: '{"id":""}',
            fields: Ext.encode([]),
            params: Ext.encode(['description']),
            action: 'select',
            method: 'selectLike'
        }
    },

    constructor: function () {
        var me = this;
        me.callParent();
        me.onAfter( 'load', me.fnLoad, me);
    },

    fnLoad: function ( store , records , successful , operation , eOpts ) {
// console.info(operation);
        // if((response.status == 200) && (result.text == 1)) {
        //     window.location.reload();
        // }
    },

    getUrl: function() {
        var me = this;
        return me.urlRoute ? (me.urlRoute + me.url) : me.url;
    },

    setUrl: function( value ) {
        var me = this;

        me.url = value;
        me.getProxy().setUrl(value);
        me.getProxy().setApiUrl();

        return me;
    },

    setParams: function (params) {
        var me = this,
            extraParams = me.getExtraParams();

        //me.currentPage = 1;
        me.setExtraParams(Ext.Object.merge(extraParams,params));

        return me;
    }

});