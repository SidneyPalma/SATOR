//@charset UTF-8
Ext.define( 'iSterilization.view.flowprocessing.SearchPatient', {
    extend: 'Smart.form.field.ComboSearch',

    xtype: 'searchpatient',

    requires: [
        'Smart.util.Resource',
        'Smart.form.field.ComboSearch'
    ],

    displayField: 'name',

    pageSize: 0,
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
            '<div class="x-boundlist-item">',
                '<span style="font-size: 22px; display: block; line-height: 32px;">({id_patient}) {name}</span>',
                '<span style="font-size: 15px; display: block; line-height: 18px;">{health_insurance}</span>',
                '<span style="font-size: 18px; display: block; line-height: 26px; border-bottom: 1px solid #d0d0d0;">Aviso Cirúrgico: {id}</span>',
            '</div>',
        '</tpl>'
    ],

    displayTpl: [
        '<tpl for=".">',
            '{id} {name} - ({health_insurance})',
        '</tpl>'
    ]

});
