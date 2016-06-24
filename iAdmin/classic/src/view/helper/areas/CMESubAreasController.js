//@charset UTF-8
Ext.define( 'iAdmin.view.helper.areas.CMESubAreasController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.cmesubareas',

    onViewShow: function (panel, eOpts) {
        var me = this,
            view = me.getView(),
            record = Ext.create('iAdmin.model.areas.CMESubAreas');

        view.down('form').loadRecord(record);
    },

    onSelectRecord: function (combo, record, eOpts) {
        var me = this,
            view = me.getView();

        view.down('form').loadRecord(record);
        Ext.getStore('cmesubareasdeposit').setParams({
            query: record.get('id')
        }).load();
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('cmesubareas');
        me.setModuleForm(view.down('form'));

        me._success = function (batch, options) {
            if(options.operations.create) {
                var opr = batch.getOperations()[0],
                    rec = opr.getRecords()[0];
                Ext.getStore('cmesubareasdeposit').setParams({
                    query: rec.get('id')
                }).load();
            }
        }

        me.updateRecord();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();
        Ext.getStore('cmesubareasdeposit').removeAll();
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