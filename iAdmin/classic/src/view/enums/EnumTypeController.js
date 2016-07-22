//@charset UTF-8
Ext.define( 'iAdmin.view.enums.EnumTypeController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.enumtype',

    routes: {
        'enumtypeview/:id': {
            action: 'getEnumTypeId'
        },
        'enumtypeview': {
            action: 'getEnumTypeNew'
        }
    },

    url: '../iAdmin/business/Calls/enumtype.php',

    fetchField: function (search, button) {
        Ext.getStore('enumtype').setParams({
            query: search.getValue()
        }).load();
    },

    //routes ===================================>>

    getEnumTypeNew: function() {
        var app = Smart.app.getController('App');

        app.onMainPageView({xtype: 'enumtypeview', xdata: null});
    },

    getEnumTypeId: function (id) {
        var app = Smart.app.getController('App'),
            record = Ext.getStore('enumtype').findRecord('id',id);

        app.onMainPageView({xtype: 'enumtypeview', xdata: record});
    },

    //routes ===================================>>

    onViewEdit: function(grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex);

        Ext.getStore('enumtype').setParams({
            method: 'selectCode',
            query: record.get('id'),
            rows: Ext.encode({ id: record.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];
                me.redirectTo( 'enumtypeview/' + record.get('id'));
            }
        });
    },

    insertViewNew: function () {
        var me = this;
        me.redirectTo('enumtypeview');
    },

    updateView: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('enumtype');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    },

    onAfterRenderView: function (container) {
        var me = this,
            enumtype = Ext.getStore('enumtype'),
            enumtypelist = Ext.getStore('enumtypelist'),
            form = container.down('form[name=enumtype]');

        if(!container.xdata) return false;

        enumtype.setParams({
            method: 'selectCode',
            rows: Ext.encode({ id: container.xdata.get('id') })
        }).load({
            scope: me,
            callback: function(records, operation, success) {
                var record = records[0];

                form.loadRecord(record);

                enumtypelist.setParams({
                    method: 'selectCode',
                    query: record.get('id')
                }).load();

                form.down('button[handler=updateView]').setDisabled(parseInt(record.get('reserved')));
                form.down('textareafield[name=observation]').setReadColor(parseInt(record.get('reserved')));
            }
        });
    },

    onActionUpdate: function(grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex),
            typelistedit = Ext.widget('enumtypelistedit', {
                xdata: record
            });

        typelistedit.show(null,function(){
            this.down('form').loadRecord(record);
        });
    },

    insertEnumItem: function () {
        var me = this,
            view = me.getView();

        view.down('form').reset();
        view.down('hiddenfield[name=enumtypeid]').setValue(view.xdata.get('enumtypeid'));
    },

    updateEnumItem: function () {
        var me = this,
            view = me.getView();

        me.setModuleData('enumtypelist');
        me.setModuleForm(view.down('form'));

        me.updateRecord();
    }

});