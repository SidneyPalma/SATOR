//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseController', {
    extend: 'Smart.app.ViewControllerBase',

    url: '../iAdmin/business/Calls/itembase.php',

    insertLayout: function (grid, store, eOpts) {
        var me = this,
            view = me.getView();

        Ext.widget('itembasefield').show(null,function() {
            this.grid = grid;
            this.data = view.xdata;
        });
    },

    deleteLayout: function (grid, store, record, eOpts) {
        var me = this,
            result = {},
            view = me.getView(),
            source = grid.getSource(),
            id = view.down('hiddenfield[name=id]');

        Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
            function (choice) {
                if (choice === 'yes') {

                    delete source[record.data.name];

                    result.id = id.getValue();
                    result.layoutvalues = Ext.encode(source);

                    Ext.Ajax.request({
                        scope: me,
                        url: me.url,
                        params: {
                            action: 'update',
                            rows: Ext.encode(result)
                        },
                        success: function(response, opts) {
                            grid.setSource(source);
                        }
                    });
                }
            }
        );
    },

    updateLayout: function (grid, store, record, eOpts) {
        var me = this,
            view = me.getView(),
            fields = Ext.decode(view.xdata.get('layoutfields'));

        Ext.widget('itembasefield').show(null,function() {
            var name = record.get('name'),
                editor = fields[name].editor;

            this.grid = grid;
            this.data = view.xdata;

            this.down('textfield[name=name]').setReadColor(true);
            this.down('combobox[name=type]').setValue(editor.xtype);
            this.down('textfield[name=mask]').setValue(editor.mask);
            this.down('checkboxfield[name=money]').setValue(editor.money);
            this.down('numberfield[name=minValue]').setValue(editor.minValue);
            this.down('numberfield[name=maxValue]').setValue(editor.maxValue);
            this.down('checkboxfield[name=readOnly]').setValue(editor.readOnly);
            this.down('textfield[name=name]').setValue(fields[name].displayName);
            this.down('checkboxfield[name=allowBlank]').setValue(editor.allowBlank);
            this.down('textfield[name=defaultValue]').setValue(editor.defaultValue);
            this.down('textfield[name=referenceValue]').setValue(editor.referenceValue);
        });
    },

    updateSource: function (grid, source, values, eOpts) {
        var me = this,
            result = {},
            name = values.name,
            view = me.getView(),
            id = view.down('hiddenfield[name=id]'),
            fields = Ext.decode(view.xdata.get('layoutfields'));

        fields[name] = {
            displayName: name,
            editor: new Object(values)
        };

        source[name] = values.defaultValue;
        fields[name].editor.xtype = values.type;
        fields[name].editor.value = values.defaultValue;
        fields[name].editor.fieldCls = 'smart-field-style-action';

        if( fields[name].editor.mask.length != 0 ) {
            fields[name].editor.plugins = 'textmask';
        }

        switch (values.type) {
            case 'combobox':
                var store = values.defaultValue.split(',');

                delete fields[name].editor.mask;
                delete fields[name].editor.plugins;

                source[name] = store[0];
                fields[name].editor.pageSize = 0;
                fields[name].editor.editable = false;
                fields[name].editor.store = store;
                fields[name].editor.value = store[0];
                fields[name].editor.forceSelection = true;
                break;
            case 'datefield':
                fields[name].editor.plugins = 'textmask';
                break;
        }

        delete fields[name].editor.type;

        grid.setSource.apply(grid, [source,fields]);

        result.id = id.getValue();
        result.layoutfields = Ext.encode(fields);
        result.layoutvalues = Ext.encode(grid.getSource());

        Ext.Ajax.request({
            scope: me,
            url: me.url,
            params: {
                action: 'update',
                rows: Ext.encode(result)
            }
        });
    },

    updateValues: function (editor, context, eOpts) {
        var me = this,
            result = {},
            grid = editor.grid,
            view = me.getView(),
            id = view.down('hiddenfield[name=id]');

        result.id = id.getValue();
        result.layoutvalues = Ext.encode(grid.getSource());

        Ext.Ajax.request({
			scope: me,
			url: me.url,
			params: {
				action: 'update',
				rows: Ext.encode(result)
			},
			success: function(response, opts) {
				view.xdata.set('layoutvalues',result.layoutvalues);
            }
        });
    }

});