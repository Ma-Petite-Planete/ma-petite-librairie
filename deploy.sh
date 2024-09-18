#!/bin/bash

# 1. Lancer la commande de build
echo "Building the project..."
npm run build

# 2. Ajouter tous les fichiers au staging de git
echo "Adding changes to git..."
git add .

# 3. Demander un message de commit
echo "Please enter your commit message: "
read commitMessage

# 4. Faire le commit avec le message saisi
echo "Committing with message: '$commitMessage'"
git commit -m "$commitMessage"

# 5. Pousser les changements vers le repository
echo "Pushing to the repository..."
git push

# 6. Fin du script
echo "Done!"
