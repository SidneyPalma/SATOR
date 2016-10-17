//@charset UTF-8
Ext.define( 'iSterilization.model.armory.ArmoryMovementOutput', {
    extend: 'iSterilization.model.armory.ArmoryMovement',

    requires: [
        'iSterilization.model.armory.ArmoryMovement'
    ],

    identifier: 'auto',

    fields: [
        {
            name: 'id',
            type: 'int',
            serializeType: 'auto'
        }, {
            name: 'clientid',
            type: 'int'
        }, {
            name: 'barcode',
            type: 'auto',
            persist: true,
            critical: true
        }, {
            name: 'clientname',
            type: 'auto'
        }, {
            name: 'patientname',
            type: 'auto'
        }, {
            name: 'surgicalwarning',
            type: 'auto'
        }, {
            name: 'instrumentator',
            type: 'auto'
        }, {
            name: 'flowing',
            type: 'auto'
        }, {
            name: 'place',
            type: 'auto'
        }, {
            name: 'transportedby',
            type: 'auto'
        }, {
            name: 'surgicalroom',
            type: 'auto'
        }, {
            name: 'surgical',
            type: 'auto'
        }, {
            name: 'dateof',
            type: 'auto',
            serializeType: 'date'
        }, {
            name: 'timeof',
            type: 'auto'
        }, {
            name: 'hasbox',
            type: 'int'
        }
    ]

    // fields: [
    //     {
    //         name: 'id',
    //         type: 'int',
    //         serializeType: 'auto'
    //     }, {
    //         name: 'clientid',
    //         type: 'int'
    //     }, {
    //         name: 'clientname',
    //         type: 'auto'
    //     }, {
    //         name: 'patientname',
    //         type: 'auto'
    //     }, {
    //         name: 'surgicalwarning',
    //         type: 'auto'
    //     }, {
    //         name: 'instrumentator',
    //         type: 'auto'
    //     }, {
    //         name: 'flowing',
    //         type: 'auto'
    //     }, {
    //         name: 'transportedby',
    //         type: 'auto'
    //     }, {
    //         name: 'surgicalroom',
    //         type: 'auto'
    //     }, {
    //         name: 'surgical',
    //         type: 'auto'
    //     }, {
    //         name: 'dateof',
    //         type: 'auto',
    //         serializeType: 'date'
    //     }, {
    //         name: 'timeof',
    //         type: 'auto'
    //     }, {
    //         name: 'hasbox',
    //         type: 'int'
    //     }
    // ]

});