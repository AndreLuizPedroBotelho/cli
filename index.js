const Comander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Comander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Cadastrar um Heroi")
        .option('-r, --remover', "Remover um Heroi pelo id")
        .option('-a, --atualizar [value]', "Atualizar um Heroi pelo id")
        .parse(process.argv);

    const heroi = new Heroi(Comander);

    try {
        if (Comander.cadastrar) {
            delete heroi.id;
            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.erro('Heroi não foi cadastrado')
                return;
            }
            console.log('Heroi cadastrado')
        }

        if (Comander.listar) {
            const resultado = await Database.listar()
            console.table(resultado)
            return;
        }

        if (Comander.remover) {
            const resultado = await Database.remover(heroi.id)
            if (!resultado) {
                console.erro('Não foi possiver remover o heroi')
                return;
            }
            console.log('Heroi removido com sucesso')
        }

        if (Comander.atualizar) {
            const idParaAtualizar = parseInt(Comander.atualizar)
            delete heroi.id
            
            //remover todas chaves que estiverem undefine/null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if (!resultado) {
                console.erro('Não foi possiver atualizado o heroi')
                return;
            }
            console.log('Heroi atualizado com sucesso')
        }

    } catch (error) {
        console.error(error)
    }

    return true


}
main()