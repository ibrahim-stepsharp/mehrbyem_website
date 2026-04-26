import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar, Plus, Trash, XMarkMini } from "@medusajs/icons"
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
  clx,
} from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useMemo, useState, useEffect } from "react"

type SizeGraphTableData = {
  title: string
  columns: string[]
  rows: Record<string, string>[]
}

type SizeGraph = {
  id: string
  name: string
  image: string
  description: string | null
  parameters?: SizeGraphTableData[]
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
  
  // Table state
  const [tables, setTables] = useState<SizeGraphTableData[]>([
    { title: "Standard Sizes", columns: ["Size", "Shoulder", "Bust", "Hip", "Length"], rows: [{}] }
  ])

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

      const payload: Record<string, any> = {
        name: name.trim(),
        image: resolvedImage || "",
        description: description.trim(),
        parameters: tables,
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
    setTables([{ title: "Standard Sizes", columns: ["Size", "Shoulder", "Bust", "Hip", "Length"], rows: [{}] }])
    setIsModalOpen(false)
  }

  const handleEdit = (sizeGraph: SizeGraph) => {
    setEditingId(sizeGraph.id)
    setName(sizeGraph.name)
    setCurrentImageUrl(sizeGraph.image)
    setDescription(sizeGraph.description ?? "")
    setImageFile(null)
    
    // Support both structures for backward compatibility during transition
    const params = sizeGraph.parameters
    if (Array.isArray(params)) {
      setTables(params)
    } else if (params && (params as any).tables) {
      setTables((params as any).tables)
    } else {
      setTables([{ title: "Standard Sizes", columns: ["Size", "Shoulder", "Bust", "Hip", "Length"], rows: [{}] }])
    }
    setIsModalOpen(true)
  }

  const addTable = () => {
    setTables([...tables, { title: "New Section", columns: ["Size"], rows: [{}] }])
  }

  const removeTable = (index: number) => {
    setTables(tables.filter((_, i) => i !== index))
  }

  const addColumn = (tableIndex: number) => {
    const newTables = [...tables]
    newTables[tableIndex].columns.push("New Column")
    setTables(newTables)
  }

  const removeColumn = (tableIndex: number, colIndex: number) => {
    const newTables = [...tables]
    const colName = newTables[tableIndex].columns[colIndex]
    newTables[tableIndex].columns.splice(colIndex, 1)
    newTables[tableIndex].rows = newTables[tableIndex].rows.map(row => {
      const newRow = { ...row }
      delete newRow[colName]
      return newRow
    })
    setTables(newTables)
  }

  const addRow = (tableIndex: number) => {
    const newTables = [...tables]
    newTables[tableIndex].rows.push({})
    setTables(newTables)
  }

  const removeRow = (tableIndex: number, rowIndex: number) => {
    const newTables = [...tables]
    newTables[tableIndex].rows.splice(rowIndex, 1)
    setTables(newTables)
  }

  const updateCell = (tableIndex: number, rowIndex: number, colName: string, value: string) => {
    const newTables = [...tables]
    newTables[tableIndex].rows[rowIndex][colName] = value
    setTables(newTables)
  }

  const updateColumnName = (tableIndex: number, colIndex: number, newName: string) => {
    const newTables = [...tables]
    const oldName = newTables[tableIndex].columns[colIndex]
    newTables[tableIndex].columns[colIndex] = newName
    newTables[tableIndex].rows = newTables[tableIndex].rows.map(row => {
      const newRow = { ...row }
      if (newRow[oldName]) {
        newRow[newName] = newRow[oldName]
        delete newRow[oldName]
      }
      return newRow
    })
    setTables(newTables)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveSizeGraph()
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4 text-left">
        <div>
          <Heading level="h1">Size Graphs</Heading>
          <Text className="text-ui-fg-subtle mt-1">
            Create reusable size charts with measurement tables.
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
                <Table.HeaderCell>Sections</Table.HeaderCell>
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
                    {sizeGraph.image ? (
                      <img
                        src={sizeGraph.image}
                        alt={sizeGraph.name}
                        className="h-12 w-12 rounded object-cover border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded border bg-ui-bg-subtle flex items-center justify-center text-xs text-ui-fg-muted">
                        No Image
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-wrap gap-1">
                      {(() => {
                        const params = sizeGraph.parameters
                        const tables = Array.isArray(params) 
                          ? params 
                          : (params as any)?.tables || []
                        
                        if (tables.length === 0) return "-"
                        
                        return tables.map((t: any, i: number) => (
                          <span key={i} className="text-[10px] bg-ui-bg-subtle px-1.5 py-0.5 rounded border uppercase font-bold text-ui-fg-muted">
                            {t.title}
                          </span>
                        ))
                      })()}
                    </div>
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
          <FocusModal.Body className="flex flex-col items-center py-10 overflow-y-auto">
            <form onSubmit={handleSubmit} className="flex w-full max-w-4xl flex-col gap-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-x-6">
                <div className="flex flex-col gap-y-4 text-left">
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor="size-graph-name">Graph Name</Label>
                    <Input
                      id="size-graph-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kurta Standard Chart"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor="size-graph-description">Description</Label>
                    <Textarea
                      id="size-graph-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-y-2 text-left">
                  <Label>Header Image (Optional)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  />
                  {(currentImageUrl || imageFile) && (
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : currentImageUrl}
                      className="h-32 w-full rounded border object-contain bg-ui-bg-subtle"
                    />
                  )}
                </div>
              </div>

              {/* Measurement Tables */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Heading level="h2">Measurement Tables</Heading>
                  <Button type="button" variant="secondary" size="small" onClick={addTable}>
                    <Plus /> Add Section
                  </Button>
                </div>

                <div className="flex flex-col gap-y-10">
                  {tables.map((table, tIdx) => (
                    <div key={tIdx} className="border rounded-lg p-6 bg-ui-bg-subtle/50 relative shadow-sm bg-ui-bg-base">
                      <IconButton 
                        variant="transparent" 
                        className="absolute top-2 right-2 text-ui-fg-error"
                        onClick={() => removeTable(tIdx)}
                      >
                        <Trash className="h-4 w-4" />
                      </IconButton>

                      <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2 max-w-sm text-left">
                          <Label className="text-xs uppercase font-bold text-ui-fg-muted">Section Title</Label>
                          <Input 
                            value={table.title} 
                            onChange={(e) => {
                              const nt = [...tables]; nt[tIdx].title = e.target.value; setTables(nt)
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
                                        onChange={(e) => updateColumnName(tIdx, cIdx, e.target.value)}
                                      />
                                      <IconButton 
                                        variant="transparent" 
                                        size="small" 
                                        onClick={() => removeColumn(tIdx, cIdx)}
                                        className="h-4 w-4"
                                      >
                                        <Trash className="h-3 w-3" />
                                      </IconButton>
                                    </div>
                                  </th>
                                ))}
                                <th className="p-2 w-10 text-center">
                                  <IconButton variant="transparent" size="small" onClick={() => addColumn(tIdx)}>
                                    <Plus className="h-4 w-4" />
                                  </IconButton>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b last:border-b-0 bg-ui-bg-base">
                                  {table.columns.map((col, cIdx) => (
                                    <td key={cIdx} className="p-1 border-r last:border-r-0">
                                      <input 
                                        className="w-full p-1 text-sm bg-transparent border-none focus:ring-1 focus:ring-ui-border-interactive rounded transition-all"
                                        value={row[col] || ""}
                                        onChange={(e) => updateCell(tIdx, rIdx, col, e.target.value)}
                                        placeholder="..."
                                      />
                                    </td>
                                  ))}
                                  <td className="p-1 text-center">
                                    <IconButton 
                                      variant="transparent" 
                                      size="small" 
                                      onClick={() => removeRow(tIdx, rIdx)}
                                      className="text-ui-fg-error"
                                    >
                                      <Trash className="h-4 w-4" />
                                    </IconButton>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="small" 
                            className="w-full rounded-none border-none border-t"
                            onClick={() => addRow(tIdx)}
                          >
                            <Plus className="mr-2 h-3 w-3" /> Add Row
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-x-2 pt-6 border-t">
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSaving}>
                  {editingId ? "Update Graph" : "Create Graph"}
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
