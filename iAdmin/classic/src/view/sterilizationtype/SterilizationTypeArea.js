//@charset UTF-8
Ext.define( 'iAdmin.view.sterilizationtype.SterilizationTypeArea', {
    extend: 'Ext.form.field.Picker',

    xtype: 'sterilizationtypearea',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Picker',
        'Smart.form.field.ComboEnum'
    ],

    editable: false,

    initComponent: function () {
        var me = this;
        me.callParent();
    },

    createPicker: function() {
        var me = this,
            picker = new Ext.form.Panel({
                // height: 270,
                // frame: true,
                // border: true,
                hidden: true,
                floating: true,
                pickerField: me,
                bodyPadding: 10,
                layout: 'anchor',
                name: 'stepflaglist',
                ownerCt: me.ownerCt,
                defaults: {
                    flex: 1,
                    anchor: '100%',
                    allowBlank: false,
                    fieldStyle: { fontSize: '16px;' }
                },
                items: [
                    {
                        pageSize: 0,
                        xtype: 'combobox',
                        editable: false,
                        showClear: true,
                        fieldLabel: 'Leituras',
                        name: 'readarea',
                        valueField: 'id',
                        displayField: 'name',
                        store: { data: [] },
                        listeners: {
                            select: 'onSelectReadArea'
                        }
                    }, {
                        xtype: 'label',
                        text: 'Exceções',
                        style: 'font-weight: bold;'
                    }, {
                        height: 150,
                        xtype: 'gridpanel',
                        store: Ext.create('Ext.data.Store'),
                        columns: [
                            {
                                flex: 1,
                                sortable: false,
                                dataIndex: 'elementname',
                                renderer: function (value,metaData) {
                                    metaData.style = 'color: red;';
                                    return value;
                                }
                            }, {
                                sortable: false,
                                width: 50,
                                align: 'center',
                                dataIndex: 'isactive',
                                xtype: 'checkcolumn'
                            }
                        ]
                    }
                ],

                buttonAlign: 'center',

                buttons: [
                    {
                        text: 'Confirmar',
                        showSmartTheme: 'blue',
                        handler: 'updateArea'
                    }, {
                        text: 'Cancelar',
                        showSmartTheme: 'blue',
                        handler: function (btn) {
                            btn.up('form').hide();
                        }
                    }
                ]
            });

        return picker;
    }

});
