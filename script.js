class ValidaFormulario {
    constructor(){
        this.formulario = document.querySelector('.formulario')
        this.events()
    }

    events(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const isValid = this.isValid()
        const nomesValidos = this.validaNomes()
        const senhasValida = this.senhasSaoValidas()

        if(isValid && nomesValidos && senhasValida){
            alert('Formulário enviado')
            this.formulario.submit()
        }
    }

    isValid(){
        let valid = true

        for(let erroTxt of this.formulario.querySelectorAll('.erro')){
            erroTxt.remove()
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerHTML
            if(!campo.value){
                this.criaErro(campo, `"${label}" não pode estar vazio`)
                valid = false
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false
                
            }

            if(campo.classList.contains('user')){
                if(!this.validaUser(campo)) valid = false
            }
        }

        return valid 
    }

    validaNomes(){
        let valid = true

        this.nome = this.formulario.querySelector('.nome')
        this.sobrenome = this.formulario.querySelector('.sobrenome')

        if(!this.nome.value.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/)){
            this.criaErro(this.nome, 'Nome só pode conter letras')
            valid = false
        }

        if(!this.sobrenome.value.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/)){
            this.criaErro(this.sobrenome, 'Sobrenome só pode conter letras')
            valid = false
        }

        return valid
    }

    senhasSaoValidas(){
        let valid = true

        this.senha = this.formulario.querySelector('.senha')
        this.senhaRepetida = this.formulario.querySelector('.rpsenha')

        if(this.senha.value.length < 6 || this.senha.value.length > 12){
            this.criaErro(this.senha, 'Senha precisa ter entre 6 e 12 caracteres')
            valid = false
        }

        if(this.senha.value !== this.senhaRepetida.value){
            this.criaErro(this.senha, 'Campos senha e repetir senha precisam ser iguais')
            this.criaErro(this.senhaRepetida, 'Campos senha e repetir senha precisam ser iguais')
            valid = false
        }
        

        return valid
    }

    validaUser(campo){
        let valid = true
        if(campo.value.length < 3 || campo.value.length > 12 ){
            this.criaErro(campo, 'Usuário deverá ter entre 3 e 12 caracteres')
            valid = false
        }

        if(!campo.value.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Usuário só poderá conter letras e/ou números')
            valid = false
        }


        return true
    }

    validaCPF(campo){
        const cpf = new Cpf(campo.value)

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF inválido')
            return false
        }

        return true
    }

    criaErro(campo, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('erro')
        campo.insertAdjacentElement('afterend', div)
    }
}

const valida = new ValidaFormulario()