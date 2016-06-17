//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.materialbox',

    url: '../iAdmin/business/Calls/materialbox.php',

    routes: {
        'materialboxview/:id': {
            action: 'getMaterialBoxId'
        },
        'materialboxview': {
            action: 'getMaterialBoxNew'
        }
    },

    fetchField: function (search, button) {
        Ext.getStore('materialbox').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getMaterialBoxId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('materialbox').findRecord('id',id);

        app.onMainPageView({xtype: 'materialboxview', xdata: record});
    },

    getMaterialBoxNew: function() {
        var me = this,
            app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'materialboxview', xdata: null});

        me.insertView();
    },

    //routes ========================>

    onEditTargeColor: function (editor, context, eOpts) {
        var gd = context.grid,
            store = gd.getStore(),
            record = context.record;

        record.set('targecolorid',context.value);

        store.sync({
            success: function () {
                store.load({
                    callback: function () {
                        gd.getSelectionModel().select(context.rowIdx);
                    }
                });
            }
        });
    },

    onAfterRenderView: function (view) {
        var me = this,
            xdata = view.xdata,
            grid = view.down('materialboxtarge'),
            id = view.down('hiddenfield[name=id]').getValue();

        if(!xdata) return false;

        view.loadRecord(xdata);
        grid.setDisabled(false);
        Ext.getStore('materialboxtarge').setParams({
            query: xdata.get('id')
        }).load();
        // grid.setSource.apply(grid, [values,fields]);
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;

        Ext.getStore('materialbox').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'materialboxview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function () {
        var me = this;
        me.redirectTo('materialboxview');
    },

    updateView: function () {
        var me = this,
            view = me.getView();
            // status = view.down('comboenum[name=statusboxdescription]');
            // grid = view.down('itembaselayout');

        // status.doQuery('%');
        // status.selectText(0,0);

        me.setModuleForm(view);
        me.setModuleData('materialbox');

        me._success = function (form, action) {
            // grid.setDisabled(false);
            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            result = {},
            view = me.getView();
            // portrait = view.down('portrait'),
            // grid = view.down('itembaselayout');

        view.reset();

        // grid.setDisabled(true);
        // view.down('tabpanel').setActiveTab(0);
        // view.down('textfield[name=name]').setReadColor(false);
        // portrait.beFileData();
    }

    
});