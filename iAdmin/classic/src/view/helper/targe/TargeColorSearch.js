//@charset UTF-8
Ext.define( 'iAdmin.view.helper.targe.TargeColorSearch', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'targecolorsearch',

    requires: [
        'Smart.form.field.ComboSearch',
        'iAdmin.store.helper.TargeColor'
    ],

    displayField: 'name',

    showClear: true,

    store: 'iAdmin.store.helper.TargeColor',

    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item" style="height: 30px;">',
                '<div style="float: left; height: 30px; width: 30px; margin-right: 10px; background-color: #{colorschema}; border: 2px solid white;"></div>',
                '<div>{name}</div>',
            '</div>',
        '</tpl>'
    ]

});