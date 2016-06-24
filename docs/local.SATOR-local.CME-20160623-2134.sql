/*
Run this script on:

        (local).CME    -  This database will be modified

to synchronize it with:

        (local).SATOR

You are recommended to back up your database before running this script

Script created by SQL Compare version 11.1.3 from Red Gate Software Ltd at 23/06/2016 21:34:16

*/
SET NUMERIC_ROUNDABORT OFF
GO
SET ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
SET XACT_ABORT ON
GO
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
GO
BEGIN TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Dropping constraints from [dbo].[restoredumpbase]'
GO
ALTER TABLE [dbo].[restoredumpbase] DROP CONSTRAINT [PK__restored__93A5FB2D46094774]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[unitmeasurement]'
GO
CREATE TABLE [dbo].[unitmeasurement]
(
[id] [int] NOT NULL IDENTITY(1, 1),
[name] [varchar] (80) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[acronym] [varchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[packing] [varchar] (60) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[baseunit] [varchar] (60) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[measurebase] [decimal] (12, 4) NOT NULL,
[isactive] [bit] NOT NULL CONSTRAINT [DF_unitmeasurement_isactive] DEFAULT ((1))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_unitmeasurement] on [dbo].[unitmeasurement]'
GO
ALTER TABLE [dbo].[unitmeasurement] ADD CONSTRAINT [PK_unitmeasurement] PRIMARY KEY CLUSTERED  ([id])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[cmesubareasdeposit]'
GO
CREATE TABLE [dbo].[cmesubareasdeposit]
(
[id] [int] NOT NULL IDENTITY(1, 1),
[cmesubareasid] [int] NOT NULL,
[name] [varchar] (80) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[barcode] [varchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[isactive] [bit] NOT NULL CONSTRAINT [DF_cmesubareasdeposit_isactive] DEFAULT ((1))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_cmesubareasdeposit] on [dbo].[cmesubareasdeposit]'
GO
ALTER TABLE [dbo].[cmesubareasdeposit] ADD CONSTRAINT [PK_cmesubareasdeposit] PRIMARY KEY CLUSTERED  ([id])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[input]'
GO
CREATE TABLE [dbo].[input]
(
[id] [int] NOT NULL IDENTITY(1, 1),
[name] [varchar] (80) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[description] [varchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[barcode] [varchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[unitmeasurementid] [int] NOT NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_input] on [dbo].[input]'
GO
ALTER TABLE [dbo].[input] ADD CONSTRAINT [PK_input] PRIMARY KEY CLUSTERED  ([id])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_restoredumpbase] on [dbo].[restoredumpbase]'
GO
ALTER TABLE [dbo].[restoredumpbase] ADD CONSTRAINT [PK_restoredumpbase] PRIMARY KEY CLUSTERED  ([statusdate])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_directive] on [dbo].[action]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_directive] ON [dbo].[action] ([directive])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_router] on [dbo].[menu]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_router] ON [dbo].[menu] ([router])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_menuaction] on [dbo].[menuaction]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_menuaction] ON [dbo].[menuaction] ([menuid], [actionid])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_profilemenu] on [dbo].[profilemenu]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_profilemenu] ON [dbo].[profilemenu] ([profileid], [menuid])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_profilemenuaction] on [dbo].[profilemenuaction]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_profilemenuaction] ON [dbo].[profilemenuaction] ([profilemenuid], [menuactionid])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_usersmenu] on [dbo].[usersmenu]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_usersmenu] ON [dbo].[usersmenu] ([usersid], [menuid])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
COMMIT TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
DECLARE @Success AS BIT
SET @Success = 1
SET NOEXEC OFF
IF (@Success = 1) PRINT 'The database update succeeded'
ELSE BEGIN
	IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION
	PRINT 'The database update failed'
END
GO
