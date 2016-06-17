## Materiais (material)
#### São os Materiais, alvo das atividades do CME
 - Material
    - ItemBase_id: integer;
    - MaterialSatus_id: integer;
    - Qtde_Processos: integer; //Qtd de processamentos permitidos para esse material
    - Embalagem_id: integer;
    - DataDescarte: date;
    - RegistroAnvisa: string(60); (Null)
    - PatrimonioNumero: string(20);
    - Imagem: blob;
    

Exemplo

    id: 1
    MaterialStatus: 1;
    QtdVezesProcessado: 48;
    Embalagem_id: 2;
    DataDescarte: Null;
    RegistroAnvisa: Null;
    PatrimonioNumero: Null;
    Imagem: Null;

## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[material]    Script Date: 04/18/2016 20:09:08 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    CREATE TABLE [dbo].[material](
        [id] [int] NOT NULL,
        [materialstatusid] [int] NOT NULL,
        [packingid] [int] NOT NULL,
        [numberproceedings] [int] NOT NULL,
        [datedisposal] [date] NULL,
     CONSTRAINT [PK_material] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    ALTER TABLE [dbo].[material]  WITH CHECK ADD  CONSTRAINT [FK_material_itembase] FOREIGN KEY([id])
    REFERENCES [dbo].[itembase] ([id])
    GO
    
    ALTER TABLE [dbo].[material] CHECK CONSTRAINT [FK_material_itembase]
    GO
    
    ALTER TABLE [dbo].[material]  WITH CHECK ADD  CONSTRAINT [FK_material_materialstatus] FOREIGN KEY([materialstatusid])
    REFERENCES [dbo].[materialstatus] ([id])
    GO
    
    ALTER TABLE [dbo].[material] CHECK CONSTRAINT [FK_material_materialstatus]
    GO
    
    ALTER TABLE [dbo].[material]  WITH CHECK ADD  CONSTRAINT [FK_material_packing] FOREIGN KEY([packingid])
    REFERENCES [dbo].[packing] ([id])
    GO
    
    ALTER TABLE [dbo].[material] CHECK CONSTRAINT [FK_material_packing]
    GO
    
