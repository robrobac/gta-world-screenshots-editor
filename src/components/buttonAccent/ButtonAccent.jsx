import './buttonAccent.scss'

export default function ButtonAccent({children, title, rounded, fullWidth, onClick, variant}) {
  return (
    <button
        onClick={onClick}
        className={`
            buttonAccent
            ${rounded && 'rounded'}
            ${fullWidth && 'fullWidth'}
            ${variant === 'canvasControl' && 'buttonCanvasControl'}
        `}
    >
        {children}
        {title}
    </button>
  )
}
