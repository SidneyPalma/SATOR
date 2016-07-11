## Equipamentos
#### Equipamentos utilizado nos processos relacionados a esterilização do material
 - Equipamento 
    - ItemBase_id: integer;
	- Modelo: string(60);
    - NumeroSerie: string(60);
    - RegistroAnvisa: string(60)
    - ValidadeRegistroAnvisa: date;
    - EquipamentoStatus_id: integer;  
    - AnoFabricacao: integer;
    - CapacidadeLitro: integer;
    - AreasCME_id: integer;
    - Fluxo?: boolean;
    - FluxoLabel: string(20);
          
        
Exemplo

      ItemBase_id: 2
      Modelo: AC 254L 
      NumeroSerie: 201405
      RegistroAnvisa: 10223710050
      ValidadeRegistroAnvisa: 21/09/2016
      EquipamentoStatus_id: 1
      AnoFabricacao: 2005
      CapacidadeLitro: 254
      AreasCME_id: 2
      .....
   
## DML
    USE [SATOR]
    GO
    
    /****** Object:  Table [dbo].[equipment]    Script Date: 04/18/2016 20:08:33 ******/
    SET ANSI_NULLS ON
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    SET ANSI_PADDING ON
    GO
    
    CREATE TABLE [dbo].[equipment](
        [id] [int] NOT NULL,
        [cmeareasid] [int] NOT NULL,
        [equipmentstatusid] [int] NOT NULL,
        [manufactureryear] [int] NOT NULL,
        [capacity] [int] NOT NULL,
        [design] [varchar](10) NOT NULL,
        [serialnumber] [varchar](60) NOT NULL,
        [registrationanvisavalid] [date] NOT NULL,
     CONSTRAINT [PK_equipment] PRIMARY KEY CLUSTERED 
    (
        [id] ASC
    )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    
    GO
    
    SET ANSI_PADDING OFF
    GO
    
    ALTER TABLE [dbo].[equipment]  WITH CHECK ADD  CONSTRAINT [FK_equipment_cmeareas] FOREIGN KEY([cmeareasid])
    REFERENCES [dbo].[cmeareas] ([id])
    GO
    
    ALTER TABLE [dbo].[equipment] CHECK CONSTRAINT [FK_equipment_cmeareas]
    GO
    
    ALTER TABLE [dbo].[equipment]  WITH CHECK ADD  CONSTRAINT [FK_equipment_equipmentstatus] FOREIGN KEY([equipmentstatusid])
    REFERENCES [dbo].[equipmentstatus] ([id])
    GO
    
    ALTER TABLE [dbo].[equipment] CHECK CONSTRAINT [FK_equipment_equipmentstatus]
    GO
    
    ALTER TABLE [dbo].[equipment]  WITH CHECK ADD  CONSTRAINT [FK_equipment_itembase] FOREIGN KEY([id])
    REFERENCES [dbo].[itembase] ([id])
    GO
    
    ALTER TABLE [dbo].[equipment] CHECK CONSTRAINT [FK_equipment_itembase]
    GO
    
