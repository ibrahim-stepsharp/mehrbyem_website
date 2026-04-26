import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ShoppingBag, XMarkMini, Plus, Trash } from "@medusajs/icons"
import {
  Badge,
  Button,
  Checkbox,
  FocusModal,
  Heading,
  Input,
  Label,
  Switch,
  Text,
  Textarea,
  Select,
  toast,
} from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

// ─── Types ────────────────────────────────────────────────────────────────────

type SizeGraphTableData = {
  title: string
  columns: string[]
  rows: Record<string, string>[]
}

type SizeGraph = { id: string; name: string; image: string; description: string | null; parameters?: SizeGraphTableData[] }
type ProductType = { id: string; value: string }
type Collection = { id: string; title: string }
type Category = { id: string; name: string }
type Tag = { id: string; value: string }
type SalesChannel = { id: string; name: string }
type ShippingProfile = { id: string; name: string }

// ─── Helpers ──────────────────────────────────────────────────────────────────

const adminFetch = async (path: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData
  const res = await fetch(`/admin${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers ?? {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Request failed")
  }
  return res.json()
}

const uploadFile = async (file: File) => {
  const form = new FormData()
  form.append("files", file)
  const data = await adminFetch("/uploads", { method: "POST", body: form })
  const url = data?.files?.[0]?.url
  if (!url) throw new Error("Upload failed: missing URL")
  return String(url)
}

const slugify = (str: string) => 
  str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <div className="border border-ui-border-base rounded-lg p-6 flex flex-col gap-y-4">
    <div>
      <Heading level="h2">{title}</Heading>
      {subtitle && <Text className="text-ui-fg-subtle text-sm mt-0.5">{subtitle}</Text>}
    </div>
    {children}
  </div>
)

const Field: React.FC<{ label: string; hint?: string; required?: boolean; children: React.ReactNode }> = ({
  label,
  hint,
  required,
  children,
}) => (
  <div className="flex flex-col gap-y-1.5">
    <Label>
      {label}
      {required && <span className="text-rose-500 ml-1">*</span>}
      {!required && <span className="text-ui-fg-muted text-xs ml-1">(Optional)</span>}
    </Label>
    {children}
    {hint && <Text className="text-ui-fg-subtle text-xs">{hint}</Text>}
  </div>
)

// ─── Multi-select chip component ──────────────────────────────────────────────

const MultiSelect: React.FC<{
  options: { id: string; label: string }[]
  selected: string[]
  onChange: (ids: string[]) => void
  placeholder?: string
}> = ({ options, selected, onChange, placeholder = "Select…" }) => {
  const toggle = (id: string) =>
    selected.includes(id) ? onChange(selected.filter((s) => s !== id)) : onChange([...selected, id])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-wrap gap-2 min-h-[40px] border border-ui-border-base rounded-md px-2 py-1.5">
        {selected.length === 0 && (
          <Text className="text-ui-fg-muted text-sm self-center">{placeholder}</Text>
        )}
        {selected.map((id) => {
          const opt = options.find((o) => o.id === id)
          if (!opt) return null
          return (
            <Badge key={id} color="blue" className="cursor-pointer" onClick={() => toggle(id)}>
              {opt.label} <XMarkMini className="ml-1 inline" />
            </Badge>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
        {options.map((opt) => (
          <Badge
            key={opt.id}
            color={selected.includes(opt.id) ? "blue" : "grey"}
            className="cursor-pointer"
            onClick={() => toggle(opt.id)}
          >
            {opt.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

const CustomProductPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // ── General ──
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [handle, setHandle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<string>("published")
  const [discountable, setDiscountable] = useState(true)

  // ── Media ──
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")
  const [imagesFiles, setImagesFiles] = useState<{ id: string; file: File; preview: string }[]>([])

  // ── Organize ──
  const [typeId, setTypeId] = useState("null")
  const [collectionId, setCollectionId] = useState("null")
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [tagIds, setTagIds] = useState<string[]>([])

  // ── Sales channels ──
  const [salesChannelIds, setSalesChannelIds] = useState<string[]>([])

  // ── Shipping ──
  const [shippingProfileId, setShippingProfileId] = useState("null")

  // ── Dimensions ──
  const [weight, setWeight] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [length, setLength] = useState("")
  const [material, setMaterial] = useState("")
  const [midCode, setMidCode] = useState("")
  const [hsCode, setHsCode] = useState("")
  const [originCountry, setOriginCountry] = useState("")

  // ── Inventory / Variant ──
  const [priceAmount, setPriceAmount] = useState("")
  const [currencyCode, setCurrencyCode] = useState("usd")
  const [sku, setSku] = useState("")
  const [barcode, setBarcode] = useState("")
  const [ean, setEan] = useState("")
  const [upc, setUpc] = useState("")
  const [manageInventory, setManageInventory] = useState(true)
  const [allowBackorder, setAllowBackorder] = useState(false)
  const [inventoryQuantity, setInventoryQuantity] = useState("0")

  // ── Size Graph ──
  const [sizeGraphId, setSizeGraphId] = useState("null")

  // ── Size Graph Create Modal ──
  const [sgModalOpen, setSgModalOpen] = useState(false)
  const [sgName, setSgName] = useState("")
  const [sgDescription, setSgDescription] = useState("")
  const [sgImageFile, setSgImageFile] = useState<File | null>(null)
  const [sgTables, setSgTables] = useState<SizeGraphTableData[]>([
    { title: "Standard Sizes", columns: ["Size", "Shoulder", "Bust", "Hip", "Length"], rows: [{}] }
  ])

  const addSgTable = () => setSgTables([...sgTables, { title: "New Section", columns: ["Size"], rows: [{}] }])
  const removeSgTable = (i: number) => setSgTables(sgTables.filter((_, idx) => idx !== i))
  const addSgColumn = (tIdx: number) => {
    const nt = [...sgTables]; nt[tIdx].columns.push("New Column"); setSgTables(nt)
  }
  const removeSgColumn = (tIdx: number, cIdx: number) => {
    const nt = [...sgTables]; 
    const colName = nt[tIdx].columns[cIdx]
    nt[tIdx].columns.splice(cIdx, 1); 
    nt[tIdx].rows = nt[tIdx].rows.map(r => {
      const nr = { ...r }; delete nr[colName]; return nr
    })
    setSgTables(nt)
  }
  const addSgRow = (tIdx: number) => {
    const nt = [...sgTables]; nt[tIdx].rows.push({}); setSgTables(nt)
  }
  const removeSgRow = (tIdx: number, rIdx: number) => {
    const nt = [...sgTables]; nt[tIdx].rows.splice(rIdx, 1); setSgTables(nt)
  }
  const updateSgCell = (tIdx: number, rIdx: number, col: string, val: string) => {
    const nt = [...sgTables]; nt[tIdx].rows[rIdx][col] = val; setSgTables(nt)
  }
  const updateSgColumnName = (tIdx: number, cIdx: number, name: string) => {
    const nt = [...sgTables]; const old = nt[tIdx].columns[cIdx]; nt[tIdx].columns[cIdx] = name
    nt[tIdx].rows = nt[tIdx].rows.map(r => {
      const nr = { ...r }; if (nr[old]) { nr[name] = nr[old]; delete nr[old] }; return nr
    })
    setSgTables(nt)
  }

  // ── Fetch reference data ──
  const { data: sizeGraphsData } = useQuery({
    queryKey: ["admin_size_graphs"],
    queryFn: () => adminFetch("/size-graphs?limit=200&offset=0"),
  })
  const { data: typesData } = useQuery({
    queryKey: ["admin_product_types"],
    queryFn: () => adminFetch("/product-types?limit=1000"),
  })
  const { data: collectionsData } = useQuery({
    queryKey: ["admin_collections"],
    queryFn: () => adminFetch("/collections?limit=1000"),
  })
  const { data: categoriesData } = useQuery({
    queryKey: ["admin_categories"],
    queryFn: () => adminFetch("/product-categories?limit=1000"),
  })
  const { data: tagsData } = useQuery({
    queryKey: ["admin_tags"],
    queryFn: () => adminFetch("/product-tags?limit=1000"),
  })
  const { data: salesChannelsData } = useQuery({
    queryKey: ["admin_sales_channels"],
    queryFn: () => adminFetch("/sales-channels?limit=1000"),
  })
  const { data: shippingProfilesData } = useQuery({
    queryKey: ["admin_shipping_profiles"],
    queryFn: () => adminFetch("/shipping-profiles?limit=100"),
  })

  const sizeGraphs = useMemo(() => (sizeGraphsData?.size_graphs ?? []) as SizeGraph[], [sizeGraphsData])
  const productTypes = useMemo(() => (typesData?.product_types ?? []) as ProductType[], [typesData])
  const collections = useMemo(() => (collectionsData?.collections ?? []) as Collection[], [collectionsData])
  const categories = useMemo(() => (categoriesData?.product_categories ?? []) as Category[], [categoriesData])
  const tags = useMemo(() => (tagsData?.product_tags ?? []) as Tag[], [tagsData])
  const salesChannels = useMemo(() => (salesChannelsData?.sales_channels ?? []) as SalesChannel[], [salesChannelsData])
  const shippingProfiles = useMemo(() => (shippingProfilesData?.shipping_profiles ?? []) as ShippingProfile[], [shippingProfilesData])

  // ── Create product ──
  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: async () => {
      let thumbnailUrl: string | undefined
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile)
      }
      
      const imageUrls: string[] = []
      if (imagesFiles.length > 0) {
        for (const imgObj of imagesFiles) {
          const url = await uploadFile(imgObj.file)
          imageUrls.push(url)
        }
      }

      return adminFetch("/custom/products-with-size", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim() || undefined,
          handle: handle.trim() || (title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 8)),
          description: description.trim() || undefined,
          status,
          discountable,
          thumbnail: thumbnailUrl,
          images: imageUrls.length > 0 ? imageUrls : undefined,
          material: material.trim() || undefined,
          weight: weight ? Number(weight) : undefined,
          width: width ? Number(width) : undefined,
          height: height ? Number(height) : undefined,
          length: length ? Number(length) : undefined,
          mid_code: midCode.trim() || undefined,
          hs_code: hsCode.trim() || undefined,
          origin_country: originCountry.trim() || undefined,
          type_id: typeId === "null" ? undefined : typeId,
          collection_id: collectionId === "null" ? undefined : collectionId,
          category_ids: categoryIds,
          tag_ids: tagIds,
          sales_channel_ids: salesChannelIds,
          shipping_profile_id: shippingProfileId === "null" ? undefined : shippingProfileId,
          price_amount: parseFloat(priceAmount) || 0,
          currency_code: currencyCode,
          sku: sku.trim() || undefined,
          barcode: barcode.trim() || undefined,
          ean: ean.trim() || undefined,
          upc: upc.trim() || undefined,
          manage_inventory: manageInventory,
          allow_backorder: allowBackorder,
          inventory_quantity: parseInt(inventoryQuantity) || 0,
          size_graph_id: sizeGraphId === "null" ? null : sizeGraphId,
        }),
      })
    },
    onSuccess: (data) => {
      toast.success("Product created successfully")
      navigate(`/products/${data.product.id}`)
    },
    onError: (e: any) => {
      toast.error("Failed to create product: " + e.message)
    },
  })

  // ── Create size graph ──
  const { mutate: createSizeGraph, isPending: isCreatingSg } = useMutation({
    mutationFn: async () => {
      let imageUrl = ""
      if (sgImageFile) {
        imageUrl = await uploadFile(sgImageFile)
      }
      return adminFetch("/size-graphs", {
        method: "POST",
        body: JSON.stringify({ 
          name: sgName.trim(), 
          image: imageUrl, 
          description: sgDescription.trim(),
          parameters: sgTables
        }),
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin_size_graphs"] })
      setSizeGraphId(data.size_graph.id)
      setSgModalOpen(false)
      setSgName("")
      setSgDescription("")
      setSgImageFile(null)
      setSgTables([{ title: "Standard Sizes", columns: ["Size", "Shoulder", "Bust", "Hip", "Length"], rows: [{}] }])
      toast.success("Size graph created")
    },
    onError: (e: any) => toast.error("Failed: " + e.message),
  })

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
  }
  
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    const newImgs = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }))
    setImagesFiles(prev => [...prev, ...newImgs])
  }
  
  const removeImage = (id: string) => {
    setImagesFiles(prev => prev.filter(img => img.id !== id))
  }

  return (
    <div className="flex flex-col gap-y-4 max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Create Custom Product</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            A single default variant will be created automatically. Variants are managed internally.
          </Text>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button isLoading={isCreating} onClick={() => createProduct()}>
            Publish Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-6">
        {/* ── Left column (main content) ── */}
        <div className="col-span-2 flex flex-col gap-y-4">

          {/* General */}
          <Section title="General Information">
            <Field label="Title" required>
              <Input
                id="product-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Custom Embroidered Kurta"
              />
            </Field>
            <Field label="Subtitle">
              <Input
                id="product-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Hand-stitched premium fabric"
              />
            </Field>
            <Field label="Handle" hint="Auto-generated from title if left empty. Used as the URL slug.">
              <Input
                id="product-handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="e.g. custom-embroidered-kurta"
              />
            </Field>
            <Field label="Description">
              <Textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the product in detail…"
              />
            </Field>
            <div className="flex items-center gap-x-3 pt-1">
              <Checkbox
                id="product-discountable"
                checked={discountable}
                onCheckedChange={(v) => setDiscountable(Boolean(v))}
              />
              <div>
                <Label htmlFor="product-discountable">Discountable</Label>
                <Text className="text-ui-fg-subtle text-xs">When unchecked, discounts will not apply.</Text>
              </div>
            </div>
          </Section>

          {/* Media */}
          <Section title="Media" subtitle="Upload thumbnail and product images.">
            <Field label="Thumbnail Image">
              {thumbnailPreview && (
                <div className="mb-3 relative inline-block">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-32 h-32 object-cover rounded-md border border-ui-border-base"
                  />
                  <button 
                    type="button" 
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 border shadow"
                    onClick={() => { setThumbnailPreview(""); setThumbnailFile(null) }}
                  >
                    <XMarkMini />
                  </button>
                </div>
              )}
              <Input
                id="product-thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
            </Field>
            
            <div className="border-t border-ui-border-base my-2" />
            
            <Field label="Additional Images">
              {imagesFiles.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-3">
                  {imagesFiles.map((img) => (
                    <div key={img.id} className="relative inline-block">
                      <img
                        src={img.preview}
                        alt="Product preview"
                        className="w-24 h-24 object-cover rounded-md border border-ui-border-base"
                      />
                      <button 
                        type="button" 
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 border shadow"
                        onClick={() => removeImage(img.id)}
                      >
                        <XMarkMini />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <Input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
              />
            </Field>
          </Section>

          {/* Pricing */}
          <Section title="Pricing">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price" required>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={priceAmount}
                  onChange={(e) => setPriceAmount(e.target.value)}
                  placeholder="0.00"
                />
              </Field>
              <Field label="Currency">
                <Select value={currencyCode} onValueChange={setCurrencyCode}>
                  <Select.Trigger>
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="usd">USD – US Dollar</Select.Item>
                    <Select.Item value="eur">EUR – Euro</Select.Item>
                    <Select.Item value="gbp">GBP – British Pound</Select.Item>
                    <Select.Item value="pkr">PKR – Pakistani Rupee</Select.Item>
                    <Select.Item value="aed">AED – UAE Dirham</Select.Item>
                    <Select.Item value="sar">SAR – Saudi Riyal</Select.Item>
                  </Select.Content>
                </Select>
              </Field>
            </div>
          </Section>

          {/* Inventory */}
          <Section title="Inventory" subtitle="These fields are applied to the hidden default variant.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="SKU">
                <Input
                  id="product-sku"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. KURTA-001"
                />
              </Field>
              <Field label="Barcode">
                <Input
                  id="product-barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="e.g. 1234567890123"
                />
              </Field>
              <Field label="EAN">
                <Input
                  id="product-ean"
                  value={ean}
                  onChange={(e) => setEan(e.target.value)}
                  placeholder="European Article Number"
                />
              </Field>
              <Field label="UPC">
                <Input
                  id="product-upc"
                  value={upc}
                  onChange={(e) => setUpc(e.target.value)}
                  placeholder="Universal Product Code"
                />
              </Field>
            </div>
            <div className="flex flex-col gap-y-3 pt-2">
              <div className="flex items-center justify-between border border-ui-border-base rounded-md px-4 py-3">
                <div>
                  <Label>Manage Inventory</Label>
                  <Text className="text-ui-fg-subtle text-xs">Track stock levels for this product.</Text>
                </div>
                <Switch
                  id="manage-inventory"
                  checked={manageInventory}
                  onCheckedChange={setManageInventory}
                />
              </div>
              <div className="flex items-center justify-between border border-ui-border-base rounded-md px-4 py-3">
                <div>
                  <Label>Allow Backorder</Label>
                  <Text className="text-ui-fg-subtle text-xs">Allow purchase even when out of stock.</Text>
                </div>
                <Switch
                  id="allow-backorder"
                  checked={allowBackorder}
                  onCheckedChange={setAllowBackorder}
                />
              </div>
            </div>
            <Field label="Initial Stock Quantity" hint="Sets stock at your default warehouse location.">
              <Input
                id="product-inventory-quantity"
                type="number"
                min="0"
                value={inventoryQuantity}
                onChange={(e) => setInventoryQuantity(e.target.value)}
                placeholder="0"
              />
            </Field>
          </Section>

          {/* Shipping / Dimensions */}
          <Section title="Shipping & Dimensions" subtitle="Used to calculate shipping costs.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Weight (g)">
                <Input id="product-weight" type="number" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0" />
              </Field>
              <Field label="Width (mm)">
                <Input id="product-width" type="number" min="0" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="0" />
              </Field>
              <Field label="Height (mm)">
                <Input id="product-height" type="number" min="0" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="0" />
              </Field>
              <Field label="Length (mm)">
                <Input id="product-length" type="number" min="0" value={length} onChange={(e) => setLength(e.target.value)} placeholder="0" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Material">
                <Input id="product-material" value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="e.g. Cotton" />
              </Field>
              <Field label="MID Code">
                <Input id="product-mid" value={midCode} onChange={(e) => setMidCode(e.target.value)} placeholder="Manufacturer ID code" />
              </Field>
              <Field label="HS Code">
                <Input id="product-hs" value={hsCode} onChange={(e) => setHsCode(e.target.value)} placeholder="Harmonized System code" />
              </Field>
              <Field label="Country of Origin">
                <Input id="product-origin" value={originCountry} onChange={(e) => setOriginCountry(e.target.value)} placeholder="e.g. PK" />
              </Field>
            </div>
          </Section>
        </div>

        {/* ── Right column (metadata) ── */}
        <div className="col-span-1 flex flex-col gap-y-4">

          {/* Status */}
          <Section title="Status">
            <Select value={status} onValueChange={setStatus}>
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="published">Published</Select.Item>
                <Select.Item value="draft">Draft</Select.Item>
              </Select.Content>
            </Select>
          </Section>

          {/* Size Graph */}
          <Section title="Size Graph" subtitle="Each custom product must be linked to a size chart.">
            <Field label="Select Size Graph" required>
              <Select value={sizeGraphId} onValueChange={setSizeGraphId}>
                <Select.Trigger>
                  <Select.Value placeholder="Choose a size graph…" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="null">None selected</Select.Item>
                  {sizeGraphs.map((sg) => (
                    <Select.Item key={sg.id} value={sg.id}>{sg.name}</Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </Field>
            <Button variant="secondary" size="small" type="button" onClick={() => setSgModalOpen(true)}>
              + Create New Size Graph
            </Button>
            {sizeGraphId && sizeGraphId !== "null" && (() => {
              const sg = sizeGraphs.find((s) => s.id === sizeGraphId)
              if (!sg) return null
              return (
                <div className="flex items-center gap-x-3 border border-ui-border-base rounded-md p-3 mt-1">
                  <img src={sg.image} alt={sg.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <Text className="font-medium">{sg.name}</Text>
                    {sg.description && <Text className="text-ui-fg-subtle text-xs">{sg.description}</Text>}
                  </div>
                </div>
              )
            })()}
          </Section>

          {/* Organize */}
          <Section title="Organize">
            <Field label="Type">
              <Select value={typeId} onValueChange={setTypeId}>
                <Select.Trigger>
                  <Select.Value placeholder="Select type…" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="null">None</Select.Item>
                  {productTypes.map((t) => (
                    <Select.Item key={t.id} value={t.id}>{t.value}</Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </Field>
            <Field label="Collection">
              <Select value={collectionId} onValueChange={setCollectionId}>
                <Select.Trigger>
                  <Select.Value placeholder="Select collection…" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="null">None</Select.Item>
                  {collections.map((c) => (
                    <Select.Item key={c.id} value={c.id}>{c.title}</Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </Field>
            <Field label="Categories">
              <MultiSelect
                options={categories.map((c) => ({ id: c.id, label: c.name }))}
                selected={categoryIds}
                onChange={setCategoryIds}
                placeholder="Select categories…"
              />
            </Field>
            <Field label="Tags">
              <MultiSelect
                options={tags.map((t) => ({ id: t.id, label: t.value }))}
                selected={tagIds}
                onChange={setTagIds}
                placeholder="Select tags…"
              />
            </Field>
          </Section>

          {/* Sales Channels */}
          <Section title="Sales Channels" subtitle="Leave empty to use the default sales channel.">
            <Field label="Channels">
              <MultiSelect
                options={salesChannels.map((sc) => ({ id: sc.id, label: sc.name }))}
                selected={salesChannelIds}
                onChange={setSalesChannelIds}
                placeholder="Add sales channels…"
              />
            </Field>
          </Section>

          {/* Shipping Profile */}
          <Section title="Shipping Profile" subtitle="Leave empty to use the default shipping profile.">
            <Field label="Shipping Profile">
              <Select value={shippingProfileId} onValueChange={setShippingProfileId}>
                <Select.Trigger>
                  <Select.Value placeholder="Use default…" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="null">Use default</Select.Item>
                  {shippingProfiles.map((sp) => (
                    <Select.Item key={sp.id} value={sp.id}>{sp.name}</Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </Field>
          </Section>

          {/* Submit */}
          <Button isLoading={isCreating} onClick={() => createProduct()} className="w-full">
            Publish Product
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)} className="w-full">
            Cancel
          </Button>
        </div>
      </div>

      {/* ── Size Graph Create Modal ── */}
      <FocusModal open={sgModalOpen} onOpenChange={setSgModalOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <Heading level="h2">Create New Size Graph</Heading>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center py-10 overflow-y-auto">
            <form
              onSubmit={(e) => { e.preventDefault(); createSizeGraph() }}
              className="w-full max-w-4xl flex flex-col gap-y-8"
            >
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-x-6">
                <div className="flex flex-col gap-y-4">
                  <Field label="Name" required>
                    <Input id="sg-name" value={sgName} onChange={(e) => setSgName(e.target.value)} required />
                  </Field>
                  <Field label="Description">
                    <Textarea id="sg-description" value={sgDescription} onChange={(e) => setSgDescription(e.target.value)} rows={3} />
                  </Field>
                </div>
                <Field label="Header Image (Optional)">
                  <Input type="file" accept="image/*" onChange={(e) => setSgImageFile(e.target.files?.[0] ?? null)} />
                  {sgImageFile && (
                    <img
                      src={URL.createObjectURL(sgImageFile)}
                      className="h-32 w-full rounded border object-contain bg-ui-bg-subtle mt-2"
                    />
                  )}
                </Field>
              </div>

              {/* Measurement Tables */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Heading level="h2">Measurement Tables</Heading>
                  <Button type="button" variant="secondary" size="small" onClick={addSgTable}>
                    + Add Table Section
                  </Button>
                </div>

                <div className="flex flex-col gap-y-10">
                  {sgTables.map((table, tIdx) => (
                    <div key={tIdx} className="border rounded-lg p-6 bg-ui-bg-subtle/50 relative">
                      <button 
                        type="button"
                        className="absolute top-2 right-2 text-rose-500 hover:bg-rose-50 p-1 rounded transition-colors"
                        onClick={() => removeSgTable(tIdx)}
                      >
                        <XMarkMini />
                      </button>

                      <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2 max-w-sm text-left">
                          <Label className="text-xs uppercase font-bold text-ui-fg-muted">Section Title</Label>
                          <Input 
                            value={table.title} 
                            onChange={(e) => {
                              const nt = [...sgTables]; nt[tIdx].title = e.target.value; setSgTables(nt)
                            }}
                          />
                        </div>

                        <div className="overflow-x-auto border rounded-md bg-ui-bg-base">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b bg-ui-bg-subtle text-left">
                                {table.columns.map((col, cIdx) => (
                                  <th key={cIdx} className="p-2 border-r last:border-r-0 min-w-[120px]">
                                    <div className="flex items-center gap-x-1">
                                      <input 
                                        className="bg-transparent border-none text-xs font-bold w-full focus:outline-none"
                                        value={col}
                                        onChange={(e) => updateSgColumnName(tIdx, cIdx, e.target.value)}
                                      />
                                      <button 
                                        type="button"
                                        onClick={() => removeSgColumn(tIdx, cIdx)}
                                        className="text-rose-500"
                                      >
                                        <XMarkMini className="h-3 w-3" />
                                      </button>
                                    </div>
                                  </th>
                                ))}
                                <th className="p-2 w-10 text-center">
                                  <button type="button" onClick={() => addSgColumn(tIdx)} className="text-ui-fg-interactive">
                                    +
                                  </button>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b last:border-b-0">
                                  {table.columns.map((col, cIdx) => (
                                    <td key={cIdx} className="p-1 border-r last:border-r-0">
                                      <input 
                                        className="w-full p-1 text-sm bg-transparent border-none focus:ring-1 focus:ring-ui-border-interactive rounded transition-all"
                                        value={row[col] || ""}
                                        onChange={(e) => updateSgCell(tIdx, rIdx, col, e.target.value)}
                                        placeholder="..."
                                      />
                                    </td>
                                  ))}
                                  <td className="p-1 text-center">
                                    <button 
                                      type="button"
                                      onClick={() => removeSgRow(tIdx, rIdx)}
                                      className="text-rose-500"
                                    >
                                      <XMarkMini className="h-4 w-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="small" 
                            className="w-full rounded-none border-none border-t border-ui-border-base"
                            onClick={() => addSgRow(tIdx)}
                          >
                            + Add Row
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-x-2 pt-6 border-t">
                <Button type="button" variant="secondary" onClick={() => setSgModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isCreatingSg}>
                  Create Size Graph
                </Button>
              </div>
            </form>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Add Custom Product",
  icon: ShoppingBag,
})

export default CustomProductPage
