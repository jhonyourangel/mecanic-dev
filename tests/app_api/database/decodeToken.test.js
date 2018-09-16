const jwtDecode = require('../../../app_api/database/decodeToken')

test('decode token to js object', () => {
    const mockToken = 'Bearier eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjkwZjFlNjhiZDMyMzAwMTQ5ZjI3NzMiLCJlbWFpbCI6InRlc3RBY291bnRAZ21haWwuY29tIiwibmFtZSI6IiIsInByb2ZpbGVJbWFnZSI6Ii4uL2ltYWdlcy91c2VyLnBuZyIsImV4cCI6MTUzNzYxOTA5My44MDgsImlhdCI6MTUzNzAxNDI5M30.yCXlO2R-7KUvWX5eaOGbX_aDTKfNt1fFBhIio8JAgWk'
    const jwt_token = 'Bearier eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    
    const decodedPayload = {
        _id: '5b90f1e68bd32300149f2773',
        email: 'testAcount@gmail.com',
        name: '',
        profileImage: '../images/user.png',
        exp: 1537619093.808,
        iat: 1537014293,
    }
    expect(jwtDecode.decodeToken(mockToken)).toMatchObject(decodedPayload)
})
