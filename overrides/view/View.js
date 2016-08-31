//@charset UTF-8
Ext.define( 'Ext.overrides.view.View', {
    override: 'Ext.view.View',

    loadingText: 'Carregando...!',
    emptyText: '<h4 style="text-align: center; line-height: 40px; width: 100%;">Nenhum dado disponivel...</h4>',

    getWidgetRecord: function () {
        var me = this,
            sm = me.getSelectionModel(),
            records = sm.getSelection();

        return records.length ? records[0] : null;
    },

    config: {
        url: null,
        fields: null,
        params: {
            query: '%',
            action: 'select',
            method: 'selectLike',
            field: 'description'
        }
    },

    initComponent: function () {
        var me = this;

        me.initConfig();
        me.buildStore();
        me.callParent();
    },

    buildStore: function () {
        var me = this;

        if(me.getFields()) {
            me.store = Ext.create(
                Ext.define( me.getXType() + 'Store', {
                    extend: 'Smart.data.StoreBase',
                    url: me.getUrl(),
                    storeId: me.getXType(),
                    fields: me.getFields()
                })
            ).setParams(me.params);
        }
    }

});