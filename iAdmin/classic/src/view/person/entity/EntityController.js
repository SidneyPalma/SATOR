//@charset UTF-8
Ext.define( 'iAdmin.view.person.entity.EntityController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.entity',

    config: {
        control: {
            'entityedit portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    onLoadEnd: function (field,file) {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');
        field.doFileData(portrait);
    },

	onViewShow: function (panel, eOpts) {
		var me = this,
			view = me.getView(),
			record = Ext.create('iAdmin.model.person.Entity');

		view.down('form').loadRecord(record);
	},
	
	onSelectRecord: function (combo, record, eOpts) {
		var me = this,
			view = me.getView();

		view.down('form').loadRecord(record);
        view.down('portrait').setUrl(me.url);
        view.down('portrait').beFileData(record.get('filetype'));
	},
	
    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('entity');
        me.setModuleForm(view.down('form'));

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();
    }

});