/*================================================================================================================
Author		:	Ritesh Jain
Create Date	:	01 July 2018
Description	:	
Execution	:	EXEC [dbo].[sp_ContactUpdate] 1, 'xyz','PQS',NULL,null,false
Notes		:	

Date					Name					Description
-----------------------------------------------------------------------------------------------------------------
01 July 2018 			Ritesh Jain				Created Stored Procedure.
================================================================================================================*/
CREATE PROCEDURE [dbo].[sp_ContactUpdate]
    @ContactId		INT,
	@FirstName		NVARCHAR(255),
    @LastName		NVARCHAR(255),
    @Email			NVARCHAR(255),
    @PhoneNumber	NVARCHAR(20),
    @ContactStatus	BIT
AS 	
BEGIN
	DECLARE @ErrorMessage NVARCHAR(255), 
			@ErrorSPName NVARCHAR(255) , 
			@ErrorCode INT, 
			@StatusCode INT, 
			@Status NVARCHAR(255);

	BEGIN TRANSACTION

	BEGIN TRY

		UPDATE [dbo].[Contact]
		SET    [FirstName]	=	@FirstName,
			   [LastName]	=	@LastName,
			   [Email]		=	@Email,
			   [PhoneNumber]=	@PhoneNumber, 
			   [Status]		=	@ContactStatus,
			   [FullName]	=	(ISNULL(@FirstName,'') + ' ' + ISNULL(@LastName,''))
		WHERE  ContactId = @ContactId
		
		COMMIT TRANSACTION
		SET @Status = 'SUCCESS';
		SET @StatusCode = 0;

		SELECT @StatusCode AS StatusCode, @Status AS [Status]
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
		SELECT @StatusCode AS StatusCode, @Status AS [Status], @ErrorMessage AS [ErrorMessage];
	END CATCH
END