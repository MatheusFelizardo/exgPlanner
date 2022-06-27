export const testEmail = (email:string) => {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    return regex.test(email)

}

export const handleSaveToken = (token:string) => {
    window.localStorage.setItem('token', token)
}

export const handleGetUserToken = () => {
    return window.localStorage.getItem('token')
}

export const handleRemoveUserToken = () => {
    return window.localStorage.removeItem('token')
}