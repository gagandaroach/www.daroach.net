import type { Component, PropType } from 'vue'

interface AtomProps {
  component: Component
  props?: Record<string, unknown>
}

interface MoleculeProps {
  atoms: AtomProps[]
  props?: Record<string, unknown>
}

interface OrganismProps {
  molecules: MoleculeProps[]
  state?: Record<string, unknown>
  props?: Record<string, unknown>
}

interface TemplateProps {
  organisms: OrganismProps[]
  slots?: Record<string, unknown>
  props?: Record<string, unknown>
}

export const useAtomicDesign = () => {
  const createAtom = (component: Component, props: Record<string, unknown> = {}) => {
    return {
      component,
      props,
      type: 'atom' as const
    }
  }

  const createMolecule = (atoms: ReturnType<typeof createAtom>[], props: Record<string, unknown> = {}) => {
    return {
      atoms,
      props,
      type: 'molecule' as const
    }
  }

  const createOrganism = (
    molecules: ReturnType<typeof createMolecule>[],
    state: Record<string, unknown> = {},
    props: Record<string, unknown> = {}
  ) => {
    return {
      molecules,
      state,
      props,
      type: 'organism' as const
    }
  }

  const createTemplate = (
    organisms: ReturnType<typeof createOrganism>[],
    slots: Record<string, unknown> = {},
    props: Record<string, unknown> = {}
  ) => {
    return {
      organisms,
      slots,
      props,
      type: 'template' as const
    }
  }

  return {
    createAtom,
    createMolecule,
    createOrganism,
    createTemplate
  }
} 