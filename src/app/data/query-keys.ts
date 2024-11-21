export const queryKeys = {
  moduleGroups: "MODULE_GROUPS",
  moduleSpecs: "MODULE_SPECS",
  moduleGroupSpecs: "MODULE_GROUP_SPECS",
  specsPositions: "SPECS_POSITIONS",
  editorContent: (id: string) => "EDITOR_CONTENT_" + id,
} as const;
