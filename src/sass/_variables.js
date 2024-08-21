function getCssVariableValue(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}
  
export const background = getCssVariableValue('--background');
export const surface = getCssVariableValue('--surface');
export const surfaceTransparent = getCssVariableValue('--surfaceTransparent');
export const onSurface = getCssVariableValue('--onSurface');
export const onSurfaceDark = getCssVariableValue('--onSurfaceDark');
export const onSurfaceDisabled = getCssVariableValue('--onSurfaceDisabled');
export const accent = getCssVariableValue('--accent');