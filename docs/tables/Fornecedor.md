## Fornecedor
#### Fornecedor do material
 - Fornecedor
    - id:integer;
    - Nome:string(60);
    - Ativo:boolean;

Exemplo:

    id: 1;
    Nome: Nome do Fornecedor;
    Ativo: 1;
    
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[provider]    Script Date: 04/01/2016 14:16:29 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[provider](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_provider] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[provider] ADD  CONSTRAINT [DF_provider_isactive]  DEFAULT ((1)) FOR [isactive]
    GO