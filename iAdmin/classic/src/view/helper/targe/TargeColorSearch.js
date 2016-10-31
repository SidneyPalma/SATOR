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
                '<div style="width: 25px; height: 25px; margin-right: 10px; float: left; border: 2px solid black; border-radius: 50%; background: repeating-linear-gradient(-90deg, #{colorstripe}, #{colorstripe} 2px, #{colorschema} 2px, #{colorschema} 7px);"></div>',
                '<div>{name}</div>',
            '</div>',
        '</tpl>'
    ]

});