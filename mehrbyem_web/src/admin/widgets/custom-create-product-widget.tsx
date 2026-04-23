import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Text } from "@medusajs/ui"
import { Plus } from "@medusajs/icons"
import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react"

const CustomCreateProductWidget = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const hideButtons = () => {
      // Hide anything that looks like the default Create, Import, or Export buttons
      const elements = document.querySelectorAll('a, button, [role="menuitem"]');
      elements.forEach(el => {
        const text = el.textContent?.toLowerCase().trim() || '';
        if (
          text === 'create' || 
          text === 'import' || 
          text === 'export' ||
          (text.includes('create') && text.length < 10) ||
          (text.includes('export') && text.length < 10) ||
          (text.includes('import') && text.length < 10)
        ) {
          (el as HTMLElement).style.display = 'none';
        }
      });
    };

    hideButtons();
    const observer = new MutationObserver(hideButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <Container className="mb-4 border border-ui-border-base p-6 bg-ui-bg-subtle flex justify-between items-center">
      <div>
        <Heading level="h2">Custom Stitched Products</Heading>
        <Text className="text-ui-fg-subtle">
          Use the custom creator to easily set up products with a single inventory pool and linked size graph.
        </Text>
      </div>
      <Button 
        variant="primary" 
        onClick={() => navigate("/custom-products")}
      >
        <Plus className="mr-2" /> Create Custom Product
      </Button>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.list.before",
})

export default CustomCreateProductWidget
