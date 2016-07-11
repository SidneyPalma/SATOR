//@charset UTF-8
Ext.define( 'iAdmin.store.moviment.InputPresentationSearch', {
    extend: 'Smart.data.StoreBase',

    storeId: 'inputpresentationsearch',

    alias: 'store.InputPresentationSearch',

    fields: [
        'acronym',
        'measurebase',
        'presentation',
        'presentationdescription'
    ],

    url: '../iAdmin/business/Calls/moviment.php',

    config: {
        extraParams: {
            action: 'select',
            method: 'selectInputPresentation'
        }
    }

});