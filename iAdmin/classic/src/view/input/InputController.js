//@charset UTF-8
Ext.define( 'iAdmin.view.input.InputController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.input',

    url: '../iAdmin/business/Calls/input.php',

    config: {
        control: {
            'inputview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'inputview/:id': {
            action: 'getInputId'
        },
        'inputnew': {
            action: 'getInputNew'
        }
    },

    fetchField: function (search, button) {
        Ext.getStore('input').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getInputId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('input').findRecord('id',id);

        app.onMainPageView({xtype: 'inputview', xdata: record});
    },

    getInputNew: function() {
        var app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'inputview', xdata: null});
    },

    //routes ========================>

    onAfterRenderView: function (view) {
        var me = this,
            xdata = view.xdata,
            id = view.down('hiddenfield[name=id]').getValue();

        if(!xdata) return false;

        view.loadRecord(xdata);
        view.down('portrait').setUrl(me.url);
        view.down('portrait').beFileData(xdata.get('filetype'));

        Ext.getStore('inputpresentation').setParams({
            query: xdata.get('id')
        }).load();
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

        Ext.getStore('input').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'inputview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function (btn) {
        var me = this;
        me.redirectTo('inputnew');
    },

    onLoadEnd: function (field,file) {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');
        field.doFileData(portrait);
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleForm(view);
        me.setModuleData('input');

        me._success = function (form, action) {
            if(action.result.crud == 'insert') {
                view.down('textfield[name=onlyusefilter]').setValue('');
                view.down('checkboxfield[name=onlyusefilter]').setValue(0);
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
                Ext.getStore('inputpresentation').setParams({
                    query: action.result.rows.id
                }).load();
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait'),
            grid = view.down('inputpresentation');

        view.reset();

        view.down('tabpanel').setActiveTab(0);
        portrait.beFileData();
        grid.getStore().removeAll();
        view.down('textfield[name=onlyusefilter]').setValue('');
        view.down('checkboxfield[name=onlyusefilter]').setValue(0);
    },

    storeField: function ( field, newValue, oldValue, eOpts ) {
       var store = Ext.getStore("inputpresentation");

       store.clearFilter();
       store.filter('filtertype',newValue);
    },

    onlyUseFilter: function ( field, newValue, oldValue, eOpts ) {
        var me = this;

        me.filterStore(newValue);
    },

    filterStore: function (filter) {
        var store = Ext.getStore("inputpresentation");

        store.clearFilter();

        if(filter) {
            store.filterBy(function (model) {
                return Ext.isNumber(parseInt(model.data.id));
            });
        }
    }

});