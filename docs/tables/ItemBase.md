## ItemBase
#### São os dados base para Material e Equipamento
 - ItemBase
    - id:integer;
	- Codigo: Integer;  //Unique
    - DescricaoCurta:string(60);
    - DescricaoCompleta:string(120);
    - CodigoBarra: string(20);
    - Proprietario_id; integer;
    - Fabricante_id: integer;
	- DataAquisicao: date;
	- PatrimonioNumero: string(20);
	- Imagem: blob;
	- Ativo:boolean;
	
Exemplo

    id: 1;
    Codigo: 1;
    DescricaoCurta: Capote sem OPA;
    DescricaoCompleta: Capote sem OPA Composição: 01 Capote 01 Compressa
    CodigoBarra: Z5550001
    Proprietario_id: 2;
    Fabricante_id: 1,
    DataAquisicao: 01/02/2015;
    PatrimonioNumero: Null;
    Imagem: Null;
    Ativo: 1;
    .....
    id: 2;
    Codigo: 1234;
    DescricaoCurta: Autoclave 1 (134º/7');
    DescricaoCompleta: Autoclave 1 (134º/7')
    CodigoBarra: 10200110200000001
    Proprietario_id: 1;
    Fabricante_id: 10,
    DataAquisicao: 02/02/2015;
    PatrimonioNumero: 12345;
    Imagem: Null;
    Ativo: 1;
        
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[itembase]    Script Date: 05/03/2016 20:29:50 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[itembase](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](60) NOT NULL,
        [description] [varchar](80) NOT NULL,
        [barcode] [varchar](20) NOT NULL,
        [layoutvalues] [varchar](max) NULL,
        [layoutfields] [varchar](max) NULL,
        [proprietaryid] [int] NOT NULL,
        [manufacturerid] [int] NOT NULL,
        [dateacquisition] [date] NOT NULL,
        [patrimonialcode] [varchar](60) NULL,
        [registrationanvisa] [varchar](60) NULL,
        [itembasetype] [char](1) NOT NULL,
        [filedata] [varbinary](max) NULL,
        [fileinfo] [varchar](max) NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_itembase] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Nome do Usuário' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'itembase', @level2type=N'COLUMN',@level2name=N'name'
    GO
    
    EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'M = Material
    E = Equipment' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'itembase', @level2type=N'COLUMN',@level2name=N'itembasetype'
    GO
    
    ALTER TABLE [dbo].[itembase]  WITH CHECK ADD  CONSTRAINT [FK_itembase_manufacturer] FOREIGN KEY([manufacturerid])
    REFERENCES [dbo].[manufacturer] ([id])
    GO
    
    ALTER TABLE [dbo].[itembase] CHECK CONSTRAINT [FK_itembase_manufacturer]
    GO
    
    ALTER TABLE [dbo].[itembase]  WITH CHECK ADD  CONSTRAINT [FK_itembase_proprietary] FOREIGN KEY([proprietaryid])
    REFERENCES [dbo].[proprietary] ([id])
    GO
    
    ALTER TABLE [dbo].[itembase] CHECK CONSTRAINT [FK_itembase_proprietary]
    GO
    
    ALTER TABLE [dbo].[itembase] ADD  CONSTRAINT [DF_itembase_layoutvalues]  DEFAULT ('{}') FOR [layoutvalues]
    GO
    
    ALTER TABLE [dbo].[itembase] ADD  CONSTRAINT [DF_itembase_layoutfields]  DEFAULT ('{}') FOR [layoutfields]
    GO
    
    ALTER TABLE [dbo].[itembase] ADD  CONSTRAINT [DF_itembase_itembasetype]  DEFAULT ('M') FOR [itembasetype]
    GO
    
    ALTER TABLE [dbo].[itembase] ADD  CONSTRAINT [DF_itembase_isactive]  DEFAULT ((1)) FOR [isactive]
    GO