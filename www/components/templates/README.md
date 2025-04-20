# Template Components

Templates define the layout structure of pages in the application.

## Available Templates

### TemplateBaseLayoutTemplate
Standard layout with header, content, and footer sections.

```vue
<template>
  <TemplateBaseLayoutTemplate>
    <template #header>
      <!-- Optional header content -->
    </template>
    <template #content>
      <!-- Main content -->
    </template>
    <template #footer>
      <!-- Optional footer content -->
    </template>
  </TemplateBaseLayoutTemplate>
</template>
```

### TemplateFullscreenTemplate
Fullscreen layout without header and footer.

```vue
<template>
  <TemplateFullscreenTemplate>
    <!-- Fullscreen content -->
  </TemplateFullscreenTemplate>
</template>
```

### TemplateCardGrid
Responsive grid layout for cards.

```vue
<template>
  <TemplateCardGrid>
    <AtomCard>Card 1</AtomCard>
    <AtomCard>Card 2</AtomCard>
    <!-- More cards -->
  </TemplateCardGrid>
</template>
```

### TemplatePageTemplate
Enhanced page template with Suspense for loading states.

```vue
<template>
  <TemplatePageTemplate>
    <template #content>
      <!-- Page content -->
    </template>
  </TemplatePageTemplate>
</template>
```

## Usage Guidelines

1. **Base Layout**
   - Use for standard pages with header and footer
   - All slots are optional
   - Content slot is required for main content

2. **Fullscreen Layout**
   - Use for standalone pages like welcome/login
   - No header or footer
   - Single content slot

3. **Card Grid**
   - Use for responsive card layouts
   - Automatically handles responsive breakpoints
   - Works with any number of cards

4. **Page Template**
   - Use for pages with async content
   - Handles loading states automatically
   - Provides error boundaries

## Best Practices

1. Choose the appropriate template based on page requirements
2. Use slots for flexible content composition
3. Keep template usage consistent across similar pages
4. Use TemplatePageTemplate for pages with async data
5. Use TemplateFullscreenTemplate for standalone pages

## Examples

### Standard Page
```vue
<template>
  <TemplateBaseLayoutTemplate>
    <template #content>
      <MoleculeSectionHeader>
        <template #title>Page Title</template>
      </MoleculeSectionHeader>
      <TemplateCardGrid>
        <AtomCard>Content</AtomCard>
      </TemplateCardGrid>
    </template>
  </TemplateBaseLayoutTemplate>
</template>
```

### Fullscreen Page
```vue
<template>
  <TemplateFullscreenTemplate>
    <OrganismWelcome />
  </TemplateFullscreenTemplate>
</template>
```

### Async Page
```vue
<template>
  <TemplatePageTemplate>
    <template #content>
      <OrganismAsyncContent>
        <!-- Async content -->
      </OrganismAsyncContent>
    </template>
  </TemplatePageTemplate>
</template>
``` 