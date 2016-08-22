//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingStepInputTree', {
    extend: 'Smart.data.TreeStoreBase',

    alias: 'store.FlowProcessingStepInputTree',

    storeId: 'flowprocessingstepinputtree',

    removeRootNode: true,

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingStepInputTree'
    ],

    url: '../iSterilization/business/Calls/flowprocessingstepinput.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingStepInputTree',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectTree'
        }
    }

});