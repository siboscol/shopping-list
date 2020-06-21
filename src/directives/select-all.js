export const selectAll = {
  bind(el) {
    const input = el.querySelector('.q-field__native')
    console.log('BIND', input)
    input.addEventListener('focus', () => {
      if (input.value.length) {
        input.select()
      }
    })
  }
}