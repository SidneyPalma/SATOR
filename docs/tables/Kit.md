## Kits 
#### (Conjunto de Materiais)
 - Kit
    - id:integer;
    - Nome:string(60);
    - CodigoBarra: string(20);
    - Cor1: string(20);
    - Cor2: string(20);
    - Cor3: string(20);
    - Cor4: string(20);
    - Tamanho_id: integer;
    - Embalagem_id: integer;
    - MaterialStatus_id: integer;
    - ExigeProntuario: bolean;
    - Ativo:boolean;
         - KitDetalhe
            - id: integer;
            - Seq: integer;
            - Material_id;

Exemplo:

    id: 1;
    Nome: Bd. Peq. Cirurgia S.O. 1;
    CodigoBarra: Z5550001
    Cor1: 
    Cor2:
    Cor3:
    Cor4:
    Tamanho_id: 1;
    Embalagem_id: 2;
    Situracao_id: 1; //MaterialStatus
    ExigeProntuario: 0;
    Ativo: 1;
        id: 1;
        seq: 1;
        Material: 1
        .....
        id: 1;
        seq: 1;
        Material: 2
        
#DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[materialbox]    Script Date: 06/21/2016 06:27:22 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[materialbox](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [barcode] [varchar](20) NOT NULL,
        [restriction] [varchar](max) NULL,
        [itemsize] [char](3) NOT NULL,
        [statusbox] [char](3) NOT NULL,
        [packingid] [int] NOT NULL,
        [requirepatient] [bit] NOT NULL,
     CONSTRAINT [PK_materialbox] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[materialbox]  WITH CHECK ADD  CONSTRAINT [FK_materialbox_packing] FOREIGN KEY([packingid])
    REFERENCES [dbo].[packing] ([id])
    GO
    
    ALTER TABLE [dbo].[materialbox] CHECK CONSTRAINT [FK_materialbox_packing]
    GO
    
    ALTER TABLE [dbo].[materialbox] ADD  CONSTRAINT [DF_materialbox_statusbox]  DEFAULT ((0)) FOR [statusbox]
    GO
    
    ALTER TABLE [dbo].[materialbox] ADD  CONSTRAINT [DF_materialbox_requirepatient]  DEFAULT ((0)) FOR [requirepatient]
    GO
    
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[materialboxitem]    Script Date: 06/21/2016 06:31:11 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[materialboxitem](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [materialboxid] [int] NOT NULL,
        [materialid] [int] NOT NULL,
        [boxitemstatus] [char](1) NOT NULL,
        [observation] [varchar](max) NULL,
     CONSTRAINT [PK_materialboxitem] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[materialboxitem]  WITH CHECK ADD  CONSTRAINT [FK_materialboxitem_material] FOREIGN KEY([materialid])
    REFERENCES [dbo].[material] ([id])
    GO
    
    ALTER TABLE [dbo].[materialboxitem] CHECK CONSTRAINT [FK_materialboxitem_material]
    GO
    
    ALTER TABLE [dbo].[materialboxitem]  WITH CHECK ADD  CONSTRAINT [FK_materialboxitem_materialbox] FOREIGN KEY([materialboxid])
    REFERENCES [dbo].[materialbox] ([id])
    GO
    
    ALTER TABLE [dbo].[materialboxitem] CHECK CONSTRAINT [FK_materialboxitem_materialbox]
    GO
    
    ALTER TABLE [dbo].[materialboxitem] ADD  CONSTRAINT [DF_materialboxitem_boxitemstatus]  DEFAULT ('A') FOR [boxitemstatus]
    GO
    
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[materialboxtarge]    Script Date: 06/21/2016 06:31:23 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    CREATE TABLE [dbo].[materialboxtarge](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [materialboxid] [int] NOT NULL,
        [targecolorid] [int] NOT NULL,
     CONSTRAINT [PK_materialboxtarge] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    ALTER TABLE [dbo].[materialboxtarge]  WITH CHECK ADD  CONSTRAINT [FK_materialboxtarge_materialbox] FOREIGN KEY([materialboxid])
    REFERENCES [dbo].[materialbox] ([id])
    GO
    
    ALTER TABLE [dbo].[materialboxtarge] CHECK CONSTRAINT [FK_materialboxtarge_materialbox]
    GO
    
    ALTER TABLE [dbo].[materialboxtarge]  WITH CHECK ADD  CONSTRAINT [FK_materialboxtarge_targecolor] FOREIGN KEY([targecolorid])
    REFERENCES [dbo].[targecolor] ([id])
    GO
    
    ALTER TABLE [dbo].[materialboxtarge] CHECK CONSTRAINT [FK_materialboxtarge_targecolor]
    GO
    
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[targecolor]    Script Date: 06/21/2016 06:31:34 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[targecolor](
        [id] [int] IDENTITY(1,1) NOT NULL,
        [name] [varchar](80) NOT NULL,
        [colorschema] [varchar](20) NOT NULL,
        [isactive] [bit] NOT NULL,
     CONSTRAINT [PK_targecolor] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[targecolor] ADD  CONSTRAINT [DF_targecolor_isactive]  DEFAULT ((0)) FOR [isactive]
    GO
    
