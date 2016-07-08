//@charset UTF-8
Ext.define( 'iAdmin.view.itembase.ItemBaseController', {
    extend: 'Smart.app.ViewControllerBase',

    alias: 'controller.itembase',

    url: '../iAdmin/business/Calls/itembase.php',

    insertLayout: function(grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);

        Ext.widget('itembasefield').show(null,function() {
            this.grid = grid;
            this.xdata = record;
            this.method = 'insert'
        });
    },

    deleteLayout: function(grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex);
        //     result = {},
        //     view = me.getView(),
        //     id = view.down('hiddenfield[name=id]');
        //
        // Ext.Msg.confirm('Excluir registro', 'Confirma a exclusão do registro selecionado?',
        //     function (choice) {
        //         if (choice === 'yes') {
        //
        //             delete source[record.data.name];
        //
        //             result.id = id.getValue();
        //             result.layoutvalues = Ext.encode(source);
        //
        //             Ext.Ajax.request({
        //                 scope: me,
        //                 url: me.url,
        //                 params: {
        //                     action: 'update',
        //                     rows: Ext.encode(result)
        //                 },
        //                 success: function(response, opts) {
        //                     grid.setSource(source);
        //                 }
        //             });
        //         }
        //     }
        // );
    },

    updateLayout: function(grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex);
            // view = me.getView(),
            // fields = Ext.decode(view.xdata.get('layoutfields'));

        // Ext.widget('itembasefield').show(null,function() {
        //     var name = record.get('name'),
        //         editor = fields[name].editor;
        //
        //     this.grid = grid;
        //     this.data = view.xdata;
        //
        //     this.down('textfield[name=name]').setReadColor(true);
        //     this.down('combobox[name=type]').setValue(editor.xtype);
        //     this.down('textfield[name=mask]').setValue(editor.mask);
        //     this.down('checkboxfield[name=money]').setValue(editor.money);
        //     this.down('numberfield[name=minValue]').setValue(editor.minValue);
        //     this.down('numberfield[name=maxValue]').setValue(editor.maxValue);
        //     this.down('checkboxfield[name=readOnly]').setValue(editor.readOnly);
        //     this.down('textfield[name=name]').setValue(fields[name].displayName);
        //     this.down('checkboxfield[name=allowBlank]').setValue(editor.allowBlank);
        //     this.down('textfield[name=defaultValue]').setValue(editor.defaultValue);
        //     this.down('textfield[name=referenceValue]').setValue(editor.referenceValue);
        // });
    },

    updateSource: function () {
        var me = this,
            result = {},
            target = [],
            view = me.getView(),
            form = view.down('form'),
            values = form.getValues(),
            source = {
                displayName: values.name,
                editor: new Object(values)
            },
            id = view.down('hiddenfield[name=id]');

        if(!form.isValid()) {
            return false;
        }

        source.editor.name = values.name.replace(/ /g,'');

        if( (values.mask.length != 0)||(values.xtype == 'datefield') ) {
            source.editor.plugins = 'textmask';
        }
        
        switch (values.xtype) {
            case 'combobox':
                var store = values.defaultValue.split(',');
        
                delete source.editor.mask;
                delete source.editor.plugins;
        
                source.editor.pageSize = 0;
                source.editor.store = store;
                source.editor.value = store[0];
                source.editor.editable = false;
                source.editor.forceSelection = true;
                break;
        }

        view.grid.store.each(function (rec) {
            var formfield = Ext.decode(rec.get('formfield'));
            target.push(formfield);
        });

        if(view.method == 'insert') {
            target.push(source);
        }

// 'showorder',
// 'fieldtext',
// 'fieldname',
// 'datavalue',
// 'reference',
// 'formfield',
// 'datafield',

        result.id = view.xdata.get('itembaseid');
        result.resultfields = Ext.encode(target);

        console.info(source);

        return false;

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