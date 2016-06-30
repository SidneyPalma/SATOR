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
        var movimentnew = Ext.widget('movimentnew');

        movimentnew.show();
    },

    //routes ========================>

    selectResultState: function (combo,record,eOpts) {
        var store = Ext.getStore('moviment');

        store.clearFilter(true);
        store.filter('movimentstatus', combo.getValue());
    },

    showClear: function (field, eOpts) {
        var store = Ext.getStore('moviment');

        store.removeFilter('movimentstatus');
        store.clearFilter(true);
    },

    onAfterRenderView: function (view) {
        var xdata = view.xdata,
            first = view.down('inputsearch');

        first.focus(false,200);
        if(!xdata) return false;

        view.loadRecord(xdata);

        Ext.getStore('movimentitem').setParams({
            query: xdata.get('id')
        }).load();
    },

    onMovimentTypeChange: function (field, newValue , oldValue , eOpts) {
        var me = this,
            view = me.getView();

        view.down('comboenum').reset();
        view.down('comboenum').setQueryFilter(newValue.movimenttype);
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

    updateView: function (btn) {
        var me = this,
            view = btn.up('form'),
            first = view.down('inputsearch');

        view.down('hiddenfield[name=id]').reset();
        view.down('hiddenfield[name=movimentid]').setValue(me.getView().xdata.get('id'));

        me.setModuleForm(view);
        me.setModuleData('movimentitem');

        me._success = function (form, action) {
            view.reset();
            first.focus(false, 200);
            Ext.getStore('movimentitem').setParams({
                query: me.getView().xdata.get('id')
            }).load();
        }

        me.updateRecord();
    },

    insertView: function () {
        var me = this,
            view = me.getView().down('form');

        me.setModuleForm(view);
        me.setModuleData('moviment');

        me._success = function (form, action) {
            me.getView().close();
            if(action.result.crud == 'insert') {
                Ext.getStore('moviment').setParams({
                    method: 'selectCode',
                    query: action.result.rows.id
                }).load({
                    scope: me,
                    callback: function(records, operation, success) {
                        me.redirectTo( 'movimentview/' + action.result.rows.id);
                    }
                });
            }
        }

        me.updateModule();
    }

});