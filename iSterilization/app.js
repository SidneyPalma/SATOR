//@charset UTF-8
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Smart.ux': '../library/ux',
        'Smart.app': '../library/app',
        'Smart.util': '../library/util',
        'Smart.data': '../library/data',
        'Smart.form': '../library/form',
        'Smart.plugins': '../library/plugins',
        'Smart.data.field': '../library/data/field',
        'Smart.form.field': '../library/form/field',
        'Smart.ux.app': '../library/ux/app',
        'Smart.ux.main': '../library/ux/main',
        'Smart.ux.login': '../library/ux/login',

        'iAdmin.store.users': '../iAdmin/app/store/users',
        'iAdmin.model.users': '../iAdmin/app/model/users',
        'iAdmin.store.enums': '../iAdmin/app/store/enums',
        'iAdmin.model.enums': '../iAdmin/app/model/enums',

        'iAdmin.store.input': '../iAdmin/app/store/input',

        'iAdmin.store.helper': '../iAdmin/app/store/helper',
        'iAdmin.model.helper': '../iAdmin/app/model/helper',

        'iAdmin.store.person': '../iAdmin/app/store/person',
        'iAdmin.model.person': '../iAdmin/app/model/person',

        'iAdmin.store.profile': '../iAdmin/app/store/profile',
        'iAdmin.model.profile': '../iAdmin/app/model/profile',
        'iAdmin.store.itembase': '../iAdmin/app/store/itembase',
        'iAdmin.model.itembase': '../iAdmin/app/model/itembase',

        'iAdmin.store.box': '../iAdmin/app/store/box',
        'iAdmin.model.box': '../iAdmin/app/model/box',

        'iAdmin.store.material': '../iAdmin/app/store/material',
        'iAdmin.model.material': '../iAdmin/app/model/material',

        'iAdmin.store.moviment': '../iAdmin/app/store/moviment',
        'iAdmin.model.moviment': '../iAdmin/app/model/moviment',

        'iAdmin.store.equipment': '../iAdmin/app/store/equipment',
        'iAdmin.model.equipment': '../iAdmin/app/model/equipment',

        'iAdmin.view.box': '../iAdmin/classic/src/view/box',
        'iAdmin.view.users': '../iAdmin/classic/src/view/users',
        'iAdmin.view.input': '../iAdmin/classic/src/view/input',

        'iAdmin.view.enums': '../iAdmin/classic/src/view/enums',
        'iAdmin.view.profile': '../iAdmin/classic/src/view/profile',
        'iAdmin.view.itembase': '../iAdmin/classic/src/view/itembase',
        'iAdmin.view.material': '../iAdmin/classic/src/view/material',
        'iAdmin.view.moviment': '../iAdmin/classic/src/view/moviment',
        'iAdmin.view.equipment': '../iAdmin/classic/src/view/equipment',
        // 'iAdmin.view.moviment.InputEnterSearch',

        'iAdmin.view.helper.place': '../iAdmin/classic/src/view/helper/place',
        'iAdmin.view.helper.targe': '../iAdmin/classic/src/view/helper/targe',
        'iAdmin.view.helper.flowing': '../iAdmin/classic/src/view/helper/flowing',
        'iAdmin.view.helper.packing': '../iAdmin/classic/src/view/helper/packing',
        'iAdmin.view.helper.provider': '../iAdmin/classic/src/view/helper/provider',
        'iAdmin.view.helper.cmeareas': '../iAdmin/classic/src/view/helper/areas',
        'iAdmin.view.helper.instrumentator': '../iAdmin/classic/src/view/helper/instrumentator',

        'iAdmin.view.person.client': '../iAdmin/classic/src/view/person/client',
        'iAdmin.view.person.proprietary': '../iAdmin/classic/src/view/person/proprietary',
        'iAdmin.view.helper.manufacturer': '../iAdmin/classic/src/view/helper/manufacturer',
        'iAdmin.view.helper.unitmeasurement': '../iAdmin/classic/src/view/helper/unitmeasurement'
    }
});

Ext.application({
    name: 'iSterilization',

    extend: 'iSterilization.Application'

});