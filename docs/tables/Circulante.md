## Circulante
#### (Circula material nas salas cirurgicas)
 - Circulante
     - Id:integer;
     - Nome:string(60);
     - Ativo:boolean

Exemplo:

    Id: 1;
    Nome: ;
    Ativo: 

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[flowing]    Script Date: 04/01/2016 14:08:13 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[flowing](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_flowing] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[flowing] ADD  CONSTRAINT [DF_flowing_isactive]  DEFAULT ((1)) FOR [isactive]
    GO