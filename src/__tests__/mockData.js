export const mockProducts = [
    { id: 1, name: 'Swiss Chocolate', description: 'Delicious and creamy', price: 10 },
    { id: 2, name: 'Belgian Dark Chocolate', description: 'Decadent and Dark', price: 10 }
    ]

    export const mockApiFetch = () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockProducts)
            })
        )
    }