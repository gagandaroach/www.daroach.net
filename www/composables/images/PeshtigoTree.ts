import { ref } from 'vue'

export function usePeshtigoTree() {
    const Src = ref('/media/gagan_daroach_outside_tree_home.jpg')
    const Alt = ref('Gagan Daroach outside home')
    return {
        Src, Alt
    }
};
