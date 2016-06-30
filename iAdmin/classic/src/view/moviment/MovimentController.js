//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.MovimentController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.moviment',

    url: '../iAdmin/business/Calls/moviment.php',

    routes: {
        'movimentview/:id': {
            action: 'getMovimentId'
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
            first = view.down('inputsearch'),
            layout = view.down('container[name=moviment]').getLayout();

        first.focus(false,200);
        if(!xdata) return false;

        layout.setActiveItem(xdata.get('movimenttype') == 'E' ? 0 : 1);

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
        view.down('cmeareassearch').setDisabled(newValue.movimenttype == 'E');
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

    insertViewNew: function () {
        Ext.widget('movimentnew').show();
    },

    updateView: function () {
        var me = this;

        switch(me.getView().xdata.get('movimenttype')) {
            case 'E':
                me.updateEnter();
                break;
            case 'S':
                me.updateLeave();
                break;
        }

    },

    updateEnter: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=movimententer]');

        form.down('hiddenfield[name=id]').reset();
        form.down('hiddenfield[name=movimentid]').setValue(view.xdata.get('id'));

        me.setModuleForm(form);
        me.setModuleData('movimentitem');

        me._success = function (frm, action) {
            form.reset();
            form.down('inputsearch').focus(false, 200);
            Ext.getStore('movimentitem').setParams({
                query: me.getView().xdata.get('id')
            }).load();
        }

        me.updateRecord();
    },

    updateLeave: function () {
        var me = this,
            view = me.getView(),
            form = view.down('form[name=movimentleave]');

        form.down('hiddenfield[name=id]').reset();
        form.down('hiddenfield[name=movimentid]').setValue(view.xdata.get('id'));

        me.setModuleForm(form);
        me.setModuleData('movimentitem');

        me._success = function (frm, action) {
            form.reset();
            //form.down('inputsearch').focus(false, 200);
            Ext.getStore('movimentitem').setParams({
                query: me.getView().xdata.get('id')
            }).load();
        }

        me.updateRecord();
    },

    changeView: function (btn) {
        var me = this,
            view = me.getView();

        if(view.xdata.get('movimentstatus') == 'E') {
            return false;
        }

        Ext.MessageBox.show({
            scope: me,
            icon: Ext.MessageBox.QUESTION,
            title: 'Mudar Estatus',
            msg: 'Confirma a operação de mudança de estatus?',
            buttons: Ext.MessageBox.YESCANCEL,
            buttonText: {
                yes: view.xdata.get('movimentstatus') ? "Fechar movimento" : "Abrir movimento",
                cancel: "Cancelar"
            },
            fn: function(button, text) {
                if(button == 'yes') {
                    me.statusView(btn,(view.xdata.get('movimentstatus') == 'A' ? 'F' : 'A'));
                }
            }
        });
    },

    statusView: function (btn,movimentstatus) {
        var me = this,
            view = me.getView();

        Ext.Ajax.request({
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode({ id: view.xdata.get('id'), movimentstatus: movimentstatus })
            },
            success: function(response){
                view.xdata.set('movimentstatus',movimentstatus);
                view.xdata.commit();
                btn.setIconCls(movimentstatus == 'F' ? "fa fa-times-circle" : "fa fa-check-circle");
                view.down('form[name=movimententer]').setDisabled(true);
                // var result = Ext.decode(response.responseText);
                // if(!record) return false;
                // if(result.success == true) {
                //     record.commit();
                // } else {
                //     record.reject();
                // }
            },
            failure: function(response){
                // if(record) record.reject();
            }
        });
    },

    insertView: function () {
        var me = this,
            view = me.getView().down('form');

        me.setModuleForm(view);
        me.setModuleData('moviment');

        me._success = function (form, action) {
            if(action.result.crud == 'insert') {
                Ext.getStore('moviment').setParams({
                    method: 'selectCode',
                    rows: Ext.encode({ id: action.result.rows.id })
                }).load({
                    scope: me,
                    callback: function(records, operation, success) {
                        me.getView().close();
                        var record = records[0];
                        me.redirectTo( 'movimentview/' + record.get('id'));
                    }
                });
            }
        }

        me.updateModule();
    }

});