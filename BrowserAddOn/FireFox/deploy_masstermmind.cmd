
del ./prototype_masstermmind/speeddial@masstermmind.com.xpi
cd prototype_mastermmind
jar cvf speeddial@masstermmind.com.xpi ./chrome/content/sp*
jar uvf speeddial@masstermmind.com.xpi ./chrome/content/images/*
jar uvf speeddial@masstermmind.com.xpi ./chrome.manifest
jar uvf speeddial@masstermmind.com.xpi ./install.rdf

del C:\Users\Tony\AppData\Roaming\Mozilla\Firefox\Profiles\yfp38a1c.Old developer Chou\extensions\speeddial@masstermmind.com.xpi

copy speeddial@masstermmind.com.xpi  "C:\Users\Tony\AppData\Roaming\Mozilla\Firefox\Profiles\yfp38a1c.Old developer Chou\extensions\"



