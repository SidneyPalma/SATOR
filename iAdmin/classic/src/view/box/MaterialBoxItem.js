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
        var boxitemstatus = record.get('boxitemstatus'),
            showRecord = 'text-align: center; font-weight: bold; color: red; background: rgb(253, 255, 246); cursor: pointer; height: 39px;';

            metaData.style = Ext.isNumeric(record.get('id')) != true ? showRecord : (boxitemstatus == 'E' ? 'color: red;' : '');

        return value;
    },

    makeColumn: function () {
        var me = this,
            isDisabled = function (view, rowIdx, colIdx, item, rec) {
                return !Ext.isNumeric(rec.get('id'));
            };

        Ext.create('iAdmin.store.box.MaterialBoxItem');

        me.columns = [
            {
                flex: 1,
                sortable: false,
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
                sortable: false,
                text: 'Proprietário',
                dataIndex: 'proprietaryname'
            }, {
                width: 100,
                sortable: false,
                align: 'center',
                text: 'Processos',
                dataIndex: 'numberproceedings'
            }, {
                width: 100,
                sortable: false,
                align: 'center',
                text: 'Consignado',
                xtype: 'checkcolumn',
                dataIndex: 'isconsigned',
                readOnly: true,
                renderer: me.columnsRenderer
            }, {
                width: 40,
                sortable: false,
                align: 'center',
                xtype: 'actioncolumn',
                handler: 'onUpdateMaterialBoxItem',
                isDisabled: isDisabled,
                getTip: function(v, meta, rec) {
                    var isactive = rec.get('boxitemstatus') == 'A';
                    return (Ext.isNumeric(rec.get('id')) && isactive) ? 'Editar item do kit!' : '';
                },
                getClass: function(v, meta, rec) {
                    var isactive = rec.get('boxitemstatus') == 'A';
                    return (Ext.isNumeric(rec.get('id')) && isactive) ? "fa fa-cog action-delete-color" : '';
                },
                renderer: me.columnsRenderer
            }
        ];
    }

});