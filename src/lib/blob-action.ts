import type { ActionReturn } from "svelte/action";

export function blobAction(node: HTMLImageElement, parameter: File): ActionReturn<File> {
  node.src = URL.createObjectURL(parameter);
  return {
    update(parameter) {
      const old = node.src;
      node.src = URL.createObjectURL(parameter);
      URL.revokeObjectURL(old);
    },
    destroy() {
      URL.revokeObjectURL(node.src);
    }
  }
}