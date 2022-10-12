class Assertions {

    shouldHaveStatus(response, status) {
        // .its('status').should('eq', 201)
        expect(response.status).to.eq(status)
    }
}

export default new Assertions()