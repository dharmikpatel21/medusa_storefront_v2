import { convertToLocale } from "@lib/util/money"
import { StoreCartLineItem } from "@medusajs/types"
import { Container, Text } from "@medusajs/ui"
import ItemFull from "@modules/cart/components/item-full"
import { useMemo } from "react"
import { B2BCart } from "types/global"

type ItemsTemplateProps = {
  cart: B2BCart
  showBorders?: boolean
  showTotal?: boolean
}

const ItemsTemplate = ({
  cart,
  showBorders = true,
  showTotal = true,
}: ItemsTemplateProps) => {
  const items = cart?.items
  const totalQuantity = useMemo(
    () => cart?.items?.reduce((acc, item) => acc + item.quantity, 0),
    [cart?.items]
  )

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-2 w-full">
        {items &&
          items.map((item: StoreCartLineItem) => {
            return (
              <ItemFull
                currencyCode={cart?.currency_code}
                showBorders={showBorders}
                key={item.id}
                item={
                  item as StoreCartLineItem & {
                    metadata?: { note?: string }
                  }
                }
              />
            )
          })}
      </div>
      {showTotal && (
        <Container>
          <div className="flex items-start justify-between h-full self-stretch">
            <Text>Total: {totalQuantity} items</Text>
            <Text>
              {convertToLocale({
                amount: cart?.item_total,
                currency_code: cart?.currency_code,
              })}
            </Text>
          </div>
        </Container>
      )}
    </div>
  )
}

export default ItemsTemplate

// import repeat from "@lib/util/repeat"
// import { HttpTypes } from "@medusajs/types"
// import { Heading, Table } from "@medusajs/ui"

// import Item from "@modules/cart/components/item"
// import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

// type ItemsTemplateProps = {
//   items?: HttpTypes.StoreCartLineItem[]
// }

// const ItemsTemplate = ({ items }: ItemsTemplateProps) => {
//   return (
//     <div>
//       <div className="pb-3 flex items-center">
//         <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
//       </div>
//       <Table>
//         <Table.Header className="border-t-0">
//           <Table.Row className="text-ui-fg-subtle txt-medium-plus">
//             <Table.HeaderCell className="!pl-0">Item</Table.HeaderCell>
//             <Table.HeaderCell></Table.HeaderCell>
//             <Table.HeaderCell>Quantity</Table.HeaderCell>
//             <Table.HeaderCell className="hidden small:table-cell">
//               Price
//             </Table.HeaderCell>
//             <Table.HeaderCell className="!pr-0 text-right">
//               Total
//             </Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {items
//             ? items
//                 .sort((a, b) => {
//                   return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
//                 })
//                 .map((item) => {
//                   return <Item key={item.id} item={item} />
//                 })
//             : repeat(5).map((i) => {
//                 return <SkeletonLineItem key={i} />
//               })}
//         </Table.Body>
//       </Table>
//     </div>
//   )
// }

// export default ItemsTemplate
