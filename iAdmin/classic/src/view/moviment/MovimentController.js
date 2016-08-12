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
        var me = this,
            app = Smart.app.getController('App');

        Ext.getStore('moviment').setParams({
            method: 'selectCode',
            rows: Ext.encode({ id: id })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                app.onMainPageView({xtype: 'movimentview', xdata: record});
            }
        });
    },

    //routes ========================>

    prepareView: function (movimentstatus,movimenttype) {
        var me = this,
            view = me.getView(),
            layout = view.down('container[name=moviment]').getLayout();

        layout.setActiveItem(movimenttype == 'E' ? 0 : 1);

        me.setDisabledForm(movimentstatus,movimenttype);

        view.down('button[name=change]').setVisible(movimentstatus != 'E');
        view.down('button[name=update]').setDisabled(movimentstatus != 'A');
        view.down('button[name=change]').setIconCls(movimentstatus == 'F' ? "fa fa-check-circle" : "fa fa-times-circle");

        view.down('movimentitem').processing = true;
        var header = view.down('movimentitem').headerCt.child('[name=action-record]');
        header.setVisible(movimentstatus == 'A');
        view.down('movimentitem').processing = false;
    },

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

    onBeforeQueryEquipment: function ( queryPlan, eOpts ) {
        var me = this,
            view = me.getView(),
            combo = queryPlan.combo,
            cmeareassearch = view.down('cmeareassearch');

        delete combo.lastQuery;
        combo.store.removeAll();
        combo.store.setParams({ cmeareasid: cmeareassearch.getValue() });
    },

    onShowClear: function (field,eOpts) {
        var me = this,
            view = me.getView();

        view.down('form').reset();
    },

    onAfterRenderView: function (view) {
        var me = this,
            xdata = view.xdata,
            movimenttype = xdata.get('movimenttype'),
            movimentstatus = xdata.get('movimentstatus');

        me.prepareView(movimentstatus,movimenttype);

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
        view.down('equipmentcmeareassearch').setDisabled(newValue.movimenttype == 'E');
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

    onShowClearEnter: function () {
        var me = this,
            form = me.getView().down('form[name=movimententer]'),
            inputpresentationsearch = form.down('inputpresentationsearch');

        inputpresentationsearch.reset();
        delete inputpresentationsearch.lastQuery;
        form.down('textfield[name=lotpart]').setDisabled(false);
        form.down('datefield[name=datevalidity]').setDisabled(false);
    },

    onInputEnterSelect: function ( combo, record, eOpts ) {
        var me = this,
            form = me.getView().down('form[name=movimententer]');

        me.onShowClearEnter();
        form.down('textfield[name=lotpart]').setDisabled(record.get('hasbatch') == '0');
        form.down('datefield[name=datevalidity]').setDisabled(record.get('hasbatch') == '0');
    },

    onShowClearLeave: function () {
        var me = this,
            form = me.getView().down('form[name=movimentleave]');

        form.down('numberfield[name=quantity]').reset();
        form.down('hiddenfield[name=lotpart]').reset();
        form.down('hiddenfield[name=datevalidity]').reset();
        form.down('displayfield[name=clonelotpart]').reset();
        form.down('displayfield[name=clonedatevalidity]').reset();
    },

    onInputLeaveSelect: function ( combo, record, eOpts ) {
        var me = this,
            form = me.getView().down('form[name=movimentleave]');

        me.onShowClearLeave();
        form.loadRecord(record);
        form.down('numberfield[name=quantity]').setMaxValue(record.get('lotamount'));
    },

    onBeforeQueryInputPresentation: function ( queryPlan, eOpts ) {
        var me = this,
            view = me.getView(),
            combo = queryPlan.combo,
            inputid = view.down('inputentersearch').getValue();

        combo.store.removeAll();
        combo.store.setParams({ inputid: inputid });
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
            me.onShowClearEnter();
            form.down('inputentersearch').focus(false, 200);
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
            me.onShowClearLeave();
            form.down('inputleavesearch').focus(false, 200);
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

        if(Ext.getStore('movimentitem').getCount() == 0) {
            return false;
        }

        Ext.MessageBox.show({
            scope: me,
            icon: Ext.MessageBox.QUESTION,
            title: 'Mudar Estatus',
            msg: 'Confirma a operação de mudança de estatus?',
            buttons: Ext.MessageBox.YESCANCEL,
            buttonText: {
                yes: view.xdata.get('movimentstatus') == 'A' ? "Fechar movimento" : "Abrir movimento",
                cancel: "Cancelar"
            },
            fn: function(button, text) {
                if(button == 'yes') {
                    me.statusView(btn,(view.xdata.get('movimentstatus') == 'A' ? 'F' : 'A'));
                }
            }
        });
    },

    printerView: function (btn) {
        var me = this,
            view = me.getView(),
            id = view.xdata.get('id'),
            movimenttype = view.xdata.get('movimenttype'),
            url = 'business/Calls/Quick/Moviment{0}.php?id={1}';

        if(Ext.getStore('movimentitem').getCount() == 0) {
            return false;
        }

        window.open(Ext.String.format(url,(movimenttype == 'E' ? 'Enter':'Leave'),id));
    },

    statusView: function (btn,movimentstatus) {
        var me = this,
            view = me.getView(),
            movimenttype = view.xdata.get('movimenttype');

        Ext.Ajax.request({
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode({ id: view.xdata.get('id'), movimentstatus: movimentstatus })
            },
            success: function(response){
                view.xdata.set('movimentstatus',movimentstatus);
                view.xdata.commit();
                view.down('button[name=update]').setDisabled(movimentstatus != 'A');
                btn.setIconCls(movimentstatus == 'F' ? "fa fa-check-circle" : "fa fa-times-circle" );
                me.setDisabledForm(movimentstatus,movimenttype);

                view.down('movimentitem').processing = true;
                var header = view.down('movimentitem').headerCt.child('[name=action-record]');
                header.setVisible(movimentstatus == 'A');
                view.down('movimentitem').processing = false;
            }
        });
    },

    setDisabledForm: function (movimentstatus,movimenttype) {
        var me = this,
            type = movimenttype == 'E' ? 'form[name=movimententer]' : 'form[name=movimentleave]',
            form = me.getView().down(type),
            fields = form.getForm().getFields();

        Ext.each(fields.items, function(field) {
            if(!(Ext.isEmpty(field) || field.isHidden() || field.isXType('hiddenfield'))) {
                field.setDisabled(movimentstatus != 'A');
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
                me.getView().close();
                me.redirectTo( 'movimentview/' + action.result.rows[0].id);
            }
        }

        me.updateModule();
    },

    onDeleteItem: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var store = grid.getStore();

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    store.remove(record);
                    store.sync({
                        success: function (batch, options) {
                            store.load();
                        },
                        failure: function (batch, options) {
                            var resultSet = batch.getOperations().length != 0 ? batch.operations[0].getResultSet() : null;
                            store.rejectChanges();
                            if(resultSet) {
                                Ext.Msg.show({
                                    title: 'Operação falhou!',
                                    msg: resultSet.getMessage(),
                                    buttons: Ext.Msg.CANCEL,
                                    icon: Ext.Msg.WARNING
                                });
                            }
                        }
                    });
                }
            }
        );
    },

    onUpdateItem: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var store = grid.getStore();

        // Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
        //     function (choice) {
        //         if (choice === 'yes') {
        //             store.remove(record);
        //             store.sync({
        //                 success: function (batch, options) {
        //                     store.load();
        //                 },
        //                 failure: function (batch, options) {
        //                     var resultSet = batch.getOperations().length != 0 ? batch.operations[0].getResultSet() : null;
        //                     store.rejectChanges();
        //                     if(resultSet) {
        //                         Ext.Msg.show({
        //                             title: 'Operação falhou!',
        //                             msg: resultSet.getMessage(),
        //                             buttons: Ext.Msg.CANCEL,
        //                             icon: Ext.Msg.WARNING
        //                         });
        //                     }
        //                 }
        //             });
        //         }
        //     }
        // );
    },

    windupView: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var store = grid.getStore();

        Ext.Msg.confirm('Encerrar lançamentos', 'Confirma o encerramento do movimento selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    record.set('movimentstatus','E');
                    store.sync({
                        success: function (batch, options) {
                            record.commit();
                            //store.load();
                        },
                        failure: function (batch, options) {
                            var resultSet = batch.getOperations().length != 0 ? batch.operations[0].getResultSet() : null;
                            store.rejectChanges();
                            if(resultSet) {
                                Ext.Msg.show({
                                    title: 'Operação falhou!',
                                    msg: resultSet.getMessage(),
                                    buttons: Ext.Msg.CANCEL,
                                    icon: Ext.Msg.WARNING
                                });
                            }
                        }
                    });
                }
            }
        );
    }

});