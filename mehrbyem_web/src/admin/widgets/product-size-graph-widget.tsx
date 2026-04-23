import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Button, Container, Heading, Label, Text } from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useMemo, useState } from "react"

type SizeGraph = {
  id: string
  name: string
  image: string
  description: string | null
}

type ProductSizeGraphResponse = {
  product_id: string
  variant_id: string
  size_graph_id: string | null
  size_graph: SizeGraph | null
}

type ProductSizeGraphWidgetProps = {
  data: {
    id: string
  }
}

const adminFetch = async (path: string, options: RequestInit = {}) => {
  const response = await fetch(`/admin${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(errorBody || "Request failed")
  }

  return response.json()
}

const ProductSizeGraphWidget = ({ data }: ProductSizeGraphWidgetProps) => {
  const productId = data.id
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = useState<string>("")

  const { data: sizeGraphsData, isLoading: isLoadingSizeGraphs } = useQuery({
    queryKey: ["admin_size_graphs_for_product_link"],
    queryFn: () => adminFetch("/size-graphs?limit=200&offset=0"),
  })

  const { data: productSizeGraphData, isLoading: isLoadingProductSizeGraph } =
    useQuery<ProductSizeGraphResponse>({
      queryKey: ["admin_product_size_graph", productId],
      queryFn: () => adminFetch(`/custom/products/${productId}/size-graph`),
    })

  useEffect(() => {
    setSelectedId(productSizeGraphData?.size_graph_id ?? "")
  }, [productSizeGraphData?.size_graph_id])

  const sizeGraphs: SizeGraph[] = useMemo(
    () => sizeGraphsData?.size_graphs ?? [],
    [sizeGraphsData?.size_graphs]
  )

  const selectedGraph = useMemo(
    () => sizeGraphs.find((graph) => graph.id === selectedId) ?? null,
    [selectedId, sizeGraphs]
  )

  const { mutate: saveProductSizeGraph, isPending: isSaving } = useMutation({
    mutationFn: () =>
      adminFetch(`/custom/products/${productId}/size-graph`, {
        method: "POST",
        body: JSON.stringify({
          size_graph_id: selectedId || null,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin_product_size_graph", productId],
      })
    },
  })

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading level="h2">Size Graph</Heading>
        <Button
          size="small"
          onClick={() => saveProductSizeGraph()}
          isLoading={isSaving}
          disabled={isLoadingSizeGraphs || isLoadingProductSizeGraph}
        >
          Save
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="product-size-graph-select">Linked Size Graph</Label>
        <select
          id="product-size-graph-select"
          className="bg-ui-bg-field border-ui-border-base txt-compact-small text-ui-fg-base focus:border-ui-border-interactive flex h-10 w-full items-center rounded-md border px-3 py-2"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          disabled={isLoadingSizeGraphs || isLoadingProductSizeGraph}
        >
          <option value="">No size graph linked</option>
          {sizeGraphs.map((sizeGraph) => (
            <option key={sizeGraph.id} value={sizeGraph.id}>
              {sizeGraph.name}
            </option>
          ))}
        </select>
      </div>

      {selectedGraph ? (
        <div className="mt-4 rounded-lg border p-3">
          <Text className="font-medium">{selectedGraph.name}</Text>
          <Text className="text-ui-fg-subtle mt-1 font-mono text-xs">
            {selectedGraph.id}
          </Text>
          {selectedGraph.description ? (
            <Text className="mt-2">{selectedGraph.description}</Text>
          ) : null}
          <img
            src={selectedGraph.image}
            alt={selectedGraph.name}
            className="mt-3 h-40 w-full rounded border object-contain bg-ui-bg-subtle"
          />
        </div>
      ) : (
        <Text className="text-ui-fg-subtle mt-3">
          This product currently has no linked size graph.
        </Text>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.after",
})

export default ProductSizeGraphWidget
