import type { Component } from 'vue'

export const useAtomicDesign = () => {
  const createAtom = (component: Component, props: Record<string, any> = {}) => {
    return {
      component,
      props,
      type: 'atom' as const
    }
  }

  const createMolecule = (atoms: ReturnType<typeof createAtom>[], props: Record<string, any> = {}) => {
    return {
      atoms,
      props,
      type: 'molecule' as const
    }
  }

  const createOrganism = (
    molecules: ReturnType<typeof createMolecule>[],
    state: Record<string, any> = {},
    props: Record<string, any> = {}
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
    slots: Record<string, any> = {},
    props: Record<string, any> = {}
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