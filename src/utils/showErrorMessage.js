import { Dialog } from 'quasar'

const showErrorMessage = errorMessage => {
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}

export { showErrorMessage }