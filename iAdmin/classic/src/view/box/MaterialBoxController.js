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

        //me.insertView();
    },

    //routes ========================>

    onUpdateMaterialBoxItem: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            data = me.getView().xdata,
            view = Ext.widget('materialboxItemstatus');

        if(record.get('boxitemstatus') != 'A') {
            return false;
        }

        if(['002'].indexOf(data.get('statusbox')) == -1) {

            Ext.MessageBox.show({
                scope: me,
                icon: Ext.MessageBox.WARNING,
                title: 'Kit Não Homologado!',
                msg: 'O Material não pode ser excluido pois o Kit não está Homologado.',
                buttons: Ext.MessageBox.CANCEL,
                buttonText: { cancel: "Cancelar" }
            });

            return false;
        }

        view.show(null,function () {
            view.down('form').loadRecord(record);
        });
    },

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

    onEditBoxItem: function (editor, context, eOpts) {
        var gd = context.grid,
            store = gd.getStore(),
            record = context.record;

        record.set('materialid', context.value);

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

    onBeforeEditBoxItem: function (editor, context, eOpts) {
        var me = this,
            view = me.getView(),
            xdata = view.xdata;

        return (['000'].indexOf(xdata.get('statusbox')) != -1);
    },

    onBeforeQuery: function (queryPlan, eOpts) {
        var me = this,
            view = me.getView(),
            store = queryPlan.combo.store,
            packingid = view.down('hiddenfield[name=packingid]');

        queryPlan.combo.reset();
        store.removeAll();

        store.setParams({
            method: 'selectLike',
            packingid: packingid.getValue()
        });
    },

    onAfterRenderView: function (view) {
        var me = this,
            xdata = view.xdata,
            packingsearch = view.down('packingsearch'),
            id = view.down('hiddenfield[name=id]').getValue();

        if(!xdata) return false;

        view.loadRecord(xdata);

        view.down('materialboxitem').setDisabled(false);
        view.down('materialboxtarge').setDisabled(false);

        Ext.getStore('materialboxtarge').setParams({ query: xdata.get('id') }).load();
        Ext.getStore('materialboxitem').setParams({ query: xdata.get('id') }).load({
            callback: function(records, operation, success) {
                packingsearch.setReadColor(records.length > 1);
            }
        });
        view.down('button[name=pendent]').setDisabled(['000','001'].indexOf(xdata.get('statusbox')) == -1);

        switch(xdata.get('statusbox')) {
            case '000':
                view.down('button[name=pendent]').setText('Finalizar');
                break;
            case '001':
                view.down('button[name=pendent]').setText('Homologar');
                break;
            default:
                view.down('button[name=pendent]').setText('Homologado');
        }
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

    updateBox: function () {
        var me = this,
            view = me.getView();

        if(view.xdata.get('statusbox') == '000') {
            Ext.MessageBox.show({
                scope: me,
                icon: Ext.MessageBox.QUESTION,
                title: 'Finalizar Kit?',
                msg: 'O que você deseja fazer agora?',
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: "Finalizar para homologação",
                    no: "Cancelar"
                },
                fn: function(btn, text) {
                    if(btn == 'yes') {
                        view.fireEvent('onstatusbox',view,'001');
                    }
                }
            });

            return false;
        }

        Ext.MessageBox.show({
            scope: me,
            icon: Ext.MessageBox.QUESTION,
            title: 'Homologar Kit?',
            msg: 'O que você deseja fazer agora?',
            buttons: Ext.MessageBox.YESNOCANCEL,
            buttonText: {
                yes: "Homologar para uso",
                no: "Retornar para montagem"
            },
            fn: function(btn, text) {
                if(btn == 'yes') {
                    view.fireEvent('onstatusbox',view,'002');
                }
                if(btn == 'no') {
                    view.fireEvent('onstatusbox',view,'000');
                }
            }
        });
    },

    updateItem: function () {
        var me = this,
            view = me.getView();

        view.down('hiddenfield[name=boxitemstatus]').setValue('E');

        me.setModuleForm(view.down('form'));
        me.setModuleData('materialboxitem');

        me._success = function (form, action) {
            view.close();
            Ext.getStore('materialboxitem').load();
        }

        me.updateModule();
    },

    onStatusBox: function (view,statusbox) {
        var me = this,
            view = me.getView(),
            packingsearch = view.down('packingsearch');

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode({ id: view.xdata.get('id'), statusbox: statusbox })
            },
            callback: function (options, success, response) {
                if(success) {
                    Ext.getStore('materialbox').load({
                        scope: me,
                        callback: function(records, operation, success) {
                            var record = records[0];
                            view.xdata = record;
                            view.loadRecord(record);
                            Ext.getStore('materialboxtarge').load();
                            Ext.getStore('materialboxitem').setParams({ query: record.get('id') }).load({
                                callback: function(records, operation, success) {
                                    packingsearch.setReadColor(records.length > 1);
                                }
                            });
                            view.down('button[name=pendent]').setDisabled(['000','001'].indexOf(record.get('statusbox')) == -1 );

                            switch(record.get('statusbox')) {
                                case '000':
                                    view.down('button[name=pendent]').setText('Finalizar');
                                    break;
                                case '001':
                                    view.down('button[name=pendent]').setText('Homologar');
                                    break;
                                default:
                                    view.down('button[name=pendent]').setText('Homologado');
                            }
                        }
                    });
                }
            }
        });
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleForm(view);
        me.setModuleData('materialbox');

        me._success = function (form, action) {
            view.down('materialboxitem').setDisabled(false);
            view.down('materialboxtarge').setDisabled(false);

            if(action.result.crud == 'insert') {
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
                Ext.getStore('materialboxitem').setParams({ query: action.result.rows.id }).load();
                Ext.getStore('materialboxtarge').setParams({ query: action.result.rows.id }).load();
            }
        }

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        view.reset();

        Ext.getStore('materialboxitem').removeAll();
        Ext.getStore('materialboxtarge').removeAll();
    }
    
});