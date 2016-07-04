//@charset UTF-8
Ext.define( 'Ext.overrides.panel.Table', {
    override: 'Ext.panel.Table',

    rowLines: false,
    hideHeaders: true,
    recordsRenderer: false,

    initComponent: function () {
        var me = this,
            id = Ext.id();

        me.insertRecordId = id;

        me.viewConfig = {
            deferEmptyText: false,
            loadMask: { msg: 'Carregando...!' },
            emptyText: [
                '<div style="text-align: center;">Nenhum dado disponível...</div>',
                Ext.String.format('<div style="text-align: center;"><h2><i id="{0}"></i></h2></div>',id)
            ]
        };

        me.callParent();

        me.onBefore( 'beforerender', me.fnBeforeRender, me);
    },

    fnBeforeRender: function (view, eOpts) {
        var me = this;

        if(me.columnsRenderer) {
            Ext.each(me.columns,function(column) {
                if(column.renderer === false) {
                    column.renderer = me.columnsRenderer;
                };
            });
        }
    },

    addColumn: function (column, colIndex, typeField) {
        var me = this,
            model = me.getStore().model.prototype,
            prototypeFields = model.fields,
            fields = prototypeFields.getRange(),
            typeField = typeField || 'string';

        colIndex = colIndex || -1;

        if (typeof column == 'string') {
            column = {header: column, dataIndex: column};
        }

        if (Ext.isEmpty(prototypeFields.getByKey(column.dataIndex))) {

            prototypeFields.add(
                new Ext.data.Field({name: column.dataIndex, type: typeField})
            );
        }

        me.headerCt.add(colIndex, column);
        me.getView().refresh();
    }

    });