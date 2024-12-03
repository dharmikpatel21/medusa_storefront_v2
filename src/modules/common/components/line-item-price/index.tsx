import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx, Text } from "@medusajs/ui"

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  className?: string
  currencyCode: string
}

const LineItemPrice = ({
  item,
  style = "default",
  className,
  currencyCode,
}: LineItemPriceProps) => {
  const adjustmentsSum = (item.adjustments || []).reduce(
    (acc, adjustment) => adjustment.amount + acc,
    0
  )

  const originalPrice = item.original_total ?? 0 / item.quantity

  const currentPrice = item.total ?? 0 / item.quantity - adjustmentsSum

  const hasReducedPrice = currentPrice < originalPrice

  return (
    <Text
      className={clx(
        "flex flex-col gap-x-2 text-ui-fg-subtle items-end",
        className
      )}
    >
      <span className="flex flex-col text-left">
        {hasReducedPrice && (
          <>
            <span
              className="line-through text-ui-fg-muted"
              data-testid="product-original-price"
            >
              {convertToLocale({
                amount: originalPrice,
                currency_code: currencyCode ?? "eur",
              })}
            </span>

            {style === "default" && (
              <span className="text-base-regular text-ui-fg-interactive">
                -
                {convertToLocale({
                  amount: adjustmentsSum,
                  currency_code: currencyCode ?? "eur",
                })}
              </span>
            )}
          </>
        )}
        <span className="text-base-regular" data-testid="product-price">
          {convertToLocale({
            amount: currentPrice,
            currency_code: currencyCode ?? "eur",
          })}
        </span>
      </span>
    </Text>
  )
}

export default LineItemPrice

// import { clx } from "@medusajs/ui"

// import { getPercentageDiff } from "@lib/util/get-precentage-diff"
// import { getPricesForVariant } from "@lib/util/get-product-price"
// import { convertToLocale } from "@lib/util/money"
// import { HttpTypes } from "@medusajs/types"

// type LineItemPriceProps = {
//   item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
//   style?: "default" | "tight"
// }

// const LineItemPrice = ({ item, style = "default" }: LineItemPriceProps) => {
//   const { currency_code, calculated_price_number, original_price_number } =
//     getPricesForVariant(item.variant) ?? {}

//   const adjustmentsSum = (item.adjustments || []).reduce(
//     (acc, adjustment) => adjustment.amount + acc,
//     0
//   )

//   const originalPrice = original_price_number * item.quantity
//   const currentPrice = calculated_price_number * item.quantity - adjustmentsSum
//   const hasReducedPrice = currentPrice < originalPrice

//   return (
//     <div className="flex flex-col gap-x-2 text-ui-fg-subtle items-end">
//       <div className="text-left">
//         {hasReducedPrice && (
//           <>
//             <p>
//               {style === "default" && (
//                 <span className="text-ui-fg-subtle">Original: </span>
//               )}
//               <span
//                 className="line-through text-ui-fg-muted"
//                 data-testid="product-original-price"
//               >
//                 {convertToLocale({
//                   amount: originalPrice,
//                   currency_code,
//                 })}
//               </span>
//             </p>
//             {style === "default" && (
//               <span className="text-ui-fg-interactive">
//                 -{getPercentageDiff(originalPrice, currentPrice || 0)}%
//               </span>
//             )}
//           </>
//         )}
//         <span
//           className={clx("text-base-regular", {
//             "text-ui-fg-interactive": hasReducedPrice,
//           })}
//           data-testid="product-price"
//         >
//           {convertToLocale({
//             amount: currentPrice,
//             currency_code,
//           })}
//         </span>
//       </div>
//     </div>
//   )
// }

// export default LineItemPrice
