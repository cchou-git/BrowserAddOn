REM - This script will jar up the contents of the prototype_masstermind folder and copy 
REM - it to the Firefox location to install.

del ./prototype_localhost/speeddial@masstermmind.com.xpi

cd C:\usr\local\projects\rstech\BrowserAddon\FireFox\prototype_localhost

jar cvf speeddial@masstermmind.com.xpi *

del "C:\Users\Tony\AppData\Roaming\Mozilla\Firefox\Profiles\9k0qmkdt.Old Developer Chou\extensions\speeddial@masstermmind.com.xpi"


copy speeddial@masstermmind.com.xpi  "C:\Users\Tony\AppData\Roaming\Mozilla\Firefox\Profiles\9k0qmkdt.Old Developer Chou\extensions\"
 


