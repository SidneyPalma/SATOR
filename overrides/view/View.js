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
    }

});