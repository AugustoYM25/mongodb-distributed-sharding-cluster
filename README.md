1. Subir a Infraestrutura
Cria os 10 containers isolados em segundo plano.

docker compose up -d

2. Inicializar os Replica Sets
Configura a alta disponibilidade e a eleição dos líderes para cada grupo.

Config Servers:
docker exec -it cfg-1 mongosh --eval "rs.initiate({ _id: 'rs-config', configsvr: true, members: [ { _id: 0, host: 'cfg-1:27017' }, { _id: 1, host: 'cfg-2:27017' }, { _id: 2, host: 'cfg-3:27017' } ] })"

Shard 01 (Dados):
docker exec -it sh1-1 mongosh --eval "rs.initiate({ _id: 'rs-shard1', members: [ { _id: 0, host: 'sh1-1:27017' }, { _id: 1, host: 'sh1-2:27017' }, { _id: 2, host: 'sh1-3:27017' } ] })"

Shard 02 (Dados):
docker exec -it sh2-1 mongosh --eval "rs.initiate({ _id: 'rs-shard2', members: [ { _id: 0, host: 'sh2-1:27017' }, { _id: 1, host: 'sh2-2:27017' }, { _id: 2, host: 'sh2-3:27017' } ] })"

3. Integração Final
Conecta os Shards ao Roteador (Mongos) para unificar o cluster.
docker exec -it mongos mongosh --eval "sh.addShard('rs-shard1/sh1-1:27017,sh1-2:27017,sh1-3:27017'); sh.addShard('rs-shard2/sh2-1:27017,sh2-2:27017,sh2-3:27017');"

5. Verificação de Saúde
Valida se os dois shards estão ativos e integrados.
docker exec -it mongos mongosh --eval "sh.status()"

5. Acesso ao Banco
docker exec -it mongos mongosh
