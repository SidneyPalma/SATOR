//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchPatient', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchpatient',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'name',

    pageSize: 10,
    showClear: true,

    url: '../iSterilization/business/Calls/flowprocessing.php',

    params: {
        action: 'select',
        method: 'selectOpenPatient'
    },

    fields: [
        {
            name: 'id',
            type: 'auto'
        }, {
            name: 'name',
            type: 'auto'
        }, {
            name: 'id_patient',
            type: 'auto'
        }, {
            name: 'health_insurance',
            type: 'auto'
        }
    ],

    tpl: [
        '<tpl for=".">',
            '<div class="x-boundlist-item" style="font-size: 14px; line-height: 18px;">',
                '<span style="display: block;">({id_patient}) {name}</span>',
                '<span style="display: block;">{health_insurance}</span>',
                '<span style="display: block; border-bottom: 1px solid #d0d0d0;">Aviso Cirúrgico: {id}</span>',
            '</div>',
        '</tpl>'
    ]

    // displayTpl: [
    //     '<tpl for=".">',
    //         '{id} {name} - ({health_insurance})',
    //     '</tpl>'
    // ]

});
