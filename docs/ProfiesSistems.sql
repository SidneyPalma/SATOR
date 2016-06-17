select
   m.name,
   m.router,
   a.description,
   a.directive,
   m.guid as mguid,
   a.guid as aguid
from
   menuaction ma
   inner join action a on ( a.id = ma.actionid )
   inner join menu m on ( m.id = ma.menuid )
order by m.name, a.directive