//@charset UTF-8
Ext.define( 'iAdmin.view.module.ModuleMenuGroupSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'modulemenugroupsearch',

    requires: [
        'Smart.form.field.ComboSearch'
    ],

    minChars: 60,
    maxLength: 20,

    config: {
        fields: [
            'id', 'name'
        ],
        clearField: false,
        params: {
            query: '%',
            action: 'select',
            method: 'selectName',
            field: 'name'
        }
    },

    fieldLabel: 'Grupo',
    displayField: 'name',

    url: '../iAdmin/business/Calls/modulemenu.php'

});
