//@charset UTF-8
Ext.define( 'iAdmin.view.helper.areas.CMEAreasController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.cmeareas',

    fetchField: function (search, button) {
        Ext.getStore('cmeareasstock').setParams({
            query: search.getValue()
        }).load();
    },

    onViewShow: function (panel, eOpts) {
        var me = this,
            view = me.getView(),
            record = Ext.create('iAdmin.model.areas.CMEAreas');

        view.down('form').loadRecord(record);
    },

    onSelectRecord: function (combo, record, eOpts) {
        var me = this,
            view = me.getView();

        view.down('form').loadRecord(record);
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('cmeareas');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();
    },

    onEditTypeFlow: function (editor, context, eOpts) {
        var gd = context.grid,
            store = gd.getStore(),
            record = context.record,
            name = record.get('name'),
            barcode = record.get('barcode');

        if(!name || !barcode) {
            return false;
        }

        store.sync({
            success: function (batch, options) {
                var opr = batch.getOperations()[0],
                    rec = opr.getRecords()[0];
                if(options.operations.create) {
                    record.set('id',rec.get('id'));
                }
            }
        });
    }

});