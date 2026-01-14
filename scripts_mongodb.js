// Acessa o banco de dados
use FATEC

// Habilita o sharding para o banco
sh.enableSharding("FATEC")

// Fragmenta a coleção usando a matrícula (Hashed) como chave
sh.shardCollection("FATEC.alunos", { "matricula": "hashed" })

//Inserção  
var alunos = [];
for (var i = 1; i <= 10000; i++) {
  alunos.push({ matricula: i, nome: "Aluno " + i, curso: "Banco de Dados" });
}

// Insere os documentos em lote
db.alunos.insertMany(alunos);

//consulta da distribuição
db.alunos.getShardDistribution()
