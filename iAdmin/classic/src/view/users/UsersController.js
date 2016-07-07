//@charset UTF-8
Ext.define( 'iAdmin.view.users.UsersController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.users',

    config: {
        control: {
            'usersview portrait filefield': {
                loadend: 'onLoadEnd'
            }
        }
    },

    routes: {
        'usersview/:id': {
            action: 'getUserId'
        },
        'usernew': {
            action: 'getUserNew'
        }
    },

    url: '../iAdmin/business/Calls/users.php',

    fetchField: function (search, button) {
        Ext.getStore('users').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ========================>

    getUserId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('users').findRecord('id',id);

        app.onMainPageView({xtype: 'usersview', xdata: record});
    },

    getUserNew: function() {
        var app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'usersview', xdata: null});
    },

    //routes ========================>

    onTabChange: function ( tabPanel, newCard, oldCard, eOpts ) {
        var me = this,
            view = me.getView(),
            id = view.down('hiddenfield[name=id]').getValue();

        switch (parseInt(newCard.tabIndex)) {
            case 0:
                Ext.getStore('usersmenutree').setParams({
                    usersid: id
                }).load();
                break;
            case 1:
                Ext.getStore('usersprofile').setParams({
                    usersid: id
                }).load();
                break;
        }
    },

    onAfterRenderView: function (panel) {
        var me = this,
            form = panel.down('form'),
            portrait = panel.down('portrait'),
            menutree = Ext.getStore('usersmenutree'),
            id = form.down('hiddenfield[name=id]').getValue();

        if(!panel.xdata) return false;

        menutree.setParams({
            module: Ext.manifest.name,
            usersid: panel.xdata.get('id')
        }).load();

        form.loadRecord(panel.xdata);

        portrait.setUrl(me.url);
        portrait.beFileData(panel.xdata.get('filetype'));
        form.down('textfield[name=username]').setReadColor(id.lenght != 0);
    },

    onDestroy: function (panel, eOpts) {
        Ext.getStore('usersmenutree').load();
    },

    onEditMenuAction: function (editor, context, eOpts) {
        var store = context.grid.getStore();
        store.sync({
            success: function (batch, options) {
                var opr = batch.getOperations()[0],
                    rec = opr.getRecords()[0];
                if(options.operations.update.length != 0) {
                    store.each( function (rd) {
                        rd.set('usersmenuid',rec.get('usersmenuid'));
                        rd.commit();
                    });
                }
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
    },

    onActionUpdateTree: function(grid, rowIndex, colIndex) {
        var me = this,
            store = grid.getStore(),
            record = store.getAt(rowIndex),
            usersmenu = Ext.getStore('usersmenu'),
            menuaction = Ext.getStore('usersmenuaction'),
            menuaccess = Ext.widget('usersmenuaccess', { xdata: record });

        usersmenu.setParams({
            menuid: record.get('menuid'),
            usersid: record.get('usersid')
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var rec = records[0];

                menuaccess.show(null,function(){
                    this.down('form').loadRecord(rec);
                    menuaction.setParams({
                        menuid: rec.get('menuid'),
                        usersid: rec.get('usersid')
                    }).load();
                });
            }
        });
    },

    onActionDeleteProfile: function(grid, rowIndex, colIndex) {
        var me = this,
            store = grid.getStore(),
            record = store.getAt(rowIndex);

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    Ext.Ajax.request({
                        scope: me,
                        url: store.getUrl(),
                        params: {
                            action: 'delete',
                            rows: Ext.encode({id: record.get('id')})
                        },
                        success: function(response, opts) {
                            record.set('id','');
                            record.set('expireto','');
                            record.commit();
                        },
                        failure: function(response, opts) {
                        }
                    });
                }
            }
        );

    },

    onActionDeleteTree: function(grid, rowIndex, colIndex) {
        var me = this,
            store = grid.getStore(),
            record = store.getAt(rowIndex);

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    Ext.Ajax.request({
                        scope: me,
                        url: store.getUrl(),
                        params: {
                            action: 'delete',
                            rows: Ext.encode({id: record.get('usersmenuid')})
                        },
                        success: function(response, opts) {
                            store.load();
                        },
                        failure: function(response, opts) {
                        }
                    });
                }
            }
        );

    },

    onActionDelete: function(grid, rowIndex, colIndex) {
        var me = this,
            store = grid.getStore(),
            record = store.getAt(rowIndex);

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

    onViewEdit: function(grid, rowIndex, colIndex) {
        var me = this,
            store = grid.getStore(),
            record = store.getAt(rowIndex);

        Ext.getStore('users').setParams({
            method: 'selectCode',
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'usersview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function (btn) {
        var me = this;
        me.redirectTo('usernew');
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

        me.setModuleData('users');
        me.setModuleForm(view.down('form'));

        me._success = function (form, action) {

            view.down('textfield[name=username]').setReadColor(true);

            if(action.result.crud == 'insert') {
                var id = action.result.rows.id,
                    menutree = Ext.getStore('usersmenutree');

                view.down('hiddenfield[name=id]').setValue(id);
                menutree.setParams({
                    module: Ext.manifest.name,
                    usersid: id
                }).load();

            }
        };

        me.updateModule();
    },

    insertView: function () {
        var me = this,
            view = me.getView(),
            portrait = view.down('portrait');

        view.down('form').reset();
        view.down('textfield[name=username]').setReadColor(false);
        portrait.beFileData();
    }

});