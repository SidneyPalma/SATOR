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

        'iSterilization.store.service': '../iSterilization/app/store/service',
        'iSterilization.model.service': '../iSterilization/app/model/service',
        'iSterilization.view.service': '../iSterilization/classic/src/view/service'
    }
});

Ext.application({
    name: 'iAdmin',

    extend: 'iAdmin.Application'

});