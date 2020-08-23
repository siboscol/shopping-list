import { Dialog, Loading } from 'quasar'

const showErrorMessage = errorMessage => {
  Loading.hide()
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}

export { showErrorMessage }