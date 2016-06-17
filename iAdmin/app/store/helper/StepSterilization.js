//@charset UTF-8
Ext.define( 'iAdmin.store.helper.StepSterilization', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.StepSterilization',

    storeId: 'stepsterilization',

    requires: [
        'iAdmin.model.helper.StepSterilization'
    ],

    url: '../iAdmin/business/Calls/stepsterilization.php',

    model: 'iAdmin.model.helper.StepSterilization'

});