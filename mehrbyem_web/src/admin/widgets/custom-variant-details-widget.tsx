import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const CustomVariantDetailsWidget = () => {
  useEffect(() => {
    const hideVariantJunk = () => {
      const headings = document.querySelectorAll('h2, h3');
      const variantHeading = Array.from(headings).find(h => h.textContent?.trim().toLowerCase() === 'variants');
      const optionsHeading = Array.from(headings).find(h => h.textContent?.trim().toLowerCase() === 'options');

      if (variantHeading) {
        let section = variantHeading.closest('.border-ui-border-base') 
          || variantHeading.closest('.bg-ui-bg-base')
          || variantHeading.parentElement?.parentElement?.parentElement || null;

        if (section) {
          // 1. Hide Create button, Sort, Filter
          const headerArea = section.querySelector('.flex.items-center.justify-between');
          if (headerArea) {
            const actionsContainer = headerArea.lastElementChild;
            if (actionsContainer) {
              const buttons = Array.from(actionsContainer.querySelectorAll('button'));
              // In Medusa, the header has Sort, Filter, and Action Menu (...) as buttons.
              // The Action Menu is always the last <button> in this container.
              if (buttons.length > 1) {
                // Hide all buttons EXCEPT the last one
                for (let i = 0; i < buttons.length - 1; i++) {
                  (buttons[i] as HTMLElement).style.display = 'none';
                }
              }

              // The Create action is usually an <a> tag
              const links = actionsContainer.querySelectorAll('a');
              links.forEach(link => {
                (link as HTMLElement).style.display = 'none';
              });
            }
          }

          // Aggressive fallback for standalone buttons
          const allButtons = section.querySelectorAll('button, a');
          allButtons.forEach(btn => {
            if (!btn.closest('tbody')) {
               const text = (
                 btn.textContent || 
                 btn.getAttribute('aria-label') || 
                 btn.getAttribute('title') || 
                 ''
               ).toLowerCase().trim();
               
               if (text.includes('create') || text.includes('sort') || text.includes('filter')) {
                 (btn as HTMLElement).style.display = 'none';
               }
            }
          });

          // 2. Hide Search
          const searchInputs = section.querySelectorAll('input[type="search"]');
          searchInputs.forEach(input => {
             const wrapper = input.parentElement?.parentElement;
             if (wrapper) (wrapper as HTMLElement).style.display = 'none';
             else (input as HTMLElement).style.display = 'none';
          });
          
          // 3. Hide Pagination
          const flexContainers = section.querySelectorAll('.flex.items-center.justify-between');
          flexContainers.forEach(container => {
            if (container === headerArea) return;
            const text = container.textContent?.toLowerCase() || '';
            if (text.includes('results') || text.includes('pages') || text.includes('prev') || text.includes('next')) {
              (container as HTMLElement).style.display = 'none';
            }
          });
        }
      }

      // 4. Hide Options Section entirely
      if (optionsHeading) {
        let optionsSection = optionsHeading.closest('.border-ui-border-base') 
          || optionsHeading.closest('.bg-ui-bg-base')
          || optionsHeading.parentElement?.parentElement?.parentElement || null;
        
        if (optionsSection) {
          (optionsSection as HTMLElement).style.display = 'none';
        }
      }
    };

    hideVariantJunk();
    const observer = new MutationObserver(hideVariantJunk);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}

export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default CustomVariantDetailsWidget
