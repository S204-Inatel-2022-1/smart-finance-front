/// <reference types="cypress"/>


describe('Cenário de teste: Testar funcionalidades do site Smart Finance', () => {

    it.skip ('Caso de teste: Registrar um usuário com sucesso', () => {

        cy.visit('https://smart-finance-front.herokuapp.com/login.html');
        cy.get('#nomeCadastro').type('Usuário de teste');
        cy.get('#emailCadastro').type('usuarioTeste@coldplay.com');
        cy.get('#senhaCadastro').type('testeColdplay');
        cy.get('#cadastrar').click();
        cy.get('#op1').click();
        cy.get('#emailLogin').type('usuarioTeste@coldplay.com');
        cy.get('#senhaLogin').type('testeColdplay');
        cy.get('#entrar').click();
        cy.should()
    })

    it ('Caso de teste: Logar um usuário com sucesso', () => {

        cy.visit('https://smart-finance-front.herokuapp.com/login.html');
        cy.get('#op1').click();
        cy.get('#emailLogin').type('usuarioTeste@coldplay.com');
        cy.get('#senhaLogin').type('testeColdplay');
        cy.get('#entrar').click();
        cy.get('.nav-btn').should('be.visible');
    })
})
