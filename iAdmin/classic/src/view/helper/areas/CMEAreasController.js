//@charset UTF-8
Ext.define( 'iAdmin.view.helper.areas.CMEAreasController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.cmeareas',

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
    }

});