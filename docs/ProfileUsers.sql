select distinct
   u.isactive,
   a.negation,
   uma.expireto
from
   users u
   inner join usersmenu um on ( um.usersid = u.id )
   inner join menuaction ma on ( ma.menuid = um.menuid )
   inner join action a on ( a.id = ma.actionid )
   inner join menu m on ( m.id = ma.menuid )
   inner join usersmenuaction uma on ( uma.usersmenuid = um.id and uma.menuactionid = ma.id )
where u.username = 'sator.etimba'
  and m.guid = '27F003DB-A946-436D-8E25-2C5983E98B5A'
  and a.guid = '15A56879-D893-4255-AE55-22F22C514060'

union all

select
   u.isactive,
   a.negation,
   uma.expireto,
   m.guid as menu,
   a.guid as action
from
   users u
   inner join profilemenu um on ( um.profileid = u.id )
   inner join profile p on ( p.id = um.profileid )
   inner join menuaction ma on ( ma.menuid = um.menuid )
   inner join action a on ( a.id = ma.actionid )
   inner join menu m on ( m.id = ma.menuid )
   inner join profilemenuaction uma on ( uma.profilemenuid = um.id and uma.menuactionid = ma.id )
where u.username = 'sator.etimba'
  and m.guid = '27F003DB-A946-436D-8E25-2C5983E98B5A'
  and a.guid = '15A56879-D893-4255-AE55-22F22C514060'
