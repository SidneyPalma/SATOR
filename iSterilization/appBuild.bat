cls

::http://www.robvanderwoude.com/battech_convertcase.php
::http://stackoverflow.com/questions/2027070/how-to-concatenate-strings-in-a-windows-batch-file

::Preparando build version
	echo ...
	echo ...
	echo ...
	echo ... Gerando o Build
	echo ...
	echo ...
	echo ...

	php -f %cd%/../smart/Setup/Build.php %appName% _Major _Minor _Patch Build

	echo ...
	echo ...
	echo ...

::Gerando build
    sencha app build classic

::Iniciando versão build
    start http://localhost/SATOR-pro/%appName%/