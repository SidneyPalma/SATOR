## Fabricante
#### Fabricante do material
 - Fabricante
    - id:integer;
    - Nome:string(60);
    - Ativo:boolean;
    
Exemplo:

    id: 1
    Nome: Ortossíntese Ind. Com. Ltda 
    Ativo: 1
    
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[manufacturer]    Script Date: 04/01/2016 14:22:59 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[manufacturer](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_manufacturer] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[manufacturer] ADD  CONSTRAINT [DF_manufacturer_isactive]  DEFAULT ((1)) FOR [isactive]
    GO