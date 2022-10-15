/// <reference types="cypress" />


import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'
import createBookingBody from '../fixtures/createBookingBody.json'
import updateBookingBody from '../fixtures/updateBookingBody.json'

describe('Validar teste de contrato do GET Booking', () => {

  before(() => {
    req.doAuth()
  })
  it('GET Booking', () => {

    req.getBooking()
      .then(getBookingResponse => {
        assertions.validateCointractOf(getBookingResponse, schemas.getBookingSchema())
      })
  });


  it('Criar uma reserva com sucesso', () => {
    req.postBooking(createBookingBody).then(postBookingResponse => {
      assertions.shouldHaveStatus(postBookingResponse, 200)
      assertions.shouldBookingIdBePresent(postBookingResponse)
      assertions.shouldContentTypeAppJson(postBookingResponse)
      assertions.shouldDurationBeFast(postBookingResponse)
      assertions.shouldHaveDefaultHeaders(postBookingResponse)
    })
  });

  it('Alterar uma reserva sem token', () => {


    req.postBooking(createBookingBody).then(postbookingResponse => {
      req.updateBookingWithouToken(postbookingResponse, updateBookingBody).then(putBookingResponse => {
        assertions.shouldHaveStatus(putBookingResponse, 403)
      })
    })
  });

  it('Realizar alteração com token válido', () => {
    req.postBooking(createBookingBody).then(postBookingResponse => {
      req.updateBooking(postBookingResponse, updateBookingBody).then(putBookingResponse => {
        assertions.shouldHaveStatus(putBookingResponse, 200)
      })
    })

  });
  // validar alteração sem token
  // validar alteração com token inválido
  // validar alteração com sucesso
})

