//@charset UTF-8
Ext.define( 'iSterilization.store.armory.ArmoryMovementOutput', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ArmoryMovementOutput',

    storeId: 'armorymovementoutput',

    requires: [
        'iSterilization.model.armory.ArmoryMovementOutput'
    ],

    url: '../iSterilization/business/Calls/armorymovementoutput.php',

    model: 'iSterilization.model.armory.ArmoryMovementOutput'

});