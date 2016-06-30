//@charset UTF-8
Ext.define( 'Smart.form.field.ComboEnum', {
    extend: 'Smart.form.field.ComboSearch',

    alias: 'widget.comboenum',

    requires: [
        'Smart.form.field.ComboSearch'
    ],

    fields: [],

    pageSize: 0,
    editable: false,
    fieldLabel: null,
    submitValue: true,
    selectRecord: true,

    config: {
        queryFilter: '',
        url: '../iAdmin/business/Calls/enumtype.php',
        params: {
            filter: '',
            action: 'select',
            method: 'selectEnum'
        }
    },

    valueField: null,
    filterField: null,
    displayField: null,

    buildCombo: function () {
        var me = this,
            name = me.getName(),
            hiddenName = name.replace('description','');

        me.valueField   = hiddenName;
        me.params.type  = hiddenName;
        me.hiddenNameId = hiddenName;
        me.displayField = me.getName();
        me.fields.push(name,hiddenName);
    },

    initComponent: function () {
        var me = this;

        me.initConfig();
        me.buildCombo();
        me.callParent();

        if(me.filterField) {
            me.store.clearFilter();
            me.store.filter(me.filterField.field,me.filterField.regex);
        }

        me.onAfter( 'select', me.fnEnumTypeSelect, me);
        me.onBefore( 'beforequery', me.fnEnumTypeBeforeQuery, me);
    },

    fnEnumTypeSelect: function ( combo, record, index, eOpts ) {
        combo.setRawValue(record.get(combo.displayField));
    },

    fnEnumTypeBeforeQuery: function ( queryPlan , eOpts ) {
         var me = this;

        delete queryPlan.combo.lastQuery;
        queryPlan.combo.store.removeAll();
        queryPlan.combo.store.setParams({ filter: me.getQueryFilter() });
    }

});