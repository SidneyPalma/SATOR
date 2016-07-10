//@charset UTF-8
Ext.define( 'iAdmin.view.equipment.EquipmentController', {
    extend: 'iAdmin.view.itembase.ItemBaseController',

    alias: 'controller.equipment',

    requires: [
        'iAdmin.view.itembase.ItemBaseController'
    ],

    url: '../iAdmin/business/Calls/equipment.php',

    config: {
        control: {
            'equipmentview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'equipmentview/:id': {
            action: 'getEquipmentId'
        },
        'equipmentnew': {
            action: 'getEquipmentNew'
        }
    },

    fetchField: function (search, button) {
        Ext.getStore('equipment').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getEquipmentId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('equipment').findRecord('id',id);

        app.onMainPageView({xtype: 'equipmentview', xdata: record});
    },

    getEquipmentNew: function() {
        var app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'equipmentview', xdata: null});
    },

    //routes ========================>

	//onSelectRecord: function (combo, record, eOpts) {
	//	var me = this,
	//		view = me.getView(),
     //       grid = view.down('itembaselayout');
    //
     //   Ext.getStore('equipment').setParams({
     //       method: 'selectCode',
     //       query: record.get('id'),
     //       rows: Ext.encode({ id: record.get('id') })
     //   }).load({
     //       scope: me,
     //       callback: function(records, operation, success) {
     //           var record = records[0],
     //               values = Ext.decode(record.get('layoutvalues')),
     //               fields = Ext.decode(record.get('layoutfields'));
    //
     //           view.xdata = record;
     //           grid.setDisabled(false);
     //           view.down('form').loadRecord(record);
     //           grid.setSource.apply(grid, [values,fields]);
     //       }
     //   });
	//},

    onAfterRenderView: function (view) {
        var me = this,
            xdata = view.xdata,
            portrait = view.down('portrait'),
            grid = view.down('itembaselayout'),
            id = view.down('hiddenfield[name=id]').getValue();

        if(!xdata) return false;

        view.loadRecord(xdata);
        grid.setDisabled(false);
        portrait.setUrl(me.url);
        portrait.beFileData(xdata.get('filetype'));

        grid.getStore().setParams({
            method: 'selectData',
            query: xdata.get('id')
        }).load();
    },

    onViewEdit: function(grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex);

        Ext.getStore('equipment').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'equipmentview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function (btn) {
        var me = this;
        me.redirectTo('equipmentnew');
    },

    onLoadEnd: function (field,file) {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');
        field.doFileData(portrait);
    },

    updateView: function () {
        var me = this,
            view = me.getView(),
            grid = view.down('itembaselayout');

        me.setModuleForm(view);
        me.setModuleData('equipment');

        me._success = function (form, action) {
            grid.setDisabled(false);
            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait'),
            grid = view.down('itembaselayout');

        view.reset();

        grid.setDisabled(true);
        view.down('tabpanel').setActiveTab(0);
        view.down('textfield[name=name]').setReadColor(false);
        portrait.beFileData();
    }

});