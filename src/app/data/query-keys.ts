export const queryKeys = {
  moduleGroups: "MODULE_GROUPS",
  moduleSpecs: "MODULE_SPECS",
  editorContent: (id: string) => "EDITOR_CONTENT_" + id,
} as const;
