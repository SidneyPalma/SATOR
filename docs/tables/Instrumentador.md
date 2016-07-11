## Instrumentador
#### (Realiza a instrumentação de material durante a realização da Cirurgia)
 - Instrumentador
    - id:integer;
    - Nome:string(60);
    - Ativo:boolean

Exemplo:

    Id: 1;
    Nome: Fulano de tal ;
    Ativo: 1 

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[instrumentator]    Script Date: 04/01/2016 14:24:36 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[instrumentator](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_instrumentator] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[instrumentator] ADD  CONSTRAINT [DF_instrumentator_isactive]  DEFAULT ((1)) FOR [isactive]
    GO