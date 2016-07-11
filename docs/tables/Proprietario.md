## Proprietários de materiais
 - Proprietario
    - Id:integer;
    - CodigoBarra:string(20);
    - Nome:string(60);
    - FoneContato: string(20);
    - PessoaContato: string(60)

Exemplo:

    Id: 1;
    CodigoBarra: ;
    Nome: ;
    FoneContato: ;
    PessoaContato: 

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[proprietary]    Script Date: 04/07/2016 12:43:32 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[proprietary](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [barcode] [varchar](20) NOT NULL,
        [contactsphone] [varchar](20) NOT NULL,
        [contactperson] [varchar](60) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_proprietary] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[proprietary] ADD  CONSTRAINT [DF_proprietary_isactive]  DEFAULT ((1)) FOR [isactive]
    GO

