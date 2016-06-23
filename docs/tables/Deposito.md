## Depósitos de Insumos
 - Deposito
    - Id:integer;
    - Nome: string(60);
    - AreaCME_id: integer;
    - CodigoBarra: string(20);
    - Ativo: boolean;

Exemplo:

    Id: 1;
    Nome: Depósito CME
    AreaCME_id: 1
    CodigoBarra: 001
    Ativo: 1
    
#DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[cmesubareasdeposit]    Script Date: 23/06/2016 19:25:56 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[cmesubareasdeposit](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [cmesubareasid] [int] NOT NULL,
        [name] [varchar](80) NOT NULL,
        [barcode] [varchar](20) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_cmesubareasdeposit] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[cmesubareasdeposit] ADD  CONSTRAINT [DF_cmesubareasdeposit_isactive]  DEFAULT ((1)) FOR [isactive]
    GO
    
