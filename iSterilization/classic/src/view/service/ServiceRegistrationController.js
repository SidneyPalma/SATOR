//@charset UTF-8
Ext.define( 'iSterilization.view.service.ServiceRegistrationController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.serviceregistration',

    routes: {
        'serviceregistrationview/:id': {
            action: 'getServiceRegistrationId'
        },
        'serviceregistrationview': {
            action: 'getServiceRegistrationNew'
        }
    },

    url: '../iSterilization/business/Calls/serviceregistration.php',

    fetchField: function (search, button) {
        Ext.getStore('serviceregistration').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ===================================>>
    getServiceRegistrationId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('serviceregistration').findRecord('id',id);

        app.onMainPageView({xtype: 'serviceregistrationview', xdata: record});
    },

    getServiceRegistrationNew: function () {
        var app = Smart.app.getController('App');
        app.onMainPageView({xtype: 'serviceregistrationview', xdata: null});
    },
    //routes ===================================>>

	selectResultState: function (combo,record,eOpts) {
		var store = Ext.getStore('serviceregistration');
		
		store.clearFilter(true);
        store.filter('resultstate', combo.getValue());
	},

    showClear: function (field, eOpts) {
        var store = Ext.getStore('serviceregistration');

        store.removeFilter('resultstate');
        store.clearFilter(true);
    },

    onAfterRenderView: function (view) {
        var me = this,
            xdata = view.xdata;

        view.loadRecord(xdata);
        me.onLoadResultValue();
        view.down('button[name=pendent]').setDisabled(xdata.get('resultstate') != 'L');
    },

    onLoadResultValue: function () {
        var me = this,
            view = me.getView(),
            xdata = view.xdata,
            grid = view.down('serviceregistrationresult');

        grid.getStore().setParams({
            method: 'selectData',
            query: xdata.get('id')
        }).load();
    },

    onViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this;

        Ext.getStore('serviceregistration').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'serviceregistrationview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function () {
        Ext.widget('serviceregistrationnew').show();
    },

    onSelectServiceRegistration: function (combo, record, eOpts) {
        var me = this,
            view = me.getView(),
            servicetypesearch = view.down('servicetypesearch');

        servicetypesearch.reset();
        view.down('hiddenfield[name=cmeareasid]').reset();
        view.down('textfield[name=cmeareasname]').reset();

        if(record.get('itembasetype') == 'E') {
            view.down('hiddenfield[name=cmeareasid]').setValue(record.get('cmeareasid'));
            view.down('textfield[name=cmeareasname]').setValue(record.get('cmeareasname'));
        }
    },

    onBeforeQueryServiceRegistration: function ( queryPlan, eOpts ) {
        var me = this,
            view = me.getView(),
            combo = queryPlan.combo,
            itembasetype = view.down('radiogroup').getValue();

        delete combo.lastQuery;
        combo.store.removeAll();
        combo.store.setParams({ itembasetype: itembasetype.registrationtype });

        view.down('hiddenfield[name=cmeareasid]').reset();
        view.down('textfield[name=cmeareasname]').reset();
    },

    onBeforeQueryServiceType: function ( queryPlan, eOpts ) {
        var me = this,
            view = me.getView(),
            combo = queryPlan.combo,
            serviceitembasesearch = view.down('serviceitembasesearch');

        delete combo.lastQuery;
        combo.store.removeAll();
        queryPlan.query = serviceitembasesearch.getValue();
    },

    onRegistrationTypeChange: function (field, newValue , oldValue , eOpts) {
        var me = this,
            view = me.getView();

        view.down('servicetypesearch').reset();
        view.down('serviceitembasesearch').reset();
        view.down('hiddenfield[name=cmeareasid]').reset();
        view.down('textfield[name=cmeareasname]').reset();
    },

    selectItemBase: function ( combo, record, eOpts ) {
        var me = this,
            view = me.getView(),
            values = Ext.decode(record.get('layoutvalues')),
            fields = Ext.decode(record.get('layoutfields')),
            resultvalue = view.down('hiddenfield[name=resultvalue]'),
            resultfield = view.down('hiddenfield[name=resultfield]');

        resultvalue.setValue(Ext.encode(values));
        resultfield.setValue(Ext.encode(fields));
    },

	updateAccept: function (editor, context, eOpts) {
        var me = this,
            data = me.getView().xdata,
            resultstate = data.get('resultstate');

        return (resultstate == 'L');
	},
	
    updateValues: function (editor, context, eOpts) {
        var me = this,
            fields = [],
            values = [],
            result = {},
            view = me.getView(),
            record = context.record,
            id = view.down('hiddenfield[name=id]');

        context.grid.store.each(function (rec) {
            values.push({
                field: rec.get('fieldname'),
                value: rec.get('datavalue')
            });
            fields.push(Ext.decode(rec.get('formfield')));
        });

        result.id = id.getValue();
        result.resultvalue = Ext.encode(values);
        result.resultfield = Ext.encode(fields);

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode(result)
            },
            success: function() {
                delete result.id;
                delete result.resultfield;
                record.set('resultvalue',Ext.encode({
                    field: record.get('fieldname'),
                    value: record.get('datavalue')
                }));
                record.commit();
            }
        });
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleForm(view);
        me.setModuleData('serviceregistration');

        me._success = function (form, action) {
            if(action.result.crud == 'insert') {
                Ext.getStore('serviceregistration').setParams({
                    method: 'selectCode',
                    rows: Ext.encode({ id: action.result.rows.id })
                }).load({
                    scope: me,
                    callback: function(records, operation, success) {
                        me.getView().close();
                        var record = records[0];
                        me.redirectTo( 'serviceregistrationview/' + record.get('id'));
                    }
                });
            }
        }

        me.updateModule();
    },
	
	updateFlux: function () {
		var me = this,
            result = {},
            view = me.getView(),
            id = view.down('hiddenfield[name=id]');
			
        if(id.getValue().length == 0) {
            return false;
        }			

        Ext.Msg.confirm('Concluir lançamento', 'Confirma a conclusão do lançamento?',
            function (choice) {
                if (choice === 'yes') {

					result.resultstate = 'P';
					result.id = id.getValue();

					Ext.Ajax.request({
						scope: me,
						url: me.url,
						params: {
							action: 'update',
							rows: Ext.encode(result)
						},
						success: function () {
                            Ext.getStore('serviceregistration').setParams({
                                method: 'selectCode',
                                query: result.id,
                                rows: Ext.encode({ id: result.id })
                            }).load({
                                scope: me,
								callback: function(records, operation, success) {
									view.xdata = records[0];
									view.loadRecord(view.xdata);
                                    view.down('button[name=pendent]').setDisabled(true);
								}
							});
						}
					});
                }
            }
        );
	},

    insertView: function () {
        var me = this,
            view = me.getView().down('form');

        me.setModuleForm(view);
        me.setModuleData('serviceregistration');

        me._success = function (form, action) {
            if(action.result.crud == 'insert') {
                Ext.getStore('serviceregistration').setParams({
                    method: 'selectCode',
                    rows: Ext.encode({ id: action.result.rows.id })
                }).load({
                    scope: me,
                    callback: function(records, operation, success) {
                        me.getView().close();
                        var record = records[0];
                        me.redirectTo( 'serviceregistrationview/' + record.get('id'));
                    }
                });
            }
        }

        me.updateModule();
    },

    printerView: function () {
        var me = this,
            view = me.getView(),
            id = view.xdata.get('id'),
            url = 'business/Calls/Quick/ServiceRegistration.php?id={0}';

        // if(Ext.getStore('serviceregistration').getCount() == 0) {
        //     return false;
        // }

        window.open(Ext.String.format(url,id));
    }

});
