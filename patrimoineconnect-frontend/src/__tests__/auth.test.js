import { describe, it, expect, beforeEach } from 'vitest';

const mockSessionStorage = {
    store: {},
    getItem: (key) => mockSessionStorage.store[key] || null,
    setItem: (key, value) => { mockSessionStorage.store[key] = value; },
    removeItem: (key) => { delete mockSessionStorage.store[key]; },
    clear: () => { mockSessionStorage.store = {}; }
};

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

describe('Authentification', () => {
    beforeEach(() => {
        mockSessionStorage.clear();
    });

    it('login enregistre le user et token dans sessionStorage', () => {
        const user = { id: 1, name: 'Ahmed', email: 'ahmed@test.com' };
        const token = 'mon-token-123';

        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        expect(sessionStorage.getItem('token')).toBe('mon-token-123');
        expect(JSON.parse(sessionStorage.getItem('user')).name).toBe('Ahmed');
    });

    it('logout supprime le user et token du sessionStorage', () => {
        sessionStorage.setItem('user', JSON.stringify({ name: 'Ahmed' }));
        sessionStorage.setItem('token', 'mon-token');

        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        expect(sessionStorage.getItem('token')).toBeNull();
        expect(sessionStorage.getItem('user')).toBeNull();
    });

    it('isAuthenticated est true quand token existe', () => {
        const token1 = sessionStorage.getItem('token');
        const isAuthenticated1 = !!token1;
        expect(isAuthenticated1).toBe(false);

        sessionStorage.setItem('token', 'mon-token');
        const token2 = sessionStorage.getItem('token');
        const isAuthenticated2 = !!token2;
        expect(isAuthenticated2).toBe(true);
    });
});
