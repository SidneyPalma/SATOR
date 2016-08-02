//@charset UTF-8
Ext.define( 'iSterilization.store.flowprocessing.FlowProcessingStepMaterial', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.FlowProcessingStepMaterial',

    storeId: 'flowprocessingstepmaterial',

    requires: [
        'iSterilization.model.flowprocessing.FlowProcessingStepMaterial'
    ],

    url: '../iSterilization/business/Calls/flowprocessingstepmaterial.php',

    model: 'iSterilization.model.flowprocessing.FlowProcessingStepMaterial',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectCode'
        }
    }

});