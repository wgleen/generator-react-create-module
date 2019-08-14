import fileTransformerImg from './fileTransformer.svg'

describe('fileTransformer() jest transform', () => {
  describe('when an image is imported by jest', () => {
    it('the imported image must be equal to a string with the value corresponding to the name of the imported file', () => {
      expect(fileTransformerImg).toEqual('fileTransformer.svg')
    })
  })
})
