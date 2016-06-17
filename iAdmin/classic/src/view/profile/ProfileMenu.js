//@charset UTF-8
Ext.define( 'iAdmin.view.profile.ProfileMenu', {
    extend: 'Ext.tree.Panel',

    xtype: 'profilemenu',

    controller: 'profile',

    requires: [
        'Ext.tree.*',
        'Ext.grid.column.*',
        'Ext.grid.plugin.CellEditing',
        'iAdmin.view.profile.ProfileController',
        'iAdmin.view.profile.ProfileMenuAccess',
        'iAdmin.store.profile.ProfileMenuAction'
    ],

    cls: 'update-grid',

    store: 'profilemenutree',

    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    hideHeaders: false,
    singleExpand: true,
    headerBorders: false,
    reserveScrollbar: false,

    initComponent: function () {
        var me = this;
        me.makeColumn();
        me.callParent();
    },

    makeColumn: function () {
        var me = this;

        Ext.create('iAdmin.store.profile.ProfileMenuAction');

        me.columns = [
            {
                flex: 1,
                dataIndex: 'text',
                sortable: false,
                xtype: 'treecolumn',
                text: 'Descrição do menu'
                // renderer: function ( value, metaData, record ) {
                //     var glyph = record.get('glyph');
                //
                //     return (!glyph) ? value : Ext.String.format('<i class="{0}"></i> {1}',glyph,value);
                // }
            }, {
                width: 540,
                text: 'Diretivas',
                dataIndex: 'description',
                sortable: false,
                editor: {
                    xtype: 'pickerfield',
                    fieldCls: 'smart-field-style-action',
                    createPicker: function () {
                        return Ext.widget('profilemenuaccess');
                    },
                    listeners: {
                        expand: 'onPickerExpand',
                        collapse: 'onPickerCollapse',
						focusenter: 'onPickerFocusEnter'
                    }
                },
                renderer: function (v, meta, rec) {
                    meta.style = 'color: blue; font-style: italic;';

                    return v;
                }
            }, {
                width: 50,
                sortable: false,
                align: 'center',
                xtype: 'actioncolumn',
                handler: 'onActionDeleteTree',
                getTip: function(v, meta, rec) {
                    if ((rec.data.description) && (rec.data.leaf)) {
                        return 'Remover permissão do menu!';
                    } else {
                        return '';
                    }
                },
                getClass: function(v, meta, rec) {
                    if ((rec.data.description) && (rec.data.leaf)) {
                        return "fa fa-ban action-delete-color";
                    } else {
                        return "";
                    }
                },
                isDisabled: function (view, rowIdx, colIdx, item, rec) {
                    return ((!rec.data.description) || (!rec.data.leaf));
                }
            }
        ];
    },
    selType: 'cellmodel',
    plugins: {
        clicksToEdit: 1,
        ptype: 'cellediting',
        pluginId: 'pluginprofile'
    },
    listeners: {
        beforeedit: 'onBeforeUpdateTree'
    }

});