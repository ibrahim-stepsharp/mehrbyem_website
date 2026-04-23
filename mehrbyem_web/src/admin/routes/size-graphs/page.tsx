import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar } from "@medusajs/icons"
import {
  Button,
  Container,
  FocusModal,
  Heading,
  IconButton,
  Input,
  Label,
  Table,
  Text,
  Textarea,
  DropdownMenu,
} from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useMemo, useState } from "react"

type SizeGraph = {
  id: string
  name: string
  image: string
  description: string | null
}

const adminFetch = async (path: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData
  const response = await fetch(`/admin${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(errorBody || "Request failed")
  }

  return response.json()
}

const uploadImage = async (file: File) => {
  const form = new FormData()
  form.append("files", file)

  const data = await adminFetch("/uploads", {
    method: "POST",
    body: form,
  })

  const url = data?.files?.[0]?.url
  if (!url) {
    throw new Error("Upload failed: missing file URL")
  }

  return `${url}`
}

const SizeGraphsPage = () => {
  const queryClient = useQueryClient()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [currentImageUrl, setCurrentImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["admin_size_graphs"],
    queryFn: () => adminFetch("/size-graphs?limit=100&offset=0"),
  })

  const sizeGraphs = useMemo(
    () => (data?.size_graphs ?? []) as SizeGraph[],
    [data?.size_graphs]
  )

  const { mutate: saveSizeGraph, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      let resolvedImage = currentImageUrl
      if (imageFile) {
        resolvedImage = await uploadImage(imageFile)
      }

      if (!resolvedImage) {
        throw new Error("Image is required")
      }

      const payload: Record<string, string> = {
        name: name.trim(),
        image: resolvedImage,
        description: description.trim(),
      }

      if (editingId) {
        return adminFetch(`/size-graphs/${editingId}`, {
          method: "POST",
          body: JSON.stringify(payload),
        })
      }

      return adminFetch("/size-graphs", {
        method: "POST",
        body: JSON.stringify(payload),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_size_graphs"] })
      resetForm()
    },
  })

  const { mutate: deleteSizeGraph } = useMutation({
    mutationFn: (id: string) =>
      adminFetch(`/size-graphs/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_size_graphs"] })
    },
  })

  const resetForm = () => {
    setEditingId(null)
    setName("")
    setCurrentImageUrl("")
    setDescription("")
    setImageFile(null)
    setIsModalOpen(false)
  }

  const handleEdit = (sizeGraph: SizeGraph) => {
    setEditingId(sizeGraph.id)
    setName(sizeGraph.name)
    setCurrentImageUrl(sizeGraph.image)
    setDescription(sizeGraph.description ?? "")
    setImageFile(null)
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveSizeGraph()
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Size Graphs</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            Create reusable size charts and link them to products.
          </Text>
        </div>
        <Button
          size="small"
          onClick={() => {
            resetForm()
            setIsModalOpen(true)
          }}
        >
          Add Size Graph
        </Button>
      </div>

      <div className="px-6 py-4">
        {isLoading ? (
          <Text>Loading size graphs...</Text>
        ) : sizeGraphs.length === 0 ? (
          <Text className="text-ui-fg-subtle">No size graphs created yet.</Text>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sizeGraphs.map((sizeGraph) => (
                <Table.Row key={sizeGraph.id}>
                  <Table.Cell className="font-medium">{sizeGraph.name}</Table.Cell>
                  <Table.Cell className="font-mono text-xs">
                    {sizeGraph.id}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={sizeGraph.image}
                      alt={sizeGraph.name}
                      className="h-12 w-12 rounded object-cover border"
                    />
                  </Table.Cell>
                  <Table.Cell className="max-w-md truncate">
                    {sizeGraph.description || "-"}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <IconButton variant="transparent">
                          <Text>...</Text>
                        </IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Item onClick={() => handleEdit(sizeGraph)}>
                          Edit
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          onClick={() => deleteSizeGraph(sizeGraph.id)}
                          className="text-ui-fg-error"
                        >
                          Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <FocusModal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <Heading level="h2">
              {editingId ? "Edit Size Graph" : "Add Size Graph"}
            </Heading>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center py-10">
            <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="size-graph-name">Name</Label>
                <Input
                  id="size-graph-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label htmlFor="size-graph-image-file">
                  {editingId ? "Replace Image File" : "Upload Image File"}
                </Label>
                <Input
                  id="size-graph-image-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  required={!editingId}
                />
              </div>

              {(currentImageUrl || imageFile) && (
                <div className="flex flex-col gap-y-2">
                  <Label>Preview</Label>
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : currentImageUrl}
                    alt="Size graph preview"
                    className="h-44 w-full rounded border object-contain bg-ui-bg-subtle"
                  />
                </div>
              )}

              <div className="flex flex-col gap-y-2">
                <Label htmlFor="size-graph-description">Description</Label>
                <Textarea
                  id="size-graph-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-end gap-x-2">
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSaving}>
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Size Graphs",
  icon: ChartBar,
  rank: 185,
})

export default SizeGraphsPage
