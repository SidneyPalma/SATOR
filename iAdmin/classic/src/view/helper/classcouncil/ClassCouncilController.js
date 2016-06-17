//@charset UTF-8
Ext.define( 'iAdmin.view.helper.classcouncil.ClassCouncilController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.classcouncil',

	onViewShow: function (panel, eOpts) {
		var me = this,
			view = me.getView(),
			record = Ext.create('iAdmin.model.helper.ClassCouncil');

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

        me.setModuleData('classcouncil');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();
    }

});