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
    },

    onEditTypeFlow: function (editor, context, eOpts) {
        var gd = context.grid,
            store = gd.getStore(),
            record = context.record;

        record.set('sterilizationtypeid',context.value);

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
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');

        view.reset();

        view.down('tabpanel').setActiveTab(0);
        portrait.beFileData();

    }

});