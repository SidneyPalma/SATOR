//@charset UTF-8
Ext.define( 'iSterilization.store.armory.ArmoryStock', {
    extend: 'Smart.data.StoreBase',

    alias: 'store.ArmoryStock',

    storeId: 'armorystock',

    requires: [
        'iSterilization.model.armory.ArmoryStock'
    ],

    url: '../iSterilization/business/Calls/armorystock.php',

    model: 'iSterilization.model.armory.ArmoryStock'

});