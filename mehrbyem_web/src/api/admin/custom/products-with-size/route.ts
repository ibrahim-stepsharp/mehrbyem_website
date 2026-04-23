import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  ContainerRegistrationKeys,
  MedusaError,
  Modules,
} from "@medusajs/framework/utils"
import {
  createProductsWorkflow,
  createInventoryLevelsWorkflow,
} from "@medusajs/medusa/core-flows"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const payload = (req.body ?? {}) as Record<string, unknown>

  const {
    title,
    subtitle,
    description,
    handle,
    status,
    thumbnail,
    images,
    material,
    weight,
    length,
    height,
    width,
    hs_code,
    origin_country,
    mid_code,
    discountable,
    type_id,
    collection_id,
    category_ids,
    tag_ids,
    sales_channel_ids,
    shipping_profile_id: userShippingProfileId,
    // variant-level
    price_amount,
    currency_code,
    sku,
    barcode,
    ean,
    upc,
    manage_inventory,
    allow_backorder,
    inventory_quantity,
    // our custom field
    size_graph_id,
  } = payload

  if (!title) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "Title is required")
  }

  // --- Validate size_graph if provided ---
  let sizeGraph: any = null
  if (size_graph_id) {
    const sgResult = await pgConnection.raw(
      `select id, name, image, description from "size_graph" where id = ? and deleted_at is null limit 1`,
      [size_graph_id]
    )
    sizeGraph = sgResult.rows?.[0]
    if (!sizeGraph) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "Invalid size_graph_id")
    }
  }

  // --- Resolve defaults ---
  const salesChannelModule = req.scope.resolve(Modules.SALES_CHANNEL)
  const fulfillmentModule = req.scope.resolve(Modules.FULFILLMENT)
  const stockLocationModule = req.scope.resolve(Modules.STOCK_LOCATION)

  const [defaultSalesChannels] = await salesChannelModule.listAndCountSalesChannels({}, { take: 1 })
  const [defaultShippingProfiles] = await fulfillmentModule.listAndCountShippingProfiles({ type: "default" }, { take: 1 })
  const [defaultStockLocations] = await stockLocationModule.listAndCountStockLocations({}, { take: 1 })

  if (!defaultSalesChannels.length || !defaultShippingProfiles.length || !defaultStockLocations.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Store is missing default sales channel, shipping profile, or stock location. Please configure your store first."
    )
  }

  // Determine sales channels
  const resolvedSalesChannels =
    Array.isArray(sales_channel_ids) && (sales_channel_ids as string[]).length > 0
      ? (sales_channel_ids as string[]).map((id) => ({ id }))
      : [{ id: defaultSalesChannels[0].id }]

  const resolvedShippingProfileId =
    userShippingProfileId
      ? String(userShippingProfileId)
      : defaultShippingProfiles[0].id

  const locationId = defaultStockLocations[0].id

  // --- Build product payload ---
  const productPayload: any = {
    title: String(title),
    subtitle: subtitle ? String(subtitle) : undefined,
    description: description ? String(description) : undefined,
    handle: handle ? String(handle) : undefined,
    status: status ? String(status) : "published",
    thumbnail: thumbnail ? String(thumbnail) : undefined,
    images: Array.isArray(images) ? images.map(img => ({ url: String(img) })) : undefined,
    material: material ? String(material) : undefined,
    weight: weight ? Number(weight) : undefined,
    length: length ? Number(length) : undefined,
    height: height ? Number(height) : undefined,
    width: width ? Number(width) : undefined,
    hs_code: hs_code ? String(hs_code) : undefined,
    origin_country: origin_country ? String(origin_country) : undefined,
    mid_code: mid_code ? String(mid_code) : undefined,
    discountable: discountable !== undefined ? Boolean(discountable) : true,
    type_id: type_id ? String(type_id) : undefined,
    collection_id: collection_id ? String(collection_id) : undefined,
    categories: Array.isArray(category_ids)
      ? (category_ids as string[]).map((id) => ({ id }))
      : [],
    tags: Array.isArray(tag_ids)
      ? (tag_ids as string[]).map((id) => ({ id }))
      : [],
    shipping_profile_id: resolvedShippingProfileId,
    sales_channels: resolvedSalesChannels,
    options: [{ title: "Format", values: [String(title)] }],
    variants: [
      {
        title: String(title),
        sku: sku ? String(sku) : handle ? `${handle}-default` : undefined,
        barcode: barcode ? String(barcode) : undefined,
        ean: ean ? String(ean) : undefined,
        upc: upc ? String(upc) : undefined,
        options: { "Format": String(title) },
        manage_inventory: manage_inventory !== undefined ? Boolean(manage_inventory) : true,
        allow_backorder: allow_backorder !== undefined ? Boolean(allow_backorder) : false,
        prices: [
          {
            amount: Number(price_amount) || 0,
            currency_code: String(currency_code || "usd").toLowerCase(),
          },
        ],
      },
    ],
  }

  // --- Create product via workflow ---
  const { result: createdProducts } = await createProductsWorkflow(req.scope).run({
    input: { products: [productPayload] },
  })

  const createdProduct = createdProducts[0]

  // --- Set inventory level ---
  const qty = inventory_quantity !== undefined ? Number(inventory_quantity) : 0
  if (!Number.isNaN(qty) && qty >= 0) {
    const { data: variants } = await query.graph({
      entity: "variant",
      fields: ["id", "inventory_items.*"],
      filters: { id: createdProduct.variants[0].id },
    })

    const inventoryItemId = variants[0]?.inventory_items?.[0]?.inventory_item_id

    if (inventoryItemId) {
      await createInventoryLevelsWorkflow(req.scope).run({
        input: {
          inventory_levels: [
            {
              inventory_item_id: inventoryItemId,
              location_id: locationId,
              stocked_quantity: qty,
            },
          ],
        },
      })
    }
  }

  // --- Link size graph to the default variant ---
  if (size_graph_id) {
    await pgConnection.raw(
      `update "product_variant" set size_graph_id = ?, updated_at = now() where product_id = ? and deleted_at is null`,
      [size_graph_id, createdProduct.id]
    )
  }

  res.json({
    product: createdProduct,
    size_graph: sizeGraph,
  })
}
