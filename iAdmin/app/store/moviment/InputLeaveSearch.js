//@charset UTF-8
Ext.define( 'iAdmin.store.moviment.InputLeaveSearch', {
    extend: 'Smart.data.StoreBase',

    storeId: 'inputleavesearch',

    alias: 'store.InputLeaveSearch',

    fields: [
        'id',
        'name',
        'inputid',
        'lotamount',
        'lotpart',
        'datevalidity',
        'clonelotpart',
        'clonedatevalidity',
        'presentation',
        'presentationdescription'
    ],

    url: '../iAdmin/business/Calls/moviment.php',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectInputLeave'
        }
    }

});