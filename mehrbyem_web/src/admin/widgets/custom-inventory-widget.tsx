import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text } from "@medusajs/ui"
import { useEffect } from "react"

const CustomInventoryWidget = () => {
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
    <Container className="mb-4 border border-ui-border-base p-6 bg-ui-bg-subtle">
      <Heading level="h2">Custom Inventory</Heading>
      <Text className="text-ui-fg-subtle">
        Inventory is automatically managed 1-to-1 with Custom Stitched Products.
        The default creation and export tools have been disabled to prevent out-of-sync inventory pools.
      </Text>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "inventory_item.list.before",
})

export default CustomInventoryWidget
