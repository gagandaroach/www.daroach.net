# Organism Components

Organisms are complex UI components composed of molecules and atoms. They represent distinct sections of the interface.

## Available Organisms

### OrganismWelcome
Welcome screen with animated content and navigation.

```vue
<template>
  <OrganismWelcome>
    <template #title>Welcome</template>
    <template #subtitle>Subtitle text</template>
    <template #actions>
      <MoleculeButton>Get Started</MoleculeButton>
    </template>
  </OrganismWelcome>
</template>
```

### OrganismGaganIntro
Introduction section with profile information.

```vue
<template>
  <OrganismGaganIntro>
    <template #name>Gagan</template>
    <template #title>Developer</template>
    <template #description>
      <AtomParagraph>Description text</AtomParagraph>
    </template>
  </OrganismGaganIntro>
</template>
```

### OrganismSection
Generic section component for content organization.

```vue
<template>
  <OrganismSection>
    <template #header>
      <MoleculeSectionHeader>
        <template #title>Section Title</template>
      </MoleculeSectionHeader>
    </template>
    <template #content>
      <AtomCard>Content</AtomCard>
    </template>
  </OrganismSection>
</template>
```

## Usage Guidelines

1. **Welcome Screen**
   - Use for landing/welcome pages
   - Supports animated content
   - Customizable title, subtitle, and actions

2. **Introduction**
   - Use for profile/portfolio introductions
   - Structured layout for personal information
   - Customizable content sections

3. **Section**
   - Use for organizing page content
   - Optional header with title
   - Flexible content area

## Best Practices

1. Keep organisms focused on a single purpose
2. Use appropriate molecules and atoms within organisms
3. Maintain consistent styling across similar organisms
4. Use slots for flexible content composition
5. Document props and events for each organism

## Examples

### Welcome Screen
```vue
<template>
  <OrganismWelcome>
    <template #title>Welcome to My Site</template>
    <template #subtitle>Explore my work and projects</template>
    <template #actions>
      <MoleculeButton variant="primary">View Projects</MoleculeButton>
      <MoleculeButton variant="secondary">Contact Me</MoleculeButton>
    </template>
  </OrganismWelcome>
</template>
```

### Profile Introduction
```vue
<template>
  <OrganismGaganIntro>
    <template #name>Gagan</template>
    <template #title>Full Stack Developer</template>
    <template #description>
      <AtomParagraph>
        Experienced developer specializing in web technologies
      </AtomParagraph>
    </template>
  </OrganismGaganIntro>
</template>
```

### Content Section
```vue
<template>
  <OrganismSection>
    <template #header>
      <MoleculeSectionHeader>
        <template #title>My Projects</template>
        <template #subtitle>Recent work and case studies</template>
      </MoleculeSectionHeader>
    </template>
    <template #content>
      <TemplateCardGrid>
        <AtomCard>Project 1</AtomCard>
        <AtomCard>Project 2</AtomCard>
      </TemplateCardGrid>
    </template>
  </OrganismSection>
</template>
``` 