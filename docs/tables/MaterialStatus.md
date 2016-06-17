## Material Status
#### (O Status atual do Material)
 - MaterialStatus
    - id:integer;
    - Nome:string(60);
    - Bloqueia:boolean
    - Ativo:boolean
    
Exemplo:

    id: 1;
    Nome: Liberado (OK);
    Bloqueia: 0;
    Ativo: 1;
    .....
    id: 2;
    Nome: Danificado (NG);
    Bloqueia: 1;
    Ativo: 1;
    .....
    id: 3
    Nome: Extraviado (NG);
    Bloqueia: 1;
    Ativo: 1;
    .....
    id: 4
    Nome: Descartado;
    Bloqueia: 1;
    Ativo: 1;

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[materialstatus]    Script Date: 03/30/2016 20:56:59 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[materialstatus](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [blocks] [bit] NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_materialstatus] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[materialstatus] ADD  CONSTRAINT [DF_materialstatus_blocks]  DEFAULT ((0)) FOR [blocks]
    GO
    
    ALTER TABLE [dbo].[materialstatus] ADD  CONSTRAINT [DF_materialstatus_isactive]  DEFAULT ((1)) FOR [isactive]
    GO