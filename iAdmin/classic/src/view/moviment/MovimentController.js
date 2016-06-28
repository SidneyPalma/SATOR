//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.MovimentController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.moviment',

    url: '../iAdmin/business/Calls/moviment.php',

    routes: {
        'movimentview/:id': {
            action: 'getMovimentId'
        },
        'movimentnew': {
            action: 'getMovimentNew'
        }
    },

    fetchField: function (search, button) {
        Ext.getStore('moviment').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getMovimentId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('moviment').findRecord('id',id);

        app.onMainPageView({xtype: 'movimentview', xdata: record});
    },

    getMovimentNew: function() {
        var app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'movimentview', xdata: null});
    },

    //routes ========================>

    onAfterRenderView: function (view) {
        var me = this,
            xdata = view.xdata,
            id = view.down('hiddenfield[name=id]').getValue();

        if(!xdata) return false;

        view.loadRecord(xdata);

        Ext.getStore('movimentitem').setParams({
            query: xdata.get('id')
        }).load({
            callback: function () {
                me.filterStore(true);
            }
        });
    },

    onEditTypeFlow: function (editor, context, eOpts) {
        var gd = context.grid,
            store = gd.getStore(),
            record = context.record,
            acronym = record.get('acronym'),
            measurebase = record.get('measurebase');

        if(!acronym || !measurebase) {
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
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;

        Ext.getStore('moviment').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'movimentview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function (btn) {
        var me = this;
        me.redirectTo('movimentnew');
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleForm(view);
        me.setModuleData('moviment');

        me._success = function (form, action) {
            // if(action.result.crud == 'insert') {
            //     view.down('textfield[name=onlyusefilter]').setValue('');
            //     view.down('checkboxfield[name=onlyusefilter]').setValue(0);
            //     view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
            //     Ext.getStore('inputpresentation').setParams({
            //         query: action.result.rows.id
            //     }).load();
            // }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            grid = view.down('movimentitem');

        view.reset();

        grid.getStore().removeAll();
    }

});