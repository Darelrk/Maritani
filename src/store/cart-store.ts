
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
    id: string; // Product ID
    name: string;
    price: number;
    image?: string;
    quantity: number;
    maxStock: number;
    sellerId: string;
}

interface CartState {
    items: CartItem[];
    cartOpen: boolean;

    // Actions
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCartOpen: (open: boolean) => void;

    // Computeds (can be derived in component, but helpers are nice)
    subtotal: () => number;
    totalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            cartOpen: false,

            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        // Check stock limit
                        if (existingItem.quantity >= item.maxStock) return state;

                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                            cartOpen: true, // Open cart when adding
                        };
                    }
                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                        cartOpen: true,
                    };
                });
            },

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => {
                    const item = state.items.find(i => i.id === id);
                    if (!item) return state;

                    // Limit validation
                    let newQty = quantity;
                    if (newQty < 1) newQty = 1;
                    if (newQty > item.maxStock) newQty = item.maxStock;

                    return {
                        items: state.items.map((i) =>
                            i.id === id ? { ...i, quantity: newQty } : i
                        ),
                    };
                }),

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
            setCartOpen: (open) => set({ cartOpen: open }),

            subtotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            totalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            }
        }),
        {
            name: 'maritani-cart-storage', // unique name
            storage: createJSONStorage(() => localStorage),
        }
    )
)
