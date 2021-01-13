CREATE PROCEDURE dp_create
 @codigo int,
 @nome varchar(200),
 @login varchar(100),
 @email varchar(200)
AS

BEGIN
-- Verifica se existe um registro com mesmo código do departamento
 IF EXISTS(SELECT * FROM usuarios WHERE codigo_departamento = @codigo)
 BEGIN
 BEGIN TRANSACTION
 UPDATE usuarios SET
 nome = @nome,
 [login] = @login,
 email = @email
 WHERE codigo_departamento = @codigo
 -- Faz a alteração dos dados do usuário casp exista o código do departamento
END
 ELSE
 BEGIN
 BEGIN TRANSACTION
 INSERT INTO usuarios
 (codigo_departamento, nome, [login], email)
 VALUES
 (@codigo, @nome, @login, @email)
 -- Insere um novo registro caso não exista o código do departamento
END
END

IF @@error <> 0
BEGIN
 ROLLBACK TRANSACTION
 RETURN(1)
END
ELSE
BEGIN
 COMMIT TRANSACTION
 RETURN(0)
END