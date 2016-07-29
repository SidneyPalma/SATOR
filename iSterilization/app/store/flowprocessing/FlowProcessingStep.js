//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingStep', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessingStep',

    storeId: 'flowprocessingstep',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingStep'
    ],

    url: '../iSterilization/business/Calls/flowprocessingstep.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingStep',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});