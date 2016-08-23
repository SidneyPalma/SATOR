//@charset UTF-8
Ext.define( 'iAdmin.view.moviment.PresentationSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'presentationsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.moviment.PresentationSearch'
    ],

    valueField: 'presentation',
    displayField: 'presentationdescription',

    pageSize: 0,
    showClear: true,

    store: 'iAdmin.store.moviment.PresentationSearch',

    // template for the content List
    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item">',
                '<a style="display: block;">{presentationdescription}</a>',
                '<a style="display: block; color: red;">Unidades base: {measurebase} - Sigla: {acronym}</a>',
            '</div>',
        '</tpl>'
    ]

});
