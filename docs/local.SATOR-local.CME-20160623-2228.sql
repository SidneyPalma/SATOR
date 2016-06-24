/*
Run this script on:

        (local).CME    -  This database will be modified

to synchronize it with:

        (local).SATOR

You are recommended to back up your database before running this script

Script created by SQL Compare version 11.1.3 from Red Gate Software Ltd at 23/06/2016 22:28:13

*/
DROP TABLE cmesubareasdeposit;

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
PRINT N'Creating [dbo].[cmeareasdeposit]'
GO
CREATE TABLE [dbo].[cmeareasdeposit]
(
[id] [int] NOT NULL IDENTITY(1, 1),
[cmeareasid] [int] NOT NULL,
[name] [varchar] (80) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[barcode] [varchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[isactive] [bit] NOT NULL CONSTRAINT [DF_cmeareasdeposit_isactive] DEFAULT ((1))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_cmeareasdeposit] on [dbo].[cmeareasdeposit]'
GO
ALTER TABLE [dbo].[cmeareasdeposit] ADD CONSTRAINT [PK_cmeareasdeposit] PRIMARY KEY CLUSTERED  ([id])
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
