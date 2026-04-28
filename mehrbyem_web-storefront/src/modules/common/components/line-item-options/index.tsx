import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  item?: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  item,
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Text
        data-testid={dataTestid}
        data-value={dataValue}
        className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis"
      >
        Variant: {variant?.title}
      </Text>
      {item?.metadata && Object.keys(item.metadata).length > 0 && (
        <div className="flex flex-col gap-y-1 mt-1">
          {Object.entries(item.metadata).map(([key, value]) => {
            if (key === "custom_note" && !value) return null
            const label = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
            return (
              <Text key={key} className="txt-small text-ui-fg-muted">
                <span className="capitalize">{label}:</span> {String(value)}
              </Text>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LineItemOptions
