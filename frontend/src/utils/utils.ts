export function getTokenFromLocalStorage(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
}
export function setTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token);
}
export function getUsernameFromLocalStorage(): string {
    const username = localStorage.getItem('username');
    return username ? username : '';
}
export function setUsernameToLocalStorage(username: string): void {
    localStorage.setItem('username', username);
}
export function isAuthenticated(): boolean {
    const token = localStorage.getItem('username');
    return token ? true : false;
}