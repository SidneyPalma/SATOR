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

    insertLayout: function(grid, rowIndex, colIndex) {
        var me = this,
            view = me.getView();

        Ext.widget('inputlayoutfield').show(null,function() {
            this.grid = grid;
            this.itembaseid = view.down('hiddenfield[name=id]').getValue();
        });
    },

    deleteLayout: function(grid, rowIndex, colIndex) {
        var me = this,
            target = [],
            result = {},
            view = me.getView(),
            store = grid.getStore(),
            record = store.getAt(rowIndex),
            id = view.down('hiddenfield[name=id]');

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {

                    store.remove(record);

                    store.each(function (rec) {
                        target.push({
                            displayName: rec.get('fieldtext'),
                            editor: Ext.decode(rec.get('formfield'))
                        });
                    });

                    result.id = id.getValue();
                    result.resultfield = Ext.encode(target);

                    Ext.Ajax.request({
                        scope: me,
                        url: me.url,
                        params: {
                            action: 'update',
                            rows: Ext.encode(result)
                        },
                        success: function(response, opts) {
                            store.load();
                        }
                    });
                }
            }
        );
    },

    updateLayout: function(grid, rowIndex, colIndex) {
        var me = this,
            view = me.getView(),
            record = grid.getStore().getAt(rowIndex),
            fields = Ext.decode(record.get('formfield'));

        Ext.widget('inputlayoutfield').show(null,function() {

            this.grid = grid;
            this.xdata = record;
            this.itembaseid = view.down('hiddenfield[name=id]').getValue();

            this.down('textfield[name=name]').setReadColor(true);
            this.down('combobox[name=xtype]').setValue(fields.xtype);
            this.down('numberfield[name=showOrder]').setValue(fields.showOrder);
            this.down('textfield[name=name]').setValue(fields.displayName);
            this.down('textfield[name=defaultValue]').setValue(fields.defaultValue);
            this.down('textfield[name=referenceValue]').setValue(fields.referenceValue);
        });
    },

    updateSource: function () {
        var me = this,
            target = [],
            result = {},
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues(),
            source = new Object(values);

        if(!form.isValid()) {
            return false;
        }

        source.displayName = values.name;
        source.name = values.name.replace(/ /g,'');

        source.plugins = values.xtype == 'datefield' ? 'textmask' : null;

        if(view.xdata) {
            view.xdata.set('formfield',Ext.encode(source));
        } else {
            target.push(source);
        }

        view.grid.store.each(function (rec) {
            target.push(Ext.decode(rec.get('formfield')));
        });

        result.id = view.itembaseid;
        result.resultfield = Ext.encode(target);

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode(result)
            },
            success: function() {
                view.grid.store.load();
                view.close();
            }
        });
    },

    //routes ========================>

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

        Ext.getStore('inputpresentation').setParams({
            query: xdata.get('id')
        }).load({
            callback: function () {
                me.filterStore(true);
            }
        });

        Ext.getStore('inputstock').setParams({
            query: xdata.get('id')
        }).load();

        grid.getStore().setParams({
            method: 'selectData',
            query: xdata.get('id')
        }).load();
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

    onViewEdit: function(grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex);

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
                view.down('itembaselayout').setDisabled(false);
                view.down('textfield[name=onlyusefilter]').setValue('');
                view.down('checkboxfield[name=onlyusefilter]').setValue(0);
                view.down('hiddenfield[name=id]').setValue(action.result.rows.id);
                Ext.getStore('inputpresentation').setParams({
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
            grid = view.down('inputpresentation');

        view.reset();

        view.down('tabpanel').setActiveTab(0);
        portrait.beFileData();
        grid.getStore().removeAll();
        view.down('itembaselayout').setDisabled(true);
        view.down('itembaselayout').getStore().removeAll();
        view.down('textfield[name=onlyusefilter]').setValue('');
        view.down('checkboxfield[name=onlyusefilter]').setValue(0);
    },

    storeField: function ( field, newValue, oldValue, eOpts ) {
       var store = Ext.getStore("inputpresentation");

       store.clearFilter();
       store.filter('filtertype',newValue);
    },

    onlyUseFilter: function ( field, newValue, oldValue, eOpts ) {
        var me = this;

        me.filterStore(newValue);
    },

    filterStore: function (filter) {
        var store = Ext.getStore("inputpresentation");

        store.clearFilter();

        if(filter) {
            store.filterBy(function (model) {
                return Ext.isNumber(parseInt(model.data.id));
            });
        }
    }

});