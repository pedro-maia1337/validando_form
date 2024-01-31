class Cpf {
    constructor(cpf){
       Object.defineProperty(this, 'limpaCpf', {
        get: function(){
            return cpf.replace(/\D+/g, '')
        }
       })
    }

    valida(){
        if(!this.limpaCpf) return false
        if(typeof this.limpaCpf === 'undefined') return false
        if(this.limpaCpf.length !== 11) return false
        if(this.isSequencia()) return false

        const cpfParcial = this.limpaCpf.slice(0, -2)
        const primeiroDigito = Cpf.geraDigito(cpfParcial)
        const segundoDigito = Cpf.geraDigito(cpfParcial + primeiroDigito)
        
        const novoCpf = cpfParcial + primeiroDigito + segundoDigito

        return novoCpf === this.limpaCpf
    }
    
    static geraDigito(cpfParcial){ // quando não se usa a palavra this dentro do metodo, ele pode ser estático
        let total = 0
        let reverso = cpfParcial.length + 1

        for(let stringNumerica of cpfParcial){
            total += reverso * Number(stringNumerica)
            reverso--
        }

        const digito = 11 - (total % 11)
        return digito > 9 ? '0' : String(digito)
        
    }  

    isSequencia(){
        return this.limpaCpf[0].repeat(this.limpaCpf.length) === this.limpaCpf
    }
}



