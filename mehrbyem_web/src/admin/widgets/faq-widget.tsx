import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { 
  Button, 
  Container, 
  Heading, 
  Table, 
  Text, 
  Input, 
  FocusModal, 
  Label, 
  Textarea,
  DropdownMenu,
  IconButton
} from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"

// Simple fetcher for custom admin routes
const adminFetch = async (path: string, options: RequestInit = {}) => {
  const baseUrl = "http://localhost:9000/admin"
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  if (!response.ok) throw new Error("Network response was not ok")
  return response.json()
}

const FaqWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const queryClient = useQueryClient()

  // Fetch FAQs
  const { data, isLoading } = useQuery({
    queryKey: ["admin_faqs"],
    queryFn: () => adminFetch("/faq")
  })

  // Create/Update Mutation
  const { mutate: saveFaq } = useMutation({
    mutationFn: (payload: any) => {
      if (editingId) {
        return adminFetch(`/faq/${editingId}`, {
          method: "POST",
          body: JSON.stringify(payload)
        })
      }
      return adminFetch("/faq", {
        method: "POST",
        body: JSON.stringify(payload)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_faqs"] })
      resetForm()
    }
  })

  // Delete Mutation
  const { mutate: deleteFaq } = useMutation({
    mutationFn: (id: string) => adminFetch(`/faq/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_faqs"] })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveFaq({ question, answer })
  }

  const handleEdit = (faq: any) => {
    setEditingId(faq.id)
    setQuestion(faq.question)
    setAnswer(faq.answer)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteFaq(id)
  }

  const resetForm = () => {
    setQuestion("")
    setAnswer("")
    setEditingId(null)
    setIsModalOpen(false)
  }

  return (
    <Container className="divide-y p-0 mt-8">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">FAQs</Heading>
        <Button size="small" variant="secondary" onClick={() => setIsModalOpen(true)}>
          Add FAQ
        </Button>
      </div>

      <div className="px-6 py-4">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>Answer</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.faqs?.map((faq: any) => (
                <Table.Row key={faq.id}>
                  <Table.Cell className="font-medium">{faq.question}</Table.Cell>
                  <Table.Cell className="max-w-md truncate">{faq.answer}</Table.Cell>
                  <Table.Cell className="flex justify-end text-right">
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <IconButton variant="transparent">
                          <Text>...</Text>
                        </IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Item onClick={() => handleEdit(faq)}>
                          Edit
                        </DropdownMenu.Item>
                        <DropdownMenu.Item 
                          onClick={() => handleDelete(faq.id)}
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
            <Heading level="h2">{editingId ? "Edit FAQ" : "Add FAQ"}</Heading>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center py-16">
            <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-y-8">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="question">Question</Label>
                <Input 
                  id="question" 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  required 
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea 
                  id="answer" 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)} 
                  required 
                />
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
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

export const config = defineWidgetConfig({
  zone: "store.details.after",
})

export default FaqWidget
