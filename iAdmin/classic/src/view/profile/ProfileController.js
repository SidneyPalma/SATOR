//@charset UTF-8
Ext.define( 'iAdmin.view.profile.ProfileController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.profile',

    url: '../iAdmin/business/Calls/profile.php',

    fetchField: function (search, button) {
        Ext.getStore('profile').setParams({
            query: search.getValue()
        }).load();
    },

    onViewEdit: function ( viewView, record ) {
        var me = this;

        me.onProfileUpdate(null, null, null, null, null, record);
    },

    onCellKeyDown: function ( viewTable, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var me = this,
            view = me.getView();

        if (e.getKey() === e.ESC) {
            view.recordSelected.xview.down('treepanel').getView().focusCell( view.recordSelected.hasPosition );
            view.hide();
        }
    },

    onDestroy: function (panel, eOpts) {
        Ext.getStore('profilemenutree').load();
    },

    onEditMenuAction: function (editor, context, eOpts) {
        var me = this,
            gd = context.grid,
            store = gd.getStore();

        store.sync({
            scope: me,
            success: function (batch, options) {
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

    onAfterRenderView: function (panel) {
        var form = panel.down('form'),
            menutree = Ext.getStore('profilemenutree'),
            id = form.down('hiddenfield[name=id]').getValue();

        if(!panel.xdata) return false;

        menutree.setParams({
            module: Ext.manifest.name,
            profileid: panel.xdata.get('id')
        }).load();

        form.loadRecord(panel.xdata);
    },

    onCellKeyDown: function (viewTable, td,cellIndex,record,tr,rowIndex,e,eOpts) {
        var me = this,
            profilemenu = Ext.getStore('profilemenu'),
            menuaction = Ext.getStore('profilemenuaction');

        if ((e.getKey() === e.ENTER) && (cellIndex == 1)) {
            var menuaccess = Ext.widget('profilemenuaccess', { xdata: record });

            profilemenu.setParams({
                menuid: record.get('menuid'),
                profileid: record.get('profileid')
            }).load({
                scope: me,
                callback: function(records, operation, success) {
                    var rec = records[0];

                    menuaccess.show(null,function(){
                        this.down('form').loadRecord(rec);
                        menuaction.setParams({
                            menuid: rec.get('menuid'),
                            profileid: rec.get('profileid')
                        }).load();
                    });
                }
            });
        }
    },
    
    onBeforeUpdateTree: function (editor, context, eOpts) {
        return context.record.data.leaf;
    },

    onActionDeleteTree: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
			params = record.data,
			profilemenuid = record.get('profilemenuid');

		params.id = ( profilemenuid && profilemenuid.length != 0 ) ? profilemenuid : '';
		params.rows = Ext.encode(params);
		params.action = 'delete';
		
        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
					Ext.Ajax.request({
						scope: me,
						url: '../iAdmin/business/Calls/profilemenu.php',
						params: params,
						success: function(response, opts) {
                            record.set('expireto','');
                            record.set('description','');
							record.set('profilemenuid',null);
							record.commit();
						},
						failure: function(response, opts) {
						}
					});
                }
            }
        );

    },

    onActionDelete: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            store = grid.getStore();

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

    onActionDelete_: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            view = me.getView(),
            store = grid.getStore();

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {
                    store.remove(record);
                    store.sync({
                        callback: function (batch, options) {
                            var list = [];
                            store.each( function (rd) {
                                if(rd.get('expireto')) {
                                    list.push(rd.get('directive'));
                                }
                            });
                            view.recordSelected.xdata.set('description',list.join(", "));
                            view.recordSelected.xdata.commit();
                        }
                    });
                }
            }
        );

    },

    onProfileUpdate: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var profileedit = Ext.widget('profileedit', { xdata: record });

        profileedit.show(null,function() {
            this.down('form').loadRecord(this.xdata);
        });
    },

    onProfileUpdateMenuTree: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.widget('profilemenuedit', { xdata: record }).show();
    },

    insertViewNew: function () {
        Ext.widget('profileedit').show();
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('profile');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    },

    insertView: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();
    }

});