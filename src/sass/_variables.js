function getCssVariableValue(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

export const surface = getCssVariableValue('--surface');
export const onSurfaceDark = getCssVariableValue('--onSurfaceDark');
export const accent = getCssVariableValue('--accent');
export const accentTransparent = getCssVariableValue('--accentTransparent');
export const inSectionPadding = parseFloat(getCssVariableValue('--inSectionPadding'));
export const borderRadiusM = parseFloat(getCssVariableValue('--borderRadiusM'));