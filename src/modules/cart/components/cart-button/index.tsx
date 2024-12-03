import { CartProvider } from "@lib/context/cart-context"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CartDrawer from "../cart-drawer"
import { B2BCart, B2BCustomer } from "types/global"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)

  return (
    <CartProvider cart={cart as B2BCart | null}>
      <CartDrawer />
    </CartProvider>
  )
}
