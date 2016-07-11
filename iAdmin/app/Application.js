//@charset UTF-8
Ext.define( 'iAdmin.Application', {
    extend: 'Smart.ux.app.Application',

    name: 'iAdmin',

    controllers: [
        'iAdmin.controller.App'
    ],

    requires: [
        'iAdmin.view.main.Main',
        'iAdmin.view.login.Login',
        'Smart.ux.app.Application'
    ],

    url: '../iAdmin/business/Calls/users.php'

});