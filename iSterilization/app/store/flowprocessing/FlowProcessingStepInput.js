//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingStepInput', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessingStepInput',

    storeId: 'flowprocessingstepinput',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingStepInput'
    ],

    url: '../iSterilization/business/Calls/flowprocessingstepinput.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingStepInput',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});