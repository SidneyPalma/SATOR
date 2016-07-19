//@charset UTF-8
Ext.define( 'iAdmin.view.material.MaterialController', {
    extend: 'iAdmin.view.itembase.ItemBaseController',

    alias: 'controller.material',

    requires: [
        'iAdmin.view.itembase.ItemBaseController'
    ],

    url: '../iAdmin/business/Calls/material.php',

    config: {
        control: {
            'materialview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'materialview/:id': {
            action: 'getMaterialId'
        },
        'materialnew': {
            action: 'getMaterialNew'
        }
    },

    fetchField: function (search, button) {
        Ext.getStore('material').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getMaterialId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('material').findRecord('id',id);

        app.onMainPageView({xtype: 'materialview', xdata: record});
    },

    getMaterialNew: function() {
        var app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'materialview', xdata: null});
    },

    //routes ========================>

    onCycleChange: function (checkcolumn, rowIndex, checked, eOpts) {
        var store = Ext.getStore('materialcycle'),
            record = store.getAt(rowIndex);

        if(!checked) {
            store.remove(record);
        }

        store.sync({
            success: function (batch, options) {
                var opr = batch.getOperations()[0],
                    rec = opr.getRecords()[0];

                if(options.operations.create) {
                    record.set('id',rec.get('id'));
                }

                if(options.operations.destroy) {
                    store.load();
                }

            }
        });
    },

    onChangeExtensionType: function ( field, newValue, oldValue, eOpts) {
        var me = this,
            view = me.getView();
        view.down('container[name=containercard]').getLayout().setActiveItem(newValue.extensiontype);
    },

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

        var materialboxname = xdata.get('materialboxname') ? xdata.get('materialboxname') : '';

        view.down('packingsearch').setReadColor(materialboxname.length != 0);

        Ext.getStore('materialtypeflow').setParams({
            query: xdata.get('id')
        }).load();

        grid.getStore().setParams({
            method: 'selectData',
            query: xdata.get('id')
        }).load();

        Ext.getStore('materialcycle').setParams({
            query: xdata.get('id')
        }).load();

        Ext.getStore('itembaseservicetype').setParams({
            query: xdata.get('id')
        }).load();
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

    onViewEdit: function(grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex);

        Ext.getStore('material').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'materialview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function (btn) {
        var me = this;
        me.redirectTo('materialnew');
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
        me.setModuleData('material');

        me._success = function (form, action) {
            grid.setDisabled(false);
            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
                Ext.getStore('materialtypeflow').setParams({
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
            grid = view.down('itembaselayout');

        view.reset();

        grid.setDisabled(true);
        grid.getStore().removeAll();
        view.down('tabpanel').setActiveTab(0);
        view.down('textfield[name=name]').setReadColor(false);
        portrait.beFileData();

        Ext.getStore('materialtypeflow').removeAll();
    }

});