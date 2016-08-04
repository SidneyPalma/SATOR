//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.module',

    config: {
        control: {
            'moduleedit portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    url: '../iAdmin/business/Calls/module.php',

    selectWorkstation: function () {
        var me = this;

        Ext.widget('moduleworkstation').show(null,function () {
            this.down('areassearch').setReadColor(Smart.workstation);
            this.down('button[handler=updateWorkstation]').setDisabled(Smart.workstation);
            this.down('button[handler=deleteWorkstation]').setDisabled(!Smart.workstation);

            if(Smart.workstation) {
                this.down('areassearch').setRawValue(Smart.workstation.areasname);
                this.down('hiddenfield[name=areasid]').setValue(Smart.workstation.areasid);
                this.down('hiddenfield[name=workstation]').setValue(Smart.workstation.workstation);
            }
        });
    },

    updateWorkstation: function () {
        var me = this,
            work = {},
            view = me.getView(),
            data = view.down('form').getValues(),
            areassearch = view.down('areassearch');

        work = {
            workstation: '',
            areasid: data.areasid,
            areasname: areassearch.getRawValue()
        };

        Ext.Msg.confirm('Definir Estação', 'Confirma a definição da Estação de Trabalho?',
            function (choice) {
                if (choice === 'yes') {
                    Ext.getStore('areas').setParams({
                        action: 'update',
                        rows: Ext.encode({id: data.areasid, workstation: 'update'})
                    }).load({
                        scope: me,
                        callback: function(records, operation, success) {

                            if(!success) {
                                Ext.Msg.show({
                                    msg: operation.error,
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.CANCEL,
                                    title: 'Operação falhou!'
                                });
                                return false;
                            }

                            Ext.Ajax.request({
                                scope: me,
                                url: Ext.getStore('areas').getUrl(),
                                params: {
                                    query: data.areasid,
                                    action: 'select',
                                    method: 'selectCode',
                                    rows: Ext.encode({id: data.areasid})
                                },
                                callback: function (options, success, response) {
                                    if(success) {
                                        var result = Ext.decode(response.responseText);
                                        work.workstation = result.rows[0].workstation;
                                        Smart.workstation = work;
                                        localStorage.setItem('workstation', Ext.encode(work));
                                        Ext.WindowMgr.get('moduleedit').down('textfield[name=workstation]').setValue(work.areasname);
                                        view.close();
                                    }
                                }
                            });
                        }
                    });
                }
            }
        );
    },

    deleteWorkstation: function () {
        var me = this,
            view = me.getView(),
            areasid = view.down('hiddenfield[name=areasid]');

        Ext.Msg.confirm('Remover Estação', 'Confirma a remoção da Estação de Trabalho?',
            function (choice) {

                if (choice === 'yes') {

                    Ext.Ajax.request({
                        scope: me,
                        url: Ext.getStore('areas').getUrl(),
                        params: {
                            action: 'update',
                            rows: Ext.encode({id: areasid.getValue(), workstation: 'delete'})
                        },
                        callback: function (options, success, response) {
                            if(!success) {
                                Ext.Msg.show({
                                    msg: operation.error,
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.CANCEL,
                                    title: 'Operação falhou!'
                                });
                                return false;
                            }

                            Smart.workstation = null;
                            localStorage.removeItem('workstation');

                            view.down('form').reset();
                            view.down('areassearch').setReadColor(false);
                            view.down('areassearch').getStore().removeAll();
                            view.down('button[handler=deleteWorkstation]').setDisabled(true);
                            view.down('button[handler=updateWorkstation]').setDisabled(false);
                            Ext.WindowMgr.get('moduleedit').down('textfield[name=workstation]').setValue('');
                        }
                    });
                }
            }
        );
    },

    onSelectArea: function (combo,record,eOpts) {
        var me = this,
            view = me.getView(),
            form = view.down('form');

        form.down('hiddenfield[name=workstation]').setValue(record.get('workstation'));
    },

    onBeforeQueryArea: function ( queryPlan , eOpts ) {
        var approvedFilter = Ext.create('Ext.util.Filter', {
                filterFn: function (record) {
                    var workstation = record.get('workstation');
                    return (workstation) ? (workstation.length == 0) : true;
                }
            });

        delete queryPlan.combo.lastQuery;
        queryPlan.combo.store.removeAll();

        queryPlan.combo.store.clearFilter();
        queryPlan.combo.store.filter(approvedFilter);
    },

    fetchField: function (search, button) {
        Ext.getStore('module').setParams({
            query: search.getValue()
        }).load();
    },

    onSelectRecord: function (combo, record, eOpts) {
        var me = this,
            view = me.getView(),
            moduletree = Ext.getStore('modulemenutree');

        view.down('panel[name=module]').setDisabled(false);
        view.down('button[actionType=atMn]').setDisabled(false);
        view.down('button[actionType=atGr]').setDisabled(false);
        view.down('button[handler=updateView]').setDisabled(false);

        view.down('form').loadRecord(record);
        view.down('portrait').setUrl(me.url);
        view.down('portrait').beFileData(record.get('filetype'));

        moduletree.setParams({
            method: 'selectMenu',
            module: record.get('name')
        }).load();

        view.down('textfield[name=workstation]').setValue(Smart.workstation ? Smart.workstation.areasname : '');
    },

    onLoadTree: function () {
        Ext.getStore('modulemenutree').load();
    },

    onLoadEnd: function (field,file) {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');
        field.doFileData(portrait);
    },

    closedView: function () {
        var me = this,
            view = me.getView();

        view.close();
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('module');
        me.setModuleForm(view.down('form'));

        me._success = function (form, action) {
            view.down('modulesearch').reset();
            delete view.down('modulesearch').lastQuery;
            view.down('modulesearch').store.removeAll();
        };

        me.updateModule();
    },

    onBeforeQuery: function ( queryPlan, eOpts ) {
        var me = this,
            view = me.getView(),
            store = queryPlan.combo.getStore();

        store.setParams({ moduleid: view.down('hiddenfield[name=moduleid]').getValue() });
    },

    showInsertMenu: function (btn) {
        var me = this,
            view = me.getView(),
            id = view.down('hiddenfield[name=id]').getValue();

        Ext.widget('modulemenuedit', { actionType: btn.actionType }).show(null,function() {
            this.down('hiddenfield[name=moduleid]').setValue(id);
        });
    },

    showUpdateMenu: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            leaf = record.get('leaf'),
            modulemenu = Ext.getStore('modulemenu');

        modulemenu.setParams({
            method: 'selectCode',
            query: record.get('id')
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var rec = records[0],
                menuid = rec.get('menuid');

                Ext.widget('modulemenuedit', { xdata: rec, actionType: leaf ? 'atMn' : 'atGr' }).show(null,function(){
                    this.down('form').loadRecord(rec);
                    this.down('modulemenugroupsearch').getTrigger('clear').show();
                    if(menuid && menuid.length != 0) {
                        this.down('modulemenusearch').getTrigger('clear').show();
                    }
                });
            }
        });
    },

    showDeleteMenu: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            modulemenu = Ext.getStore('modulemenu');

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    modulemenu.load({
                        scope: me,
                        params: {
                            action: 'delete',
                            rows: Ext.encode(record.data)
                        },
                        callback: function () {
                            Ext.getStore('modulemenutree').load();
                        }
                    });
                }
            }
        );
    },

    updateModuleMenu: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('modulemenu');
        me.setModuleForm(view.down('form'));

        me._success = function (form, action) {
            me.closedView();
        };

        me.updateModule();
    }

});