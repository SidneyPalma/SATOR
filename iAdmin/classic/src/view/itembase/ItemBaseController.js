//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseController', {
    extend: 'Smart.app.ViewControllerBase',
    
    alias: 'controller.itembase',

    url: '../iAdmin/business/Calls/itembase.php',

    insertLayout: function(grid, rowIndex, colIndex) {
        var me = this,
            view = me.getView();

        Ext.widget('itembasefield').show(null,function() {
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

        Ext.widget('itembasefield').show(null,function() {

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
    }

});