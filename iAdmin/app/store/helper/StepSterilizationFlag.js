//@charset UTF-8
Ext.define( 'iAdmin.store.helper.StepSterilizationFlag', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.StepSterilizationFlag',

    storeId: 'stepsterilizationflag',

    url: '../iAdmin/business/Calls/stepsterilization.php',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'description',
            type: 'auto'
        }, {
            name: 'isactive',
            type: 'boolean'
        }
    ],

    config: {
        extraParams: {
            method: 'selectFlag'
        }
    }

});