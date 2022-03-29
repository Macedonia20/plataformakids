Testes
artillery run artillery.yml

pm2
pm2 start /var/www/api.plataformaqgr.com.br/dist/server.js --name=apidashplataforma

SSL
sudo certbot --apache -d api.plataformaqgr.com.br