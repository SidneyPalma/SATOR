/*http://stackoverflow.com/questions/378700/is-it-possible-to-add-a-description-comment-to-a-table-in-microsoft-sql-2000*/

EXEC sys.sp_addextendedproperty
@name=N'SATOR_description', 
@value=N'Cadastro de Clientes',
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'client'	 

EXEC sys.sp_updateextendedproperty 
   @name=N'SATOR_description', @value=N'Cadastro de Clientes do Sistema' ,
	 @level0type=N'SCHEMA',@level0name=N'dbo', 
	  @level1type=N'TABLE'
	 ,@level1name=N'client'

SELECT * FROM fn_listextendedproperty (NULL, 'schema','dbo', 'table', 'client', default, default);