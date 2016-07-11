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

    fetchField: function (search, button) {
        Ext.getStore('module').setParams({
            query: search.getValue()
        }).load();
    },

    onSelectRecord: function (combo, record, eOpts) {
        var me = this,
            view = me.getView(),
            moduletree = Ext.getStore('modulemenutree');

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