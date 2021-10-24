#!/bin/bash

apk_unsigned_path=src-cordova/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
final_apk_name=App_name.apk
storepass=pasword_of_the_keystore_created
keystore=keystore_file

echo "Removing previous apk"
rm $final_apk_name

echo "Building android app"
quasar build -m cordova -T android

echo "Sign the apk"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $keystore -storepass $storepass $apk_unsigned_path alias_name

echo "Optimize the apk"
zipalign -v 4 $apk_unsigned_path $final_apk_name

echo "Apk $final_apk_name created!!!"