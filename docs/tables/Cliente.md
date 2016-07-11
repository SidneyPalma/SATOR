## Clientes Externos (origem)
 - Cliente
    - Id:integer;
    - Codigo:integer;
    - Nome:string(60);
    - TipoClienteId:integer;
    - Ativo:boolean

Exemplo:

    Id: 1;
    Codigo: 1;
    Nome: Centro Cirurgico;
    TipoClienteId: 1;
    Ativo: 1

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[client]    Script Date: 04/03/2016 10:41:06 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[client](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [code] [int] NULL,
        [clienttype] [char](3) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_client] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[client] ADD  CONSTRAINT [DF_client_isactive]  DEFAULT ((1)) FOR [isactive]
    GO