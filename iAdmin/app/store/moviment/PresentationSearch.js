//@charset UTF-8
Ext.define( 'iAdmin.store.moviment.PresentationSearch', {
    extend: 'Smart.data.StoreBase',

    storeId: 'presentationsearch',

    alias: 'store.PresentationSearch',

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