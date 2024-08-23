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
export const accentTransparent = getCssVariableValue('--accentTransparent');
export const accentDarker = getCssVariableValue('--accentDarker');
export const accentHover = getCssVariableValue('--accentHover');
export const inSectionPadding = parseFloat(getCssVariableValue('--inSectionPadding'));
export const borderRadiusM = parseFloat(getCssVariableValue('--borderRadiusM'));