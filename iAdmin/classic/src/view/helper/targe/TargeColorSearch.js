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

    //http://codepen.io/chriscoyier/pen/epfEc
    // .stripe-1 {
    //     background: -webkit-repeating-linear-gradient(90deg, #FFFFFF, #FFFFFF 1px, #465298 1px, #465298 5px);
    //     background: repeating-linear-gradient(90deg, #FFFFFF, #FFFFFF 1px, #465298 1px, #465298 5px);
    // }

    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item" style="height: 30px;">',
                '<div style="float: left; height: 30px; width: 30px; margin-right: 10px; background-color: #{colorschema}; border: 5px solid white; border-radius: 50%;"></div>',
                '<div>{name}</div>',
            '</div>',
        '</tpl>'
    ]

});