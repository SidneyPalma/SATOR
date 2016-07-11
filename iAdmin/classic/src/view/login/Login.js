//@charset UTF-8
Ext.define( 'iAdmin.view.login.Login', {
    extend: 'Smart.ux.login.Login',

    xtype: 'login',

    controller: 'login',

    requires: [
        'Smart.ux.login.Login',
        'iAdmin.view.login.LoginController'
    ]

});