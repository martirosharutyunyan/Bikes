git add .
read -p "Enter commit name: " COMMIT
git commit -m "${COMMIT}" 
git push 
sshpass -p "hhs13516" 
