import './buttonAccent.scss'

export default function ButtonAccent({children, title, rounded, outlined, fullWidth, onClick, variant, disabled, iconOnly}) {
  return (
    <button
        onClick={onClick}
        className={`
            buttonAccent
            ${rounded && 'rounded'}
            ${outlined && 'outlined'}
            ${fullWidth && 'fullWidth'}
            ${variant === 'canvasControl' && 'buttonCanvasControl'}
            ${variant === 'thumbnailControl' && 'buttonThumbnailControl'}
            ${disabled && 'disabledButton'}
            ${iconOnly && 'iconOnly'}
        `}
    >
        {children}
        {!iconOnly && title}
    </button>
  )
}
