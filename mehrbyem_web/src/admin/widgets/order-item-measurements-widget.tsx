import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, StatusBadge } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

type OrderDetailsWidgetProps = {
  data: HttpTypes.AdminOrder
}

const OrderItemMeasurementsWidget = ({ data: order }: OrderDetailsWidgetProps) => {
  const itemsWithMetadata = order.items?.filter(
    (item) => item.metadata && Object.keys(item.metadata).length > 0
  )

  if (!itemsWithMetadata || itemsWithMetadata.length === 0) {
    return null
  }

  return (
    <Container>
      <Heading level="h2" className="mb-4">Item Measurements & Customizations</Heading>
      <div className="flex flex-col gap-y-6">
        {itemsWithMetadata.map((item) => (
          <div key={item.id} className="flex flex-col gap-y-3 pb-4 border-b last:border-0 border-ui-border-base">
            <div className="flex items-center justify-between">
              <Text className="font-semibold text-ui-fg-base">
                {item.variant_title || item.product_title}
              </Text>
              <Text className="text-ui-fg-subtle text-small-regular">
                Qty: {item.quantity}
              </Text>
            </div>
            
            <div className="grid grid-cols-1 small:grid-cols-2 gap-4 bg-ui-bg-subtle p-4 rounded-lg border border-ui-border-base">
              {Object.entries(item.metadata || {}).map(([key, value]) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
                
                if (key === 'custom_note') {
                   return (
                     <div key={key} className="col-span-full mt-2">
                        <Text className="text-ui-fg-subtle text-xsmall-regular uppercase mb-1">Additional Note</Text>
                        <div className="p-3 bg-ui-bg-base border border-ui-border-base rounded-md italic text-ui-fg-base">
                          {String(value)}
                        </div>
                     </div>
                   )
                }

                return (
                  <div key={key} className="flex justify-between items-center py-1 border-b border-ui-border-subtle last:border-0 small:border-0">
                    <Text className="text-ui-fg-subtle text-xsmall-regular capitalize">{label}:</Text>
                    <Text className="text-ui-fg-base text-xsmall-semi">{String(value)}</Text>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default OrderItemMeasurementsWidget
