
class Requests {

  getPing() {
    return cy.api({
      method: 'GET',
      url: 'ping'
    })
  }

  getBooking() {
    return cy.api({
      method: 'GET',
      url: 'booking/1'
    })
  }

  postBooking(body) {
    return cy.api({
      method: 'POST',
      url: '/booking',
      body: body
    })
  }


  updateBookingWithouToken(response, body) {
    const id = response.body.bookingid
    return cy.api({
      method: 'PUT',
      url: `/booking/${id}`,
      body: body,
      failOnStatusCode: false
    })
  }

  updateBooking(response, body) {
    const id = response.body.bookingid

    return cy.api({
      method: 'PUT',
      url: `/booking/${id}`,
      headers: {
        Cookie: `token=${Cypress.env('token')}`
      },
      body: body,
      failOnStatusCode: false
    })
  }

  deleteBookingWithoutToken(response) {
    const id = response.body.bookingid

    return cy.api({
      method: 'DELETE',
      url: `/booking/${id}`,
      headers: {},
      failOnStatusCode: false
    })
  }

  deleteBookingWithInvalidToken(response) {
    const id = response.body.bookingid

    return cy.api({
      method: 'DELETE',
      url: `/booking/${id}`,
      headers: {
        Cookie: `token=1a2b3c`
      },
      failOnStatusCode: false
    })
  }

  deleteBooking(response) {
    const id = response.body.bookingid

    return cy.api({
      method: 'DELETE',
      url: `/booking/${id}`,
      headers: {
        Cookie: `token=${Cypress.env('token')}`
      },
      failOnStatusCode: false
    })
  }

  postAuth() {
    return cy.api({
      method: 'POST',
      url: 'auth',
      body: {
        "username": "admin",
        "password": "password123"
      }
    })
  }

  doAuth() {
    this.postAuth().then(authResponse => {
      const token = authResponse.body.token

      Cypress.env('token', token)
    })
  }

}

export default new Requests()