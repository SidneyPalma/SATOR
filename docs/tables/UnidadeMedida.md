## Unidade de Medida para Insumos
 - UnidadeMedida
    - Id:integer;
    - Sigla: string(20);
    - Nome: string(60);
    - UnidadeBase: string(60);
    - MedidaBase: decimal(18,3);
    - Embalagem: string(60);
    - Ativo: boolean;

Exemplo:

    Id: 1;
    Sigla: GL
    Nome: Galão
    UnidadeBase: Litro
    MedidaBase: 5,000
    Embalaagem: Galao
    Ativo: 1
    
#DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[unitmeasurement]    Script Date: 06/22/2016 22:49:00 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[unitmeasurement](
    	[id] [int] IDENTITY(1,1) NOT NULL,
    	[name] [varchar](80) NOT NULL,
    	[acronyme] [varchar](20) NOT NULL,
    	[baseunit] [varchar](60) NOT NULL,
    	[measurebase] [decimal](12, 4) NOT NULL,
    	[packing] [varchar](60) NOT NULL,
    	[isactive] [bit] NOT NULL,
     CONSTRAINT [PK_unitmeasurement] PRIMARY KEY CLUSTERED 
    (
    	[id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[unitmeasurement] ADD  CONSTRAINT [DF_unitmeasurement_isactive]  DEFAULT ((1)) FOR [isactive]
    GO
    
