pm2 list
read -p "Enter pm2 id: " ID
pm2 stop ID
npm run build 
pm2 restart ID