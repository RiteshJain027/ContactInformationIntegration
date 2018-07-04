/*================================================================================================================
Author		:	Ritesh Jain
Create Date	:	01 July 2018
Description	:	
Execution	:	EXEC [dbo].[sp_ContactInsert] 'Test1','TestLast','abc@g.com','12345',true
Notes		:	

Date					Name					Description
-----------------------------------------------------------------------------------------------------------------
01 July 2018 			Ritesh Jain				Created Stored Procedure.
================================================================================================================*/
CREATE PROCEDURE [dbo].[sp_ContactInsert]
    @FirstName		NVARCHAR(255),
    @LastName		NVARCHAR(255),
    @Email			NVARCHAR(255),
    @PhoneNumber	NVARCHAR(20),
    @ContactStatus	BIT
AS 	
BEGIN
	DECLARE @ErrorMessage NVARCHAR(255); 
	DECLARE	@ErrorSPName NVARCHAR(255);
	DECLARE @ErrorCode INT; 
	DECLARE @StatusCode INT; 
	DECLARE @Status NVARCHAR(255);
	DECLARE @ContactId INT;
	BEGIN TRANSACTION
	
	BEGIN TRY

		INSERT INTO [dbo].[Contact]
           ([FirstName]
           ,[LastName]
           ,[Email]
           ,[PhoneNumber]
           ,[Status]
           ,[FullName]) OUTPUT INSERTED.[ContactId]
     VALUES 
           (
			@FirstName,
			@LastName,
			@Email,
			@PhoneNumber,
			@ContactStatus,
			ISNULL(@FirstName,'') + ISNULL(@LastName,'')
		   )
				 
		SET @ContactId = SCOPE_IDENTITY();              
		COMMIT TRANSACTION 
		SET @Status = 'SUCCESS';
		SET @StatusCode = 0;

		SELECT @StatusCode AS StatusCode, @Status AS Status, @ContactId AS Id
	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END
		SET @Status = 'FAIL';
		SET @StatusCode = 1;
		SET @ErrorMessage = ERROR_MESSAGE();
		SET @ErrorSPName = ERROR_PROCEDURE();
		SET @ErrorCode = ERROR_NUMBER();		
		SELECT	@StatusCode AS StatusCode, 
				@Status AS [Status], 
				@ErrorMessage AS [ErrorMessage];
	END CATCH
END