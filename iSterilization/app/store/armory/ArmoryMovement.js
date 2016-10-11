//@charset UTF-8
Ext.define( 'iSterilization.store.armory.ArmoryMovement', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ArmoryMovement',

    storeId: 'armorymovement',

    requires: [
        'iSterilization.model.armory.ArmoryMovement'
    ],

    url: '../iSterilization/business/Calls/armorymovement.php',

    model: 'iSterilization.model.armory.ArmoryMovement'

});