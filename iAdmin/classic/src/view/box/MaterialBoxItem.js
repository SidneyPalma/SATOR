//@charset UTF-8
Ext.define( 'iAdmin.view.box.MaterialBoxItem', {
    extend: 'Ext.grid.Panel',

    xtype: 'materialboxitem',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.*',
        'iAdmin.store.box.*',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.store.box.MaterialBoxItem',
        'iAdmin.view.material.MaterialBoxItemSearch'
    ],

    rowLines: false,
    hideHeaders: false,
    headerBorders: false,

    cls: 'list-grid',

    selType: 'cellmodel',

    store: 'materialboxitem',

    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting'
    },

    listeners: {
        edit: 'onEditBoxItem',
        beforeedit: 'onBeforeEditBoxItem'
    },

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    columnsRenderer: function(value, metaData, record, rowIndex, colIndex, store) {
        var showRecord = 'text-align: center; font-weight: bold; color: red; background: rgb(253, 255, 246); cursor: pointer; height: 39px;';
        metaData.style = Ext.isNumeric(record.get('id')) != true ? showRecord : '';
        return value;
    },

    makeColumn: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, record) {
                return !Ext.isNumeric(record.get('id'));
            };

        Ext.create('iAdmin.store.box.MaterialBoxItem');

        me.columns = [
            {
                flex: 1,
                text: 'Material',
                dataIndex: 'materialname',
                editor: {
                    showClear: false,
                    allowBlank: false,
                    xtype: 'materialboxitemsearch',
                    fieldCls: 'smart-field-style-action',
                    listeners: {
                        beforequery: 'onBeforeQuery'
                    }
                }
            }, {
                width: 200,
                text: 'Proprietário',
                dataIndex: 'proprietaryname'
            }, {
                width: 100,
                align: 'center',
                text: 'Processos',
                dataIndex: 'numberproceedings'
            }, {
                width: 100,
                align: 'center',
                text: 'Consignado',
                xtype: 'checkcolumn',
                dataIndex: 'isconsigned',
                readOnly: true,
                renderer: me.columnsRenderer
            }, {
                width: 40,
                align: 'center',
                xtype: 'actioncolumn',
                handler: 'onUpdateMaterialBoxItem',
                isDisabled: isDisabled,
                getTip: function(v, meta, rec) {
                    return Ext.isNumeric(rec.get('id')) ? 'Editar item do kit!' : '';
                },
                getClass: function(v, meta, rec) {
                    return Ext.isNumeric(rec.get('id')) ? "fa fa-cog action-update-color" : '';
                },
                renderer: me.columnsRenderer
            }
        ];
    }

});